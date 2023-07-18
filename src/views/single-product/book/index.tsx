import { useState } from "react";

import { Modal } from "react-bootstrap";

interface IProps {
  showModal: boolean;
  setShowModal: any;
}
const Book = ({ showModal, setShowModal }: IProps) => {
  return (
    <>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        size="lg"
        keyboard={false}
      ></Modal>
    </>
  );
};

export default Book;
