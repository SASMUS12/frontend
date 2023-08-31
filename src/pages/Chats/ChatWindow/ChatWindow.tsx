import { FC } from 'react';
import IdleChat from '../../IdleChat/IdleChat';
import ActiveChat from '../ActiveChat/ActiveChat';

interface ChatWindowProps {
  isActive: boolean;
}

const ChatWindow: FC<ChatWindowProps> = ({ isActive }) => {
  return <>{isActive ? <ActiveChat /> : <IdleChat />}</>;
};

export default ChatWindow;
