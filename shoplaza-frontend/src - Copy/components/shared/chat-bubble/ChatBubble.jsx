import React from 'react';
import './ChatBubble.styles.css';

const ChatBubble = ({ name, isOwn, message }) => {
	return (
		<div className={`row ${isOwn ? 'chat-row-own' : 'chat-bubble-recive'}`}>
			<div className='d-flex align-items-center'>
				{!isOwn && <div className='chat-bubble__icon'>{name[0]}</div>}
				<div
					className={`chat-bubble ${
						isOwn ? 'chat-bubble-send' : 'chat-bubble-recive'
					}`}>
					{/* rounder icon with first letter of the name */}
					<div className='chat_bubble__name'>{name}</div>
					<div className='chat_bubble__message'>{message}</div>
				</div>
				{isOwn && <div className='chat-bubble__icon'>{name[0]}</div>}
			</div>
		</div>
	);
};

export default ChatBubble;
