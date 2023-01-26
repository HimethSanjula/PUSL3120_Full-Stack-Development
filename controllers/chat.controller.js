const handleChat = async (ws, req, users, admins) => {
  // get headers
  const { from } = req.params;
  const [id, role, name] = from.split('_');
  console.log(name)
  if (role === 'admin') {
    admins[id] = ws;
  } else {
    // check if admin is online
    if (Object.keys(admins).length > 0) {
      users[id] = ws;
      sendMessage('Shoplaza','Shoplaza', ws, 'Hi Welcome');
    } else {
      sendMessage('Shoplaza','Shoplaza', ws, 'No admins online, Please try again');
      ws.close();
    }
  }

  ws.on('message', function (msg) {
    console.log(msg)
    const {to, message} = JSON.parse(msg);
    // if role is user send message to admins
    if (role === 'user') {
      Object.keys(admins).forEach((admin) => {
        sendMessage(id, name, admins[admin], message);
          // send same message back to sender
          sendMessage(id, name, ws, message);
      });
    } else {
      // if role is admin send message to user
      sendMessage(id, "Shoplaza", users[to], message);
    }

  });

  ws.on('close', function () {
    if (role === 'admin') {
      delete admins[id];
      // if no admins online, close all user connections
      if (Object.keys(admins).length === 0) {
        Object.keys(users).forEach((user) => {
        sendMessage('Shoplaza','Shoplaza', users[user], 'No admins online, Please try again.');

          users[user].close();
        });
      }
    }
  });
};

const sendMessage = async (sender, name, toWS, message) => {
  console.log({ sender, name, message })
  toWS.send(JSON.stringify({ sender, name, message }));
};

module.exports = {
  handleChat,
};
