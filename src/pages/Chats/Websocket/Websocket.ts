const newChatsSocket = () => {
  const chatsSocket = new WebSocket(
    "ws://lingvogo.acceleratorpracticum.ru/ws/chats/1/"
  );

  // chatsSocket.send("Here's some text that the server is urgently awaiting!");

  console.log(chatsSocket.readyState);

  chatsSocket.onopen = (event) => {
    console.log(chatsSocket.readyState);
    sendText();
  };

  function sendText() {
    // Construct a msg object containing the data the server needs to process the message from the chat client.
    const msg = {
      type: "chat_message",
      message: "document.getElementById.value",
      // id: clientID,
      // date: Date.now(),
    };

    // Send the msg object as a JSON-formatted string.
    chatsSocket.send(JSON.stringify(msg));

    // Blank the text input element, ready to receive the next line of text from the user.
    // document.getElementById("text").value = "";
  }

  chatsSocket.onmessage = (event) => {
    console.log(chatsSocket.readyState);
    console.log(event.data);
  };
  //
  // chatsSocket.close();
};

export default newChatsSocket;
