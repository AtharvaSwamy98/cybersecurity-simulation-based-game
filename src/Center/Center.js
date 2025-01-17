import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import SingleTodo from '../InputField/SingleTodo';
import '../InputField/Style.css';

const Center = ({ todos, setTodos, CompletedTodos, setCompletedTodos }) => {
  return (
    <div className="center-container">
      <div className="center-top" 
      style={{ 
        backgroundImage: 'url("https://images.pexels.com/photos/7676308/pexels-photo-7676308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")center center / cover no-repeat'
        }}>
      </div>
      <Droppable droppableId="CompletedTodos">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos-remove`}
          >
            {CompletedTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={CompletedTodos}
                todo={todo}
                key={todo.id}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Center;
