const { link } = require("fs");
const { JSDOM } = require("jsdom");

function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    // console.log(linkElements)
    for (const linkElement of linkElements){
        if(linkElement.href.slice(0, 1) === "/"){
            // relative url
            urls.push(`${baseURL}/`)
        }
        else {
            // absolute url
            urls.push(linkElement.href)
        }
        // urls.push(linkElement.href)
    }

    return urls
}

function normalizeURL(urlString){
    // https://blog.boot.dev/path
    const myUrl = new URL(urlString)
    const hostpath = `${myUrl.hostname}${myUrl.pathname}`
    if(hostpath.length > 0 && hostpath.slice(-1) === "/")
        return hostpath.slice(0, -1)

    return hostpath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}