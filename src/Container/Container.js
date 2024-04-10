import React, { useEffect, useState } from "react";
import "./Container.css";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Header from "../Header/Header"
import Center from "../Center/Center";
import RightSide from "../RightSide/RightSide";
import LeftSide from "../LeftSide/LeftSide";
import Dialog from "../Component/YesNoDialog";


const TodoListPreLoaded =[
  
  
];

const Container= ({jsonDataValues}) => {

  const [price, setPrice] = useState(0);
  const [showEmptyDataPopup, setShowEmptyDataPopup] = useState(false);
  const [data,setData] =useState();

  const [removeprice, setRemovePrice] = useState(0);
  const [CompletedTodos, setCompletedTodos] = useState([]);
  const [budget, setBudget] = useState(0);
  const [todos, setTodos] = useState([]);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [play,setPlay] = useState(false);
  const [right,setRight] = useState(null);
  const [chooseControl,setchooseControl] = useState("");
  const[budgetRequest,setRequestBudget] = useState(false);
  useEffect(() => {
    fetchData();
    fetchUserStats();
    console.log("function called")
    console.log(chooseControl);
    const intervalId = setInterval(() => {
  }, 3 * 60 * 1000);   
  return () => clearInterval(intervalId);
  }, []); 

  // Toggle function to open/close the popup
  const toggleImagePopup = () => {
    setIsImagePopupOpen(!isImagePopupOpen);
  };
  useEffect(() => {
  
      const jsonData = JSON.parse(jsonDataValues);
      const fetchBudget = async () => {
        try {
          setBudget(jsonData.budget);
          const mergedData = mergeWithPreloadedData(jsonData);
          setTodos(mergedData);
        } catch (error) {
          console.error('Error fetching budget:', error);
        }
      };
      fetchBudget();
    
  }, []);


  const fetchBudget = async () => {
      try {
        const response = await fetch('https://e5l5aptdy4.execute-api.us-east-1.amazonaws.com/test/requestBudget');
        const jsonData = await response.json();
        
        if (!response.ok) {
        // alert(jsonData.error);
        console.log("JSON Error"+jsonData.error)
        }
        else{
        setBudget(jsonData.assigned_budget);
        // setData(jsonData);
        setPlay(true);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
  };
  const fetchUserStats = async () => {
    try {
      const response = await fetch('https://e5l5aptdy4.execute-api.us-east-1.amazonaws.com/test/getUserStats');
      const jsonDataStats = await response.json();
      if (!response.ok) {
      // alert(jsonData.error);
      console.log("JSON Error"+jsonDataStats.error)
      }
      else{
      setRight(jsonDataStats);
      // setBudget(jsonData.budget_left);
      setPlay(true);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
};
 
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
  const fetchData = async () => {
    let stringValue = createStringWithCommas();
    console.log(stringValue);
    fetchUserStats();
    if(stringValue!=null){
      try {
        const response = await fetch('https://e5l5aptdy4.execute-api.us-east-1.amazonaws.com/test/select_controls?controls='+stringValue);
        const jsonData = await response.json();
        
        if (!response.ok) {
        // alert(jsonData.error);
        console.log("JSON Error"+jsonData.error)
        }
        else{
         setBudget(jsonData.budget_left);
        setRequestBudget(jsonData.request_for_budget);
        setData(jsonData);
        setPlay(true);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };
  const dragged =[];
  const createStringWithCommas = () => {
    if (!chooseControl || chooseControl.length === 0) {
      return ""; // Return an empty string if chooseControl is null, undefined, or empty
  }
    // Map through chooseControl array and join elements with commas
    return chooseControl.map((element, index) => {
      // Add a comma after each element except the last one
      return index === chooseControl.length - 1 ? element : element + ",";
    }).join("");
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
      if(budget<=0){
        alert("Cannot select the control as budget got over");
         return ;
       }
      add = active[source.index];
      active.splice(source.index, 1);
      const draggedTodo = todos[source.index];
      dragged.push(draggedTodo.todo);
      console.log("dragged"+dragged);


      if (draggedTodo && draggedTodo.price !== undefined) {
        if(budget<=0){
          alert("Cannot select the control as budget got over");
           return ;
         }
        const lastPrice = price;
          setBudget(draggedTodo.price);
         console.log("Source dragged"+draggedTodo.price);
        // const updatedPrice = price + draggedTodo.price;
        // const updatedBudget = budget - updatedPrice;
       
        // setPrice(updatedPrice- lastPrice)
        console.log(lastPrice);

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
      console.log("Dropped Source:", droppedTodo);
  
      if (draggedTodo && draggedTodo.price !== undefined) {
          console.log("Dest Dragged"+draggedTodo.price);
          const value = budget+draggedTodo.price;
          setBudget(value)

        // const lastPrice = price;
        // const updatedPrice = lastPrice+ price + draggedTodo.price;
        // setPrice(updatedPrice)
        // const updatedBudget = budget - updatedPrice;
        // setBudget(updatedBudget);
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
    setchooseControl(prevChooseControl => [...prevChooseControl, dragged]);
    
  };
  // const str =chooseControl.slice(1);

  const handleYes = () => {
    // Handle 'Yes' action
    fetchBudget();
    setRequestBudget(false);
  };

  const handleNo = () => {
    // Handle 'No' action
    setRequestBudget(false);
  };
  return (
    <div>
     
        <div>
         {isImagePopupOpen && (
            <div className="popup-background">
              <div className="image-popup">
                {/* <img
                  className="popup-image"
                  src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Popup Image"
                /> */}
                <button onClick={toggleImagePopup}>Close</button>
              </div>
            </div>
          )}
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="App">
                <Header />
                <div className="container">
                  <LeftSide 
                  todos={todos} 
                  setTodos={setTodos} 
                  price={price} />
                  <Center
                    todos={todos}
                    setTodos={setTodos}
                    CompletedTodos={CompletedTodos}
                    setCompletedTodos={setCompletedTodos}
                  />
                  <RightSide 
                   price={budget}
                   removeprice={removeprice} 
                   toggleImagePopup={toggleImagePopup} 
                   fetchApi ={fetchData} 
                   fetchStats={fetchUserStats}
                   right={right} 
                   play={play}
                  //  resetApi={resetApi}
                   />
                </div>
              </div>
            </DragDropContext>
        
          
          {/* Button to toggle the image popup */}
            {budgetRequest && (
              <Dialog
                message="Are you sure you want to proceed?"
                onYes={handleYes}
                onNo={handleNo}
              />
            )}
        </div>
       
      {/* <button onClick={disconnectWebSocket}>Disconnect</button> */}
    </div>
  );
  
};

export default Container;