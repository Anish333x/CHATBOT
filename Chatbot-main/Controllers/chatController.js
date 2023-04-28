const fetch = require('node-fetch');

exports.chat = async (req, res) => {
  const response = await fetch(
    `http://${process.env.HOST}:${process.env.FLASK_PORT}/chat`,
    {
      method: 'post',
      body: JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' },
    }
  );
  console.log(response);
  const data = await response.json();
  console.log(data);

  res.status(200).json({
    status: 'success',
    message: 'chat is up and running',
    data,
  });
};
