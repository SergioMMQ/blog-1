// Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBGNZy7hV1jqzlnJaap7Vzm-SNRVsie4fw",
  authDomain: "blog-1-5ec55.firebaseapp.com",
  projectId: "blog-1-5ec55",
  storageBucket: "blog-1-5ec55.firebasestorage.app",
  messagingSenderId: "545720563361",
  appId: "1:545720563361:web:f296d6285daa51255a62e0",
  measurementId: "G-DH3W251YDP",
  databaseURL: "https://blog-1-5ec55-default-rtdb.firebaseio.com"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Mostrar comentarios existentes
const commentList = document.getElementById('comment-list');
onChildAdded(ref(db, 'comments'), (snapshot) => {
  const comment = snapshot.val();
  const div = document.createElement('div');
  div.className = 'comment';
  div.innerHTML = `<strong>${comment.name}</strong><p>${comment.message}</p>`;
  commentList.appendChild(div);
});

// Guardar nuevos comentarios
document.getElementById('comment-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name && message) {
    push(ref(db, 'comments'), { name, message });
    e.target.reset();
  }
});
