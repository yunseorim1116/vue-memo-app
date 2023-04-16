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

if (member) {
    const options = {
      domain: "localhost", // 쿠키가 유효한 도메인을 지정. 예를 들어, ".example.com"와 같이 하위 도메인까지 포함하여 지정할 수 있습니다. 기본값은 현재 도메인입니다.
      path: "/", // 쿠키가 유효한 경로를 지정.
      httpOnly: true, // JavaScript를 통해 쿠키에 접근하지 못하도록 합니다. 이를 통해 XSS(Cross-Site Scripting) 공격을 방지할 수 있다. 기본값은 false입니다.
      sameSite: "strict" // 쿠키가 SameSite 속성을 가져야 하는지 지정 SameSite 속성은 쿠키가 Cross-Site 요청에서만 전송되도록 제한하는 것으로, CSRF(Cross-Site Request Forgery) 공격을 방지할 수 있다.
      // "strict", "lax", "none" 중 하나의 값을 지정할 수 있고,. 기본값은 "lax"입니다.
    }
    res.cookie("account", JSON.stringify(member), options);
    res.send(member);
  } else {
    res.sendStatus(404);
  }
res.json({ message: '제출했어요' });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})