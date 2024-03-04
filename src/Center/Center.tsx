import React from 'react'
import { Todo } from '../InputField/Modules';
import { Droppable } from 'react-beautiful-dnd';
import SingleTodo from '../InputField/SingleTodo';
import "../InputField/Style.css"


interface props {
    todos: Array<Todo>;
    setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
    setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
    CompletedTodos: Array<Todo>;
  }
const Center:React.FC<props> = ({
    todos,
    setTodos,
    CompletedTodos,
    setCompletedTodos,
  }) => {
  return (
    <div className="center-container">
        <span className="todos__heading">Completed Tasks</span>
        <div className='center-top'>
           <img src='https://images.pexels.com/photos/7676308/pexels-photo-7676308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' />
        </div>
        <Droppable droppableId="TodosRemove">
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
  )
}

export default Center