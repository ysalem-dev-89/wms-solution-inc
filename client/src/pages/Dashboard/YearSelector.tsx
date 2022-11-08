import { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const YearSelector = ({
  year,
  years,
  setYear
}: {
  year: number;
  years: number[];
  setYear: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const handleClick = (value: number) => {
    setYear(value);
  };

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret size="lg">
        {`${year}` || 'Select Year'}
      </DropdownToggle>
      <DropdownMenu>
        {years.map(year => (
          <DropdownItem
            key={year}
            href={`#/${year}`}
            onClick={() => handleClick(year)}
          >
            {year}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default YearSelector;
