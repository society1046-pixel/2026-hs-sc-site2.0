// pv.js

const express = require('express');
const cors = require('cors');
const ImageKit = require("imagekit");

const app = express();
app.use(cors()); // 프론트엔드(HTML)에서 이 서버로 요청을 보낼 수 있도록 허용합니다.

// 알려주신 ImageKit 키로 초기화
const imagekit = new ImageKit({
    urlEndpoint: "https://ik.imagekit.io/bmjcjmfta",
    publicKey: "public_Rbir3GKcr4bIFefQYWpPO1HicDM=",
    privateKey: "private_WEKqN42sou4492BJRoUAYI0Cdeo="
});

// 프론트엔드에서 인증 서명을 요청할 API 주소
app.get('/api/imagekit-auth', function (req, res) {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
});

// 서버 실행 (3000번 포트)
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ ImageKit 인증 서버가 실행 중입니다.`);
    console.log(`👉 프론트엔드 설정용 인증 주소: http://localhost:${PORT}/api/imagekit-auth`);
});