import React, { useState, useCallback, useEffect, useContext } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import ChatWindow from '../../components/shared/chat-window/ChatWindow';
import MainLayout from '../../layouts/MainLayout';
import { AuthContext } from '../../store/auth';
import constants from '../../utils/constants';

const Chat = () => {
	const { getUser } = useContext(AuthContext);
	const user = getUser();
	const socket_url = `${constants.socketURL}/chat/${user.id}_${user.role}_${user.name}`;

	const [messageHistory, setMessageHistory] = useState([]);
	const { sendMessage, lastMessage, readyState } = useWebSocket(socket_url, {
		shouldReconnect: (closeEvent) => false
	});

	useEffect(() => {
		if (lastMessage !== null) {
			// add last message to message history
			setMessageHistory((prev) => [...prev, lastMessage]);
		}
	}, [lastMessage, setMessageHistory]);

	const handleClickSendMessage = useCallback(
		(message) =>
			sendMessage(JSON.stringify({ to: 'admin', message: message })),
			// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const connectionStatus = {
		[ReadyState.CONNECTING]: 'Connecting',
		[ReadyState.OPEN]: 'Connected',
		[ReadyState.CLOSING]: 'Closing',
		[ReadyState.CLOSED]: 'Closed',
		[ReadyState.UNINSTANTIATED]: 'Uninstantiated'
	}[readyState];

	return (
		<MainLayout>
			<div className='container my-3' style={{ height: '80vh' }}>
				<h1>Chat</h1>
				<span>
					Your are :{' '}
					{connectionStatus === 'Connecting'
						? connectionStatus
						: connectionStatus !== 'Connected'
						? 'Shop is offline, Please try again'
						: connectionStatus}
				</span>
				<br />

				<div>
					<ChatWindow
						userId={user.id}
						onSendMessage={handleClickSendMessage}
						messages={messageHistory}
						name='ShopLaza'
						role={user.role}
						isDisabled={connectionStatus !== 'Connected'}
					/>
				</div>
			</div>
		</MainLayout>
	);
};

export default Chat;
