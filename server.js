
require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const difyApiKey = process.env.DIFY_API_KEY;

app.use(express.static('public'));

app.get('/api/dify', (req, res) => {
  // ここでDify APIを呼び出すロジックを実装します
  // この例では、APIキーが設定されているかどうかを確認するだけです
  if (difyApiKey) {
    res.json({ success: true, message: 'Dify API key is configured.' });
  } else {
    res.status(500).json({ success: false, message: 'Dify API key is not configured on the server.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
