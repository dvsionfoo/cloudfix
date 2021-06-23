import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import Icon from '@material-ui/core/Icon';
import axios from "axios";
import {connect} from "react-redux";
import {useHistory} from 'react-router-dom';

import {AddUser} from './../components/AddUser';
import {actions} from './../../redux/appReducers';
import {GET_ACCOUNTS_URL, LOCAL_STORAGE_KEY} from './../../app/appConfig';
import {toAbsoluteUrl} from "./../helpers";
import {DeleteAccount} from './../components/DeleteAccount';
import {Input, List, Modal, Space, Table, Tabs} from 'antd';
import {FilterFilled} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";

function Accounts(props) {
    let history = useHistory();
    const userDetails = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    (!userDetails || !userDetails.accessToken) && history.push("/login")

    const {userAccounts, accounts} = props;
    const [modal, setModal] = useState(false);
    const [deleteAccountModal, setDeleteAccountModal] = useState(false);
    const [loading, setLoading] = useState(false);

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
                let tempObj = []
                response.data.forEach(itr => {
                    tempObj.push({key: itr.id, ...itr, lastScheduleDate: getLastScheduleDate(itr.lastScheduleDate)})
                    tempObj.push({key: itr.id, ...itr, lastScheduleDate: getLastScheduleDate(itr.lastScheduleDate)})
                    tempObj.push({key: itr.id, ...itr, lastScheduleDate: getLastScheduleDate(itr.lastScheduleDate)})
                    tempObj.push({key: itr.id, ...itr, lastScheduleDate: getLastScheduleDate(itr.lastScheduleDate)})
                    tempObj.push({key: itr.id, ...itr, lastScheduleDate: getLastScheduleDate(itr.lastScheduleDate)})
                    tempObj.push({key: itr.id, ...itr, lastScheduleDate: getLastScheduleDate(itr.lastScheduleDate)})
                    tempObj.push({key: itr.id, ...itr, lastScheduleDate: getLastScheduleDate(itr.lastScheduleDate)})
                    tempObj.push({key: itr.id, ...itr, lastScheduleDate: getLastScheduleDate(itr.lastScheduleDate)})
                })
                setTableData(tempObj);
                console.log(tempObj)
                disableLoading();
            })
            .catch(error => {
                disableLoading();
            });
    }

    const showDeleteInfo = (text) => {
        showDeleteAccountModal();
        console.log(text);
    }

    const getLastScheduleDate = (timeInSeconds) => {
        let t = new Date(0);
        t.setSeconds(timeInSeconds);
        return t.toLocaleString();
    }
    const {TabPane} = Tabs;
    const [tableData, setTableData] = useState([]);
    const [payerAccountTableData, setPayerAccountTableData] = useState([]);
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

    useEffect(() => {
        getUserAccounts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [connectObj, setConnectObj] = useState({});
    const [connectModal, setConnectModal] = useState(false);

    const [disconnectObj, setDisconnectObj] = useState({});
    const [disconnectModal, setDisonnectModal] = useState(false);
    const disconnect = (record) => {
        setDisconnectObj(record);
        setDisonnectModal(true);
    };

    const connect = (record) => {
        setConnectObj(record);
        setConnectModal(true)
    };

    const resourceAccountsColumn = [
        {
            title: 'ACCOUNT ID',
            dataIndex: 'accountId',
            key: 'accountId',
            width: '25%',
        },
        {
            title: 'ACCOUNT NAME',
            dataIndex: 'accountNickname',
            key: 'accountNickname',
            ...getColumnSearchProps('accountNickname', 'Account NAME'),
            sorter: (a, b) => a.accountNickname.localeCompare(b.accountNickname)
        },
        {
            title: 'LAST SCANNED TIME',
            dataIndex: 'lastScheduleDate',
            key: 'lastScheduleDate',
            ...getColumnSearchProps('lastScheduleDate', 'LAST SCANNED TIME'),
            sorter: (a, b) => a.lastScheduleDate.localeCompare(b.lastScheduleDate)
        },
        {
            title: 'LAST SCANNED STATUS',
            dataIndex: 'lastScheduleStatus',
            key: 'lastScheduleStatus',
            ...getColumnSearchProps('lastScheduleStatus', 'LAST SCANNED STATUS'),
            sorter: (a, b) => a.lastScheduleStatus.localeCompare(b.lastScheduleStatus)
        },
        {
            title: 'ACTION',
            dataIndex: 'action',
            key: 'action',
            width: "136",
            render: (text, recommendation) => (
                <img alt="action"
                     className="actionLink"
                     src={toAbsoluteUrl("/media/delete.png")}
                     onClick={() => showDeleteInfo(text)}
                />
            )
        },
    ];
    const payerAccountsColumn = [
        {
            title: 'ACCOUNT ID',
            dataIndex: 'accountId',
            key: 'accountId',
            width: '25%',
        },
        {
            title: 'ACCOUNT NAME',
            dataIndex: 'accountNickname',
            key: 'accountNickname',
            ...getColumnSearchProps('accountNickname', 'Account NAME'),
            sorter: (a, b) => a.accountNickname.localeCompare(b.accountNickname)
        },
        {
            title: 'TOTAL SUB ACCOUNTS',
            dataIndex: 'totalSubAccounts',
            key: 'totalSubAccounts',
            ...getColumnSearchProps('totalSubAccounts', 'TOTAL SUB ACCOUNTS'),
            sorter: (a, b) => a.totalSubAccounts.localeCompare(b.totalSubAccounts)
        },
        {
            title: 'CONNECTED SUB ACCOUNTS',
            dataIndex: 'connectedSubAccounts',
            key: 'connectedSubAccounts',
            ...getColumnSearchProps('connectedSubAccounts', 'CONNECTED SUB ACCOUNTS'),
            sorter: (a, b) => a.connectedSubAccounts.localeCompare(b.connectedSubAccounts)
        },
        {
            title: 'ACTION',
            dataIndex: 'action',
            key: 'action',
            width: "136",
            render: (text, recommendation) => (
                <img alt="action"
                     className="actionLink"
                     src={toAbsoluteUrl("/media/delete.png")}
                     onClick={() => showDeleteInfo(recommendation)}
                />
            )
        },
    ];
    const connectedSubAccountsColumn = [
        {
            title: 'ACCOUNT ID',
            dataIndex: 'accountId',
            key: 'accountId',
            width: '25%',
        },
        {
            title: 'ACCOUNT NAME',
            dataIndex: 'accountNickname',
            key: 'accountNickname',
            ...getColumnSearchProps('accountNickname', 'Account NAME'),
            sorter: (a, b) => a.accountNickname.localeCompare(b.accountNickname)
        },
        {
            title: 'ACTION',
            dataIndex: 'action',
            key: 'action',
            width: "136",
            render: (text, recommendation) => (
                <Button className="btn btn-outline-primary font-weight-bolder font-size-sm"
                        onClick={() => disconnect(recommendation)}>
                    DISCONNECT
                </Button>
            )
        },
    ];

    const subAccountsToConnectColumn = [
        {
            title: 'ACCOUNT ID',
            dataIndex: 'accountId',
            key: 'accountId',
            width: '25%',
        },
        {
            title: 'ACCOUNT NAME',
            dataIndex: 'accountNickname',
            key: 'accountNickname',
            ...getColumnSearchProps('accountNickname', 'Account NAME'),
            sorter: (a, b) => a.accountNickname.localeCompare(b.accountNickname)
        },
        {
            title: 'ACTION',
            dataIndex: 'action',
            key: 'action',
            width: "136",
            render: (text, recommendation) => (
                <Button className="btn btn-outline-primary font-weight-bolder font-size-sm"
                        onClick={() => connect(recommendation)}>
                    CONNECT
                </Button>
            )
        },
    ];

    const handleCancel = () => {
        setDisonnectModal(false);
        setConnectModal(false);
        setDisconnectObj({});
        setConnectObj({});
    };
    const data = [
        '1. Racing car sprays burning fuel into crowd.',
        '2. Japanese princess to wed commoner.',
        '3. Australian walks 100km after outback crash.',
        '4. Man charged over missing wedding girl.',
        '5. Los Angeles battles huge wildfires.',
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
                                <span className="card-label font-weight-bolder">AWS Accounts</span>
                                <span
                                    className="text-muted mt-3 font-weight-bold font-size-sm">Manage your accounts</span>
                            </h3>
                            <div className="card-toolbar">
                                <Button
                                    className="btn btn-outline-primary font-weight-bolder font-size-sm"
                                    onClick={getUserAccounts}
                                ><Icon className="fa fa-sync"/>
                                    Refresh Accounts {loading && <span className="ml-3 spinner spinner-white"></span>}
                                </Button>
                                <Button
                                    className="btn btn-outline-primary font-weight-bolder font-size-sm"
                                    onClick={showModal}
                                ><Icon className="fa fa-plus"/>
                                    Add New AWS Account
                                </Button>
                            </div>
                        </div>
                        {/* end::Header */}

                        {/* begin::Body */}
                        <div className="card-body py-0">
                            <Tabs defaultActiveKey="1">
                                <TabPane tab={`Resource Accounts ${tableData ? tableData.length : ''}`} key="1">
                                    <Table bordered={true} loading={loading}
                                           pagination={{pageSize: 10, showSizeChanger: false, hideOnSinglePage: true}}
                                           columns={resourceAccountsColumn} dataSource={tableData}/>
                                </TabPane>
                                <TabPane tab={`Billing Accounts ${tableData ? tableData.length : ''}`} key="2">
                                    <div className='billingAccounts'>
                                        <div className='grid'>
                                            <div style={{overflowY: "auto"}}>
                                                <span className="card-label font-weight-bolder">PAYER ACCOUNT</span>
                                                <Table bordered={true} loading={loading} pagination={false}
                                                       columns={resourceAccountsColumn} dataSource={tableData}/>
                                            </div>
                                            <div className='subAccounts'>
                                                <div style={{overflowY: "auto"}}>
                                                <span
                                                    className="card-label font-weight-bolder">CONNECTED SUB ACCOUNTS</span>
                                                    <Table bordered={true} loading={loading} pagination={false}
                                                           scroll={true}
                                                           columns={connectedSubAccountsColumn} dataSource={tableData}/>
                                                </div>
                                                <div style={{overflowY: "auto"}}>
                                                <span
                                                    className="card-label font-weight-bolder">SUB ACCOUNTS TO CONNECT</span>
                                                    <Table bordered={true} loading={loading} pagination={false}
                                                           columns={subAccountsToConnectColumn} dataSource={tableData}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                        {/* end::Body */}
                        <Modal title={null} wrapClassName='connectModal' centered={true} width={796}
                               visible={connectModal} onCancel={handleCancel} footer={null}>
                            <div className='awsIcon'>
                                <img alt="action" src={toAbsoluteUrl("/media/aws.svg")} onClick={showDeleteInfo}/>
                            </div>
                            <div className='connectText'>
                                <div className='title'>
                                    <Title level={5}>Connect Your AWS Account</Title>
                                </div>
                                <div className='para'>
                                    <Paragraph>You need to be logged in to your AWS account in this browser before you
                                        connect CloudFix. If you are not logged in
                                        yet <span>log in your aws account </span>now</Paragraph>
                                </div>
                            </div>
                            <div className='templateNav'>
                                <div className='content'>
                                    <div className='leftContent'>
                                        <div className='title'>
                                            <Title level={5}>Run CloudFormation Template</Title>
                                        </div>
                                        <div className='para expansion'>
                                            <Paragraph>You need to be logged in to your AWS account in this browser
                                                before
                                                you
                                                connect CloudFix. If you are not logged in
                                                yet <span>log in your aws account </span>now</Paragraph>
                                        </div>
                                    </div>
                                    <div className='rightContent'>
                                        <div className='title'>
                                            <Button className="btn btn-outline-primary font-weight-bolder font-size-sm">
                                                RUN TEMPLATE
                                            </Button>
                                        </div>
                                        <div className='para expansion'>
                                            <Paragraph>Need help? <span> Check out step-by-step guide</span></Paragraph>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                        <Modal title={<Title level={4} style={{color: '#5d78ff'}}>Disconnect AWS Account</Title>}
                               wrapClassName='disconnectModal' centered={true} width={796}
                               visible={disconnectModal} onCancel={handleCancel} footer={null}>
                            <Title level={5}>INSTRUCTIONS TO DISCONNECT YOUR ACCOUNT FROM CLOUDCFO</Title>

                            <List dataSource={data} renderItem={item => (
                                <List.Item>
                                    {item}
                                </List.Item>
                            )}
                            />
                        </Modal>
                    </div>
                </div>
            </div>
        </div>

    );
}

function mapStateToProps(state) {
    const {accounts} = state.cloudFix;
    return {userAccounts: accounts}
}

export default connect(mapStateToProps, actions)(Accounts);
