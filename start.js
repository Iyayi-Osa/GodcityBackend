require('dotenv').config();
const app = require('./app');
const serverless = require('serverless-http');

const PORT = process.env.PORT || 4030;

app.listen(PORT, async () => {
  console.log(`Backend Listening on: ${PORT}`);
});

module.exports.handler = serverless(app)
