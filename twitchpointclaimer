// ==UserScript==
// @name         Auto Claim twitch channel points
// @namespace    twitchpointclaim
// @version      1.0.0
// @description  let me know if it doesn't work in certain condition
// @author       MisthiPlayz
// @homepageURL  https://github.com/MisthiPlayz/violent-script
// @updateURL    https://github.com/MisthiPlayz/violent-script/raw/refs/heads/main/twitchpointclaimer.user.js
// @downloadURL  https://github.com/MisthiPlayz/violent-script/raw/refs/heads/main/twitchpointclaimer.user.js
// @match        https://*.twitch.tv/*
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  function getClaimBonusButton(parentElement) {
    var root = parentElement || document;
    return root.querySelector('.community-points-summary > *:nth-child(2) button')
      || root.querySelector('.community-points-summary button[aria-label="Claim Bonus"]');
  }

  var documentObserver = null;
  var summaryObserver = null;
  var lastSummaryContainer = null;
  var lastClick = 0;
  var CLICK_DELAY_MS = 2000;

  function getSummaryContainer() {
    return document.getElementsByClassName('community-points-summary')[0] || null;
  }

  function clickBonusButton() {
    var summaryContainer = getSummaryContainer();
    if (!summaryContainer) return;
    var bonusBtn = getClaimBonusButton(summaryContainer);
    if (bonusBtn && Date.now() - lastClick > CLICK_DELAY_MS) {
      lastClick = Date.now();
      bonusBtn.click();
    }
  }

  function observeBonus() {
    var summaryContainer = getSummaryContainer();
    if (!summaryContainer) return;
    lastSummaryContainer = summaryContainer;
    clickBonusButton();
    if (summaryObserver) summaryObserver.disconnect();
    summaryObserver = new MutationObserver(function () {
      try {
        clickBonusButton();
      } catch (err) {
        console.error('Auto Claim Twitch Channel Points:', err);
      }
    });
    summaryObserver.observe(summaryContainer, { childList: true, subtree: true });
  }

  function createObservers() {
    var summaryContainer = getSummaryContainer();
    if (summaryContainer) observeBonus();

    if (documentObserver) documentObserver.disconnect();
    documentObserver = new MutationObserver(function () {
      try {
        var currentSummaryContainer = getSummaryContainer();
        if (currentSummaryContainer && currentSummaryContainer !== lastSummaryContainer) {
          observeBonus();
        }
      } catch (err) {
        console.error('Auto Claim Twitch Channel Points:', err);
      }
    });
    documentObserver.observe(document.body, { subtree: true, childList: true });
  }

  try {
    createObservers();
  } catch (err) {
    console.error('Auto Claim Twitch Channel Points:', err);
  }
})();

