const { JSDOM } = require("jsdom");

function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    // console.log(linkElements)
    for (const linkElement of linkElements){
        if(linkElement.href.slice(0, 1) === "/"){
            // relative url
            try{
                const urlObject = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObject.href)
            }
            catch (err){
                console.log(err.message)
            }
        }
        else {
            // absolute url
            try{
                const urlObject = new URL(linkElement.href)
                urls.push(urlObject.href)
            }
            catch (err){
                console.log(err.message)
            }
        }
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