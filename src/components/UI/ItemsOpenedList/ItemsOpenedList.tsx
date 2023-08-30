import { Country, Interest } from "../../../utils/openapi";

import styles from "../../InputSearchList/InputSearchList.module.scss";
import cn from "classnames";

interface InterestsOpenedListProps {
  itemsName: string;
  selectedItems: (Country | Interest)[];
  setSelectedItems: (selectedItems: (Country | Interest)[]) => void;
}

const itemsOpenedList = ({
  itemsName,
  selectedItems,
  setSelectedItems,
}: InterestsOpenedListProps) => {
  const handleRemoveItem = (item: Country | Interest) => {
    const updatedItems = selectedItems.filter(
      (c: Country | Interest) => c.name !== item.name
    );
    setSelectedItems(updatedItems);
  };

  return (
    <>
      {selectedItems &&
        selectedItems.map((item: Country | Interest, index: number) => (
          <button
            key={index}
            type="button"
            className={cn(
              styles.items__selectItem,
              itemsName === "countries"
                ? styles.items__selectItem_country
                : styles.items__selectItem_interest
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
