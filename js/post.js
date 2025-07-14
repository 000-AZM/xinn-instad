// js/post.js
import { db, storage, auth } from './firebase.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js";

document.getElementById('btn-post').onclick = async () => {
  const file = document.getElementById('imgfile').files[0];
  const caption = document.getElementById('caption').value.trim();

  if (!file) {
    alert('Please select an image');
    return;
  }

  try {
    const storageRef = ref(storage, 'posts/' + Date.now() + '_' + file.name);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, 'posts'), {
      uid: auth.currentUser.uid,
      imgURL: url,
      caption,
      timestamp: serverTimestamp(),
      likes: []
    });

    document.getElementById('caption').value = '';
    alert('Post uploaded!');
  } catch (e) {
    alert('Error uploading post: ' + e.message);
  }
};
