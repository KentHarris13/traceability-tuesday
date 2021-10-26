const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken:'0f6027f737d5435996a6f0e874b7f1f7',
    captureUncaught: true,
    captureUnhandledRejections: true
})
const app = express()
app.use(express.json())

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

app.get('/style', (req,res) => {
    res.sendFile(path.join(__dirname,'/public/styles.css'))
})

app.get('/rollbar', (req,res) => {
    try {
        nonExistentFunction();
      } catch (error) {
        rollbar.error("plz be broken");
      }
      
})

let drink = []

app.post('/api/drink', (req, res) => {
    let {name} = req.body
    name = name.trim()

    const index = drink.findIndex(drinkName => drinkName === name)

    if(index === -1 && name !== ''){
        drink.push(name)
        rollbar.log('Drinks added successfully', {authorz:'Kent', type: 'manual entry'})
        res.status(200).send(drink)
    } else if ( name === ''){
        rollbar.error('No drink given')
        res.status(400).send('Must provide a drink.')
    } else {
        rollbar.critical('Drink already exists')
        res.status(400).send('That drink already exists')
    }
})

app.use(rollbar.errorHandler())
const port = process.env.PORT || 4545

app.listen(port, ()=> console.log(`We have our heading to ${port}!`))