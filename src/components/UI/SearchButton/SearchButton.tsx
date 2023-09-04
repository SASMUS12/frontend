import { FC } from 'react';
import styles from './SearchButton.module.scss';

interface SearchButtonProps {
  onClick: () => void;
}

const SearchButton: FC<SearchButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick} type='button'></button>
  );
};

export default SearchButton;
