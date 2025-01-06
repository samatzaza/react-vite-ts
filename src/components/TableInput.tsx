import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Button, Table, Input, Popconfirm, Form, Checkbox, FormProps, Col, Row } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import 'jspdf-autotable'; // Import the autotable plugin
import AdvancedSearchForm from './FormInput'

type RowData = {
    key: string;
    name: string;
    age: number;
    email: string;
};

const TableInput: React.FC = () => {
    const [rows, setRows] = useState<RowData[]>([{ key: Date.now().toString(), name: '', age: 0, email: '' }]);

    // Handle input change for any field
    const handleInputChange = (key: string, field: string, value: string) => {
        const newRows = rows.map((row) => {
            if (row.key === key) {
                return { ...row, [field]: value };
            }
            return row;
        });
        setRows(newRows);
    };

    // Add a new row to the table
    const addRow = () => {
        const newRow = { key: Date.now().toString(), name: '', age: 0, email: '' };
        setRows([...rows, newRow]);
    };

    // Delete the row based on key
    const deleteRow = (key: string) => {
        setRows(rows.filter(row => row.key !== key));
    };

    // Export table data as a PDF with table format
    const exportToPDF = () => {
        const doc = new jsPDF();

        // Define columns (headers)
        const columns = [
            { title: "Name", dataKey: "name" },
            { title: "Age", dataKey: "age" },
            { title: "Email", dataKey: "email" },
        ];

        // Create data array (rows)
        const data = rows.map((row) => ({
            name: row.name,
            age: row.age,
            email: row.email,
        }));

        // Use the autoTable plugin to create the table
        doc.autoTable({
            head: [columns.map(col => col.title)],
            body: data.map(row => columns.map(col => row[col.dataKey])),
            margin: { top: 20 },
            theme: 'grid',
            styles: { cellPadding: 5, fontSize: 10, overflow: 'linebreak' },
        });

        // Save the PDF file
        doc.save('table_data.pdf');
    };

    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // Ant Design Table Columns
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text: string, record: RowData) => (
                <Input
                    value={text}
                    onChange={(e) => handleInputChange(record.key, 'name', e.target.value)}
                />
            ),
        },
        {
            title: 'Age',
            dataIndex: 'age',
            render: (text: string, record: RowData) => (
                <Input
                    type="number"
                    value={text}
                    onChange={(e) => handleInputChange(record.key, 'age', e.target.value)}
                />
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: (text: string, record: RowData) => (
                <Input
                    type="email"
                    value={text}
                    onChange={(e) => handleInputChange(record.key, 'email', e.target.value)}
                />
            ),
        },
        {
            title: 'Actions',
            render: (_: any, record: RowData) => (
                <Popconfirm
                    title="Are you sure you want to delete this row?"
                    onConfirm={() => deleteRow(record.key)}
                >
                    <Button
                        icon={<DeleteOutlined />}
                        type="link"
                        danger
                    >
                        Delete
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4 border">Input Table</h2>
            {/* <AdvancedSearchForm /> */}
            <Form
                name="horizontal_login"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: '100%' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                labelAlign='left'
            >
                <Row gutter={16} className='pl-0'>
                    <Col span={8}>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input className='w-full' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Table
                columns={columns}
                dataSource={rows}
                pagination={false}
                rowClassName="editable-row"
                bordered
            />

            <div className="mt-4 flex justify-center">
                <Button
                    onClick={addRow}
                    type="dashed"
                    icon={<PlusOutlined />}
                    className="mr-2"
                >
                    Add Row
                </Button>
                <Button
                    type="primary"
                    onClick={exportToPDF}
                >
                    Export as PDF
                </Button>
            </div>
        </div>
    );
};

export default TableInput;