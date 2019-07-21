// -- injector.js
// this file is run whenever FA is opened, and will inject all enabled enhancements for the page the user is on


// function to add a <link> tag to the document head
function injectcss(name) {
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = chrome.runtime.getURL(name);
    (document.head || document.documentElement).appendChild(style);
}

// function to add a <script> tag to the end of the document body
function injectjs(name) {
    var script = document.createElement('script')
    script.src = chrome.runtime.getURL(name)
    document.body.appendChild(script)
}

// function to load enhancements
function load(enhs) {
    // iternate through enable enhancements array
    enhs.forEach(enhi => {
        // get information about the enhancement
        let enh = enhancements[enhi]

        // iterate through injectors
        enh.injectors.forEach(injector => {
            // check if the injector matches the user's current page
            let match = false
            injector.pages.forEach(page => {
                if (page.slice(-1) == "*" && window.location.pathname.indexOf(page.slice(0, page.length - 1)) == 0 || window.location.pathname == page) match = true
            })

            // if it does, inject
            if (match) {
                // if there are styles, iterate through and inject them
                if (injector['styles']) {
                    injector.styles.forEach(style => {
                        injectcss("packages/" + enhi + "/" + ((style == "css") ? enhi + ".css" : style))
                    })
                }

                // if there are scripts, iterate through and inject them
                if (injector['scripts']) {
                    injector.scripts.forEach(script => {
                        injectjs("packages/" + enhi + "/" + ((script == "js") ? enhi + ".js" : script))
                    })
                }

                // if there are externals, iterate through and inject them
                if (injector['externals']) injector.externals.forEach(ext => document.head.innerHTML += ext)
            }
        })
    })
}

// get enhancements, and call the function to load them in
chrome.storage.sync.get('enhancements', res => load(JSON.parse(res.enhancements)))