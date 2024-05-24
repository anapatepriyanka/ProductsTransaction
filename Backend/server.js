const express = require('express')
const cors = require('cors')
const app = express()
const port = 3060

const initializeDatabaseRoute = require('./routes/initializeDatabase')
const getTransactionsRoute = require('./routes/transaction')
const getStatisticsRoute = require('./routes/statistics')
const getBarChartRoute = require('./routes/barChart')
const getPieChartRoute = require('./routes/pieChart')
const getCombinedDataRoute = require('./routes/combined')

const configureDB = require('./config/db')
configureDB()


app.use(cors())
app.use(express.json())

console.log('Initialize route loaded');
app.use('/api/initialize', initializeDatabaseRoute)
app.use('/api/transaction', getTransactionsRoute)
app.use('/api/statistics', getStatisticsRoute)
app.use('/api/barChart', getBarChartRoute)
app.use('/api/pieChart', getPieChartRoute)
app.use('/api/combinedData', getCombinedDataRoute)


app.listen(port,() => {
    console.log('server running on port', port)
})