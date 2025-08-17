const http = require("http")

const server = http.createServer((req, res) => {
    if(req.url === "/home") {
        res.setHeader("Content-Type", "text/html")
        res.write("<h1>This is Home Page Wow Ammaing Beautiful Woderfull</h1>")
        res.end()
    }
    if(req.url === "/about") {
        res.setHeader("Content-Type", "text/plain")
        res.write("This is About Page")
        res.end()
    }
    if(req.url === "/contact") {
        res.setHeader("Content-Type", "text/plain")
        res.write("This is Contact Page")
        res.end()
    }
    if(req.url === "/shop") {
        res.setHeader("Content-Type", "text/plain")
        res.write("This is Shop Page")
        res.end()
    }
    if(req.url === "/source") {
        res.setHeader("Content-Type", "text/plain")
        res.write("This is Source Page")
        res.end()
    }
})

const PORT = 3000

server.listen(PORT, () => {
    console.log(`Server is Listening On PORT: ${PORT}`)
})