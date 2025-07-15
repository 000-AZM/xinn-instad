import { supabase } from './supabase.js';

const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');

document.getElementById('btn-register')?.addEventListener('click', async () => {
  if (!email.value.endsWith('@xinn.lab')) {
    return alert('Only @xinn.lab emails allowed');
  }

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: { data: { username: username.value } }
  });

  if (error) return alert(error.message);

  await supabase.from('users').insert({
    email: email.value,
    username: username.value,
    avatar_url: ''
  });

  location = 'home.html';
});

document.getElementById('btn-login')?.addEventListener('click', async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  });
  if (error) return alert(error.message);
  location = 'home.html';
});
