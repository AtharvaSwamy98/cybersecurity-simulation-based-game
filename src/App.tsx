import React, { useEffect, useState } from "react";
import "./App.css";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from "./InputField/Modules";
import InputField from "./InputField/InputField";
import TodoList from "./InputField/TodoList";
import LeftSide from "./LeftSide/LeftSide";
import Center from "./Center/Center";
import RightSide from "./RightSide/RightSide";

const TodoListPreLoaded =[
  {
    id: 0,
    todo: "Preloaded Todo 1",
    // image:"",
     price:70,
     image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isDone: false,
  },
  {
    id: 1,
    todo: "Preloaded Todo 2",
    // image:"",
    price:95,
    image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isDone: false,
  },
  {
    id: 2,
    todo: "Preloaded Todo 3",
    // image:"",
    price:53,
    image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isDone: false,
  },
  {
    id: 3,
    todo: "Preloaded Todo 4",
    // image:"",
    price:245,
    image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isDone: false,
  },
  {
    id: 4,
    todo: "Preloaded Todo 5",
    // image:"",
    price:45,
    image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isDone: false,
  },
  {
    id: 5,
    todo: "Preloaded Todo 6",
    // image:"",
    price:103,
    image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isDone: false,
  },
];
const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

  const [todos, setTodos] = useState<Array<Todo>>(TodoListPreLoaded);
 



  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
  
    if (!destination) {
      return;
    }
  
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
  
    let add;
    let active = todos;
    let complete = CompletedTodos;
  
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
      const draggedTodo = todos[source.index];
  
      if (draggedTodo && draggedTodo.price !== undefined) {
        const updatedPrice = price - draggedTodo.price;
        // setPrice(updatedPrice);
      

      }
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
  
    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
      console.log(source.index);
      const draggedTodo = todos[source.index];
  
      if (draggedTodo && draggedTodo.price !== undefined) {
        const updatedPrice = price - draggedTodo.price;
      
        setPrice(updatedPrice);
      }
    } else {
      complete.splice(destination.index, 0, add);
      const draggedTodo = todos[source.index];
   

      if (draggedTodo && draggedTodo.price !== undefined) {
        const updatedPrice = price + draggedTodo.price;
       
        setPrice(updatedPrice);
      }
    }
  
    setCompletedTodos(complete);
    setTodos(active);
  };
  
  // const onDragEnd = (result: DropResult) => {
  //   const { destination, source } = result;
  
  //   if (!destination) {
  //     return;
  //   }
  
  //   if (destination.droppableId === source.droppableId && destination.index === source.index) {
  //     return;
  //   }
  
  //   let active = [...todos];
  //   let complete = [...CompletedTodos];
  //   let draggedTodo;
  
  //   // Source Logic
  //   if (source.droppableId === "TodosList") {
  //     draggedTodo = active[source.index];
  //     active.splice(source.index, 1);
  //   } else {
  //     draggedTodo = complete[source.index];
  //     complete.splice(source.index, 1);
  //   }
  
  //   // Destination Logic
  //   if (destination.droppableId === "TodosList") {
  //     active.splice(destination.index, 0, draggedTodo);
  //   } else if (destination.droppableId === "TodosRemove") {
  //     // Logic for adding to the 'Center' and updating the price
  //     // You might want to add some conditions here based on your requirements
  //     active.splice(destination.index, 0, draggedTodo);
  //     const updatedPrice = price + draggedTodo.price;
  //     setPrice(updatedPrice);
  //   } else {
  //     complete.splice(destination.index, 0, draggedTodo);
  //   }
  
  //   setTodos(active);
  //   setCompletedTodos(complete);
  // };
  
  
  return (
  //   <DragDropContext onDragEnd={onDragEnd}>
  //     <div className="App">
  //       <span className="heading">Taskify</span>
  //       <TodoList
  //         todos={todos}
  //         setTodos={setTodos}
  //         CompletedTodos={CompletedTodos}
  //         setCompletedTodos={setCompletedTodos}
  //       />
  //     </div>
      
  //   </DragDropContext>
  // );
  <DragDropContext onDragEnd={onDragEnd}>
  <div className="App">
   
    <div className="container">
      <LeftSide 
        todos={todos} 
        setTodos={setTodos} 
        CompletedTodos={CompletedTodos}
        setCompletedTodos={setCompletedTodos}
        price={price}/>
      <Center
        todos={todos}
        setTodos={setTodos}
        CompletedTodos={CompletedTodos}
        setCompletedTodos={setCompletedTodos}
      />

      <RightSide price={price}/>
    </div>
  </div>
</DragDropContext>
  );
};

export default App;