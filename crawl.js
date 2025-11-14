const { JSDOM } = require("jsdom");
const fetch = require("node-fetch");

async function crawlPage(currentURL){

    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(baseURL)
    if(baseURL.hostname !== currentURLObj.hostname)
        return pages

    const normalizedCurrentURL = normalizeURL(currentURL)
    if (pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL] += 1
        return pages
    }

    pages[normalizedCurrentURL] = 1

    console.log(`activley crawling ${currentURL  }`)
    
    try {
        const res = await fetch(currentURL)

        if(res.status > 399){
            console.log(`error while making api call, code: ${res.status}`)
            return pages
        }

        const contentType = res.headers.get("content-type")
        if(!contentType.includes("text/html")){
            console.log(`non html response, content type is: ${contentType}}`)
            return pages
        }

        const htmlBody = await res.text()

        const nextURLs = getURLsFromHTML(htmlBody, baseURL)
 
        for (const nextURL of nextURLs){
            pages = await crawlPage(baseURL, nextURL, pages)
        }
    }
    catch(err){
        console.log(`Error in page: ${err.message}`)
    }

    return pages
}

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
    getURLsFromHTML,
    crawlPage
}