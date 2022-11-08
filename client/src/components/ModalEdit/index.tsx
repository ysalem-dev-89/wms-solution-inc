import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';
import { ProductInterface } from '../../interfaces/ProductInterface';
import './styles.css';

export const ModalEdit = ({
  product,
  startEditMode,
  update,
  modal
}: {
  product: ProductInterface;
  startEditMode: CallableFunction;
  update: CallableFunction;
  modal: boolean;
}) => {
  const { control, handleSubmit } = useForm<ProductInterface>();

  const onSubmit: SubmitHandler<ProductInterface> = updatedProduct =>
    update(product.id, updatedProduct);

  return (
    <Modal
      isOpen={modal}
      toggle={() => {
        startEditMode();
      }}
      centered={true}
      size="lg"
    >
      <ModalHeader toggle={() => startEditMode()}>Modal title</ModalHeader>
      <ModalBody className="modal-container">
        <Form
          id="editForm"
          className="modal-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="productTitle">Title</Label>
                <Controller
                  render={({ field }) => (
                    <Input {...field} type="text" required />
                  )}
                  defaultValue={product ? product.title : ''}
                  name="title"
                  control={control}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="productPrice">price</Label>
                <Controller
                  render={({ field }) => (
                    <Input {...field} type="number" min={0} required />
                  )}
                  defaultValue={product ? product.price : 0.0}
                  name="price"
                  control={control}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="productDiscount">Discount</Label>
                <Controller
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      max={100}
                      required
                    />
                  )}
                  defaultValue={
                    product ? Number((product.discount * 100).toFixed(2)) : 0.0
                  }
                  name="discount"
                  control={control}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="productInStock">In stock</Label>
                <Controller
                  render={({ field }) => (
                    <Input {...field} type="number" min={0} required />
                  )}
                  defaultValue={product ? product.inStock : 0}
                  name="inStock"
                  control={control}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="productIcon">Icon</Label>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  defaultValue={product ? product.icon : ''}
                  required
                />
              )}
              name="icon"
              control={control}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button form="editForm" id="btnSubmit" color="primary" outline>
          Edit
        </Button>
        <Button
          className="_btn-model"
          color="danger"
          outline
          onClick={() => startEditMode()}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
