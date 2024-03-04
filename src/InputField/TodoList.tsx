import React from "react";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "./Modules";
import Center from "../Center/Center";
import LeftSide from "../LeftSide/LeftSide";
import RightSide from "../RightSide/RightSide";

interface props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  CompletedTodos: Array<Todo>;
  price:number
}

const TodoList: React.FC<props> = ({
  todos,
  setTodos,
  CompletedTodos,
  setCompletedTodos,
  price
}) => {
  return (
    <div className="container">
      {/* <Droppable droppableId="TodosList">
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
                key={todo.id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable> */}
      <LeftSide price={price} todos={todos} setTodos={setTodos} CompletedTodos={CompletedTodos} setCompletedTodos={setCompletedTodos}/>
      {/* <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos  ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`}
          >
            <span className="todos__heading">Completed Tasks</span>
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
      </Droppable> */}
      <Center todos={todos} setTodos={setTodos} CompletedTodos={CompletedTodos} setCompletedTodos={setCompletedTodos}/>
     
      <RightSide price={price}/>
      
    
    </div>
  );
};

export default TodoList;