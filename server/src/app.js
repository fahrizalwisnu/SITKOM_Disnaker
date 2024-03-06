const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')
const { sequelize } = require('./models')
const config = require('./config/config')
const { ComplaintRoute, KartuKuningRoute, UserProfileRoute } = require('./routes/index.js')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
)

app.use('/uploads', express.static(__dirname + '/../uploads'))
app.use('/api/yellowcards', KartuKuningRoute)
app.use('/api/complaints', ComplaintRoute)
app.use('/api/profile', UserProfileRoute)

require('./routes.js')(app)

sequelize.sync({ force: false, logging: false }).then(() => {
  app.listen(config.port, () => {
    console.log(`server running on port: ${config.port}`)
  })
})
