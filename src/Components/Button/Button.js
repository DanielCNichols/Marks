import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import s from './Button.module.css';

export default function Button(props) {
  const { toggleAdd } = props;
  return (
    <div className={s.addButtonContainer}>
      <AiFillPlusCircle className={s.addButton} onClick={toggleAdd} />
    </div>
  );
}
