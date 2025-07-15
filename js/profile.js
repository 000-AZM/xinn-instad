import { supabase } from './supabase.js';

const usernameEl = document.getElementById('username');
const emailEl = document.getElementById('email');
const postsEl = document.getElementById('my-posts');

(async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return (location.href = 'index.html');

  usernameEl.textContent = '@' + user.user_metadata?.username || user.email.split('@')[0];
  emailEl.textContent = user.email;

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  postsEl.innerHTML = '';
  data.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `
      <img src="${post.image_url}" />
      <p>${post.caption}</p>
      <span>👍 ${post.likes}</span>
    `;
    postsEl.appendChild(div);
  });
})();

window.editProfile = () => {
  alert('Edit profile feature coming soon!');
};
