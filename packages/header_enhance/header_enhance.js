document.querySelector("#news").innerHTML = "<p style='margin: 0; font-size: 18px; line-height: 20px; font-weight: bolder; margin-bottom: -10px;'>Latest News</p><i class='material-icons dismiss'>close</i>" + document.querySelector("#news").innerHTML

document.querySelector("#news i.dismiss").onclick = () => {
    document.querySelector("#news").style.display = "none"
}

let header = document.createElement("div")
header.className = "header"
let nav = document.querySelector("table.block-menu-top")
nav.parentElement.insertBefore(header, nav.nextSibling)

let img = document.querySelector(".block-banners.clearfix")
let news = document.querySelector("#news")
document.body.removeChild(img)
document.body.removeChild(news)
header.appendChild(img)
header.appendChild(news)