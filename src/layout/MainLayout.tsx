// import React, { ReactNode } from 'react';
// import { Link } from "react-router-dom";
// import Navbar from "./Navbar";
// import { Card } from 'antd';

// interface MainLayoutProps {
//     children: ReactNode; // Define 'children' type as ReactNode
// }

// const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
//     return (
//         <div className='min-h-screen'>
//             <Navbar />
//             <Card className='h-full'>{children}</Card>
//         </div>
//     );
// };

// export default MainLayout;
import React, { ReactNode, useState } from 'react';
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    LogoutOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Button, Card, Layout, Menu, theme } from 'antd';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
};

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

const items: MenuProps['items'] = [
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
}));

interface MainLayoutProps {
    children: ReactNode; // Define 'children' type as ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const Logout = () => {
        navigate("/login");
    }
    const toggleMenu = () => {
        setIsOpen((prevState) => !prevState);
    };


    // const {
    //     token: { colorBgContainer, borderRadiusLG },
    // } = theme.useToken();

    return (
        <Layout hasSider>
            <Sider style={siderStyle}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </Sider>
            <Layout>
                <Header style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="demo-logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        items={items1}
                        style={{ flex: 1, minWidth: 0 }}
                    />
                    <Avatar className='cursor-pointer' icon={<UserOutlined />} onClick={toggleMenu} />
                    {isOpen && (
                        <div className="fixed right-0 top-[3rem] z-[999] transition-opacity duration-300 opacity-100">
                            <Button className="w-full" onClick={Logout}>
                                <LogoutOutlined className="mr-2" />
                                Log out
                            </Button>
                        </div>
                    )}

                </Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <Card className='h-full'>{children}</Card>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
