import React, { useState, useRef, RefObject, forwardRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Item, PDFForm } from '../../../misc/types';

// interface FormProps {
//     ref: RefObject<HTMLDivElement>
// }

const datatable = forwardRef<HTMLDivElement>((props, ref) => {
    // const formRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState<PDFForm>({
        company: 'TG Control',
        poNumber: '1000635375',
        date: '',
        quoteNumber: '1000635375',
        customerName: '',
        customerId: '',
        billingAddress: '',
        contactPerson: '',
        department: '',
        phone: '',
        deliveryLocation: '',
        paymentTerms: '',
        deliveryPeriod: '',
        projectResponsible: '',
        supplierCompany: '',
        supplierContact: '',
        seller: '',
        purpose: '',
        items: Array(8).fill({ no: '', description: '', unit: '', quantity: '', unitPrice: '', amount: '' }),
        total: '0',
        discount: '0',
        grandTotal: '0',
        orderPerson: '',
        approver: '',
        salesPerson: ''
    });

    const handleInputChange = (field: keyof PDFForm, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleItemChange = (index: number, field: keyof Item, value: string) => {
        setFormData(prev => {
            const newItems = [...prev.items];
            newItems[index] = { ...newItems[index], [field]: value };

            if (field === 'quantity' || field === 'unitPrice') {
                const qty = parseFloat(newItems[index].quantity) || 0;
                const price = parseFloat(newItems[index].unitPrice) || 0;
                newItems[index].amount = (qty * price).toFixed(2);
            }

            const total = newItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
            const discount = parseFloat(prev.discount) || 0;
            const grandTotal = (total - discount).toFixed(2);

            return {
                ...prev,
                items: newItems,
                total: total.toFixed(2),
                grandTotal
            };
        });
    };

    const handleDiscountChange = (value: string) => {
        setFormData(prev => {
            const total = parseFloat(prev.total) || 0;
            const discount = parseFloat(value) || 0;
            const grandTotal = (total - discount).toFixed(2);

            return {
                ...prev,
                discount: value,
                grandTotal
            };
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div ref={ref} className="bg-white p-6 shadow-lg">
                <div className="text-center mb-6">
                    <p className="text-lg">บริษัท: {formData.company}</p>
                    <h1 className="text-xl font-bold my-2">ใบรับคำสั่งซื้อ</h1>
                    <p>ใบสั่งซื้อเลขที่: {formData.poNumber}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className='flex items-center gap-x-3'>
                        <label className="block whitespace-nowrap">วันที่:</label>
                        <input
                            type="date"
                            className="w-full border p-1"
                            value={formData.date}
                            onChange={(e) => handleInputChange('date', e.target.value)}
                        />
                    </div>
                    <div className='flex items-center gap-x-3'>
                        <label className="block whitespace-nowrap">ใบเสนอราคาเลขที่:</label>
                        <input
                            type="text"
                            className="w-full border p-1"
                            value={formData.quoteNumber}
                            onChange={(e) => handleInputChange('quoteNumber', e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className='flex items-center gap-x-3'>
                        <label className="block whitespace-nowrap">ชื่อลูกค้า:</label>
                        <input
                            type="text"
                            className="w-full border p-1"
                            value={formData.customerName}
                            onChange={(e) => handleInputChange('customerName', e.target.value)}
                        />
                    </div>
                    <div className='flex items-center gap-x-3'>
                        <label className="block whitespace-nowrap">รหัสลูกค้า:</label>
                        <input
                            type="text"
                            className="w-full border p-1"
                            value={formData.customerId}
                            onChange={(e) => handleInputChange('customerId', e.target.value)}
                        />
                    </div>
                </div>

                <div className='flex items-center gap-x-3 mb-4'>
                    <label className="block whitespace-nowrap">ที่อยู่เปิดบิล:</label>
                    <input
                        className="w-full border p-1"
                        value={formData.billingAddress}
                        onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className='flex items-center gap-x-3'>
                        <label className="block whitespace-nowrap">ชื่อผู้ติดต่อ:</label>
                        <input
                            type="text"
                            className="w-full border p-1"
                            value={formData.contactPerson}
                            onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                        />
                    </div>
                    <div className='flex items-center gap-x-3'>
                        <label className="block whitespace-nowrap">แผนก:</label>
                        <input
                            type="text"
                            className="w-full border p-1"
                            value={formData.department}
                            onChange={(e) => handleInputChange('department', e.target.value)}
                        />
                    </div>
                    <div className='flex items-center gap-x-3'>
                        <label className="block whitespace-nowrap">เบอร์โทร:</label>
                        <input
                            type="tel"
                            className="w-full border p-1"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className='flex items-center gap-x-3'>
                        <label className="block whitespace-nowrap">สถานที่ส่งของ:</label>
                        <input
                            type="text"
                            className="w-full border p-1"
                            value={formData.deliveryLocation}
                            onChange={(e) => handleInputChange('deliveryLocation', e.target.value)}
                        />
                    </div>
                    <div className='flex items-center gap-x-3'>
                        <label className="block whitespace-nowrap">เงื่อนไขการชำระเงิน:</label>
                        <input
                            type="text"
                            className="w-full border p-1"
                            value={formData.paymentTerms}
                            onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                        />
                    </div>
                </div>
                <div className='flex items-center gap-x-3 mb-4'>
                    <label className="block whitespace-nowrap">ระยะเวลาส่งของ:</label>
                    <input
                        className="w-full border p-1"
                        value={formData.deliveryPeriod}
                        onChange={(e) => handleInputChange('deliveryPeriod', e.target.value)}
                    />
                </div>
                <div className='flex items-center gap-x-3 mb-4'>
                    <label className="block whitespace-nowrap">ผู้รับผิดชอบ Project:</label>
                    <input
                        className="w-full border p-1"
                        value={formData.projectResponsible}
                        onChange={(e) => handleInputChange('projectResponsible', e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className='flex items-center gap-x-3'>
                        <label className="block whitespace-nowrap">Supplier บริษัท:</label>
                        <input
                            type="text"
                            className="w-full border p-1"
                            value={formData.supplierCompany}
                            onChange={(e) => handleInputChange('supplierCompany', e.target.value)}
                        />
                    </div>
                    <div className='flex items-center gap-x-3'>
                        <label className="block whitespace-nowrap">ติดต่อ/เบอร์โทร:</label>
                        <input
                            type="text"
                            className="w-full border p-1"
                            value={formData.supplierContact}
                            onChange={(e) => handleInputChange('supplierContact', e.target.value)}
                        />
                    </div>
                </div>

                <div className='flex items-center gap-x-3 mb-4'>
                    <label className="block whitespace-nowrap">Seller:</label>
                    <input
                        className="w-full border p-1"
                        value={formData.seller}
                        onChange={(e) => handleInputChange('seller', e.target.value)}
                    />
                </div>
                <div className='flex items-center gap-x-3 mb-4'>
                    <label className="block whitespace-nowrap">วัตถุประส่งค์/อื่นๆ:</label>
                    <input
                        className="w-full border p-1"
                        value={formData.purpose}
                        onChange={(e) => handleInputChange('purpose', e.target.value)}
                    />
                </div>

                <table className="w-full mb-4">
                    <thead>
                        <tr className='bg-blue-700 text-white'>
                            <th className="border p-2">ลำดับ</th>
                            <th className="border p-2">รายการ</th>
                            <th className="border p-2">จำนวน</th>
                            <th className="border p-2">หน่วย</th>
                            <th className="border p-2">ราคาต่อหน่วย</th>
                            <th className="border p-2">จำนวนเงิน</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.items.map((item, index) => (
                            <tr key={index}>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        className="w-full"
                                        value={item.no}
                                        onChange={(e) => handleItemChange(index, 'no', e.target.value)}
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        className="w-full"
                                        value={item.description}
                                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        className="w-full"
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        className="w-full"
                                        value={item.unit}
                                        onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        className="w-full"
                                        value={item.unitPrice}
                                        onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        className="w-full"
                                        value={item.amount}
                                        readOnly
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={5} className="border p-2 text-right ">รวม:</td>
                            <td className="border p-2">{formData.total}</td>
                        </tr>
                        <tr>
                            <td colSpan={5} className="border p-2 text-right">ส่วนลด:</td>
                            <td className="border p-2">
                                <input
                                    type="number"
                                    className="w-full"
                                    value={formData.discount}
                                    onChange={(e) => handleDiscountChange(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={5} className="border p-2 text-right font-bold">รวมทั้งหมด:</td>
                            <td className="border p-2 font-bold">{formData.grandTotal}</td>
                        </tr>
                    </tfoot>
                </table>

                <div className="grid grid-cols-3 gap-4">
                    <div className='flex items-center gap-x-3'>
                        <label className="block whitespace-nowrap">ผู้ส่งคำสั่ง:</label>
                        <input
                            type="text"
                            className="w-full border p-1"
                            value={formData.orderPerson}
                            onChange={(e) => handleInputChange('orderPerson', e.target.value)}
                        />
                    </div>
                    <div className='flex items-center gap-x-3'>
                        <label className="block whitespace-nowrap">ผู้อนุมัติ:</label>
                        <input
                            type="text"
                            className="w-full border p-1"
                            value={formData.approver}
                            onChange={(e) => handleInputChange('approver', e.target.value)}
                        />
                    </div>
                    <div className='flex items-center gap-x-3'>
                        <label className="block whitespace-nowrap">ผู้ขาย:</label>
                        <input
                            type="text"
                            className="w-full border p-1"
                            value={formData.salesPerson}
                            onChange={(e) => handleInputChange('salesPerson', e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default datatable;