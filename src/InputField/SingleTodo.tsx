import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";
import { Todo } from "./Modules";

const SingleTodo: React.FC<{
  index: number;
  todo: Todo;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}> = ({ index, todo, todos, setTodos }) => {





  return (
    <Draggable draggableId={todo?.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
        >
          <div className="card">
          <img src={todo?.image} alt={todo?.todo} className="card-image" />
          <div className="card-content">
            <h2 className="card-title">{todo?.todo}</h2>
            <h2 className="card-title">{todo?.price}</h2>
          </div>
        </div>
         
        </div>
      )}
    </Draggable>
  );
};

export default SingleTodo;