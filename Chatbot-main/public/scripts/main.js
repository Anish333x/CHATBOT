let today = new Date();
let date =
  today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
let time = today.getHours() + ':' + today.getMinutes();

document.getElementById('msg-info-time').innerHTML = date + '|' + time;

const msgerForm = get('.mesger-input-area');
const msgerInput = get('.msger-input');
const msgerChat = get('.mesger-chat');

// Icons made by Freepik from www.flaticon.com
const BOT_IMG =
  'https://www.bing.com/th/id/OGC.7d9b1d662b28cd365b33a01a3d0288e1?pid=1.7&rurl=https%3a%2f%2fcdn.dribbble.com%2fusers%2f37530%2fscreenshots%2f2937858%2fdrib_blink_bot.gif&ehk=1yjNTYFN6fWsTeZWeFa%2f99z2a3HPdxXf9AvD0rhixvU%3d';
const PERSON_IMG =
  'https://th.bing.com/th/id/OIP.tUQUao6VkI8Jf-hjQ_kUCwHaHa?w=179&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7';
const BOT_NAME = 'ChatBot';
const PERSON_NAME = 'You';

msgerForm.addEventListener('click', (event) => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, 'right', msgText);
  msgerInput.value = msgText;
  // botResponse(msgText);
});

function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
<div class="msg ${side}-msg">
<div class="msg-img" style="background-image: url(${img})" ></div>
<div class="msg-bubble">
<div class="msg-info">
  <div class="msg-info-name">${name}</div>
  <div class="msg-info-time">${formatDate(new Date())}</div>
</div>
<div class="msg-text">${text}</div>
</div>
</div>`;

  msgerChat.insertAdjacentHTML('beforeend', msgHTML);
  msgerChat.scrollTop += 500;
}

// function botResponse(rawText) {
//   // Bot Response
//   $.get("/get", { msg: rawText }).done(function (data) {
//     console.log(rawText);
//     console.log(data);
//     const msgText = data;
//     appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
//   });
// }

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = '0' + date.getHours();
  const m = '0' + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

// Mobile Menu button
const menuBtn = document.querySelector('.menu-btn');
const navItems = document.querySelector('.nav-items');

menuBtn.addEventListener('click', (event) => {
  navItems.classList.toggle('mobile-menu');
});

// For login
let toogle = false;

const loginPage = document.querySelector('.login__page');
const login = document.querySelector('.login');
// if user{
login.addEventListener('click', (event) => {
  event.preventDefault();
  if (toogle === false) {
    loginPage.style.visibility = 'visible';

    toogle = true;
  } else if (toogle === true) {
    loginPage.style.visibility = 'hidden';
    toogle = false;
  }
});
// }
// For chat window

const button = document.querySelector('.show-button');
const chatWindow = document.querySelector('.message-window');

button.addEventListener('click', (event) => {
  event.preventDefault();
  // console.log("Clicked");
  if (toogle === false) {
    chatWindow.style.visibility = 'visible';

    toogle = true;
  } else if (toogle === true) {
    chatWindow.style.visibility = 'hidden';

    toogle = false;
  }
});

// For focus on email
document.querySelector('#ln').onclick = function () {
  document.querySelector('.email').focus();
};
