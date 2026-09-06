// ==UserScript==
// @name         OLEDYT
// @namespace    oledyt
// @version      2.0.0
// @description  yoinked css without credit 😍️
// @author       MisthiPlayz
// @homepageURL  https://github.com/MisthiPlayz/violent-script
// @updateURL    https://github.com/MisthiPlayz/violent-script/raw/refs/heads/main/stolencssbasically.user.js
// @downloadURL  https://github.com/MisthiPlayz/violent-script/raw/refs/heads/main/stolencssbasically.user.js
// @match        https://www.youtube.com/*
// @match        https://youtube.com/*
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';

    GM_addStyle(`
        html:not(.style-scope)[dark],
        :not(.style-scope)[dark],
        html,
        html[dark],
        [dark] {
            --main-background: #000000 !important;
            --second-background: #000000 !important;
            --hover-background: #171819 !important;
            --main-text: #e2e2e2 !important;
            --dimmer-text: #bdc3c7 !important;
            
            --yt-spec-base-background: #000000 !important;
            --yt-spec-general-background-a: #000000 !important;
            --yt-spec-general-background-b: #000000 !important;
            --yt-spec-general-background-c: #000000 !important;
            --yt-spec-brand-background-solid: #000000 !important;
            --yt-spec-brand-background-primary: #000000 !important;
            --yt-spec-menu-background: #000000 !important;
            --yt-spec-raised-background: #0a0a0a !important;
            --yt-spec-text-primary: #f1f1f1 !important;
            --yt-spec-text-secondary: #aaaaaa !important;
            --yt-spec-badge-chip-background: #111111 !important;
            --yt-spec-button-chip-background-hover: #222222 !important;
            --yt-spec-mono-tonal-hover: #1a1a1a !important;
            --yt-spec-filled-buttons-general-variant-a: #1a1a1a !important;
            --yt-spec-10-percent-layer: rgba(255, 255, 255, 0.05) !important;
            --ytd-searchbox-background: #0a0a0a !important;
            --ytd-searchbox-legacy-border-color: #222222 !important;
            --yt-spec-solid-background-inverse: #000000 !important;
            --yt-spec-static-black: #000000 !important;
            --yt-spec-text-primary-inverse: #000000 !important;
            --yt-sys-color-baseline--base-background: #000000 !important;
            --yt-sys-color-baseline--overlay-solid-background-inverse: #000000 !important;
            --yt-spec-brand-background-secondary: #7f0000 !important;
            --yt-spec-overlay-solid-background-inverse: #000000 !important;
            --yt-sys-color-baseline--solid-background-inverse: #000000 !important;
            --yt-sys-color-baseline--static-black: #000000 !important;
            --yt-spec-scrim-background-gradient-5: #000000 !important;
            --yt-sys-color-baseline--scrim-background-gradient-5: #000000 !important;
            --yt-spec-inverted-background: #000000 !important;
            --yt-spec-solid-background: #000000 !important;
            --yt-sys-color-baseline--inverted-background: #000000 !important;
            --yt-sys-color-baseline--solid-background: #000000 !important;
        }

        ytd-app,
        html[dark] ytd-app,
        body,
        #page-manager,
        ytd-watch-flexy,
        ytd-browse,
        #contentContainer.app-drawer,
        #guide-wrapper,
        #masthead-container,
        #background.ytd-masthead {
            background-color: var(--main-background) !important;
        }

        #contents.ytd-rich-grid-renderer,
        #content.ytd-app,
        #page-header.ytd-tabbed-page-header,
        #page-header-container.ytd-tabbed-page-header,
        #tabs-inner-container.ytd-tabbed-page-header {
            background: var(--main-background) !important;
        }

        ytd-feed-filter-chip-bar-renderer,
        #chips-wrapper.ytd-feed-filter-chip-bar-renderer,
        #chips-content.ytd-feed-filter-chip-bar-renderer {
            background-color: #000000 !important;
            border-top: none !important;
            border-bottom: none !important;
        }

        .yt-use-background-for-gradient {
            background: transparent !important;
            background-image: none !important;
        }

        #img.style-scope.yt-img-shadow {
            opacity: 0.5;
            transition: opacity 0.3s ease-in-out;
        }
        #img.style-scope.yt-img-shadow:hover {
            opacity: 1;
        }

        #below {
            opacity: 0.4;
            transition: opacity 0.3s ease-in-out;
        }
        #below:hover {
            opacity: 1;
        }

        .ytd-topbar-logo-renderer.style-scope > .ytd-logo.style-scope {
            opacity: 0.5;
            transition: opacity 0.3s ease-in-out;
        }
        .ytd-topbar-logo-renderer.style-scope > .ytd-logo.style-scope:hover {
            opacity: 1;
        }

        #container.style-scope.ytd-masthead,
        #columns.ytd-watch-flexy {
            background: var(--main-background);
            opacity: 0.5;
            transition: opacity 0.3s ease;
        }
        #container.style-scope.ytd-masthead:hover,
        #columns.ytd-watch-flexy:hover {
            opacity: 1;
        }

        ytd-mini-guide-renderer.style-scope.ytd-app {
            opacity: 0.5;
            transition: opacity 0.3s ease;
        }
        ytd-mini-guide-renderer.style-scope.ytd-app:hover {
            opacity: 1;
        }

        .yt-image-banner-view-model-wiz--position-absolute.yt-image-banner-view-model-wiz--inset.yt-image-banner-view-model-wiz {
            opacity: 0.5;
            transition: opacity 0.3s ease;
        }
        .yt-image-banner-view-model-wiz--position-absolute.yt-image-banner-view-model-wiz--inset.yt-image-banner-view-model-wiz:hover {
            opacity: 1;
        }

        ytd-rich-item-renderer[is-shorts],
        ytd-reel-shelf-renderer,
        ytd-shorts-lockup-view-model,
        ytd-shorts-lockup-renderer,
        #shorts-container,
        ytd-shorts,
        ytd-reel-shelf-renderer,
        .ytd-reel-shelf-renderer,
        ytd-shorts-shelf-renderer {
            display: none !important;
        }

        ytd-guide-entry-renderer[is-shorts],
        a[title="Shorts"] {
            display: none !important;
        }

        ytd-rich-grid-row,
        #contents.ytd-rich-grid-row {
            display: contents !important;
        }

        ytd-rich-grid-renderer {
            --ytd-rich-grid-items-per-row: 5 !important;
        }

        ytd-searchbox {
            box-shadow: none !important;
        }

        #container.ytd-searchbox {
            border-radius: 20px 0 0 20px !important;
            border: 1px solid #222 !important;
            background: #0a0a0a !important;
        }

        #search-icon-legacy.ytd-searchbox {
            border-radius: 0 20px 20px 0 !important;
            border: 1px solid #222 !important;
            border-left: none !important;
            background: #111 !important;
            transition: background 0.2s !important;
        }

        #search-icon-legacy.ytd-searchbox:hover {
            background: #222 !important;
        }

        ytd-menu-popup-renderer,
        tp-yt-paper-dialog,
        .ytp-popup,
        tp-yt-iron-dropdown,
        yt-confirm-dialog-renderer[dialog][dialog][dialog],
        tp-yt-paper-dialog {
            background-color: #0f0f0f !important;
            border: 1px solid #222 !important;
            border-radius: 12px !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8) !important;
        }

        yt-confirm-dialog-renderer[dialog][dialog][dialog],
        tp-yt-paper-dialog {
            box-shadow: 0 0 10px 5px var(--yt-spec-brand-background-secondary) !important;
        }

        yt-chip-cloud-chip-renderer {
            background-color: #111 !important;
            border: 1px solid transparent !important;
            border-radius: 8px !important;
            transition: all 0.2s ease !important;
        }

        yt-chip-cloud-chip-renderer:hover {
            background-color: #222 !important;
        }

        ytd-guide-entry-renderer[active] {
            background-color: #1a1a1a !important;
            border-radius: 10px !important;
        }

        ytd-guide-entry-renderer:hover {
            background-color: #111 !important;
            border-radius: 10px !important;
        }

        #description.ytd-watch-metadata {
            background-color: #0a0a0a !important;
            border-radius: 12px !important;
        }

        .yt-spec-icon-badge-shape--type-notification-refresh .yt-spec-icon-badge-shape__badge {
            background-color: var(--yt-spec-brand-background-secondary) !important;
            color: #fff !important;
        }

        .ytp-show-tiles.videowall-endscreen.ytp-player-content.html5-endscreen {
            display: none !important;
        }

        #clarify-box > .ytd-watch-flexy.style-scope,
        .ytd-rich-section-renderer.style-scope > .ytd-rich-shelf-renderer.style-scope {
            display: none !important;
        }

        #country-code {
            display: none !important;
        }

        .ytd-rich-grid-media.style-scope.yt-simple-endpoint {
            display: none !important;
        }

        #cinematics,
        #cinematics-container,
        .ytp-gradient-bottom,
        .ytp-gradient-top {
            display: none !important;
        }

        #contenteditable-root.yt-formatted-string {
            color: var(--main-text) !important;
        }

        yt-live-chat-renderer,
        #chat-frame,
        #item-list.yt-live-chat-renderer {
            background-color: #000 !important;
            border: none !important;
        }

        yt-live-chat-header-renderer,
        yt-live-chat-message-input-renderer {
            background-color: #0a0a0a !important;
        }

        #comments,
        #sections.ytd-comments,
        #contents.ytd-item-section-renderer {
            opacity: 0.5;
            transition: opacity 0.3s ease;
        }
        #comments:hover,
        #sections.ytd-comments:hover,
        #contents.ytd-item-section-renderer:hover {
            opacity: 1;
        }

        #related,
        #secondary {
            opacity: 0.6;
            transition: opacity 0.3s ease;
        }
        #related:hover,
        #secondary:hover {
            opacity: 1;
        }

        ytd-rich-item-renderer {
            opacity: 0.7;
            transition: opacity 0.3s ease;
        }
        ytd-rich-item-renderer:hover {
            opacity: 1;
        }
    `);
})();
