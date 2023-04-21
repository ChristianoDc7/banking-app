import React, { useMemo, useState } from 'react';
import {DesktopOutlined,PieChartOutlined,TeamOutlined,UserOutlined, LogoutOutlined, SwapOutlined} from '@ant-design/icons';
import {  MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { useRuntimeCookies } from '../../data/hooks/env/useRuntimeCookies';
import { PageRoutes } from '../../config/PageRoutes';

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode,key: React.Key , link: string,icon?: React.ReactNode,children?: MenuItem[]): MenuItem {
    return {key,icon,children,label,link} as MenuItem;
}

const MenuItems: MenuItem[] = [
    getItem('Dashboard', '1', PageRoutes.DASHBOARD, <PieChartOutlined />),
    getItem('Transfer', 'wth1',PageRoutes.WITHDRAW, <SwapOutlined />),
    getItem('Transactions', '2',PageRoutes.TRANSACTIONS, <DesktopOutlined />),
    getItem('Utilisateurs', 'sub2',PageRoutes.USERS, <TeamOutlined />),
    getItem('Logout', '9',PageRoutes.LOGOUT, <LogoutOutlined />),
];

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate()

    const path = useMemo(()=>window.location.pathname,[window.location.pathname])

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { env } = useRuntimeCookies()

    const sideBarKey = useMemo(()=>MenuItems?.find(item  => (item as any)?.link === path)?.key as string,[path, MenuItems])

    const provideLink = (key: string) => {
        const item = MenuItems?.find(item => item?.key === key) as MenuItem & { link: string };
        if (item?.link) {
            navigate(item.link);
        }
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: 32, margin: 16, backgroundImage: "url('./chrys.png')"}} />
                <Menu theme="dark" defaultSelectedKeys={[sideBarKey]} mode="inline"  items={MenuItems}  onSelect={e => provideLink(e.key)}/>
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