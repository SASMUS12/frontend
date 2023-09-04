import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Input } from '../UI/Input/Input';
import ItemsOpenedList from '../UI/ItemsOpenedList/ItemsOpenedList';

import { Interest } from '../../utils/openapi';

import styles from './InputSearchList.module.scss';
import cn from 'classnames';

interface IPageName {
  itemsList: Interest[];
  selectedInterests: Interest[];
  setSelectedInterests: (item: Interest[]) => void;
}

const InputSearchList: FC<IPageName> = ({
  itemsList,
  selectedInterests,
  setSelectedInterests,
}: IPageName) => {
  const [isSearchListVisible, setSearchListVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredItems, setFilteredItems] = useState<Interest[]>([]);
  const [selectedItem, setSelectedItem] = useState<Interest | null>(null);
  const [lastPressedLetter, setLastPressedLetter] = useState<string | null>(
    null,
  );
  const [suggestedItems, setSuggestedItems] = useState<Interest[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<
    number | null
  >(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const i = 100;

  console.log(isSearchListVisible);
  console.log(searchValue);
  console.log(i);
  console.log(selectedInterests);

  useEffect(() => {
    setSelectedInterests(itemsList);
  }, [itemsList]);

  const handleInputValue = (event: any) => {
    const newSearchValue = event.value;
    console.log(newSearchValue);
    setSearchValue(newSearchValue);

    if (newSearchValue.length > 0) {
      setSearchListVisible(true);
    } else {
      setSearchListVisible(false);
    }

    const searchValueLower = newSearchValue.toLocaleLowerCase('ru');

    const filtered = itemsList.filter(
      (item) =>
        item.name.toLocaleLowerCase('ru').includes(searchValueLower) &&
        !selectedInterests.includes(item),
    );
    setFilteredItems(filtered);

    const suggested = itemsList.filter((item) =>
      item.name.toLocaleLowerCase('ru').startsWith(searchValueLower),
    );
    setSuggestedItems(suggested);

    const firstLetter =
      searchValueLower.length > 0 ? searchValueLower.charAt(0) : null;
    setLastPressedLetter(firstLetter);

    if (event.key === 'Enter') {
      event.preventDefault();
      if (!selectedInterests.includes(newSearchValue)) {
        handleSelectItem({ name: newSearchValue, sorting: '' });
        console.log(newSearchValue);
      }
      if (selectedItem) {
        handleSelectItem(selectedItem);
      }
    }

    const isInvalidSearch =
      searchValue.length > 0 && filtered.length === 0 && suggested.length === 0;

    setIsError(isInvalidSearch);
    setErrorMessage(errorMessage);

    setSearchListVisible(filtered.length > 0 && newSearchValue.length > 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) => {
        if (prevIndex === null) {
          return 0;
        } else if (prevIndex < suggestedItems.length - 1) {
          return prevIndex + 1;
        } else {
          return prevIndex;
        }
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) => {
        if (prevIndex === null) {
          return suggestedItems.length - 1;
        } else if (prevIndex > 0) {
          return prevIndex - 1;
        } else {
          return prevIndex;
        }
      });
    } else if (e.key === 'Enter') {
      e.preventDefault();

      const inputElement = e.target as HTMLInputElement;
      handleSelectItem({ name: inputElement.value, sorting: '' });
      console.log(inputElement.value);
      if (selectedItem) {
        handleSelectItem(selectedItem);
      }
    }
  };

  const handleDropdownKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) => {
        if (prevIndex === null) {
          return 0;
        } else if (prevIndex < suggestedItems.length - 1) {
          return prevIndex + 1;
        } else {
          return prevIndex;
        }
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) => {
        if (prevIndex === null) {
          return suggestedItems.length - 1;
        } else if (prevIndex > 0) {
          return prevIndex - 1;
        } else {
          return prevIndex;
        }
      });
    } else if (e.key === 'Enter') {
      e.preventDefault();

      const inputElement = e.target as HTMLInputElement;
      handleSelectItem({ name: inputElement.value, sorting: '' });
      console.log(inputElement.value);
      if (selectedItem) {
        handleSelectItem(selectedItem);
      }
    }
  };

  const sortItemsByLastLetter = () => {
    if (lastPressedLetter) {
      return filteredItems.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (
          nameA.startsWith(lastPressedLetter) &&
          !nameB.startsWith(lastPressedLetter)
        ) {
          return -1;
        }
        if (
          !nameA.startsWith(lastPressedLetter) &&
          nameB.startsWith(lastPressedLetter)
        ) {
          return 1;
        }
        return nameA.localeCompare(nameB);
      });
    } else {
      return filteredItems;
    }
  };

  const handleSelectItem = (item: Interest) => {
    if (selectedInterests.length < i && !selectedInterests.includes(item)) {
      const updatedSelectedItems = [...selectedInterests, item];
      setSelectedInterests(updatedSelectedItems);
      setSelectedItem(item);
      setSearchListVisible(false);
      setSearchValue('');
    }
  };

  const handleSelectItemFromList = (itemName: string) => {
    const selectedItem = itemsList.find(
      (item) => item.name.toLocaleLowerCase('ru') === itemName,
    );
    if (selectedItem) {
      handleSelectItem(selectedItem);
    }
  };

  return (
    <>
      <Input
        className={styles.interests__input}
        type='search'
        name='interest'
        value={searchValue}
        fontSize='16'
        placeholder='Путешествия'
        isLabelHintHidden={true}
        onValue={(event) => handleInputValue(event)}
        onKeyDown={handleKeyDown}
        autoComplete='off'
      />
      <div className={cn(styles.items, styles.items_668)}>
        {isSearchListVisible && (
          <div
            className={cn(styles.items__itemsList, {
              [styles.items__itemsList_visible]:
                sortItemsByLastLetter().length > 0,
            })}
            onKeyDown={handleDropdownKeyDown}
          >
            {sortItemsByLastLetter().map((item, index) =>
              item && item.name ? (
                <div
                  key={index}
                  onClick={() =>
                    handleSelectItemFromList(item.name.toLocaleLowerCase('ru'))
                  }
                  className={styles.items__itemsList_option}
                >
                  {item.name}
                </div>
              ) : null,
            )}
          </div>
        )}
        <div
          className={cn(
            styles.items__selectedItems,
            styles.items__selectedItems_gap16,
          )}
        >
          <ItemsOpenedList
            selectedItems={selectedInterests}
            setSelectedItems={setSelectedInterests}
          />
        </div>
      </div>
    </>
  );
};

export default observer(InputSearchList);
