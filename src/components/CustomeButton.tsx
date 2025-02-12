import { Button, Checkbox, Form, Radio, Select } from 'antd';
import React, { useState } from 'react'

interface TableRowItem {
    label: string;
    value: string;
}

const rowTable: TableRowItem[] = [
    { label: 'SS/SR', value: 'SS_SR' },
    { label: 'GY', value: 'GY' },
    { label: 'FM', value: 'FM' },
    { label: 'FL', value: 'FL' },
    { label: 'FG', value: 'FG' },
    { label: 'FC', value: 'FC' },
    { label: 'XZU', value: 'XZU' }
];

const colTable: TableRowItem[] = [
    { label: "hmst_25", value: 'A' },
    { label: 'hmst_26', value: 'B' },
    { label: 'hmst_27', value: 'C' },
    { label: 'hmst_28', value: 'D1' },
    { label: 'hmst_29', value: 'D2' },
    { label: 'hmst_30', value: 'D3' },
    { label: 'hmst_31', value: 'D4' },
    { label: 'hmst_32', value: 'E1' },
    { label: 'hmst_33', value: 'E2' },
    { label: 'hmst_34', value: 'E3' },
    { label: 'hmst_35', value: 'E4' },
    { label: 'hmst_36', value: 'F' },
    { label: 'hmst_37', value: 'G' },
    { label: 'hmst_38', value: 'H' },
    { label: 'hmst_39', value: 'I' },
    { label: 'hmst_40', value: 'W' },
    { label: 'hmst_41', value: 'X' },
    { label: 'hmst_42', value: 'Z' },
    { label: 'hmst_43', value: 'Z1' },
    { label: 'hmst_44', value: 'Z2' },
    { label: 'hmst_45', value: 'Z3' },
    { label: 'hmst_46', value: 'Z4' }
];

type FieldType = {
    stock?: string;
    businessType?: string[];
};

