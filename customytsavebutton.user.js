// ==UserScript==
// @name         Save button in overlay
// @namespace    hmm
// @version      1.0.1
// @author       MisthiPlayz
// @description  Adds a save button to the YouTube player overlay.
// @match        https://www.youtube.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @downloadURL  https://raw.githubusercontent.com/MisthiPlayz/violent-script/main/customytsavebutton.user.js
// @updateURL    https://raw.githubusercontent.com/MisthiPlayz/violent-script/main/customytsavebutton.user.js
// ==/UserScript==

(() => {
  const SVG_PATH = 'M19 2H5a2 2 0 00-2 2v16.887c0 1.266 1.382 2.048 2.469 1.399L12 18.366l6.531 3.919c1.087.652 2.469-.131 2.469-1.397V4a2 2 0 00-2-2ZM5 20.233V4h14v16.233l-6.485-3.89-.515-.309-.515.309L5 20.233Z';
  const BUTTON_CLASS = 'custom-save-button';
  let button = null;
  let url = location.href;
  let timer = 0;

  const observer = new MutationObserver(() => {
    if (location.href === url) return;
    url = location.href;
    clearTimeout(timer);
    button = null;
    timer = setTimeout(inject, 500);
  });

  observer.observe(document, { subtree: true, childList: true });

  const getNativeButton = () => document.querySelector('button[aria-label="Save to playlist"]');

  const createButton = () => {
    const el = document.createElement('div');
    el.className = `ytp-button ${BUTTON_CLASS}`;
    el.setAttribute('aria-label', 'Save Video');
    el.title = 'Save Video';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.style.cssText = 'pointer-events:none;display:block;width:24px;height:24px;fill:#fff;flex-shrink:0';

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', SVG_PATH);
    svg.appendChild(path);
    el.appendChild(svg);

    el.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const native = getNativeButton();
      if (native) native.click();
    });

    el.addEventListener('mouseenter', () => { el.style.opacity = '0.8'; });
    el.addEventListener('mouseleave', () => { el.style.opacity = '1'; });

    return el;
  };

  const inject = () => {
    document.querySelectorAll(`.${BUTTON_CLASS}`).forEach(el => el.remove());

    const container = document.querySelector('.ytp-right-controls-left');
    if (!container) {
      clearTimeout(timer);
      timer = setTimeout(inject, 300);
      return;
    }

    const existing = container.querySelector(`.${BUTTON_CLASS}`);
    if (existing) return;

    const newButton = createButton();
    const children = container.children;
    let inserted = false;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.tagName === 'BUTTON' || child.tagName === 'BUTTON-VIEW-MODEL') {
        if (i + 1 < children.length) {
          container.insertBefore(newButton, children[i + 1]);
        } else {
          container.appendChild(newButton);
        }
        inserted = true;
        break;
      }
    }

    if (!inserted) container.appendChild(newButton);
    button = newButton;
  };

  const cleanup = () => {
    clearTimeout(timer);
    observer.disconnect();
    document.querySelectorAll(`.${BUTTON_CLASS}`).forEach(el => el.remove());
  };

  window.addEventListener('unload', cleanup);

  timer = setTimeout(inject, 800);
})();
