const loginForm = document.querySelector('.form');
let email = document.getElementById('email-input');
let password = document.getElementById('password-input');
const logbtn = document.querySelector('.login');

const loginButton = document.querySelector('.submit');

const loginUser = async (email, password) => {
  const res = await axios.post('http://127.0.0.1:8000/api/v1/user/login', {
    email: email,
    password: password,
  });

  //   console.log(res.data.status);
  if (res.data.status === 'success') {
    // alert('You have logged in!!');

    logbtn.addEventListener('click', (e) => {});
    location.assign('/');
  } else alert('Invalid email or password');
};

loginButton.addEventListener('click', (e) => {
  e.preventDefault();
  email = email.value;
  password = password.value;

  loginUser(email, password);
  console.log('clicked');
  logbtn.style.visibility = 'hidden';
});
