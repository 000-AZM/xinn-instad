<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Xinn Lab – Chat</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <nav class="md-navbar">
    <div class="brand">Xinn Lab</div>
    <div class="md-nav-links">
      <a href="home.html">🏠</a>
      <a href="explore.html">🔍</a>
      <a href="profile.html">👤</a>
      <a href="chat.html">💬</a>
      <a href="settings.html">⚙️</a>
    </div>
  </nav>

  <div class="container">
    <h2>💬 Direct Chat</h2>
    <div id="chat-box" class="chat-box"></div>
    <input id="message" type="text" placeholder="Type a message..." />
    <button id="send">Send</button>
  </div>

  <script type="module" src="js/chat.js"></script>
</body>
</html>
