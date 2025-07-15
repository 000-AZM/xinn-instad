import { supabase } from './supabase.js';

const chatBox = document.getElementById('chat-box');
const msgInput = document.getElementById('message');
const sendBtn = document.getElementById('send');

let currentUser;

(async () => {
  const { data: authData } = await supabase.auth.getUser();
  currentUser = authData?.user;
  if (!currentUser) location.href = 'index.html';

  loadMessages();
  listenToMessages();
})();

async function loadMessages() {
  const { data } = await supabase
    .from('messages')
    .select('*')
    .order('created_at');

  chatBox.innerHTML = '';
  data.forEach(msg => {
    const div = document.createElement('div');
    div.className = msg.sender === currentUser.id ? 'msg self' : 'msg';
    div.textContent = msg.text;
    chatBox.appendChild(div);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.onclick = async () => {
  const text = msgInput.value.trim();
  if (!text) return;

  await supabase.from('messages').insert({
    sender: currentUser.id,
    text
  });

  msgInput.value = '';
};

function listenToMessages() {
  supabase
    .channel('public:messages')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, loadMessages)
    .subscribe();
}
