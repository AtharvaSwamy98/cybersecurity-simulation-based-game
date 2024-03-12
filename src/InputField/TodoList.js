import React from "react";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
import Center from "../Center/Center";
import LeftSide from "../LeftSide/LeftSide";
import RightSide from "../RightSide/RightSide";



const TodoList = ({
  todos,
  setTodos,
  CompletedTodos,
  setCompletedTodos,
  price
}) => {
  return (
    <div className="container">
      
      <LeftSide price={price} todos={todos} setTodos={setTodos} CompletedTodos={CompletedTodos} setCompletedTodos={setCompletedTodos}/>
      <Center todos={todos} setTodos={setTodos} CompletedTodos={CompletedTodos} setCompletedTodos={setCompletedTodos}/>
     
      <RightSide price={price} removeprice={price}/>
      
    
    </div>
  );
};

export default TodoList;