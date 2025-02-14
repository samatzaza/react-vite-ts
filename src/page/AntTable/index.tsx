import React, { useState } from 'react';
import { Form, Input, InputNumber, Modal, Popconfirm, Table, Typography } from 'antd';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
}

const originData = Array.from({ length: 100 }).map<DataType>((_, i) => ({
    key: i.toString(),
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
}));

const AntTable: React.FC = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState<DataType[]>(originData);
    const [searchText, setSearchText] = useState('');
    const [editingKey, setEditingKey] = useState('');
    const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRowDoubleClick = (record: DataType) => {
        setEditingRecord(record);
        form.setFieldsValue(record);
        setIsModalOpen(true);
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

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditingRecord(null);
        form.resetFields();
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as DataType;

            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    // Filtered data based on search input
    const filteredData = data.filter((item) =>
        Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '45%',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            width: '15%',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: '40%',
        },
    ];

    return (
        <>
            <div className='flex justify-end items-center '>
                <Input
                    placeholder="Search by Name, Age, or Address"
                    allowClear
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ marginBottom: 16, width: 300 }}
                />
            </div>

            <Table<DataType>
                bordered
                dataSource={filteredData}
                columns={columns}
                // rowClassName="editable-row"
                pagination={{ pageSize: 10 }}
                onRow={(record) => ({
                    onDoubleClick: () => handleRowDoubleClick(record), // Double-click to open modal
                })}
            />

            {/* Modal for Editing */}
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
        </>
    );
};

export default AntTable;
