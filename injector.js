function injectcss(name) {
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = chrome.runtime.getURL(name);
    (document.head || document.documentElement).appendChild(style);
}

function injectjs(name) {
    var script = document.createElement('script')
    script.src = chrome.runtime.getURL(name)
    document.body.appendChild(script)
}

function load(enhs) {
    enhs.forEach(enhi => {
        let enh = enhancements[enhi]

        enh.injectors.forEach(injector => {
            let match = false
            injector.pages.forEach(page => {
                if (page.slice(-1) == "*" && window.location.pathname.indexOf(page.slice(0, page.length - 1)) == 0 || window.location.pathname == page) match = true
            })

            if (match) {
                if (injector['styles']) {
                    injector.styles.forEach(style => {
                        injectcss("packages/" + enhi + "/" + ((style == "css") ? enhi + ".css" : style))
                    })
                }

                if (injector['scripts']) {
                    injector.scripts.forEach(script => {
                        injectjs("packages/" + enhi + "/" + ((script == "js") ? enhi + ".js" : script))
                    })
                }

                if (injector['externals']) injector.externals.forEach(ext => document.head.innerHTML += ext)
            }
        })
    })
}

chrome.storage.sync.get('enhancements', res => load(JSON.parse(res.enhancements)))