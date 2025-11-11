const {crawlPage} = require("./crawl.js")

function main(){
    if(process.argv < 3) {
        console.log("No website provided")
        process.exit(1)
    }
    if(process.argv > 3) {
        console.log("Too many args provided")
        process.exit(1)
    }  
    const baseURL = process.argv[2]
    console.log("this is the website: ", baseURL)

    console.log(`starting crawl of ${baseURL}`)
    crawlPage(baseURL)
}

main()