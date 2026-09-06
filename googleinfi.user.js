// ==UserScript==
// @name         Google Search Infinite Scroll
// @namespace    gsis-violentmonkey
// @version      1.0.0
// @description  Adds infinite scrolling to Google Search results.
// @author       MisthiPlayz
// @homepageURL  https://github.com/MisthiPlayz/violent-script
// @updateURL    https://github.com/MisthiPlayz/violent-script/raw/refs/heads/main/googleinfi.user.js
// @downloadURL  https://github.com/MisthiPlayz/violent-script/raw/refs/heads/main/googleinfi.user.js
// @match        https://www.google.com/search*
// @match        https://google.com/search*
// @include      /^https:\/\/(www\.)?google\.[a-z.]{2,24}\/search(\?.*)?$/
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  var MIN_GAP_MS = 900;
  var JITTER_MS = 400;

  var loading = false;
  var stopped = false;
  var observer = null;
  var lastLoadAt = 0;
  var injectedAssetKeys = Object.create(null);

  function isAllResultsTab() {
    var params = new URLSearchParams(location.search);
    if (params.has('tbm')) return false;
    var udm = params.get('udm');
    if (udm && udm !== '1') return false;
    return true;
  }

  function getResultsContainer(doc) {
    doc = doc || document;
    return doc.getElementById('rso') || doc.getElementById('search');
  }

  function getPaginationBlock(doc) {
    doc = doc || document;
    return doc.getElementById('botstuff') || doc.getElementById('foot');
  }

  function getNextLink(doc) {
    doc = doc || document;
    var byId = doc.querySelector('a#pnnext');
    if (byId) return byId;
    var candidates = doc.querySelectorAll('a[aria-label], a');
    for (var i = 0; i < candidates.length; i++) {
      var a = candidates[i];
      var label = (a.getAttribute('aria-label') || a.textContent || '').trim().toLowerCase();
      if (label === 'next' || label === 'next page') return a;
    }
    return null;
  }

  function isSafeDataScript(text) {
    return text.indexOf('_setImagesSrc') !== -1 ||
      text.indexOf('dimg') !== -1 ||
      text.indexOf("window['W_jd']") !== -1;
  }

  function isFrameworkInitScript(text) {
    return text.indexOf('var m=') !== -1 || text.indexOf('window.jsl.dh') !== -1;
  }

  function reviveScript(oldScript) {
    var fresh = document.createElement('script');
    for (var i = 0; i < oldScript.attributes.length; i++) {
      var attr = oldScript.attributes[i];
      if (attr.name === 'src') continue;
      fresh.setAttribute(attr.name, attr.value);
    }
    fresh.textContent = oldScript.textContent;
    return fresh;
  }

  function extractFrameworkData(text) {
    var match = text.match(/var m\s*=\s*(\{[\s\S]*?\});/);
    if (!match) return;
    try {
      var parsed = JSON.parse(match[1]);
      window.W_jd = window.W_jd && typeof window.W_jd === 'object'
        ? Object.assign(window.W_jd, parsed)
        : parsed;
    } catch (e) {
    }
  }

  function processScript(script) {
    var text = script.textContent || '';
    if (isSafeDataScript(text)) {
      script.parentNode.replaceChild(reviveScript(script), script);
    } else if (isFrameworkInitScript(text)) {
      extractFrameworkData(text);
    }
  }

  function reviveScriptsIn(root) {
    if (!root) return;
    if (root.tagName === 'SCRIPT') {
      processScript(root);
      return;
    }
    if (!root.querySelectorAll) return;
    var scripts = root.querySelectorAll('script:not([src])');
    for (var i = 0; i < scripts.length; i++) processScript(scripts[i]);
  }

  function assetKey(el) {
    if (el.id) return 'id:' + el.id;
    if (el.tagName === 'LINK' && el.href) return 'href:' + el.href;
    if (el.tagName === 'SCRIPT' && el.src) return 'src:' + el.src;
    var text = el.textContent || '';
    return el.tagName + ':' + text.length + ':' + text.slice(0, 64);
  }

  function hydrateHeadAssets(fetchedDoc) {
    var candidates = fetchedDoc.querySelectorAll('head style, head link[rel="stylesheet"]');
    for (var i = 0; i < candidates.length; i++) {
      var el = candidates[i];
      var key = assetKey(el);
      if (injectedAssetKeys[key]) continue;
      injectedAssetKeys[key] = true;
      document.head.appendChild(el.cloneNode(true));
    }
  }

  function hydrateTrailingScripts(fetchedDoc, resultsRoot) {
    var scripts = fetchedDoc.querySelectorAll('body > script:not([src])');
    for (var i = 0; i < scripts.length; i++) {
      var s = scripts[i];
      if (resultsRoot && resultsRoot.contains(s)) continue;
      var text = s.textContent || '';

      if (isFrameworkInitScript(text)) {
        extractFrameworkData(text);
        continue;
      }
      if (!isSafeDataScript(text)) continue;

      var key = assetKey(s);
      if (injectedAssetKeys[key]) continue;
      injectedAssetKeys[key] = true;
      document.body.appendChild(reviveScript(s));
    }
  }

  function applyDataSrc(img) {
    var real = img.getAttribute('data-src');
    if (real) {
      img.src = real;
      img.removeAttribute('data-src');
    }
  }

  function fixLazyImages(node) {
    if (!node) return;
    if (node.tagName === 'IMG') {
      applyDataSrc(node);
      return;
    }
    if (!node.querySelectorAll) return;
    var imgs = node.querySelectorAll('img[data-src]');
    for (var i = 0; i < imgs.length; i++) applyDataSrc(imgs[i]);
  }

  function looksBlocked(doc) {
    if (doc.querySelector('form#captcha-form, div#captcha-form')) return true;
    var bodyText = doc.body ? doc.body.textContent || '' : '';
    return /unusual traffic|automated queries/i.test(bodyText);
  }

  function getOrCreateIndicator() {
    var el = document.getElementById('gsis-loading-indicator');
    if (!el) {
      el = document.createElement('div');
      el.id = 'gsis-loading-indicator';
      el.textContent = 'Loading...';
      el.style.textAlign = 'center';
      el.style.padding = '20px';
      el.style.fontSize = '14px';
      el.style.fontFamily = 'arial, sans-serif';
      el.style.color = '#70757a';
      el.style.display = 'none';
    }
    return el;
  }

  function placeIndicator() {
    var indicator = getOrCreateIndicator();
    var anchor = getPaginationBlock() || getResultsContainer();
    if (anchor && anchor.parentNode) {
      anchor.parentNode.insertBefore(indicator, anchor.nextSibling);
    }
    return indicator;
  }

  function showIndicator() {
    placeIndicator().style.display = 'block';
  }

  function hideIndicator() {
    var indicator = document.getElementById('gsis-loading-indicator');
    if (indicator) indicator.style.display = 'none';
  }

  function ensureObserver() {
    if (observer) observer.disconnect();
    if (stopped) return;

    var results = getResultsContainer(document);
    if (!results) return;

    var target = results.lastElementChild;
    if (!target) return;

    observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) loadNextPage();
    }, { rootMargin: '1500px 0px' });

    observer.observe(target);
  }

  function performLoad(nextLink) {
    lastLoadAt = Date.now();
    showIndicator();

    fetch(nextLink.href, { credentials: 'include' })
      .then(function (res) {
        if (!res.ok) throw new Error('http ' + res.status);
        return res.text();
      })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');

        if (looksBlocked(doc)) {
          stopped = true;
          loading = false;
          if (observer) observer.disconnect();
          hideIndicator();
          return;
        }

        var newResults = getResultsContainer(doc);
        var currentResults = getResultsContainer(document);

        hydrateHeadAssets(doc);
        hydrateTrailingScripts(doc, newResults);

        if (newResults && currentResults) {
          var moved = [];
          while (newResults.firstChild) {
            var node = newResults.firstChild;
            moved.push(node);
            currentResults.appendChild(node);
          }
          for (var i = 0; i < moved.length; i++) {
            reviveScriptsIn(moved[i]);
            fixLazyImages(moved[i]);
          }
        }

        var newPagination = getPaginationBlock(doc);
        var oldPagination = getPaginationBlock(document);
        if (newPagination && oldPagination) {
          oldPagination.replaceWith(newPagination);
        } else if (oldPagination) {
          oldPagination.remove();
        }

        loading = false;
        hideIndicator();
        ensureObserver();
      })
      .catch(function () {
        loading = false;
        hideIndicator();
        if (observer) observer.disconnect();
      });
  }

  function loadNextPage() {
    if (stopped || loading) return;
    var nextLink = getNextLink();
    if (!nextLink || !nextLink.href) {
      if (observer) observer.disconnect();
      return;
    }
    loading = true;
    var elapsed = Date.now() - lastLoadAt;
    var gap = MIN_GAP_MS + Math.floor(Math.random() * JITTER_MS);
    var wait = Math.max(0, gap - elapsed);
    setTimeout(function () { performLoad(nextLink); }, wait);
  }

  function init() {
    if (window.top !== window.self) return;
    if (!isAllResultsTab()) return;

    var link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://www.google.com';
    document.head.appendChild(link);

    ensureObserver();
  }

  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init, { once: true });
  }
})();
