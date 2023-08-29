import { Country, Interest } from '../../../utils/openapi';

import styles from '../../InputSearchList/InputSearchList.module.scss';
import cn from 'classnames';

type Items = Interest[] | Country[];
type Item = Interest | Country;

interface SelectedItemsProps {
  dataName: string;
  selectedItems: Items;
  setSelectedItems: (selectedItems: () => Items) => void;
}

const selectedItems = ({
  dataName,
  selectedItems,
  setSelectedItems,
}: SelectedItemsProps) => {
  const handleRemoveItem = (item: Item) => {
    const updatedItems = (): Items =>
      selectedItems.filter((c: Item) => c.name !== item.name);
    setSelectedItems(updatedItems);
  };

  return (
    <>
      {selectedItems &&
        selectedItems.map((item: Item, index: number) => (
          <button
            key={index}
            type='button'
            className={cn(
              styles.items__selectItem,
              dataName === 'countries'
                ? styles.items__selectItem_country
                : styles.items__selectItem_interest,
            )}
            onClick={() => handleRemoveItem(item)}
          >
            {item.name}
          </button>
        ))}
    </>
  );
};

export default selectedItems;
