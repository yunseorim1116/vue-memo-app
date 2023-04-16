const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken') //jwt임포트
const jwtKey = "abc1234567"; //암호

app.use(bodyParser.json())
app.use(cookieParser())


const membesList = [
  { mid : 3, memberName :"윤서림", loginId:"tjfla6417", loginPw:"1" },
  { mid : 4, memberName :"홍길동", loginId:"a", loginPw:"1" },
]

app.get('/api/account', (req, res) => {
    if (req.cookies && req.cookies.token) {
//검증한다.
        jwt.verify(req.cookies.token, jwtKey, (err, decoded) => {
            if (err) {
                return res.sendStatus(401);
            }

            res.send(decoded); //최종결과,

            //1. 쿠키가 있으면 , 2. 쿠키값을 검증해서 , 3. 에러가 있으면 에러를 뱉고, 없으면 값을 뱉는다.
        })
    }
    else {
        res.sendStatus(401);
    }
})

app.post('/api/account', (req, res) => {
  console.log('post api 실행')
const loginId = req.body.loginId
const loginPw = req.body.loginPw

const member = membesList.find((m)=> m.loginId === loginId && m.loginPw === loginPw )

if (member) {
    const options = {
      domain: "localhost", // 쿠키가 유효한 도메인을 지정.
      path: "/", // 쿠키가 유효한 경로를 지정.
      httpOnly: true, // JavaScript를 통해 쿠키에 접근하지 못하도록 한다. 이를 통해 XSS(Cross-Site Scripting) 공격을 방지할 수 있다. 기본값은 false.
      sameSite: "strict" // 쿠키가 SameSite 속성을 가져야 하는지 지정 SameSite 속성은 쿠키가 Cross-Site 요청에서만 전송되도록 제한하는 것으로, CSRF(Cross-Site Request Forgery) 공격을 방지할 수 있다.
      // "strict", "lax", "none" 중 하나의 값을 지정할 수 있고,. 기본값은 "lax"이다.
    }

   const token = jwt.sign(//JWT(Json Web Token)을 생성하는 함수
       {
       mid: member.mid,
       memberName: member.memberName,
        },

         jwtKey, //JWT Signature를 생성할 때 사용하는 비밀키를 전달.
         //이를 통해 서버에서 생성한 토큰임을 검증할 수 있다.

       {
         expiresIn: "15m",
        issuer: "africalib"
       }
   );

        res.cookie("token", token, options); //멤버 그대로를 json파싱해서 넣어주는 것이 아니라, 저 token값으로 넣어준다.
    res.send(member);
  } else {
    res.sendStatus(404);
  }
res.json({ message: '제출했어요' });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})