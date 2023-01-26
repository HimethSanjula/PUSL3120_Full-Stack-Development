import React from 'react';
import './ChatHeads.styles.css';

const ChatHeads = ({ chatHeads, selectedId, onSelect }) => {
	return (
		<div className='chat-heads-wrapper'>
			<h5>Chats</h5>
			<div className='chat-heads'>
				{Object.keys(chatHeads).length === 0 ? (
					<div className='no-chat-heads'>No chats yet</div>
				) : (
					Object.keys(chatHeads).map((key) => {
						const chatHead = chatHeads[key];
						return (
							<div
                key={key}
								className={`chat-head row justify-content-start my-1 ${
									selectedId === chatHead.sender
										? 'selected-chat-head'
										: ''
								}`}
								onClick={() => onSelect(chatHead)}>
								<span className='chat-header__icon col-md-2'>
									{chatHead.name[0]}
								</span>
								<span className='chat-head__name col-md-8'>
									{chatHead.name}
								</span>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};

export default ChatHeads;
