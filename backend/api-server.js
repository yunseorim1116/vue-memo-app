const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
app.use(bodyParser.json())


const membesList = [

  { mid : 3, memberName :"윤서림", loginId:"tjfla6417", loginPw:"1" },
  { mid : 4, memberName :"홍길동", loginId:"a", loginPw:"1" },
]

app.get('/api/account', (req, res) => {
  // res.send({
  //   mid:3,
  //   memberName:"윤서림"
  // })

    res.send(401)
})

app.post('/api/account', (req, res) => {
  console.log('post api 실행')
const loginId = req.body.loginId
const loginPw = req.body.loginPw

const member = membesList.find((m)=> m.loginId === loginId && m.loginPw === loginPw )
console.log(member)

if(member){
  res.send(member)
}else {
  res.send(404)
}
res.json({ message: '제출했어요' });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})