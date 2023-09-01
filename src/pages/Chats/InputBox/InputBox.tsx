import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import styles from './InputBox.module.scss';

interface InputBoxProps {
  sendMessage: (message: string) => void;
}

const InputBox: FC<InputBoxProps> = ({ sendMessage }) => {
  const [message, setMessage] = useState<string>('');

  const handleEnterDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      if (message.trim() !== '') {
        sendMessage(message);
        setMessage('');
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  // const handleEnterDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (event.key === 'Enter' && !event.shiftKey) {
  //     event.preventDefault();
  //     const form = document.getElementById(
  //       'message_input_form',
  //     ) as HTMLFormElement | null;
  //     if (form) {
  //       form.submit();
  //     }
  //   }
  // };

  return (
    <div className={styles.inputBox}>
      <form id='message_input_form'>
        <fieldset className={styles.inputBox__fieldset}>
          <div className={styles.inputBox__inputExtras}>
            <button
              className={styles.inputBox__emojiBtn}
              type='button'
            ></button>
            <button
              className={styles.inputBox__attachBtn}
              type='button'
            ></button>
          </div>
          <textarea
            className={styles.inputBox__input}
            onKeyDown={handleEnterDown}
            placeholder='Введите сообщение ...'
            value={message}
            onChange={handleInputChange}
          ></textarea>
          <button className={styles.inputBox__voiceBtn} type='button'></button>
        </fieldset>
      </form>
    </div>
  );
};

export default InputBox;
