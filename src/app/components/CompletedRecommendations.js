import React, {useEffect, useState} from "react";
import {Button, Input, Space, Tag, Table} from 'antd';
import 'antd/dist/antd.css';
import {FilterFilled} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {FormatNumber} from "./../helpers";

import {RecommendationActions} from './RecommendationActions';

export const CompletedRecommendations = ({recommendations, onActionClick}) => {

    const [tableData, setTableData] = useState([]);

    const handleOnAction = (recommendationId, actionType = 'now') => {
        onActionClick([recommendationId], actionType);
    };

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

    useEffect(() => {
        let tempData = [];
        recommendations.forEach(itr => {
            tempData.push({...itr, key: itr.id});
        });
        setTableData(tempData);
        // eslint-disable-next-line
    }, []);

    const getColumnSearchProps = (dataIndex, placeholder) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    placeholder={`Search ${placeholder}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{height: 24, marginBottom: 8}} allowClear={true}
                />
                <Space style={{display: "flex", justifyContent: "space-between"}}>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
                        Reset
                    </Button>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => {
                            confirm({closeDropdown: false});
                            setFilterState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}>
                        Ok
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <FilterFilled style={{color: filtered ? '#1890ff' : undefined}}/>,
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
            ...getColumnSearchProps('resourceId', 'Resource id'),
            sorter: (a, b) =>  a.resourceId.localeCompare(b.resourceId)
        },
        {
            title: 'ACCOUNT',
            dataIndex: 'accountId',
            key: 'accountId',
            ...getColumnSearchProps('accountId', 'Account Id'),
            sorter: (a, b) => a.accountId.localeCompare(b.accountId)
        },
        {
            title: 'REGION',
            dataIndex: 'region',
            key: 'region',
            filters: [
                {
                    text: 'us-east-1',
                    value: 'us-east-1',
                },
                {
                    text: 'us-east-2',
                    value: 'us-east-2',
                },
            ],
            onFilter: (value, record) => record.region.indexOf(value) === 0,
            sorter: (a, b) => a.region.localeCompare(b.region)
        },
        {
            title: 'SAVINGS',
            dataIndex: 'annualSavings',
            key: 'annualSavings',
            sorter: (a, b) => a.annualSavings - b.annualSavings,
            render: (text, recommendation) => (
                <div style={{float: 'right'}}>${FormatNumber(recommendation.annualSavings)}</div>
            ),
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render: status => (
                <>
                    <Tag color={'#6993FF'} key={status}>{status.toUpperCase()}</Tag>
                </>
            )
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
                    recommendationType="Completed"
                    lastExecutionDate={recommendation.scheduledAt}
                />
            )
        },
    ];
    return (
        <>
            {
                (!recommendations || recommendations.length === 0) ? (
                    <p>No fixes! Go to new recommendations tab to get started.</p>
                ) : (
                      <Table pagination={false} bordered columns={columns} dataSource={tableData} scroll={{x: 1080}}/>
                )
            }
        </>
    );
};
