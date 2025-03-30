
export default function handler(req, res) {
  // 카카오 챗봇은 POST로 요청을 보냅니다.
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  sendToGAS();

  // 요청 body 받기
  const body = req.body;

  // 로그 찍기 (Vercel dashboard > Logs 에서 확인 가능)
  console.log("카카오 요청 수신:", JSON.stringify(body));

  const response = {
  version: "2.0",
  template: {
    outputs: [
      {
        simpleText: {
          text: "처리가 완료되었습니다. 다음 단계로 이동합니다."
        }
      }
    ]
  }
};

  return res.status(200).json(response);
}

async function sendToGAS() {
  const url = 'https://script.google.com/macros/s/AKfycbzdtMEySQC6--sVaaRB_LjlDqMXlmo42LH3hp-ennB7NulTxXEAhl5G9Owh1tyorfza/exec';

  const payload = {
    message: 'Node.js에서 fetch 사용',
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  console.log('응답:', result);
}
