import React, { ReactNode } from 'react';
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

interface MainLayoutProps {
    children: ReactNode; // Define 'children' type as ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div>{children}</div>
        </div>
    );
};

export default MainLayout;
