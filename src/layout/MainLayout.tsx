import React, { ReactNode } from 'react';
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { Card } from 'antd';

interface MainLayoutProps {
    children: ReactNode; // Define 'children' type as ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className='min-h-screen'>
            <Navbar />
            <Card className='h-full'>{children}</Card>
        </div>
    );
};

export default MainLayout;