function CustomeButton() {
    const [msgError, setMsgError] = useState({ visible: false, message: [] })
    const [currentLstAct, setCurrentLstAct] = useState<(boolean | null)[][]>([]);

    const transformLstActToSelectedColumns = (lstAct: (boolean | null)[][], rowTable: TableRowItem[], colTable: TableRowItem[]) => {
        const result: Record<string, string[]> = {};

        rowTable.forEach((rowItem, rowIndex) => {
            const selectedColumns: string[] = [];

            colTable.forEach((colItem, colIndex) => {
                if (lstAct[rowIndex][colIndex] === true) {
                    selectedColumns.push(colItem.value);
                }
            });

            result[rowItem.value] = selectedColumns;
        });

        return result;
    };

    const isAllSelected = () => {
        let countAll = 0, totalAll = 0;
        currentLstAct.forEach(row => {
            countAll += row.filter(col => col !== false).length;
            totalAll += row.length;
        });
        return countAll === totalAll;
    };

    const onChangeCheckbox = (row: 'All' | number, value?: boolean) => {
        const updatedLstAct = JSON.parse(JSON.stringify(currentLstAct));

        if (row === 'All') {
            updatedLstAct.forEach(rowData => {
                for (let i = 0; i < rowData.length; i++) {
                    if (rowData[i] !== null) rowData[i] = value ?? false;
                }
            });
        } else {
            const rowData = updatedLstAct[row];
            for (let i = 0; i < rowData.length; i++) {
                if (rowData[i] !== null) rowData[i] = value ?? false;
            }
        }

        // dispatch(updateStateHMSADashboard({
        //     lstAct: updatedLstAct,
        // }));

        setCurrentLstAct(updatedLstAct);
    };

    const onChangeButton = (col: number, row?: number) => {
        const updatedLstAct = JSON.parse(JSON.stringify(currentLstAct));

        if (row === undefined) {
            const isAnyFalse = updatedLstAct.some(rowData => rowData[col] === false);

            updatedLstAct.forEach(rowData => {
                if (rowData[col] !== null) {
                    rowData[col] = isAnyFalse ? true : !rowData[col];
                }
            });
        } else {
            updatedLstAct[row][col] = !updatedLstAct[row][col];
        }

        // dispatch(updateStateHMSADashboard({
        //   lstAct: updatedLstAct,
        // }));

        setCurrentLstAct(updatedLstAct);
    };

    const onFinish = (values: any) => {
        console.log('values', values);
        const selectedColumnsMap = transformLstActToSelectedColumns(currentLstAct, rowTable, colTable);
        setMsgError({ visible: false, message: [] })
        console.log('selectedColumnsMap', selectedColumnsMap);

        let message: any = []
        if (!values.businessType) {
            message.push({ key: 2, text: 'businessType' })
        }
        if (message.length > 0) {
            setMsgError({ visible: true, message })
        }
        else {
            console.log(values);
        }
        // onClose()
    };

    return (
        <div>
            <Form
                name="basic"
                style={{ width: "100%" }}
                initialValues={{
                    //   stock: stock,
                    //   businessType: businessTypes
                }}
                layout="vertical"
                onFinish={(values) => onFinish(values)}
                autoComplete="off"
                className="flex flex-col h-full space-y-3 p-0"
            >
                <div style={{ height: `calc(100vh - 149px)` }}>
                    <Form.Item<FieldType> label="stock" name="stock" className="mb-4">
                        <Radio.Group
                            style={{ width: '100%' }}
                            // value={stock}
                            options={[
                                { label: ('hmst_47'), value: 1 },
                                { label: ('control_room_10'), value: 2 },
                                { label: ('control_room_11'), value: 3 },
                                { label: ('Customer Stock'), value: 4 },
                            ]}
                            optionType="button"
                            buttonStyle="solid"
                        />
                    </Form.Item>

                    <Form.Item<FieldType> label={('businessType')} name="businessType" className="mb-6">
                        <Select
                            showSearch
                            mode="multiple"
                            allowClear={true}
                            optionFilterProp="label"
                            maxTagCount="responsive"
                            // value={businessTypes}
                            options={[
                                {
                                    value: "A",
                                    label: "AGRI"
                                },
                                {
                                    value: "B",
                                    label: "AGMINRI"
                                },
                                {
                                    value: "C",
                                    label: "CONS"
                                },
                                {
                                    value: "D",
                                    label: "FACT"
                                },
                                {
                                    value: "E",
                                    label: "RS/WS"
                                },
                                {
                                    value: "F",
                                    label: "TRAN"
                                },
                                {
                                    value: "H",
                                    label: "FISH"
                                },
                                {
                                    value: "W",
                                    label: "Wait"
                                },
                                {
                                    value: "X",
                                    label: "GOVT"
                                },
                                {
                                    value: "Z",
                                    label: "OTHR"
                                }
                            ]}
                        />
                    </Form.Item>
                    <div className='table-check-hmst py-5 scroll-table-x overflow-x-auto'>
                        <table>
                            <thead>
                                <tr>
                                    <th className='sticky left-0 z-100 bg-white'>
                                        <Checkbox
                                            checked={isAllSelected()}
                                            onChange={(e) => onChangeCheckbox('All', e.target.checked)}
                                        />
                                    </th>
                                    {colTable.map((itemC, indC) => {
                                        const isColumnSelected = currentLstAct.every(row => row[indC] !== false);
                                        return (
                                            <th key={indC}>
                                                <Button
                                                    className='m-3'
                                                    type={isColumnSelected ? "primary" : "default"}
                                                    size="small"
                                                    onClick={() => onChangeButton(indC)}
                                                >
                                                    {(itemC.label)}
                                                </Button>
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {currentLstAct.map((row, indR) => {
                                    const itemR = rowTable[indR];
                                    const isRowSelected = row.every(col => col !== false);

                                    return (
                                        <tr key={indR}>
                                            <th className='flex sticky left-0 z-100 bg-white'>
                                                <Checkbox
                                                    className='m-3'
                                                    checked={isRowSelected}
                                                    onChange={(e) => onChangeCheckbox(indR, e.target.checked)}
                                                >
                                                    {itemR.label}
                                                </Checkbox>
                                            </th>
                                            {row.map((col, indC) => (
                                                <td key={indC} className='text-center'>
                                                    <Checkbox
                                                        className='m-3'
                                                        checked={col!}
                                                        onClick={() => {
                                                            onChangeButton(indC, indR);
                                                        }}
                                                    >
                                                    </Checkbox>
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Form.Item className="mt-auto">
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full font-bold mt-2"
                        loading={false}>
                        {('search')}
                    </Button>
                </Form.Item>
            </Form>
            {
                // msgError.visible && <div className="mt-2">
                //   <BarAlert
                //     title="invalid_field_required"
                //     type="warning"
                //     message={msgError.message}
                //   />
                // </div>
            }
        </div>
    )
}

export default CustomeButton
