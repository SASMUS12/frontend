import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import InputSearchList from '../InputSearchList/InputSearchList';

import { Interest } from '../../utils/openapi';
import { getInterests } from '../../utils/rest/getInterests';

interface InterestsSelectionProps {
  selectedInterests: Interest[];
  setSelectedInterests: (item: Interest[]) => void;
}

const InterestsSelection = ({
  selectedInterests,
  setSelectedInterests,
}: InterestsSelectionProps) => {
  const [interestsList, setInterestsList] = useState<Interest[]>([]);

  useEffect(() => {
    getInterests()
      .then((updatedList) => {
        setInterestsList(updatedList);
      })
      .catch((error) => {
        console.error('Error updating interests list:', error);
      });
  }, []);

  return (
    <InputSearchList
      itemsList={interestsList}
      selectedInterests={selectedInterests}
      setSelectedInterests={setSelectedInterests}
    />
  );
};

export default observer(InterestsSelection);
