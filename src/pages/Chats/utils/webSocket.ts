const chatSocket = (message: string) => {
  const socket = new WebSocket(
    'ws://lingvogo.acceleratorpracticum.ru/ws/chats/1/',
  );

  socket.onopen = (e) => {
    const msg = {
      type: 'chat_message',
      message,
    };

    try {
      socket.send(JSON.stringify(msg));
    } catch (error) {
      console.log(`SENDING FAILED: ${error}`);
    }
  };

  socket.onerror = (error) => {
    console.error(`Не сегодня:( WEBSOCKET ERROR: ${error}`);
  };
};

export default chatSocket;
