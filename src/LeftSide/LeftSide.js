import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Todo } from '../InputField/Modules';
import SingleTodo from '../InputField/SingleTodo';

  const LeftSide = ({
    todos,
    setTodos,
  }) => {
  return (
    <div className="left-container">
        <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={todos}
                todo={todo}
                key={todo?.id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default LeftSide