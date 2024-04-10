import React from 'react';

import './RightSide.css';

const RightSide = ({ price, removeprice, toggleImagePopup, fetchApi,fetchStats, right, play, 
  // resetApi
}) => {


  return (
    <div className="right-container">
      <div className="row-40">
     
        <div class="image-container" >
           <div>
            {!play ? (
              <div>Loading...</div>
            ) : (
              <div>
                {right && (
                  <div>
                    <h2>Fetched Data</h2>
                    <ul>
                    {/* {Object.keys(data).map(( i) => ( */}
              
                        
                         <strong>Uptime:{right["uptime"]}</strong><br></br>
                         <strong>Downtime:{right["downtime"]}</strong><br></br>
                         <strong>Threat:{right["threat"]}</strong><br></br>
                         <strong>Chosen Controls:</strong><br />
                                {right.controls.map((item, index) => (
                                  <span key={index}>{item.control}<br /></span>
                                ))}                         <strong>Total Production:{right["expected_production_amount"]}</strong><br></br>
                         <strong>Expected Total Production:{right["accumulated_production_amount"]}</strong><br></br>
                         <strong>Total Loss attacks:{right["total_loss_due_to_attacks"]}</strong><br></br>
                         <strong>Budget left:{right["budget_left"]}</strong><br></br>
                         <strong>Description:{right["description"]}</strong><br></br>
                        
                    {/* ))} */}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="row-40">
        <h1 className="price">Budget: {price}</h1>
        <button className= 'play-button'onClick={fetchApi}>
          Play
    
        </button>
{/* 
        <button className= 'play-button'onClick={resetApi}>
          Reset
    
        </button> */}
      </div>
    </div>
  );
};

export default RightSide;
