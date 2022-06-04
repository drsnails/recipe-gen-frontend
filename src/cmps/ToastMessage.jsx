import { useEffect, useState } from 'react';
import { eventBusService } from '../services/eventBusService';
import Alert from '@mui/material/Alert';
import { v4 as uuidv4 } from 'uuid';

export default function ToastMessage() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const removeEvent = eventBusService.on('show-toast-message', onAddMessage);

        return removeEvent
    }, []);

    const onAddMessage = message => {
        message.id = uuidv4();
        setMessages(prevMessages => [message, ...prevMessages]);
        setTimeout(() => {
            setMessages(prevMessages =>
                prevMessages.filter(currMessage => currMessage.id !== message.id)
            );
        }, message.time || 4000);
    };

    return messages.length
        ? messages.map(({ txt, type }, idx) => (
            <Alert
                key={idx}
                style={{ top: `${50 * (idx + 1)}px` }}
                className={`toast-message`}
                severity={type}
            >
                {txt}
            </Alert>
        ))
        : null;
};
