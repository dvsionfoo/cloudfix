import React, {useEffect, useState} from "react";

import { RecommendationActions } from './RecommendationActions';
import { FormatNumber } from "./../helpers";
import {Button, Input, Space, Table, Tag} from "antd";
import {FilterOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

export const InprogressRecommendations = ({ recommendations, onActionClick }) => {

  const [tableData, setTableData] = useState([]);

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
  }, []);

  const handleOnAction = (recommendationId, actionType = 'now') => {
    onActionClick([recommendationId], actionType);
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
      sorter: (a, b) =>  a.resourceId.localeCompare(b.resourceId)
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
          <p>Nothing In Progress now! Go to new recommendations tab to get started.</p>
        ) : (
            <div className="table-responsive">
              <Table pagination={false} columns={columns} dataSource={tableData}/>
            </div>
          )
      }
    </>
  );
};
