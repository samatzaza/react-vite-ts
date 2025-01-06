import React, { useState } from 'react';
import { Button, notification, Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';

const AppNotif = () => {
    const [notificationCount, setNotificationCount] = useState(0);

    const openNotification = () => {
        setNotificationCount(notificationCount + 1); // Increment notification count

        notification.open({
            message: 'New Notification!',
            description: 'You have received a new notification.',
            icon: <BellOutlined style={{ color: '#108ee9' }} />,
        });
    };

    return (
        <div style={{ marginTop: 50, textAlign: 'center' }}>
            <Badge count={notificationCount} showZero>
                <Button
                    icon={<BellOutlined />}
                    size="large"
                    onClick={openNotification}
                    shape="circle"
                />
            </Badge>
        </div>
    );
};

export default AppNotif;
