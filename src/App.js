import React, { useEffect, useState } from "react";
import "./App.css";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from "./InputField/Modules";
import InputField from "./InputField/InputField";
import TodoList from "./InputField/TodoList";
import LeftSide from "./LeftSide/LeftSide";
import Center from "./Center/Center";
import RightSide from "./RightSide/RightSide";
import axios from 'axios'; // Import axios if you're using it
import Header from "./Header/Header";



const TodoListPreLoaded =[
  
  
];
const App= () => {
  const [price, setPrice] = useState(0);
  const [removeprice, setRemovePrice] = useState(0);
  const [CompletedTodos, setCompletedTodos] = useState([]);
  const [budget, setBudget] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState([]);


  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await fetch('https://cwesr6jpi4.execute-api.us-east-1.amazonaws.com/test/play'); // Replace with your API endpoint
        const data = await response.json();
        setBudget(data.budget);
        setIsLoading(false);
        const mergedData = mergeWithPreloadedData(data);
        setTodos(mergedData);
      } catch (error) {
        console.error('Error fetching budget:', error);
      }
    };
    fetchBudget();
  }, []);

  const mergeWithPreloadedData = (fetchedData) => {
    return [
      ...TodoListPreLoaded,
      ...Object.entries(fetchedData.controls).map(([key, value]) => ({
        id: TodoListPreLoaded.length + parseInt(key.substring(1)), // Assign unique ID
        todo: value.control,
        price: parseInt(value.cost.replace('$', ''), 10),
        image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        isDone: false,
      })),
    ];
  };
  const onDragEnd = (result) => {
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
    let active = todos.slice(); // Create a copy to avoid modifying the state directly
    let complete = CompletedTodos.slice(); // Create a copy to avoid modifying the state directly

  
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
      const draggedTodo = todos[source.index];
      

      if (draggedTodo && draggedTodo.price !== undefined) {
        const lastPrice = price;
        const updatedPrice = price + draggedTodo.price;
        const updatedBudget = budget - updatedPrice;
        setBudget(updatedBudget);

        setPrice(updatedPrice+ lastPrice)
      

      }
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
      
    }
  
    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
      const draggedTodo = todos[destination.index];
      const droppedTodo = active[destination.index];
      console.log("Dropped Todo:", droppedTodo);
  
      if (draggedTodo && draggedTodo.price !== undefined) {
        const lastPrice = price;
        const updatedPrice = lastPrice+ price + draggedTodo.price;
        setPrice(updatedPrice)
        const updatedBudget = budget - updatedPrice;
        setBudget(updatedBudget);
      }
    } 
    else {
      complete.splice(destination.index, 0, add);
      const draggedTodo = todos[source.index];
   

      if (draggedTodo && draggedTodo.price !== undefined) {
        const lastPrice = price;
        const updatedPrice = lastPrice+ price + draggedTodo.price;
        setRemovePrice(updatedPrice);
        const updatedBudget = budget - updatedPrice;
        setBudget(updatedBudget);
      }
    }
  
    setCompletedTodos(complete);
    setTodos(active);
  };
  
  return (
    <div>
    {isLoading ? (
      <div>Loading...</div>
    ) : (
    
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="App">
      <Header/>
      <div className="container">
        <LeftSide 
          todos={todos} 
          setTodos={setTodos} 
        
          price={price}/>
        <Center
          todos={todos}
          setTodos={setTodos}
          CompletedTodos={CompletedTodos}
          setCompletedTodos={setCompletedTodos}
        />

        <RightSide price={budget} removeprice={removeprice}/>
      </div>
    </div>
    </DragDropContext>
  )}
  </div>
  );
};

export default App;