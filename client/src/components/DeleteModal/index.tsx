import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './styles.css';
export const DeleteModal = (props: {
  deleteProduct: CallableFunction;
  modal: boolean;
  toggle: CallableFunction;
}) => (
  <Modal isOpen={props.modal} toggle={() => props.toggle()} centered={true}>
    <ModalHeader toggle={() => props.toggle()}>DELETE</ModalHeader>
    <ModalBody>Are you sure you want to delete this product?</ModalBody>
    <ModalFooter>
      <Button
        className="btn-modal"
        color="danger"
        outline
        onClick={() => {
          props.deleteProduct();
          props.toggle();
        }}
      >
        Delete
      </Button>
      <Button
        className="btn-modal"
        color="primary"
        outline
        onClick={() => props.toggle()}
      >
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
);
