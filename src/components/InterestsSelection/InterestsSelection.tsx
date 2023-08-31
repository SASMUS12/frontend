import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import InputSearchList from "../InputSearchList/InputSearchList";

import { Country, Interest } from "../../utils/openapi";
import { getInterests } from "../../utils/rest/getInterests";
import { getCountries } from "../../utils/rest/getCountries";

interface CountriesAndInterestsSelectionProps {
  pageName: string;
  itemsName: string;
  selectedInterests?: Interest[];
  setSelectedInterests?: (item: Interest[]) => void;
  selectedCountries?: Country[];
  setSelectedCountries?: (item: Country[]) => void;
}

const InterestsSelection = ({
  pageName,
  itemsName,
  selectedInterests,
  setSelectedInterests,
  selectedCountries,
  setSelectedCountries,
}: CountriesAndInterestsSelectionProps) => {
  const [interestsList, setInterestsList] = useState<Interest[]>([]);
  const [countriesList, setCountriesList] = useState<Country[]>([]);

  useEffect(() => {
    if (itemsName === "countries") {
      getInterests()
        .then((updatedList) => {
          setInterestsList(updatedList);
        })
        .catch((error) => {
          console.error("Error updating interests list:", error);
        });
    }
  }, [itemsName]);

  useEffect(() => {
    if (itemsName === "interests") {
      getCountries()
        .then((updatedList) => {
          setCountriesList(updatedList);
        })
        .catch((error) => {
          console.error("Error updating countries list:", error);
        });
    }
  }, [itemsName]);

  const allItemsList = [...interestsList, ...countriesList];

  return (
    <InputSearchList
      pageName={pageName}
      itemsName="interests"
      itemsList={allItemsList}
      selectedInterests={selectedInterests}
      setSelectedItems={
        itemsName === "countries" ? setSelectedCountries : setSelectedInterests
      }
    />
  );
};

export default observer(InterestsSelection);
