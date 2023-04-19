import React, { useState } from 'react';
import {DesktopOutlined,PieChartOutlined,TeamOutlined,UserOutlined, LogoutOutlined} from '@ant-design/icons';
import {  MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { useRuntimeCookies } from '../../data/hooks/env/useRuntimeCookies';

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const MenuItems: MenuItem[] = [
    getItem('Dashboard', '1', <PieChartOutlined />),
    getItem('Transactions', '2', <DesktopOutlined />),
    getItem('Utilisateurs', 'sub2', <TeamOutlined />),
    getItem('Logout', '9', <LogoutOutlined />),
];

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { env } = useRuntimeCookies()

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: 32, margin: 16, background: 'url("chrys.png")' }} />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={MenuItems} />
            </Sider>
            <Layout className="site-layout">
                <Header />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>{env?.username}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}> ©2023 by Christiano</Footer>
            </Layout>
        </Layout>
    );
};




export default MainLayout;