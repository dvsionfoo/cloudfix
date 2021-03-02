import React, {useEffect, useState} from "react";

import {toAbsoluteUrl} from "./../helpers";
import {RecommendationActions} from './RecommendationActions';
import {Button, Input, Space, Table} from "antd";
import {FilterOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

export const NewRecommendations = ({recommendations, onActionClick}) => {

    const [selectedRecommendations, setSelectedRecommendations] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys , selectedRows: DataType[]) => {
            setSelectedRecommendations(selectedRowKeys);
        }
    };
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        let tempData = [];
        recommendations.forEach(itr => {
            tempData.push({...itr, key: itr.id});
        });
        setTableData(tempData);
    }, []);

    const handleOnAction = (recommendationId, actionType = 'now') => {
        onActionClick([recommendationId], actionType);
    };

    const handleBulkAction = (actionType) => () => {
        setSelectedRecommendations([]);
        onActionClick(selectedRecommendations, actionType);
    }

    const [filterState, setFilterState] = useState({
        searchText: '',
        searchedColumn: '',
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setFilterState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    const handleReset = clearFilters => {
        clearFilters();
        setFilterState({...filterState, searchText: ''})
    };

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<FilterOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({closeDropdown: false});
                            setFilterState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}>
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <FilterOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        render: text =>
            filterState.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[filterState.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            )
    });
    const columns = [
        {
            title: 'RECOMMENDATION',
            dataIndex: 'opportunityDescription',
            key: 'opportunityDescription',
            width: '25%',
        },
        {
            title: 'RESOURCE ID',
            dataIndex: 'resourceId',
            key: 'resourceId',
            ...getColumnSearchProps('resourceId'),
            sorter: (a, b) => a.resourceId.localeCompare(b.resourceId)
        },
        {
            title: 'ACCOUNT',
            dataIndex: 'accountId',
            key: 'accountId',
            ...getColumnSearchProps('accountId'),
            sorter: (a, b) => a.accountId.localeCompare(b.accountId)
        },
        {
            title: 'REGION',
            dataIndex: 'region',
            key: 'region',
            ...getColumnSearchProps('region'),
            sorter: (a, b) => a.region.localeCompare(b.region)
        },
        {
            title: 'SAVINGS',
            dataIndex: 'annualSavings',
            key: 'annualSavings',
        },
        {
            title: 'ACTION',
            dataIndex: 'action',
            key: 'action',
            width: "136",
            render: (text, recommendation) => (
                <RecommendationActions
                    recommendationId={recommendation.id}
                    onAction={handleOnAction}
                    recommendationType="New"
                    lastExecutionDate={recommendation.scheduledAt}
                />
            )
        },
    ];
    return (
        <>
            {
                (!recommendations || recommendations.length === 0) ? (
                    <p>No new recommendations yet! We'll email you as soon as we find new saving opportunities.</p>
                ) : (
                    <div className="table-responsive">
                        {
                            selectedRecommendations.length > 0 ? (
                                <div className="bulkActions" colSpan="6">
                                    <div style={{width: "500px"}}>
                                        <Button variant="outline-secondary" onClick={handleBulkAction('now')}>
                                            <img
                                                alt="action"
                                                className="actionLink"
                                                src={toAbsoluteUrl("/media/run.png")}
                                            />
                                            <span>RUN NOW</span>
                                        </Button>
                                        <Button variant="outline-secondary"
                                                onClick={handleBulkAction('schedule')}>
                                            <img
                                                alt="action"
                                                className="actionLink"
                                                src={toAbsoluteUrl("/media/schedule.png")}
                                            />
                                            <span>SCHEDULE</span>
                                        </Button>
                                        <Button variant="outline-secondary"
                                                onClick={handleBulkAction('cancel')}>
                                            <img
                                                alt="action"
                                                className="actionLink"
                                                src={toAbsoluteUrl("/media/delete.png")}
                                            />
                                            <span>IGNORE</span>
                                        </Button>
                                    </div>
                                    <br/>
                                </div>
                            ) : null}
                        <Table showHeader={selectedRecommendations.length <= 0} rowSelection={{...rowSelection}}
                               pagination={false} columns={columns}
                               dataSource={tableData}/>
                    </div>
                )
            }
        </>
    );
};
