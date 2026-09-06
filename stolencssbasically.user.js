// ==UserScript==
// @name         OLEDYT
// @namespace    gsis-violentmonkey
// @version      1.0.0
// @description  yoinked css without credit 😍️
// @author       MisthiPlayz
// @homepageURL  https://github.com/MisthiPlayz/violent-script
// @updateURL    https://github.com/MisthiPlayz/violent-script/raw/refs/heads/main/stolencssbasically.user.js
// @downloadURL  https://github.com/MisthiPlayz/violent-script/raw/refs/heads/main/stolencssbasically.user.js
// @match        https://www.google.com/search*
// @match        https://google.com/search*
// @include      /^https:\/\/(www\.)?google\.[a-z.]{2,24}\/search(\?.*)?$/
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    GM_addStyle(`
        html,
        html[dark],
        [dark] {
            --yt-spec-base-background: #000000 !important;
            --yt-spec-general-background-a: #000000 !important;
            --yt-spec-general-background-b: #000000 !important;
            --yt-spec-general-background-c: #000000 !important;
            --yt-spec-brand-background-solid: #000000 !important;
            --yt-spec-brand-background-primary: #000000 !important;
            --yt-spec-menu-background: #0a0a0a !important;
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

        body,
        ytd-app,
        #page-manager,
        ytd-watch-flexy,
        ytd-browse,
        #contentContainer.app-drawer,
        #guide-wrapper,
        #masthead-container,
        #background.ytd-masthead {
            background-color: #000000 !important;
        }

        ytd-rich-grid-row,
        #contents.ytd-rich-grid-row {
            display: contents !important;
        }

        ytd-rich-grid-renderer {
            --ytd-rich-grid-items-per-row: 5 !important;
        }

        #cinematics,
        #cinematics-container,
        .ytp-gradient-bottom,
        .ytp-gradient-top {
            display: none !important;
        }

        ytd-searchbox {
            box-shadow: none !important;
        }

        #container.ytd-searchbox {
            border-radius: 20px 0 0 20px !important;
            border: 1px solid #222 !important;
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
        tp-yt-iron-dropdown {
            background-color: #0f0f0f !important;
            border: 1px solid #222 !important;
            border-radius: 12px !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8) !important;
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

        #description.ytd-watch-metadata {
            background-color: #0a0a0a !important;
            border-radius: 12px !important;
        }

        ytd-guide-entry-renderer[active] {
            background-color: #1a1a1a !important;
            border-radius: 10px !important;
        }

        ytd-guide-entry-renderer:hover {
            background-color: #111 !important;
            border-radius: 10px !important;
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
    `);
})();
