// const  {socket}  = require("socket.io");

const socketIo = io();
const users = {}
const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const name = prompt("enter your name to join")
socketIo.emit('new-user-joined',name)
const BOT_MSGS = [
    "Hi, how are you?",
    "Ohh... I can't understand what you trying to say. Sorry!",
    "I like to play games... But I don't know how to play!",
    "Sorry if my answers are not relevant. :))",
    "I feel sleepy! :("
];

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "";
const PERSON_IMG = "";
const BOT_NAME = "BOT";
const PERSON_NAME = "Sajad";

msgerForm.addEventListener("submit", event => {
    event.preventDefault();
    const msgText = msgerInput.value;
    if (!msgText) return;
console.log(msgText);
socketIo.emit("message",{message:msgText})
    appendMessage("Me", PERSON_IMG, "right", msgText);
    msgerInput.value = "";
});

function appendMessage(name, img, side, text) {
    //   Simple solution for small apps
    const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url('https://buffer.com/library/content/images/2023/09/instagram-image-size.jpg')"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
}

function botResponse(message) {
    const r = random(0, BOT_MSGS.length - 1);
    const msgText = message
    const delay = msgText.split(" ").length * 100;

    setTimeout(() => {
        appendMessage("User", BOT_IMG, "left", msgText);
    }, delay);
}

// Utils
function get(selector, root = document) {
    return root.querySelector(selector);
}

function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();

    return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
socketIo.on("message", function(msg){
    console.log(msg);
     botResponse(msg.message);
})
