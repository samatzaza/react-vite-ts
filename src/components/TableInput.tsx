import React, { useState } from 'react';
import { Button, Table, Input, Popconfirm, Form, Col, Row, FormProps, Modal, Upload } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Import the autotable plugin
import dayjs from 'dayjs';
import { createStyles } from 'antd-style';
const useStyle = createStyles(({ css }) => ({
    customTable: css`
    .ant-table-thead > tr > th {
      background-color: #01049b !important;
      color: white !important;
      text-align: center;
    }
  `,
}));

type RowData = {
    key: string;
    name: string;
    age: number;
    email: string;
};

const { Dragger } = Upload;

const TableInput: React.FC = () => {
    const { styles } = useStyle();

    const [rows, setRows] = useState<RowData[]>([{ key: Date.now().toString(), name: '', age: 0, email: '' }]);
    const [form] = Form.useForm(); // Get the form instance to access form values
    const [modalVisible, setModalVisible] = useState(false); // Control modal visibility
    const [fileList, setFileList] = useState([]); // Store selected files

    const handleFileChange = ({ fileList }: any) => {
        setFileList(fileList);
    };
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
    // const exportToPDF = () => {
    //     const doc = new jsPDF();

    //     // Capture the form data
    //     const formData = form.getFieldsValue(); // Get the values of all form fields

    //     // Add Form Data to PDF
    //     doc.text('Form Data:', 10, 10);
    //     let y = 20;
    //     Object.entries(formData).forEach(([key, value]) => {
    //         doc.text(`${key}: ${value}`, 10, y);
    //         y += 10;
    //     });

    //     // Add a space between form data and table
    //     y += 10;
    //     doc.text('Table Data:', 10, y);

    //     // Define columns (headers) for the table
    //     const columns = [
    //         { title: "Name", dataKey: "name" },
    //         { title: "Age", dataKey: "age" },
    //         { title: "Email", dataKey: "email" },
    //     ];

    //     // Create data array (rows) for the table
    //     const data = rows.map((row) => ({
    //         name: row.name,
    //         age: row.age,
    //         email: row.email,
    //     }));

    //     // Use the autoTable plugin to create the table
    //     doc.autoTable({
    //         head: [columns.map(col => col.title)],
    //         body: data.map(row => columns.map(col => row[col.dataKey])),
    //         startY: y + 20,
    //         margin: { top: 20 },
    //         theme: 'grid',
    //         styles: { cellPadding: 5, fontSize: 10, overflow: 'linebreak' },
    //     });

    //     // Generate PDF as a Blob
    //     const pdfBlob = doc.output('blob');

    //     // Create a URL for the Blob
    //     const url = URL.createObjectURL(pdfBlob);

    //     // Open a new window to preview the PDF
    //     const newWindow = window.open(url, '_blank');
    //     if (newWindow) {
    //         newWindow.focus();
    //     }
    // };
    // console.log(rows);

    const onFinish: FormProps<RowData>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<RowData>['onFinishFailed'] = (errorInfo) => {
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
            <h2 className="text-2xl mb-4 text-center">Form Input</h2>
            <Form
                form={form} // Link the form instance
                name="horizontal_login"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: '100%' }}
                initialValues={{
                    prNo: "0258/001",
                    createDate: dayjs().format("YYYY-MM-DD HH:mm:ss")
                }}
                autoComplete="off"
                // labelAlign='left'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row gutter={24} className='pl-0'>
                    <Col span={8}> </Col>
                    <Col span={8}> </Col>
                    <Col span={8}>
                        <Form.Item
                            label="PrNo."
                            name="prNo"
                        >
                            <Input readOnly className='text-end' />
                        </Form.Item>
                    </Col>
                    <Col span={8}> </Col>
                    <Col span={8}> </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Date"
                            name="createDate"
                        >
                            <Input readOnly />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Requestor"
                            name="requestor"
                        // rules={[{ required: true, message: 'Please input your name' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Employee"
                            name="employee"
                        // rules={[{ required: true, message: 'Please input your name' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Attach Files">
                            <Input
                                readOnly
                                value={fileList.length > 0 ? `${fileList.length} file(s) selected` : ""}
                                placeholder="Click to upload files"
                                className="cursor-pointer"
                                onClick={() => setModalVisible(true)} // Open modal when input is clicked
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Department"
                            name="department"
                        // rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Company"
                            name="company"
                        // rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Remark"
                            name="remark"
                        // rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Customer Name"
                            name="customerName"
                        // rules={[{ required: true, message: 'Please input your name' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Customer Code"
                            name="customerCode"
                        // rules={[{ required: true, message: 'Please input your name' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Customer Phone"
                            name="customerPhone"
                        // rules={[{ required: true, message: 'Please input your name' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    {/* <Col span={24}>
                        <Form.Item
                            label="Address"
                            name="address"
                            labelAlign="left"
                        // rules={[{ required: true, message: 'Please input your name' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col> */}
                    <Col span={24}>
                        <div className="flex items-start">
                            <div className="min-w-[80px] ml-5 ">Address:</div>
                            <Form.Item
                                name="address"
                                className="w-full"
                                wrapperCol={{ span: 24 }}
                            // rules={[{ required: true, message: 'Please input your name' }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                    </Col>
                </Row>
            </Form>
            <Modal
                title="Upload Files"
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null} // No footer
            >
                <Dragger
                    multiple
                    beforeUpload={() => false} // Prevent auto-upload
                    fileList={fileList}
                    onChange={handleFileChange}
                    className="w-full"
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading
                        company data or other banned files.
                    </p>
                </Dragger>
            </Modal>

            <Table
                className={`${styles.customTable} text-sm`}
                columns={columns}
                dataSource={rows}
                pagination={false}
                rowClassName="editable-row"
                bordered
            />

            <div className="flex justify-between py-3 px-5">
                <div></div>
                <Button
                    onClick={addRow}
                    type="primary"
                    icon={<PlusOutlined />}
                    className="mr-2"
                >
                    Add Row
                </Button>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default TableInput;
