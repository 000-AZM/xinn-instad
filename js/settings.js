import { supabase } from './supabase.js';

document.getElementById('logout').onclick = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) return alert('Error logging out');
  location.href = 'index.html';
};

document.getElementById('delete').onclick = async () => {
  const confirmDelete = confirm('Are you sure you want to permanently delete your account?');
  if (!confirmDelete) return;

  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  if (!user) return;

  // 1. Delete user's posts
  await supabase.from('posts').delete().eq('user_id', user.id);

  // 2. Delete user profile
  await supabase.from('users').delete().eq('email', user.email);

  // 3. (Manual Step) Delete user from Supabase Auth — not allowed directly via client

  alert('✅ Posts and profile deleted.\n❗️ Now please delete account manually in Supabase Auth.');
  await supabase.auth.signOut();
  location.href = 'index.html';
};
