import React, { useState, useEffect } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { createStyles } from "antd-style";
import { DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import { ColumnsType, ColumnType } from "antd/es/table";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
// import LoadingScreen from "./loading";
// import ErrorScreen from "./error";
import dayjs, { Dayjs } from 'dayjs';
import productApi from "../../services/productApi";
import { ProductType } from "../../misc/product";

const useStyle = createStyles(({ css }) => ({
    customTable: css`
    .ant-table-thead > tr > th {
      background-color: #01049b !important;
      color: white !important;
      text-align: center;
    }
  `,
}));

const startOfYear = dayjs().startOf('year');
const endOfYear = dayjs().endOf('year');

const column: ColumnsType<ProductType> = [
    { title: "ID", dataIndex: "id", key: "id", fixed: "left", width: 150, },
    { title: "Title", dataIndex: "title", key: "title", width: 150, },
    {
        title: "Description", dataIndex: "description", key: "description", width: 150, render: (value) => (
            <p className="truncate">{value}</p>
        )
    },
    { title: "Price", dataIndex: "price", key: "price", width: 150, },
    { title: "Discount", dataIndex: "discountPercentage", key: "discountPercentage", width: 150, },
    { title: "Rating", dataIndex: "rating", key: "rating", width: 150, },
    { title: "Stock", dataIndex: "stock", key: "stock", width: 200, },
    { title: "Tags", dataIndex: "tags", key: "tags", width: 150, },
    { title: "Brand", dataIndex: "brand", key: "brand", width: 150, },
];

function Status() {
    const { RangePicker } = DatePicker;
    const navigate = useNavigate();
    const { styles } = useStyle();
    const [jobId, setJobId] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [searchText, setSearchText] = useState('');

    const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
        startOfYear,
        endOfYear,
    ]);

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    useEffect(() => {
        fetchData();
    }, [jobId, dateRange]);

    const fetchData = async () => {
        try {
            console.log('tryyyy');
            setLoading(true);
            const response = await productApi.getProducts()
            console.log('response', response);
            setProducts(response.data.products);
            // setPagination(prev => ({
            //     ...prev,
            //     total: response.data.total
            // }));
        } catch (err) {
            setError("Failed to fetch jobs");
        } finally {
            setLoading(false);
        }
    };

    const exportToExcel = () => {
        if (products.length === 0) {
            console.warn("No data to export.");
            return;
        }

        // Filter columns that have a dataIndex
        const validColumns = column.filter((col) => "dataIndex" in col) as ColumnType<ProductType>[];

        // Extract column headers
        const headers = validColumns.map((col) => col.title);

        // Map data based on column order
        const data = products.map((product) =>
            validColumns.map((col) => product[col.dataIndex as keyof ProductType])
        );

        // Create worksheet & workbook
        const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

        // Save the file
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const file = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(file, "products.xlsx");
    };


    const filteredjobs = products.filter((product) =>
        Object.values(product).some((value) =>
            value?.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length >= 3) {
            setJobId(value);
        } else if (value.length === 0) {
            setJobId('');
        }
    };

    const handleDateRange: RangePickerProps['onChange'] = (dates) => {
        if (dates && dates[0] && dates[1]) {
            setDateRange([dates[0], dates[1]]);
        } else {
            setDateRange([null, null]); // Ensure it matches [Dayjs | null, Dayjs | null]
        }
    };

    const handleTableChange = (pagination: any) => {
        setPagination(pagination);
    };

    const handleRowDoubleClick = (data: any) => {
        console.log("Row double-clicked:", data);
        navigate(`/detail/${data.id}`);
    };

    // if (loading) return <LoadingScreen />;
    // if (error) return <ErrorScreen message={error} />;

    return (
        <div>
            <div className="flex justify-between items-center mb-4 px-4">
                <RangePicker
                    value={dateRange} // Type-safe value
                    defaultValue={[startOfYear, endOfYear]}
                    onChange={handleDateRange}
                    format={"DD-MM-YYYY"}
                />

                <Input
                    placeholder="Search by Job ID (min 3 characters)"
                    allowClear
                    value={jobId}
                    prefix={<SearchOutlined />}
                    onChange={handleFilter}
                    style={{ width: 300 }}
                    className="ml-auto"
                />
                <Button
                    type="primary"
                    onClick={exportToExcel}
                    className=" bg-green-500 text-white"
                >
                    Export to Excel
                </Button>
                <Input
                    placeholder="Search in all columns..."
                    allowClear
                    value={searchText}
                    prefix={<SearchOutlined />}
                    onChange={handleSearch}
                    style={{ width: 300 }}
                    className="ml-auto"
                />
            </div>
            <Table
                className={styles.customTable}
                columns={column}
                dataSource={filteredjobs}
                scroll={{ x: 1000 }}
                pagination={pagination}
                onChange={handleTableChange}
                onRow={(record) => ({
                    onDoubleClick: () => handleRowDoubleClick(record), // Capture double-click event
                })}
                rowKey="jobId"
            />
        </div>
    );
}

export default Status;