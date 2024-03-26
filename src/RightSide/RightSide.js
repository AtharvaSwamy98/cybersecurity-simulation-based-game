import React from 'react';

import './RightSide.css';

const RightSide = ({ price, removeprice, toggleImagePopup, fetchApi, data, play, resetApi}) => {


  return (
    <div className="right-container">
      <div className="row-40">
     
        <div class="image-container" >
           <div>
            {!play ? (
              <div>Loading...</div>
            ) : (
              <div>
                {data && (
                  <div>
                    <h2>Fetched Data</h2>
                    <ul>
                    {/* {Object.keys(data).map(( i) => ( */}
              
                        
                         <strong>Uptime:{data["uptime"]}</strong><br></br>
                         <strong>Downtime:{data["downtime"]}</strong><br></br>
                         <strong>Threat:{data["threat"]}</strong><br></br>
                         <strong>Chosen Controls:{data["chosen_controls"]}</strong><br></br>
                         <strong>Total Production:{data["total_production"]}</strong><br></br>
                         <strong>Expected Total Production:{data["expected_total_production"]}</strong><br></br>
                         <strong>Total Loss attacks:{data["total_loss_due_to_attacks"]}</strong><br></br>
                         <strong>Budget left:{data["budget_left"]}</strong><br></br>
                         <strong>Description:{data["description"]}</strong><br></br>
                        
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

        <button className= 'play-button'onClick={resetApi}>
          Reset
    
        </button>
      </div>
    </div>
  );
};

export default RightSide;
