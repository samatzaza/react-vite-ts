import React, { useState, useRef } from 'react';
import { Form, Input, InputNumber, Modal, Table, Typography } from 'antd';
import { FixedSizeList as List } from 'react-window'; // Virtualized table
import debounce from 'lodash/debounce';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
}

// Generate 100k data
const generateData = (count: number) =>
    Array.from({ length: count }).map<DataType>((_, i) => ({
        key: i.toString(),
        name: `Edward ${i}`,
        age: 20 + (i % 50),
        address: `London Park no. ${i}`,
    }));

const originData = generateData(100000); // 100k rows

const VirtualizedTable: React.FC = () => {
    const [form] = Form.useForm();
    const originalData = useRef(originData); // Store original data without re-renders
    const [data, setData] = useState<DataType[]>(originData.slice(0, 1000)); // Show limited data initially
    const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');

    // Debounced search function
    const handleSearch = debounce((value: string) => {
        setSearchText(value);
        const filtered = originalData.current.filter(
            (item) =>
                item.name.toLowerCase().includes(value.toLowerCase()) ||
                item.address.toLowerCase().includes(value.toLowerCase()) ||
                item.age.toString().includes(value)
        );
        setData(filtered.slice(0, 1000)); // Limit to avoid overload
    }, 300);

    // Handle row double click for modal edit
    const handleRowDoubleClick = (record: DataType) => {
        setEditingRecord(record);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    // Save edited record
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

    // Close modal
    const handleCancel = () => {
        setIsModalOpen(false);
        setEditingRecord(null);
        form.resetFields();
    };

    // Render each row using react-window
    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const record = data[index];
        return (
            <div
                style={{
                    ...style,
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px',
                    borderBottom: '1px solid #f0f0f0',
                    cursor: 'pointer',
                }}
                onDoubleClick={() => handleRowDoubleClick(record)}
            >
                <Typography.Text>{record.name}</Typography.Text>
                <Typography.Text>{record.age}</Typography.Text>
                <Typography.Text>{record.address}</Typography.Text>
            </div>
        );
    };

    return (
        <>
            {/* Search Input */}
            <Input
                className='w-1/5'
                placeholder="Search (Name, Age, Address)"
                allowClear
                onChange={(e) => handleSearch(e.target.value)}
            />

            {/* Virtualized Table */}
            <div className='flex flex-col p-4'>
                <div className='flex justify-between px-5 items-center border bg-blue-500 text-white'>
                    <p>name</p>
                    <p>age</p>
                    <p>address</p>
                </div>
                <List
                    className='border'
                    height={750}
                    itemCount={data.length}
                    itemSize={35} // Row height
                    width="100%"
                >
                    {Row}
                </List>
            </div>

            {/* Modal for Editing */}
            <Modal
                title="Edit Record"
                open={isModalOpen}
                onOk={handleSave}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="age" label="Age" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default VirtualizedTable;