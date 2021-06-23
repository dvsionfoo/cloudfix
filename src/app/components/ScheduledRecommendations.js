import React, {useEffect, useState} from "react";

import {toAbsoluteUrl} from "./../helpers";
import {RecommendationActions} from './RecommendationActions';
import {Button, Input, Space, Table} from "antd";
import {FilterFilled} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {FormatNumber, uniqueBy} from "./../helpers";

export const ScheduledRecommendations = ({recommendations, onActionClick}) => {
        const [selectedRecommendations, setSelectedRecommendations] = useState([]);

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                setSelectedRecommendations(selectedRowKeys);
            }
        };
        const [tableData, setTableData] = useState([]);
        const [regions, setRegions] = useState([]);

        useEffect(() => {
            let tempData = [];
            recommendations.forEach(itr => {
                tempData.push({...itr, key: itr.id});
            });
            setTableData(tempData);
            const uniqueReqions = uniqueBy(recommendations, 'region').map(r => {
                return {text: r, value: r};
            });
            setRegions(uniqueReqions);
        }, [recommendations]);

        const handleBulkAction = (actionType) => () => {
            setSelectedRecommendations([]);
            onActionClick(selectedRecommendations, actionType);
        }

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
                            OK
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
                ...getColumnSearchProps('resourceId', 'Resource Id'),
                sorter: (a, b) => a.resourceId.localeCompare(b.resourceId)
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
                filters: regions,
                onFilter: (value, record) => record.region.indexOf(value) === 0,
                sorter: (a, b) => a.region.localeCompare(b.region)
            },
            {
                title: 'SAVINGS',
                dataIndex: 'annualSavings',
                key: 'annualSavings',
                align: 'right',
                sorter: (a, b) => a.annualSavings - b.annualSavings,
                render: (text, recommendation) => (
                    <div style={{float: 'right', paddingRight: '20px'}}>${FormatNumber(recommendation.annualSavings)}</div>
                ),
            },
            {
                title: 'EXEC TIME (Local)',
                dataIndex: 'scheduledAt',
                key: 'scheduledAt',
                width: "60",
                sorter: (a, b) => a.scheduledAt - b.scheduledAt,
                render: (text, recommendation) => (
                    <div>{new Date(recommendation.scheduledAt).toLocaleString()}</div>
                ),
            },
            {
                title: 'ACTION',
                dataIndex: 'action',
                key: 'action',
                width: "160",
                render: (text, recommendation) => (
                    <RecommendationActions
                        recommendationId={recommendation.id}
                        onAction={handleOnAction}
                        recommendationType="Scheduled"
                        lastExecutionDate={recommendation.scheduledAt}
                    />
                )
            },
        ];
        return (
            <>
                {
                    (!recommendations || recommendations.length === 0) ? (
                        <p>No scheduled fixes yet! Go to new recommendations tab to start scheduling.</p>
                    ) : (
                        <div className="table-responsive">
                            {
                                selectedRecommendations.length > 0 ? (
                                    <div className="bulkActions" colSpan="6">
                                        <div style={{width: "500px"}}>
                                            <Button variant="outline-secondary" className="scheduledSelection"
                                                    onClick={handleBulkAction('now')}>
                                                <img
                                                    alt="action"
                                                    className="actionLink"
                                                    src={toAbsoluteUrl("/media/run.svg")}
                                                />
                                                <span>RUN NOW</span>
                                            </Button>
                                            <Button variant="outline-secondary" className="scheduledSelection"
                                                    onClick={handleBulkAction('schedule')}>
                                                <img
                                                    alt="action"
                                                    className="actionLink"
                                                    src={toAbsoluteUrl("/media/schedule.svg")}
                                                />
                                                <span>SCHEDULE</span>
                                            </Button>
                                            <Button variant="outline-secondary" className="scheduledSelection"
                                                    onClick={handleBulkAction('cancel')}>
                                                <img
                                                    alt="action"
                                                    className="actionLink"
                                                    src={toAbsoluteUrl("/media/delete.svg")}
                                                />
                                                <span>IGNORE</span>
                                            </Button>
                                        </div>
                                        <br/>
                                    </div>
                                ) : null

                            }
                            <Table 
                                bordered 
                                rowSelection={{...rowSelection}}
                                pagination={{pageSize: 10, showSizeChanger: false, hideOnSinglePage: true}}
                                columns={columns}
                                dataSource={tableData} />
                        </div>
                    )
                }
            </>
        );
    }
;
