import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Layout, MenuProps, Tag, theme } from 'antd';
import { Dropdown } from 'antd';
import { useRuntimeCookies } from '../../data/hooks/env/useRuntimeCookies';
import Link from 'antd/es/typography/Link';
import { PageRoutes } from '../../config/PageRoutes';
import { isAdmin } from '../../utils/Utils';


export const Header: React.FC = () => {
    const { Header } = Layout;
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { env } = useRuntimeCookies()

    return (
        <Header style={{ padding: 0, background: colorBgContainer, justifyContent: "flex-end" }} className='center-align'>
            <div style={{ padding: 2 }}>
                <Dropdown menu={{ items }} trigger={['click']} arrow>
                    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', paddingRight: "5px" }}>
                        <Avatar size={40}>{env?.username?.substring(0, 1)}</Avatar>
                        <div className='flex-column' style={{marginLeft: 8}}>
                            <span style={{ lineHeight: '25px' }}>{env?.username}</span>
                            <Tag color={isAdmin() ? 'green' : 'geekblue'}>
                                {isAdmin() ? 'ADMIN' : 'USER'}
                            </Tag>
                        </div>
                    </div>
                </Dropdown>
            </div>
        </Header>

    );
}


const items: MenuProps['items'] = [
    {
        label: <Link href={PageRoutes.LOGOUT}><LogoutOutlined /> Logout</Link>,
        key: '0',
    }
];