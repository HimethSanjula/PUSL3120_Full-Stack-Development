import React, { useState, useEffect, useContext } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import ChatHeads from '../../components/admin/chat-heads/ChatHeads';
import ChatWindow from '../../components/shared/chat-window/ChatWindow';
import AdminLayout from '../../layouts/AdminLayout';
import { AuthContext } from '../../store/auth';
import constants from '../../utils/constants';

const AdminChatRoom = () => {
	const { getUser } = useContext(AuthContext);
	const user = getUser();
	
	const [chats, setChats] = useState({});
	const [selectedChat, setSelectedChat] = useState(null);
	
	const socket_url = `${constants.socketURL}/chat/${user.id}_${user.role}_${user.name}`;
	const { sendMessage, lastMessage, readyState } = useWebSocket(socket_url, {
		shouldReconnect: (closeEvent) => false,
		share: true
	});

	useEffect(() => {
		if (lastMessage !== null) {
			const { sender, message, name } = JSON.parse(lastMessage.data);
			setChats((prev) => ({
				...prev,
				[sender]: prev[sender]
					? {
							...prev[sender],
							messages: [
								...prev[sender].messages,
								{ sender, message, name }
							]
					  }
					: {
							messages: [{ sender, message, name }],
							name: name,
							sender: sender
					  }
			}));

			if (selectedChat?.sender === sender) {
				setSelectedChat((prev) => ({
					...prev,
					messages: [
						...prev.messages,
						{ sender, message, name }
					]
				}));
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastMessage, setChats]);

	const onSelect = (chat) => {
		setSelectedChat(chat);
	};

	const onSendMessage = (message) => {
		sendMessage(
			JSON.stringify({
				to: selectedChat?.sender,
				message
			})
		);
		const updatedMessagess = selectedChat?.messages.concat({
			sender: 'admin',
			message,
			name: "Shoplaza"
		})
		setChats((prev) => ({
			...prev,
			[selectedChat?.sender]: {...selectedChat, messages: [...updatedMessagess]}
		}));
		setSelectedChat((prev) => ({
			...prev,
			messages: [...updatedMessagess]
		}));
	};
	const connectionStatus = {
		[ReadyState.CONNECTING]: 'Connecting',
		[ReadyState.OPEN]: 'Connected',
		[ReadyState.CLOSING]: 'Closing',
		[ReadyState.CLOSED]: 'Closed',
		[ReadyState.UNINSTANTIATED]: 'Uninstantiated'
	}[readyState];
	return (
		<AdminLayout>
			<div>
				<h1>Admin Chat Room</h1>
				<br />
				<span>Your are : {connectionStatus}</span>

				<div className='container'>
					<div className='row'>
						<div className='col-md-3'>
							<ChatHeads chatHeads={chats} onSelect={onSelect} selectedId={selectedChat?.sender || ""}/>
						</div>
						<div className='col-md-9'>
							<ChatWindow
								isAdmin={true}
								messages={selectedChat?.messages || []}
								name={selectedChat?.name || 'Select a chat'}
								userId="admin"
								onSendMessage={onSendMessage}
								isDisabled={selectedChat === null}
							/>
						</div>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
};

export default AdminChatRoom;
