const express = require('express')
const app = express()
const port = 3000

app.get('/api/account', (req, res) => {
  res.send({
    mid:3,
    memberName:"윤서림"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})