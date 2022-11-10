import {
  Input,
  Label,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader
} from 'reactstrap';
import './styles.css';

export const FilterCanvas = ({
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
              type="range"
              min="0"
              max="10"
              value={minPrice}
              onChange={event => setMinPrice(event.target.value)}
            />
          </Label>
          <Label>
            Max. price
            <Input
              type="range"
              min="0"
              max="10"
              value={maxPrice}
              onChange={event => setMaxPrice(event.target.value)}
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
              onChange={event => setMinDiscount(event.target.value)}
            />
          </label>
          <label>
            Max. discount
            <Input
              type="range"
              min="0"
              max="100"
              value={maxDiscount}
              onChange={event => setMaxDiscount(event.target.value)}
            />
          </label>
        </fieldset>
      </OffcanvasBody>
    </Offcanvas>
  );
};
