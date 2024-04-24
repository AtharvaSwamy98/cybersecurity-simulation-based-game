import React from 'react';
import './RightSide.css';

const RightSide = ({ price, removeprice, toggleImagePopup, fetchApi, right, play }) => {
  return (
    <div className="right-container">
      <div className="row-40">
        <div className="image-container">
          <div>
            {!play ? (
              <div>Loading...</div>
            ) : (
              <div>
                {right && (
                  <div>
                    <h2>Fetched Data</h2>
                    <h3>{right.user_id}</h3>
                    <div className="scrollable-box">
                     
                        <strong>Initial Budget:</strong> {right.initial_budget}<br></br>
                        <strong>Player Start Time:</strong> {right.player_start_time}<br></br>
                        <strong>Uptime:</strong> {right.uptime}<br></br>
                        <strong>Downtime:</strong> {right.downtime}<br></br>
                        <strong>Controller:</strong>
                        <ul>
                          {right.controls.map((control, index) => (
                            <li key={index} style={{ listStyleType: 'none' }}>
                              <strong>Name:</strong> {control.control},{' '}<br></br>
                              <strong>TimeStamp:</strong> {control.timestamp}<br></br>
                            </li>
                          ))}
                        </ul>
                      
                          <strong>Threats:</strong>
                          <ul>
                            {right.threats.map((threat, index) => (
                              <li key={index} style={{ listStyleType: 'none' }}>
                                <li><strong>Name:</strong> {threat.name},{' '}</li>
                                <li><strong>Successful:</strong> {threat.is_attack_successfull ? 'Yes' : 'No'},{' '}</li>
                                <li><strong>Actual Earning:</strong> {threat.actual_earning},{' '}</li>
                                <li><strong>Expected Earning:</strong> {threat.expected_earning},{' '}</li>
                                <li><strong>Loss Due to Attack:</strong> {threat.loss_due_to_attack}</li><br></br>
                              </li>
                              
                            ))}
                          </ul>
                      
                        <li>
                          <strong>Levels:</strong>
                          <ul>
                            {Object.entries(right.levels).map(([level, details]) => (
                              <li key={level} style={{ listStyleType: 'none' }} >
                                <li> <strong>Level:</strong> {level},{' '}</li>
                                <li><strong>Attack:</strong> {details.attack},{' '}</li>
                                <li><strong>Controls:</strong> {details.controls.chosen.join(', ')},<br></br>{' '}</li>
                                <li><strong>Max Effective Control:</strong> {details.controls.max_effective_control},{' '}</li>
                                <li> <strong>Max Effective Control Effectiveness:</strong> {details.controls.max_effective_control_effectiveness},{' '}</li>
                                <li><strong>Combined Effectiveness:</strong> {details.controls_combined_effectiveness},{' '}</li>
                                <li><strong>Timestamp:</strong> {details.timestamp}</li><br></br>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <strong>Accumulated Production Amount:</strong> {right.accumulated_production_amount}<br></br>
                        <strong>Accumulated Production Loss:</strong> {right.accumulated_production_loss}<br></br>
                        <strong>Expected Production Amount:</strong> {right.expected_production_amount}<br></br>
                        <strong>Expected Uptime:</strong> {right.expected_uptime}<br></br>
                        <strong>Stats Update Timestamp:</strong> {right.stats_update_timestamp}<br></br>
                        <strong>Budget Left:</strong> {right.budget_left}<br></br>
                        <strong>Apply for Budget:</strong> {right.apply_for_budget ? 'Yes' : 'No'}<br></br>
                        <strong>Is Playing Status:</strong> {right.is_playing_status ? 'Yes' : 'No'}<br></br>
                        <strong>No of Attacks Mitigated:</strong> {right.no_of_attacks_mitigated}<br></br>
                        <strong>No of Attacks Successful:</strong> {right.no_of_attacks_successfull}<br></br>
                    
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="row-40">
        <h1 className="price">Budget: {price}</h1>
        <button className='play-button' onClick={fetchApi}>
          Play
        </button>
      </div>
    </div>
  );
};

export default RightSide;
