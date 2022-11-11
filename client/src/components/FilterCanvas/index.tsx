import {
  Input,
  Label,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader
} from 'reactstrap';
import './styles.css';

export const FilterCanvas = ({
  filterOnChange,
  minPrice,
  maxPrice,
  minDiscount,
  maxDiscount,
  setMaxPrice,
  setMinPrice,
  setMaxDiscount,
  setMinDiscount,
  show,
  toggle
}: {
  filterOnChange: VoidFunction;
  minPrice: number;
  maxPrice: number;
  minDiscount: number;
  maxDiscount: number;
  setMaxPrice: CallableFunction;
  setMinPrice: CallableFunction;
  setMaxDiscount: CallableFunction;
  setMinDiscount: CallableFunction;
  show: boolean;
  toggle: VoidFunction;
}) => {
  return (
    <Offcanvas direction="end" isOpen={show} toggle={toggle}>
      <OffcanvasHeader toggle={toggle}>Filter</OffcanvasHeader>
      <OffcanvasBody>
        <fieldset>
          <legend>Price</legend>
          <Label>
            Min. price
            <Input
              type="number"
              min="0"
              max={10000}
              value={minPrice}
              onChange={event => {
                setMinPrice(event.target.value);
                filterOnChange();
              }}
            />
          </Label>
          <Label>
            Max. price
            <Input
              type="number"
              min="0"
              max={10000}
              value={maxPrice}
              onChange={event => {
                setMaxPrice(event.target.value);
                filterOnChange();
              }}
            />
          </Label>
        </fieldset>
        <fieldset>
          <legend>Discount</legend>
          <label>
            Min. discount
            <Input
              type="range"
              min="0"
              max="100"
              value={minDiscount}
              onChange={event => {
                setMinDiscount(event.target.value);
                filterOnChange();
              }}
            />
          </label>
          <label>
            Max. discount
            <Input
              type="range"
              min="0"
              max="100"
              value={maxDiscount}
              onChange={event => {
                setMaxDiscount(event.target.value);
                filterOnChange();
              }}
            />
          </label>
        </fieldset>
      </OffcanvasBody>
    </Offcanvas>
  );
};
