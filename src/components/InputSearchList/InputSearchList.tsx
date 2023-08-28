import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";

import {Input} from "../UI/Input/Input";

import styles from "./InputSearchList.module.scss";
import classNames from "classnames";
import cn from "classnames";
import {Interest, Language, SkillLevelEnum} from "../../utils/openapi";

const InputSearchList = ({
                             pageName,
                             data,
                             dataList,
                             onSelectedItemsChange
                         }) => {
    const [isSearchListVisible, setSearchListVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [filteredItems, setFilteredItems] = useState<Interest[]>([]);
    const [selectedItem, setSelectedItem] = useState<Interest | null>(null);
    const [lastPressedLetter, setLastPressedLetter] = useState<string | null>(null);
    const [suggestedItems, setSuggestedItems] = useState([]);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number | null>(null);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedItems, setSelectedItems] = useState<Interest[]>([]);

    const i = data === "countries"
        ? pageName === "Sort" ? 5 : 1
        : 100;

    console.log(isSearchListVisible);
    console.log(searchValue);
    console.log(i);
    console.log(selectedItems);

    useEffect(() => {
        setSelectedItems(dataList);
    }, [dataList]);

    const handleInputValue = (event) => {
        const newSearchValue = event.value;
        console.log(newSearchValue);
        setSearchValue(newSearchValue);

        if (newSearchValue.length > 0) {
            setSearchListVisible(true);
        } else {
            setSearchListVisible(false);
        }

        const searchValueLower = newSearchValue.toLocaleLowerCase('ru');

        const filtered = dataList.filter((item) =>
            item.name.toLocaleLowerCase('ru').includes(searchValueLower) && !selectedItems.includes(item)
        );
        setFilteredItems(filtered);

        const suggested = dataList.filter((item) =>
            item.name.toLocaleLowerCase('ru').startsWith(searchValueLower)
        );
        setSuggestedItems(suggested);

        const firstLetter = searchValueLower.length > 0 ? searchValueLower.charAt(0) : null;
        setLastPressedLetter(firstLetter);

        const isInvalidSearch = searchValue.length > 0 && filtered.length === 0 && suggested.length === 0;

        const errorMessage = isInvalidSearch
            ? data === "countries"
                ? 'Страны не существует, возможно ошибка'
                : ''
            : ''

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
            if (data === "countries" && selectedSuggestionIndex !== null) {
                handleSelectItem(suggestedItems[selectedSuggestionIndex]);
            } else if (data === "interests") {
                handleSelectItem({name: e.target.value});
                console.log(e.target.value);
            } else if (selectedItem) {
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
            if (data === "countries" && selectedSuggestionIndex !== null) {
                handleSelectItem(suggestedItems[selectedSuggestionIndex]);
            } else if (data === "interests") {
                handleSelectItem({name: e.target.value});
                console.log(e.target.value);
            } else if (selectedItem) {
                handleSelectItem(selectedItem);
            }
        }
    };

    const sortItemsByLastLetter = () => {
        if (lastPressedLetter) {
            return filteredItems.sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if (nameA.startsWith(lastPressedLetter) && !nameB.startsWith(lastPressedLetter)) {
                    return -1;
                }
                if (!nameA.startsWith(lastPressedLetter) && nameB.startsWith(lastPressedLetter)) {
                    return 1;
                }
                return nameA.localeCompare(nameB);
            });
        } else {
            return filteredItems;
        }
    };

    const handleSelectItem = (item) => {
        if (selectedItems.length < i && !selectedItems.includes(item)) {
            const updatedSelectedItems = [...selectedItems, item];
            setSelectedItems(updatedSelectedItems);
            setSelectedItem(item);
            setSearchListVisible(false);
            setSearchValue('');
            // onSortCountry(country);

            onSelectedItemsChange(updatedSelectedItems)

        }
    };

    const handleSelectItemFromList = (itemName: string) => {
        const selectedItem = dataList.find(item => item.name.toLocaleLowerCase('ru') === itemName);
        if (selectedItem) {
            handleSelectItem(selectedItem);
        }
    };

    const handleRemoveItem = (item) => {
        const updatedItems = selectedItems.filter((c) => c.name !== item.name);
        setSelectedItems(updatedItems);
    };

    return (
        <>
            {data === "interests" &&
                <Input
                    className={styles.interests__input}
                    type="search"
                    name="interest"
                    value={searchValue}
                    fontSize="16"
                    placeholder="Путешествия"
                    isLabelHintHidden={true}
                    onValue={(event) => handleInputValue(event)}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                />
            }
            {data === "countries" &&
                <>
                    <Input
                        className={`${styles.country__input} ${isSearchListVisible ? styles.country__input_showSuggestions : ''}`}
                        type="search"
                        name="country"
                        value={searchValue}
                        fontSize={pageName === "FillOutProfile2" ? "16" : "14"}
                        isLabelHintHidden={true}
                        placeholder="Начните вводить название"
                        onValue={(event) => handleInputValue(event)}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                    />
                    {isError && (
                        <span className={styles.country__input_error}>{errorMessage}</span>
                    )}
                </>
            }
            <div className={cn(styles.items, data === "countries" ? styles.items_296 : styles.items_668)}>
                {(isSearchListVisible &&
                    <div
                        className={cn(
                            styles.items__itemsList,
                            {[styles.items__itemsList_visible]: sortItemsByLastLetter().length > 0,}
                        )}
                        onKeyDown={handleDropdownKeyDown}
                    >
                        {sortItemsByLastLetter().map((item, index) => (
                            item && item.name ? (
                                <div
                                    key={index}
                                    onClick={() => handleSelectItemFromList(item.name.toLocaleLowerCase('ru'))}
                                    className={classNames(styles.items__itemsList_option, {
                                        [styles.selected]: selectedItem?.code === item.code,
                                        [styles.suggested]: suggestedItems.includes(item),
                                    })}
                                >
                                    <img
                                        src={item.flag_icon}
                                        alt={`${item.name} Flag`}
                                        className={data === "countries" ? styles.items__itemsList_flagImage : styles.items__itemsList_flagImage_hidden}
                                    />
                                    {item.name}
                                </div>
                            ) : null
                        ))}
                    </div>
                )}
                <div
                    className={cn(styles.items__selectedItems, data === "countries" ? styles.items__selectedItems_gap12 : styles.items__selectedItems_gap16)}>
                    {selectedItems &&
                        selectedItems.map((item, index) => (
                            <button
                                key={index}
                                type="button"
                                className={cn(styles.items__selectItem, data === "countries" ? styles.items__selectItem_country : styles.items__selectItem_interest)}
                                onClick={() => handleRemoveItem(item)}
                            >
                                {item.name}
                            </button>
                        ))}
                </div>
            </div>
        </>
    );
};

export default observer(InputSearchList);
