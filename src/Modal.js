import React from 'react';
import Overlay from './Overlay';
import './Modal.css';

export default function Modal(props) {
  return (
    <Overlay>
      <section className="modal">{props.children}</section>
    </Overlay>
  );
}
