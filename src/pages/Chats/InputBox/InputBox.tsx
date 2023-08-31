import { KeyboardEvent } from 'react';
import styles from './InputBox.module.scss';

const InputBox = () => {
  const handleEnterDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      const form = document.getElementById(
        'message_input_form',
      ) as HTMLFormElement | null;
      if (form) {
        form.submit();
      }
    }
  };

  return (
    <div className={styles.inputBox}>
      <form id='message_input_form'>
        <fieldset className={styles.inputBox__fieldset}>
          <div className={styles.inputBox__inputExtras}>
            <button className={styles.inputBox__emojiBtn}></button>
            <button className={styles.inputBox__attachBtn}></button>
          </div>
          <textarea
            className={styles.inputBox__input}
            onKeyDown={handleEnterDown}
            placeholder='Введите сообщение ...'
          ></textarea>
          <button className={styles.inputBox__voiceBtn}></button>
        </fieldset>
      </form>
    </div>
  );
};

export default InputBox;
