import { Table, Input, Form, } from 'antd';
import React from 'react';
import { useState } from 'react';

interface DataType {
    key: string;
    order: number;
    name: string;
    unit: string;
    quantity: number;
    price: number;
    total: number;
}

const OrderTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState<DataType[]>([
        {
            key: Date.now().toString(),
            order: 1,
            name: '',
            unit: '',
            quantity: 0,
            price: 0,
            total: 0,
        },
    ]);
    const addRow = () => {
        const newRow = {
            key: Date.now().toString(),
            order: 1,
            name: '',
            unit: '',
            quantity: 0,
            price: 0,
            total: 0,
        };
        setData([...data, newRow]);
    };
    const deleteRow = (key: string) => {
        setData(data.filter(row => row.key !== key));
    };

    const handleInputChange = (key: string, field: string, value: string) => {
        const newRows = data.map((row) => {
            if (row.key === key) {
                return { ...row, [field]: value };
            }
            return row;
        });
        setData(newRows);
    };


    const columns = [
        {
            title: 'ลำดับ',
            dataIndex: 'order',
            key: 'order',
            width: '10%',
            render: (_: any, __: DataType, index: number) => <span>{index + 1}</span>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            render: (text: string, record: DataType) => (
                <Input
                    value={record.name}
                    onChange={(e) => handleInputChange(record.key, 'name', e.target.value)}
                />
            ),
        },
        {
            title: 'หน่วย',
            dataIndex: 'unit',
            key: 'unit',
            width: '15%',
            render: (text: string, record: DataType) => (
                <Input
                    value={record.unit}
                    onChange={(e) => handleInputChange(record.key, 'unit', e.target.value)}
                />
            ),
        },
        {
            title: 'จำนวนที่สั่ง',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '15%',
            render: (text: number, record: DataType) => (
                <Input
                    value={record.quantity}
                    min={0}
                    onChange={(e) => handleInputChange(record.key, 'quantity', e.target.value)}
                />
            ),
        },
        {
            title: 'ราคาต่อหน่วย',
            dataIndex: 'price',
            key: 'price',
            width: '15%',
            render: (text: number, record: DataType) => (
                <Input
                    value={record.price}
                    min={0}
                    onChange={(e) => handleInputChange(record.key, 'price', e.target.value)}
                />
            ),
        },
        {
            title: 'จำนวนเงิน',
            dataIndex: 'total',
            key: 'total',
            width: '15%',
            render: (text: number, record: DataType) => (
                <span>{record.total}</span>
            ),
        },];

    const summary = (data: readonly DataType[]) => {
        const total = data?.reduce((acc, curr) => acc + (curr.total ?? 0), 0) ?? 0;
        return (
            <>
                <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={5} className="text-right">
                        รวม
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>{total}</Table.Summary.Cell>
                </Table.Summary.Row>
                <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={5} className="text-right">
                        ส่วนลด
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>0</Table.Summary.Cell>
                </Table.Summary.Row>
                <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={5} className="text-right">
                        รวมทั้งหมด
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>{total}</Table.Summary.Cell>
                </Table.Summary.Row>
            </>
        );
    };

    return (
        <div>
            <Form form={form}
                component={false}
            >
                <Table
                    className="w-full [&_.ant-table-thead_.ant-table-cell]:bg-blue-500 [&_.ant-table-thead_.ant-table-cell]:text-white"
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    rowClassName="editable-row"
                    summary={() => summary(data)}
                    bordered
                />
                {/* <div className="mt-4 flex justify-center">
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
                </div> */}
            </Form>
        </div>
    );
};

export default OrderTable;
