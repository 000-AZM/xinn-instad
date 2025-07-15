import { supabase } from './supabase.js';

export async function uploadPost(file, caption) {
  if (!file) {
    alert('Please select an image.');
    return;
  }

  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  if (!user) {
    alert('You must be logged in.');
    return;
  }

  const filename = `${Date.now()}-${file.name}`;
  const { error: uploadError } = await supabase.storage
    .from('posts')
    .upload(filename, file);

  if (uploadError) {
    console.error(uploadError);
    alert('Image upload failed');
    return;
  }

  const { data: urlData } = supabase.storage
    .from('posts')
    .getPublicUrl(filename);

  const { error: insertError } = await supabase.from('posts').insert({
    user_id: user.id,
    caption,
    image_url: urlData.publicUrl,
    likes: 0
  });

  if (insertError) {
    console.error(insertError);
    alert('Post failed to save');
    return;
  }

  alert('✅ Post uploaded!');
}
