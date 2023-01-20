import React from 'react';
import Input from '../input/Input';
import './ChatInput.styles.css';

const ChatInput = ({ onMessageSend, disabled }) => {
	const [message, setMessage] = React.useState('');
	const onChange = (e) => {
		setMessage(e.target.value);
	};

	const onSend = () => {
		onMessageSend(message);
		setMessage('');
	};

	return (
		<div className='chat-input mt-4 mb-2'>
			<div className='row pe-3'>
				<Input
					type='text'
					className='ch-input-field col-md-11'
					value={message}
					onChange={onChange}
					placeHolder='message'
					disabled={disabled}
				/>
				<button
					onClick={onSend}
					className='col-md-1 btn btn-primary ch-button'
					disabled={disabled}>
					Send
				</button>
			</div>
		</div>
	);
};

export default ChatInput;
