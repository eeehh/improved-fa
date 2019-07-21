// a function to convert a list of plugins to a series of elements in the document
function loadPlugins(plugins) {
    document.querySelector(".plugin-container").innerHTML = ""
    plugins.forEach((plugin, i) => {

        let container = document.createElement("div")
        container.className = "plugin"

        let toggle = document.createElement("div")
        toggle.className = "mdl-switch mdl-js-switch mdl-js-ripple-effect"
        toggle.setAttribute("for", "switch-" + i)
        toggle.setAttribute("target-plugin", plugin.key)
        let input = document.createElement("input")
        input.type = "checkbox"
        input.id = "switch-" + i
        input.className = "mdl-switch__input"
        if (plugin.enabled) input.setAttribute("checked", "")
        toggle.appendChild(input)
        let span = document.createElement('span')
        span.className = "mdl-switch__label"
        toggle.appendChild(span)
        container.appendChild(toggle)

        let h5 = document.createElement("h5")
        h5.innerHTML = plugin.title
        container.appendChild(h5)

        let p = document.createElement("p")
        p.innerHTML = plugin.description
        container.appendChild(p)

        if (plugin["author"]) {
            let art = document.createElement("p")
            art.className = "author"
            art.innerHTML = plugin.author
            container.appendChild(art)
        }

        document.querySelector(".plugin-container").appendChild(container)

        if (typeof componentHandler == "object") componentHandler.upgradeAllRegistered()

        toggle.addEventListener("click", e => {
            let elm = e.path[0]
            while (elm.tagName !== "DIV") elm = elm.parentElement

            if (elm.className.indexOf("is-checked") > -1) {
                elm.className = elm.className.replace(" is-checked", "")
                var index = user_enhancements.indexOf(elm.getAttribute("target-plugin"))
                if (index !== -1) user_enhancements.splice(index, 1)
                savePlugins()
            } else {
                elm.className += " is-checked"
                user_enhancements.push(elm.getAttribute("target-plugin"))
                savePlugins()
            }
        })
    })
}

let user_enhancements = []

// convert enhancements object into an array of plugins
function pluginsArr() {
    let arr = []
    for (var key in enhancements) {
        if (enhancements.hasOwnProperty(key)) arr.push(enhancements[key])
        arr[arr.length - 1]["enabled"] = Boolean(user_enhancements.indexOf(key) > -1)
        arr[arr.length - 1]["key"] = key
    }
    return arr
}

function savePlugins() {
    chrome.storage.sync.set({ "enhancements": JSON.stringify(user_enhancements) })
}

// whenever the search field is changed, update plugins list
document.querySelector("#sample1").oninput = () => {
    let results = pluginsArr()
    let query = document.querySelector("#sample1").value.toUpperCase()
    let matches = []

    results.forEach(res => {
        if (res.title.toUpperCase().indexOf(query) > -1) matches.push(res)
    })

    loadPlugins(matches)
}

// load enhancements on document load
document.body.onload = () => {
    chrome.storage.sync.get('enhancements', res => {
        user_enhancements = JSON.parse(res.enhancements)
        loadPlugins(pluginsArr())
    })
}