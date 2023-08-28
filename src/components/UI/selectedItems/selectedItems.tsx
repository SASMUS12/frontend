import styles from '../../InputSearchList/InputSearchList.module.scss';
import { Country, Interest } from '../../../utils/openapi';
import cn from 'classnames';

type Items = Interest[] | Country[];
type Item = Interest | Country;

interface SelectedItemsProps {
  data: string;
  selectedItems: Items;
  setSelectedItems: (selectedItems: Items) => void;
}

const selectedItems = ({
  data,
  selectedItems,
  setSelectedItems,
}: SelectedItemsProps) => {
  const handleRemoveItem = (item: Item) => {
      const itemsArray: Items = [];
      const itemsArrayForFilter: Array<typeof Items> = itemsArray


      const updatedItems: Interest = Items.filter(
        (c: Interest) => c.name !== item.name,
      );
    }
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
              data === 'countries'
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
