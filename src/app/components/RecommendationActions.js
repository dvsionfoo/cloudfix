import React from "react";
import {formatDistanceStrict} from 'date-fns'
import {Space, Tooltip} from 'antd';
import {toAbsoluteUrl} from "./../helpers";

export const RecommendationActions = (props) => {
    const {recommendationId, onAction, recommendationType, lastExecutionDate} = props;

    const handleClick = (recommendationId, action = 'now') => () => {
        onAction(recommendationId, action);
    }

    const getTimeDiff = (executionDate) => {
        if (!executionDate) return 100;
        const timeDiff = formatDistanceStrict(
            new Date(),
            new Date(executionDate),
            {unit: 'minute'}
        );
        const time = Number(timeDiff.split(' ')[0]);
        return time;
    }
    const cancelDisabled = () => {
        const t = getTimeDiff(lastExecutionDate);
        if (lastExecutionDate && t < 20) return true;
        if (recommendationType === 'Completed') return true;
        return false;
    }

    const nowDisabled = () => {
        const t = getTimeDiff(lastExecutionDate);
        if (lastExecutionDate && t < 20) return true;
        if (recommendationType === 'Completed') return true;
        if (recommendationType === 'now') return false;
        return false;
    }

    const scheduleDisabled = () => {
        const t = getTimeDiff(lastExecutionDate);
        if (lastExecutionDate && t < 20) return true;
        if (recommendationType === 'Completed') return true;
        return false;
    }

    const disabledAction = () => {
        console.log('Disabled Action clicked');
        return false;
    }

    return (
        <>
            <Space size={"small"}>
                <Tooltip title="Run Now" placement="bottom">
                    <img
                        alt="action"
                        className={`actionLink ${nowDisabled() && 'disabled'}`}
                        src={toAbsoluteUrl("/media/run.svg")}
                        onClick={nowDisabled() ? disabledAction : handleClick(recommendationId)}/>
                </Tooltip>
            </Space>
            <Space size={"small"}>
                <Tooltip title="Schedule" placement="bottom">
                    <img
                        alt="action"
                        className={`actionLink ${scheduleDisabled() && 'disabled'}`}
                        src={toAbsoluteUrl("/media/schedule.svg")}
                        onClick={scheduleDisabled() ? disabledAction : handleClick(recommendationId, 'schedule')}/>
                </Tooltip>
            </Space>
            <Space size={"small"}>
                <Tooltip title="Cancel" placement="bottom">
                    <img
                        alt="action"
                        className={`actionLink ${cancelDisabled() && 'disabled'}`}
                        src={toAbsoluteUrl("/media/delete.svg")}
                        onClick={cancelDisabled() ? disabledAction : handleClick(recommendationId, recommendationType === 'Scheduled' ? 'cancel' : 'reject')}/>
                </Tooltip>
            </Space>
            <Space size={"small"}>
                <Tooltip title="Info" placement="bottom">
                    <img
                        alt="action"
                        className="actionLink"
                        src={toAbsoluteUrl("/media/info.svg")}
                        onClick={handleClick(recommendationId, 'info')}/>
                </Tooltip>
            </Space>
        </>
    );
}
