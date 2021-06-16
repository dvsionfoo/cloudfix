import React, { useState } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';


export function ScheduleExecution(props) {
  const { show, onHide, recommendations, handleActionClick } = props;
  const [scheduleDate, setScheduleDate] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);


  const handleScheduleDate = (event) => {
    const selectedTime = new Date(event.target.value);
    const todayTime = new Date();
    if(selectedTime >= todayTime){
      setScheduleDate(event.target.value);
      setError();
    } else {
      setError('Date & Time cannot be less than now');
      setScheduleDate();
    }
  }
  const isValidDate = (dateObject) => {
    return new Date(dateObject).toString() !== 'Invalid Date';
  };

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };
  const sendScheduleDate = () => {
    enableLoading();
    setError(`Scheduling your request...`);
    handleActionClick(recommendations, new Date(scheduleDate).toISOString());
  }

  const handleExit = () => {
    disableLoading();
    setError(null);
    setScheduleDate(null);
  }

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onExit={handleExit}
      className="schedule-recommendation-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h3>Schedule Execution</h3>
          <p><Badge variant="danger">{recommendations && recommendations.length}</Badge> recommendations selected</p>
        </Modal.Title>

      </Modal.Header>
      <Modal.Body>
        <h4 className="text-dark-75">{recommendations.length} recommendations will be affected</h4>
        <br />
        <div className="row">
          <div className="col-md-3"><p className="schedule-label">Schedule Date Time</p></div>
          <div className="col-md-4">
            <TextField
              id="datetime-local"
              type="datetime-local"
              onChange={handleScheduleDate}
              className="datetime"
              value={scheduleDate}
            />
            {error ? <p className="error">{error}</p> : <p className="text-muted">Enter your local time</p>} 
          </div>
          <div className="col-md-5">
            {
              isValidDate(scheduleDate) && (
                <>
                  <p>Local: {new Date(scheduleDate).toLocaleString()}</p>
                  <p>UTC: {new Date(scheduleDate).toUTCString()}</p>
                </>
              )
            }
              
          </div>
        </div>


      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={onHide}>Cancel</Button>
        <Button variant="success" disabled={!isValidDate(scheduleDate) || loading} onClick={sendScheduleDate}>Schedule {loading && <span style={{ 'marginRight': '10px' }} className="ml-3 spinner spinner-white"></span>}</Button>
      </Modal.Footer>
    </Modal>
  );
}
