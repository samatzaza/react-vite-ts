import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Item {
    qty: string;
    particulars: string;
    unitPrice: string;
    amount: string;
}

interface FormData {
    supplierName: string;
    supplierAddress: string;
    supplierPhone: string;
    supplierEmail: string;
    deliverToName: string;
    deliverToAddress: string;
    deliverToPhone: string;
    deliverToEmail: string;
    items: Item[];
    poNumber: string;
    paymentTerms: string;
    deliveryDate: string;
}

const PurchaseOrderForm = () => {
    const formRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState<FormData>({
        supplierName: '',
        supplierAddress: '',
        supplierPhone: '',
        supplierEmail: '',
        deliverToName: '',
        deliverToAddress: '',
        deliverToPhone: '',
        deliverToEmail: '',
        items: Array(10).fill({ qty: '', particulars: '', unitPrice: '', amount: '' }),
        poNumber: '',
        paymentTerms: '',
        deliveryDate: ''
    });

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleItemChange = (index: number, field: keyof Item, value: string) => {
        setFormData(prev => {
            const newItems = [...prev.items];
            newItems[index] = { ...newItems[index], [field]: value };

            // Calculate amount if qty and unitPrice are present
            if (field === 'qty' || field === 'unitPrice') {
                const qty = parseFloat(newItems[index].qty) || 0;
                const price = parseFloat(newItems[index].unitPrice) || 0;
                newItems[index].amount = (qty * price).toFixed(2);
            }

            return { ...prev, items: newItems };
        });
    };

    const calculateTotal = () => {
        return formData.items
            .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0)
            .toFixed(2);
    };

    const exportToPDF = async () => {
        if (formRef.current) {
            const canvas = await html2canvas(formRef.current);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('purchase-order.pdf');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-4 flex justify-end">
                <button
                    onClick={exportToPDF}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Export to PDF
                </button>
            </div>

            <div ref={formRef} className="bg-white p-6 shadow-lg">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold">PURCHASE ORDER</h1>
                    <p className="text-gray-600 italic">ABC123 Company</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="border-r pr-4">
                        <h2 className="bg-gray-200 p-2 mb-2">SUPPLIER:</h2>
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full border p-2"
                                value={formData.supplierName}
                                onChange={(e) => handleInputChange('supplierName', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                className="w-full border p-2"
                                value={formData.supplierAddress}
                                onChange={(e) => handleInputChange('supplierAddress', e.target.value)}
                            />
                            <input
                                type="tel"
                                placeholder="Phone"
                                className="w-full border p-2"
                                value={formData.supplierPhone}
                                onChange={(e) => handleInputChange('supplierPhone', e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border p-2"
                                value={formData.supplierEmail}
                                onChange={(e) => handleInputChange('supplierEmail', e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <h2 className="bg-gray-200 p-2 mb-2">DELIVER TO:</h2>
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full border p-2"
                                value={formData.deliverToName}
                                onChange={(e) => handleInputChange('deliverToName', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                className="w-full border p-2"
                                value={formData.deliverToAddress}
                                onChange={(e) => handleInputChange('deliverToAddress', e.target.value)}
                            />
                            <input
                                type="tel"
                                placeholder="Phone"
                                className="w-full border p-2"
                                value={formData.deliverToPhone}
                                onChange={(e) => handleInputChange('deliverToPhone', e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border p-2"
                                value={formData.deliverToEmail}
                                onChange={(e) => handleInputChange('deliverToEmail', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <table className="w-full mb-6">
                    <thead>
                        <tr className="border">
                            <th className="border p-2 w-20">QTY</th>
                            <th className="border p-2">Particulars</th>
                            <th className="border p-2 w-32">Unit Price</th>
                            <th className="border p-2 w-32">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.items.map((item, index) => (
                            <tr key={index} className="border">
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        className="w-full"
                                        value={item.qty}
                                        onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        className="w-full"
                                        value={item.particulars}
                                        onChange={(e) => handleItemChange(index, 'particulars', e.target.value)}
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
                            <td colSpan={3} className="text-right border p-2 font-bold">
                                TOTAL:
                            </td>
                            <td className="border p-2 font-bold">{calculateTotal()}</td>
                        </tr>
                    </tfoot>
                </table>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <p className="font-bold mb-2">Authorized by:</p>
                        <p className="text-gray-600">PURCHASING DEPT.</p>
                    </div>
                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="PO #"
                            className="w-full border p-2"
                            value={formData.poNumber}
                            onChange={(e) => handleInputChange('poNumber', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Payment Terms"
                            className="w-full border p-2"
                            value={formData.paymentTerms}
                            onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                        />
                        <input
                            type="date"
                            placeholder="Delivery Date"
                            className="w-full border p-2"
                            value={formData.deliveryDate}
                            onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseOrderForm;