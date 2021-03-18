import React, {useEffect, useState} from "react";
import {Button as ButtonBS} from "react-bootstrap";
import Icon from '@material-ui/core/Icon';
import axios from "axios";
import {connect} from "react-redux";
import {useHistory} from 'react-router-dom';

import {AddUser} from './../components/AddUser';
import {actions} from './../../redux/appReducers';
import {GET_ACCOUNTS_URL, LOCAL_STORAGE_KEY} from './../../app/appConfig';
import {toAbsoluteUrl} from "./../helpers";
import {DeleteAccount} from './../components/DeleteAccount';
import 'antd/dist/antd.css';
import {Input, Space, Table, Button} from "antd";
import {FilterFilled} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

function Accounts(props)
{
    let history = useHistory();
    const userDetails = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    (!userDetails || !userDetails.accessToken) && history.push("/login")

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

    const {userAccounts, accounts} = props;
    const [modal, setModal] = useState(false);
    const [deleteAccountModal, setDeleteAccountModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [amazonAccounts, setAmazonAccounts] = useState([]);
    const enableLoading = () => {
        setLoading(true);
    };
    const disableLoading = () => {
        setLoading(false);
    };
    const showModal = () => {
        setModal(true);
    };

    const hideModal = () => {
        setModal(false);
    };

    const hideModalGetAccounts = () => {
        hideModal();
        getUserAccounts();
    }

    const showDeleteAccountModal = () => {
        setDeleteAccountModal(true);
    };

    const hideDeleteAccountModal = () => {
        setDeleteAccountModal(false);
    };

    const getUserAccounts = () => {
        enableLoading();
        return axios.get(GET_ACCOUNTS_URL)
            .then((response) => {
                accounts(response.data);
                let tempData = [];
                response.data.forEach(itr => {
                    tempData.push({...itr, key: itr.id});
                });
                setAmazonAccounts(tempData);
                disableLoading();
            })
            .catch(error => {
                disableLoading();
            });
    }

    const showDeleteInfo = () => {
        showDeleteAccountModal();
    }

    const getLastScheduleDate = (timeInSeconds) => {
        let t = new Date(0);
        t.setSeconds(timeInSeconds);
        return t.toLocaleString();
    }

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

    useEffect(() => {
        getUserAccounts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns = [
        {
            title: 'ACCOUNT ID',
            dataIndex: 'accountId',
            key: 'accountId',
            ...getColumnSearchProps('accountId', 'Account Id'),
            sorter: (a, b) => a.accountId.localeCompare(b.accountId)

        },
        {
            title: 'LAST SCANNED TIME',
            dataIndex: 'lastScheduleDate',
            key: 'lastScheduleDate',
            ...getColumnSearchProps('lastScheduleDate', 'Last Scanned Time'),
            sorter: (a, b) => a.lastScheduleDate.localeCompare(b.lastScheduleDate),
            render: (text, account) => (
                <div>{account.lastScheduleDate &&
                getLastScheduleDate(account.lastScheduleDate)}</div>
            )
        },
        {
            title: 'LAST SCANNED STATUS',
            dataIndex: 'lastScheduleStatus',
            key: 'lastScheduleStatus',
            ...getColumnSearchProps('lastScheduleStatus', 'Last Scanned Status'),
            sorter: (a, b) => a.lastScheduleStatus.localeCompare(b.lastScheduleStatus)
        },
        {
            title: 'ACTION',
            dataIndex: 'action',
            key: 'action',
            width: "136",
            render: (text, recommendation) => (
                <Space size={"small"}>
                    <img
                        alt="action"
                        className="actionLink"
                        src={toAbsoluteUrl("/media/delete.svg")}
                        onClick={showDeleteInfo}
                    />
                </Space>
            )
        },
    ];

    return (
        <div className="accounts-page">
            <AddUser show={modal} onHide={hideModalGetAccounts}/>
            <DeleteAccount show={deleteAccountModal} onHide={hideDeleteAccountModal}/>
            <div className="row">
                <div className="col-md-12">
                    <div className={`card card-custom card-stretch gutter-b`}>
                        {/* begin::Header */}
                        <div className="card-header border-0 py-5">
                            <h3 className="card-title align-items-start flex-column">
                <span className="card-label font-weight-bolder">
                  AWS Accounts
          </span>
                                <span className="text-muted mt-3 font-weight-bold font-size-sm">
                  Manage your accounts
          </span>
                            </h3>
                            <div className="card-toolbar">
                                <ButtonBS
                                    className="btn btn-outline-primary font-weight-bolder font-size-sm"
                                    onClick={getUserAccounts}
                                ><Icon className="fa fa-sync"/>
                                    Refresh Accounts {loading && <span className="ml-3 spinner spinner-white"></span>}
                                </ButtonBS>
                                <ButtonBS
                                    className="btn btn-outline-primary font-weight-bolder font-size-sm"
                                    onClick={showModal}
                                ><Icon className="fa fa-plus"/>
                                    Add New AWS Account
                                </ButtonBS>
                            </div>
                        </div>
                        <div className="card-body py-0">
                            <div className="table-responsive">
                                {
                                    (!userAccounts || userAccounts.length === 0) ? (
                                        <p>No AWS accounts added yet.</p>
                                    ) : (
                                        <Table pagination={false} bordered columns={columns} dataSource={amazonAccounts}
                                               scroll={{x: 1080}}/>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

function mapStateToProps(state)
{
    const {accounts} = state.cloudFix;
    return {userAccounts: accounts}
}

export default connect(mapStateToProps, actions)(Accounts);
