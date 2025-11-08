// const { url } = require("inspector");

function normalizeURL(urlString){
    // https://blog.boot.dev/path
    const myUrl = new URL(urlString)
    const hostpath = `${myUrl.hostname}${myUrl.pathname}`
    if(hostpath.length > 0 && hostpath.slice(-1) === "/")
        return hostpath.slice(0, -1)

    return hostpath
}

module.exports = {
    normalizeURL
}