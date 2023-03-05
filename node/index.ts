import express from 'express'
import path from 'path'

const app = express()

app.use(express.static(path.join(__dirname, '..', 'start')))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'start', 'index.html'))

  app.listen(3001)
})
