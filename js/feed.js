// js/feed.js
import { db, auth } from './firebase.js';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

auth.onAuthStateChanged(user => {
  if (!user) location = 'index.html';
  else loadFeed();
});

function loadFeed() {
  const feed = document.getElementById('feed');
  const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));

  onSnapshot(q, snapshot => {
    feed.innerHTML = '';
    snapshot.forEach(docSnap => {
      const post = docSnap.data();
      const postId = docSnap.id;
      const userId = auth.currentUser.uid;
      const liked = post.likes?.includes(userId);

      const div = document.createElement('div');
      div.className = 'post';
      div.innerHTML = `
        <img src="${post.imgURL}" />
        <p>${post.caption}</p>
        <span class="like" style="color:${liked ? '#004a99' : '#007bff'}; cursor:pointer;">
          ❤️ ${post.likes?.length || 0}
        </span>
      `;

      div.querySelector('.like').onclick = async () => {
        const postRef = doc(db, 'posts', postId);
        if (liked) {
          await updateDoc(postRef, {
            likes: arrayRemove(userId)
          });
        } else {
          await updateDoc(postRef, {
            likes: arrayUnion(userId)
          });
        }
      };

      feed.appendChild(div);
    });
  });
}
