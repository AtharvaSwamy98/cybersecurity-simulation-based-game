import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Todo } from '../InputField/Modules';
import SingleTodo from '../InputField/SingleTodo';

interface props {
  price: number;
}
  const RightSide:React.FC<props> = ({price}) => {
  return (
    <div className="right-container">
      <h1 className='price'>Price:{price}</h1>
      <h1 className='price'>New Price</h1>
    </div>
  )
}

export default RightSide