import React from "react";
import { OverlayTrigger, Tooltip} from "react-bootstrap";
import { formatDistanceStrict } from 'date-fns'

import { toAbsoluteUrl } from "./../helpers";

export const RecommendationActions = (props) => {
  const {recommendationId, onAction, recommendationType, lastExecutionDate} = props;

  const handleClick = (recommendationId, action = 'now') => () => {
    onAction(recommendationId, action);
  }

  const getTimeDiff = (executionDate) => {
    if(!executionDate) return 100;
    const timeDiff = formatDistanceStrict(
      new Date(),
      new Date(executionDate),
      { unit: 'minute' }
    );
    const time = Number(timeDiff.split(' ')[0]);
    return time;
  }
  const cancelDisabled = () => {
    const t = getTimeDiff(lastExecutionDate);
    if(lastExecutionDate && t < 20) return true;
    if(recommendationType === 'Completed') return true;
    return false;
  }

  const nowDisabled = () => {
    const t = getTimeDiff(lastExecutionDate);
    if(lastExecutionDate && t < 20) return true;
    if(recommendationType === 'Completed') return true;
    if(recommendationType === 'now') return false;
    return false;
  }

  const scheduleDisabled = () => {
    const t = getTimeDiff(lastExecutionDate);
    if(lastExecutionDate && t < 20) return true;
    if(recommendationType === 'Completed') return true;
    return false;
  }

  const disabledAction = () => {
    console.log('Disabled Action clicked');
    return false;
  }


  return (
        <>
        <OverlayTrigger
          key="now"
          placement="bottom"
          overlay={
              <Tooltip>
            Run Now
              </Tooltip>
          }
          >
          <img 
              alt="action" 
              className={`actionLink ${nowDisabled() && 'disabled'}`}
              src={toAbsoluteUrl("/media/run.svg")}
              onClick={nowDisabled() ? disabledAction : handleClick(recommendationId)} />
      </OverlayTrigger>                                              
        
      <OverlayTrigger
          key="schedule"
          placement="bottom"
          overlay={
              <Tooltip>
        Schedule
              </Tooltip>
          }
      >
          <img 
              alt="action" 
              className={`actionLink ${scheduleDisabled() && 'disabled'}`}
              src={toAbsoluteUrl("/media/schedule.svg")}
              onClick={scheduleDisabled() ? disabledAction : handleClick(recommendationId, 'schedule')} />
        </OverlayTrigger>
        <OverlayTrigger
            key="Cancel"
            placement="bottom"
            overlay={
                <Tooltip>
          Cancel
                </Tooltip>
            }
            >
                <img 
                    alt="action" 
                    className={`actionLink ${cancelDisabled() && 'disabled'}`}
                    src={toAbsoluteUrl("/media/delete.svg")}
                    onClick={cancelDisabled() ? disabledAction : handleClick(recommendationId, recommendationType === 'Scheduled' ? 'cancel' : 'reject')} />
        </OverlayTrigger>
        <OverlayTrigger
          key="info"
          placement="bottom"
          overlay={
              <Tooltip>
        Info
              </Tooltip>
          }
          >
            <img 
                alt="action" 
                className="actionLink" 
                src={toAbsoluteUrl("/media/info.svg")}
                onClick={handleClick(recommendationId, 'info')} />
        </OverlayTrigger>
    </>
  );
}
