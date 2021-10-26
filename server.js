const express = require('express')
const path = require('path')

const app = express()
app.use(express.json())

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    // rollbar.info('html file served successfully')
})

app.get('/style', (req,res) => {
    res.sendFile(path.join(__dirname,'/public/styles.css'))
})

const port = process.env.PORT || 4545

app.listen(port, ()=> console.log(`We have our heading to ${port}!`))