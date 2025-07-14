// js/chat.js
import { db, auth } from './firebase.js';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

auth.onAuthStateChanged(user => {
  if (!user) location = 'index.html';
  else listen();
});

function listen() {
  const chatbox = document.getElementById('chatbox');
  const q = query(collection(db, 'chats'), orderBy('ts'));

  onSnapshot(q, snapshot => {
    chatbox.innerHTML = '';
    snapshot.forEach(doc => {
      const m = doc.data();
      const div = document.createElement('div');
      div.className = 'bubble';
      div.textContent = `${m.from === auth.currentUser.uid ? 'Me' : 'Them'}: ${m.msg}`;
      chatbox.appendChild(div);
    });
    chatbox.scrollTop = chatbox.scrollHeight; // auto-scroll to bottom
  });
}

document.getElementById('btn-send').onclick = async () => {
  const msgInput = document.getElementById('msg');
  const msg = msgInput.value.trim();
  if (!msg) return;

  try {
    await addDoc(collection(db, 'chats'), {
      from: auth.currentUser.uid,
      msg,
      ts: serverTimestamp()
    });
    msgInput.value = '';
  } catch (e) {
    alert('Error sending message: ' + e.message);
  }
};
