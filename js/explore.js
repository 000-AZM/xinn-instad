import { supabase } from './supabase.js';

const searchInput = document.getElementById('search');
const userList = document.getElementById('user-list');
const postGrid = document.getElementById('explore-posts');

searchInput.addEventListener('input', async () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return userList.innerHTML = '';

  const { data } = await supabase
    .from('users')
    .select('*')
    .ilike('username', `%${query}%`);

  userList.innerHTML = '';
  data.forEach(user => {
    const div = document.createElement('div');
    div.className = 'user-card';
    div.innerHTML = `
      <p>👤 <b>${user.username}</b> - ${user.email}</p>
    `;
    userList.appendChild(div);
  });
});

async function loadPosts() {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  postGrid.innerHTML = '';
  data.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `
      <img src="${post.image_url}" />
      <p>${post.caption}</p>
      <span>👍 ${post.likes}</span>
    `;
    postGrid.appendChild(div);
  });
}

loadPosts();
