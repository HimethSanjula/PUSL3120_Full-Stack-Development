import React from 'react';
import ChatBubble from '../chat-bubble/ChatBubble';
import ChatInput from '../chat-input/ChatInput';
import './ChatWindow.styles.css'

const ChatWindow = ({ userId, name, role, messages, onSendMessage, isAdmin = false, isDisabled}) => {
	return (
		<div className='chat-window-wrapper'>
			{/* render messages  */}
      <div className="chat-header row align-items-center">
      <div className='chat-header__icon ms-4 me-3'>{name[0]}</div> {name}
      </div>
      <div className='chat-window'>
			{messages.map((message, index) => {
        const messageData = isAdmin ? message: JSON.parse(message.data);
				return (
					<ChatBubble
						key={index}
						name={messageData.name}
						isOwn={messageData.sender === userId}
						message={messageData.message}
					/>
				);
			})}
    </div>
      <ChatInput onMessageSend={onSendMessage} disabled={isDisabled}/>
		</div>
	);
};

export default ChatWindow;
