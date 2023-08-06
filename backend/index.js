const connnecttodb = require('./db')

const express = require('express')
var cors = require('cors')

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.get('/hey', (req, res) => {
    res.send('Hello There!')
})

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
    console.log(`iNotebook backend listening on port http://localhost:${port}`)
})

