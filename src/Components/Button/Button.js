import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';

export default function Button(props) {
  const { toggleAdd } = props;
  return (
    <div className="plusButton">
      <AiFillPlusCircle className="add-button" onClick={toggleAdd} />
    </div>
  );
}
