import React, { useState } from 'react';
import Modal from 'react-modal';
import { Icon } from '@iconify/react';

// GameItem component
const ModalItemGame = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>{props.game.gameName}</h2>
      <button onClick={openModal}>
        <Icon icon='clarity:edit-solid' />
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel='Game Details'>
        <h2>{props.game.gameName}</h2>
        <p>{props.game.gamePrice}</p>
        <button onClick={closeModal}>
          <Icon icon='zondicons:close' />
        </button>
      </Modal>
    </div>
  );
};

// Styles for the modal
const modalStyles = {
  content: {
    width: '400px',
    height: '300px',
    margin: 'auto',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    padding: '20px',
  },
};

export default ModalItemGame;
