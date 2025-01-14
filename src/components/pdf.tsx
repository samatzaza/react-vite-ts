import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const PdfGenerator = () => {
    const printRef = useRef();

    const handleGeneratePdf = async () => {
        const element = printRef.current;

        if (element) {
            // Use html2canvas to render the element as a canvas
            const canvas = await html2canvas(element);
            const imgData = canvas.toDataURL("image/png");

            // Create a new jsPDF instance
            const pdf = new jsPDF();

            // Calculate dimensions to fit the PDF size
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight =
                (canvas.height * pdfWidth) / canvas.width;

            // Add the image to the PDF
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

            // Save the PDF
            pdf.save("document.pdf");
        }
    };

    return (
        <div>
            <div ref={printRef} style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
                <h1>PDF Content</h1>
                <p>This content will be captured in the PDF.</p>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </div>

            <button onClick={handleGeneratePdf}>Generate PDF</button>
        </div>
    );
};

export default PdfGenerator;
