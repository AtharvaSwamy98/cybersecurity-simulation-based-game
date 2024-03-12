import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd'
import { Todo } from '../InputField/Modules';
import SingleTodo from '../InputField/SingleTodo';
import './RightSide.css'



  const RightSide = ({price,removeprice}) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayToggle = () => {
      setIsPlaying(!isPlaying);
    };
  return (
    <div className="right-container">
     <div className="row-80">
     <h1 className='price'>Remaining Budget: {removeprice}</h1>

      </div>
      <div className="row-20">
      <h1 className='price'>Budget: {price}</h1>

        <button className={isPlaying ? 'pause-button' : 'play-button'} onClick={handlePlayToggle}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
    
  )
}

export default RightSide