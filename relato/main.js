// main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  databaseURL: "https://TU_PROJECT_ID.firebaseio.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROJECT_ID.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

if (typeof pageId === 'undefined') {
  throw new Error('La variable pageId no está definida en la página');
}

const commentsRef = ref(db, 'comments/' + pageId);

const commentList = document.getElementById('comment-list');
onChildAdded(commentsRef, (data) => {
  const comment = data.val();
  const commentEl = document.createElement('div');
  commentEl.classList.add('comment');
  commentEl.innerHTML = `<strong>${comment.name}</strong><p>${comment.message}</p>`;
  commentList.appendChild(commentEl);
});

const form = document.getElementById('comment-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const message = form.message.value.trim();

  if (name && message) {
    push(commentsRef, { name, message });
    form.reset();
  }
});
