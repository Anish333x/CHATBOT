exports.getHomePage = (req, res, next) => {
  res.render('index.html');
};

exports.getLoginPage = (req, res, next) => {
  res.render('login');
};
