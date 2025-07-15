import { supabase } from './supabase.js';

const imgInput = document.getElementById('imgfile');
const captionInput = document.getElementById('caption');
const postBtn = document.getElementById('btn-post');
const feed = document.getElementById('feed');

// Handle post upload
postBtn.addEventListener('click', async () => {
  const file = imgInput.files[0];
  const caption = captionInput.value;

  if (!file) return alert('Please select an image');

  const user = (await supabase.auth.getUser()).data.user;

  const filename = `${Date.now()}-${file.name}`;
  const { error: uploadError } = await supabase.storage
    .from('posts')
    .upload(filename, file);

  if (uploadError) {
    console.error(uploadError);
    return alert('Upload failed');
  }

  const { data: { publicUrl } } = supabase.storage
    .from('posts')
    .getPublicUrl(filename);

  await supabase.from('posts').insert({
    user_id: user.id,
    caption,
    image_url: publicUrl,
    likes: 0
  });

  captionInput.value = '';
  alert('✅ Posted!');
  loadFeed(); // refresh
});

// Load feed
async function loadFeed() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  feed.innerHTML = '';
  data.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `
      <img src="${post.image_url}" />
      <p>${post.caption}</p>
      <span>👍 ${post.likes}</span>
    `;
    feed.appendChild(div);
  });
}

loadFeed();
