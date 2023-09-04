import { Interest } from "../../../utils/openapi";

import styles from "../../InputSearchList/InputSearchList.module.scss";
import cn from "classnames";

interface InterestsOpenedListProps {
  selectedItems: Interest[];
  setSelectedItems: (selectedItems: Interest[]) => void;
}

const itemsOpenedList = ({
  selectedItems,
  setSelectedItems,
}: InterestsOpenedListProps) => {
  const handleRemoveItem = (item: Interest) => {
    const updatedItems = selectedItems.filter(
      (c: Interest) => c.name !== item.name
    );
    setSelectedItems(updatedItems);
  };

  return (
    <>
      {selectedItems &&
        selectedItems.map((item: Interest, index: number) => (
          <button
            key={index}
            type="button"
            className={cn(
              styles.items__selectItem,
              styles.items__selectItem_interest
            )}
            onClick={() => handleRemoveItem(item)}
          >
            {item.name}
          </button>
        ))}
    </>
  );
};

export default itemsOpenedList;
