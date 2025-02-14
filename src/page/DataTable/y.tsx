import React, { useState } from 'react';
import { Form, Input, InputNumber, Modal, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css, token }) => {
    const antCls = '.ant'; // Explicitly set the Ant Design class prefix
    return {
        customTable: css`
         ${antCls}-table-thead > tr > th {
                    background-color: #1890ff; /* Change this to your preferred color */
                    color: white; /* Adjust text color */
                }
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
    };
});

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    street: string;
    building: string;
    number: number;
    companyAddress: string;
    companyName: string;
    gender: string;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        fixed: 'left',
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'John',
                value: 'John',
            },
        ],
        onFilter: (value, record) => record.name.indexOf(value as string) === 0,
    },
    {
        title: 'Other',
        children: [
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                width: 150,
                sorter: (a, b) => a.age - b.age,
            },
            {
                title: 'Address',
                children: [
                    {
                        title: 'Street',
                        dataIndex: 'street',
                        key: 'street',
                        width: 150,
                    },
                    {
                        title: 'Block',
                        children: [
                            {
                                title: 'Building',
                                dataIndex: 'building',
                                key: 'building',
                                width: 100,
                            },
                            {
                                title: 'Door No.',
                                dataIndex: 'number',
                                key: 'number',
                                width: 100,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        title: 'Company',
        children: [
            {
                title: 'Company Address',
                dataIndex: 'companyAddress',
                key: 'companyAddress',
                width: 200,
            },
            {
                title: 'Company Name',
                dataIndex: 'companyName',
                key: 'companyName',
            },
        ],
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        width: 80,
        fixed: 'right',
    },
];

const dataSource = Array.from({ length: 100 }).map<DataType>((_, i) => ({
    key: i,
    name: 'John Brown',
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M',
}));

// const originData = Array.from({ length: 100 }).map<DataType>((_, i) => ({
//     key: i.toString(),
//     name: `Edward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
// }));

const OverflowY: React.FC = () => {
    const [data, setData] = useState<DataType[]>(dataSource);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
    const [form] = Form.useForm();

    const { styles } = useStyle();
    const [searchText, setSearchText] = useState('');

    const filteredData = data.filter((item) =>
        Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const handleRowDoubleClick = (record: DataType) => {
        setEditingRecord(record);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditingRecord(null);
        form.resetFields();
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            setData((prevData) =>
                prevData.map((item) =>
                    item.key === editingRecord?.key ? { ...item, ...values } : item
                )
            );
            handleCancel();
        } catch (error) {
            console.log('Validation Failed:', error);
        }
    };

    return (
        <div className="min-h-screen"> {/* Ensuring the parent takes full height */}
            <div className='flex justify-end items-center '>
                <Input
                    placeholder="Search by Name, Age, or Address"
                    allowClear
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ marginBottom: 16, width: 300 }}
                />
            </div>
            <Table<DataType>
                className={styles.customTable}
                columns={columns}
                dataSource={filteredData}
                bordered
                size="middle"
                scroll={{ x: 'calc(1000px + 50%)', y: 'calc(100vh - 120px)' }}
                onRow={(record) => ({
                    onDoubleClick: () => handleRowDoubleClick(record), // Double-click to open modal
                })}
            />
            <Modal
                title="Edit Record"
                open={isModalOpen}
                onOk={handleSave}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="age" label="Age" rules={[{ required: true, message: 'Please enter age!' }]}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please enter address!' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default OverflowY;