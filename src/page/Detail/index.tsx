import { Button, Card, Col, Row } from "antd";
import Form from "./dataform";
import Status from "./status";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { useEffect, useRef, useState } from "react";
import React from "react";
// import LoadingScreen from "@src/components/loading";
// import ErrorScreen from "@src/components/error";
const Details: React.FC = () => {
    const formRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            console.log('tryyyy');
            setLoading(true);
            // const response = await jobApi.getJobBy({});
            // console.log('response', response);
            // const jobsData = Array.isArray(response) ? response : [response];
            // setJobs(jobsData);
            // setPagination(prev => ({
            //     ...prev,
            //     total: jobsData.length
            // }));
        } catch (err) {
            setError("Failed to fetch jobs");
        } finally {
            setLoading(false);
        }
    };
    // if (loading) return <LoadingScreen />;
    // if (error) return <ErrorScreen message={error} />;

    const handleApprove = () => {
        console.log("Approve action triggered.");
        // Implement approve logic here
    };

    const handleEdit = () => {
        console.log("Edit action triggered.");
        // Navigate to edit page or open a modal
    };

    const exportToPDF = async () => {
        if (formRef.current) {
            const canvas = await html2canvas(formRef.current);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

            // Generate Blob and Preview
            const pdfBlob = pdf.output('blob');
            const pdfURL = URL.createObjectURL(pdfBlob);

            // Open in a new tab or modal for preview
            window.open(pdfURL, '_blank');
        }
    };

    return (
        <div className="bg-white">
            {/* <div>
                <h1 className="text-center">{id}</h1>
            </div> */}
            <div className="flex justify-end py-3 p-4 gap-x-5">
                <Button
                    className="px-5 bg-green-500 !text-white hover:!bg-green-600 hover:!border-green-600"
                    size="large"
                    // type="primary"
                    onClick={handleApprove}
                >
                    Approve
                </Button>
                <Button
                    className="px-5 bg-orange-500 !text-white hover:!bg-orange-600 hover:!border-orange-600"
                    size="large"
                    // type="primary"
                    onClick={handleEdit}
                >
                    Edit
                </Button>
                <div className='flex justify-end'>
                    <Button
                        onClick={exportToPDF}
                        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        size="large"
                    >
                        Export to PDF
                    </Button>
                </div>
            </div>
            <Row gutter={5}>
                <Col span={16}>
                    <Card size="default"
                        style={{ width: "100%" }}>
                        <Form ref={formRef} />
                        {/* <OrderTable /> */}
                    </Card>
                </Col>
                <Col span={8}>
                    <Status />
                </Col>
            </Row>
        </div>
    );
};

export default Details;