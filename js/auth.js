// js/auth.js
import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

document.getElementById('btn-register').onclick = async () => {
  const email = document.getElementById('email').value.trim();
  const pw = document.getElementById('password').value;

  if (!email.endsWith('@xinn.lab')) {
    alert("Only emails ending with @xinn.lab are allowed.");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, pw);
    location = 'home.html';
  } catch (e) {
    alert(e.message);
  }
};

document.getElementById('btn-login').onclick = async () => {
  const email = document.getElementById('email').value.trim();
  const pw = document.getElementById('password').value;

  try {
    await signInWithEmailAndPassword(auth, email, pw);
    location = 'home.html';
  } catch (e) {
    alert(e.message);
  }
};
