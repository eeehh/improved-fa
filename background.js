// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([{
            // That fires when a page's URL contains a 'g' ...
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostEquals: 'www.furaffinity.net' },
                })
            ],
            // And shows the extension's page action.
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });

    // enable the default enhancements
    let default_enhancements = ["adblock", "navigation_enhance", "navigation_fix", "header_enhance", "gallery_enhance", "nav-search_enhance", "scrollbar_enhance", "footer_simplifier", "browse_enhance", "submit_enhance"]
    chrome.storage.sync.set({ "enhancements": JSON.stringify(default_enhancements) })
});