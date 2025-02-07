// import React from 'react';
// import { Table } from 'antd';
// import type { TableColumnsType } from 'antd';

// interface DataType {
//     key: React.Key;
//     name: string;
//     age: number;
//     address: string;
//     description: string;
// }

// const columns: TableColumnsType<DataType> = [
//     { title: 'Name', dataIndex: 'name', key: 'name' },
//     Table.EXPAND_COLUMN,
//     { title: 'Age', dataIndex: 'age', key: 'age' },
//     Table.SELECTION_COLUMN,
//     { title: 'Address', dataIndex: 'address', key: 'address' },
// ];

// const data: DataType[] = [
//     {
//         key: 1,
//         name: 'John Brown',
//         age: 32,
//         address: 'New York No. 1 Lake Park',
//         description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
//     },
//     {
//         key: 2,
//         name: 'Jim Green',
//         age: 42,
//         address: 'London No. 1 Lake Park',
//         description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
//     },
//     {
//         key: 3,
//         name: 'Not Expandable',
//         age: 29,
//         address: 'Jiangsu No. 1 Lake Park',
//         description: 'This not expandable',
//     },
//     {
//         key: 4,
//         name: 'Joe Black',
//         age: 32,
//         address: 'Sydney No. 1 Lake Park',
//         description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
//     },
// ];

// const HidenText: React.FC = () => (
//     <Table<DataType>
//         columns={columns}
//         rowSelection={{}}
//         expandable={{
//             expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
//         }}
//         dataSource={data}
//     />
// );

// export default HidenText;

import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Badge, Dropdown, Space, Table } from 'antd';

interface ExpandedDataType {
    key: React.Key;
    date: string;
    name: string;
    upgradeNum: string;
}

interface DataType {
    key: React.Key;
    name: string;
    platform: string;
    version: string;
    upgradeNum: number;
    creator: string;
    createdAt: string;
}

const items = [
    { key: '1', label: 'Action 1' },
    { key: '2', label: 'Action 2' },
];

const expandDataSource = Array.from({ length: 3 }).map<ExpandedDataType>((_, i) => ({
    key: i.toString(),
    date: '2014-12-24 23:12:00',
    name: 'This is production name',
    upgradeNum: 'Upgraded: 56',
}));

const dataSource = Array.from({ length: 3 }).map<DataType>((_, i) => ({
    key: i.toString(),
    name: 'Screen',
    platform: 'iOS',
    version: '10.3.4.5654',
    upgradeNum: 500,
    creator: 'Jack',
    createdAt: '2014-12-24 23:12:00',
}));

const expandColumns: TableColumnsType<ExpandedDataType> = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
        title: 'Status',
        key: 'state',
        render: () => <Badge status="success" text="Finished" />,
    },
    { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    {
        title: 'Action',
        key: 'operation',
        render: () => (
            <Space size="middle">
                <a>Pause</a>
                <a>Stop</a>
                <Dropdown menu={{ items }}>
                    <a>
                        More <DownOutlined />
                    </a>
                </Dropdown>
            </Space>
        ),
    },
];

const columns: TableColumnsType<DataType> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Platform', dataIndex: 'platform', key: 'platform' },
    { title: 'Version', dataIndex: 'version', key: 'version' },
    { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    { title: 'Creator', dataIndex: 'creator', key: 'creator' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
];

const expandedRowRender = () => (
    <Table<ExpandedDataType>
        columns={expandColumns}
        dataSource={expandDataSource}
        pagination={false}
    />
);

const HidenText: React.FC = () => (
    <>
        <Table<DataType>
            columns={columns}
            expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
            dataSource={dataSource}
        />
        <Table<DataType>
            columns={columns}
            expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
            dataSource={dataSource}
            size="middle"
        />
        <Table<DataType>
            columns={columns}
            expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
            dataSource={dataSource}
            size="small"
        />
    </>
);

export default HidenText;