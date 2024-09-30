const express = require('express'); // express 모듈 불러오기
const cors = require('cors'); // cors 모듈 불러오기
const PORT = 8080; // 포트 설정
const path = require('path');
const spawn =require("child_process").spawn;

const app = express(); // express 모듈을 사용하기 위해 app 변수에 할당

app.use(cors()); // cors 사용 설정 http, https 프로토콜을 사용하는 서버간의 통신을 허용한다
app.use(express.json()); // json 형식 사용 설정

app.use(cors({
  origin : "http://localhost:3000",
  credentials : true,
})); // http, https 프로토콜을 사용하는 서버 간의 통신을 허용한다.

// const corsOptions = {
//   origin: 'https://whipped.purple-coding.site', // 클라이언트의 주소를 명시
//   credentials: true, // 자격 증명 허용
// };

app.use(cors(corsOptions));



app.get('/', (req, res) => {
  res.send('Hello World!'); // get 요청 시 Hello World! 출력
}); // get 요청 시 실행할 함수

//채팅 문자열 요청
app.post("/chat",(req, res)=>{
  try {
    const sendedQuestion = req.body.question;


    // EC2 서버에서 현재 실행 중인 Node.js 파일의 절대 경로를 기준으로 설정.
    const scriptPath = path.join(__dirname, 'bizchat.py');

    // EC2 서버에서 실행하는 절대 경로, 개발 테스트시 사용 불가(mac OS는 가능)
    const pythonPath = path.join(__dirname, 'venv', 'bin', 'python3');

    // 개발 테스트시 사용하는 절대경로(window)
    // const pythonPath = path.join(__dirname, 'venv', 'Scripts', 'python.exe');


    // Spawn the Python process with the correct argument
    const result = spawn(pythonPath, [scriptPath, sendedQuestion]);


    // result.stdout.on('data', (data) => {
    //   console.log(data.toString());
    //   // return res.status(200).json(data.toString());
    // });


    let responseData = '';


    // Listen for data from the Python script
    result.stdout.on('data', (data) => {
      // console.log(data.toString());
      // res.status(200).json({ answer: data.toString() });
      responseData += data.toString();
    });


    // Listen for errors from the Python script
    result.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      res.status(500).json({ error: data.toString() });
    });


    // Handle the close event of the child process
    result.on('close', (code) => {
      if (code === 0) {
        res.status(200).json({ answer: responseData });
      } else {
        res
          .status(500)
          .json({ error: `Child process exited with code ${code}` });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }


})

app.use(require('./routes/getRoutes'));

app.use(require('./routes/postRoutes'))

const path = require('path')
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.listen(PORT, () => console.log(`Server is runnig on ${PORT}`)); // 서버 실행 시 메세지 출력
