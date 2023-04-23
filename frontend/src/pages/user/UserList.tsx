import React, { useEffect } from 'react'
import { useGetUsers } from '../../data/hooks/user/useGetUsers'
import { Button, Space, Tag, Tooltip, Table, Modal, Row, App } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, UsergroupAddOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table';
import { TUser } from '../../types/User';
import _ from 'lodash';
import UserModal from './components/UserModal';
import { useCreateUser } from '../../data/hooks/user/useCreateUser';
import { useDeleteUser } from '../../data/hooks/user/useDeleteUser';

const UserList = () => {
	const { data, invalidateQuery } = useGetUsers()
	const createUserMutation = useCreateUser()
	const deleteUserMutation = useDeleteUser()

	const [isModalVisible, setIsModalVisible] = React.useState(false);

	const columns = useUserColumns({
		onDelete(id) {
			showConfirm(id)
		},
		onEdit(user) {}
	})
	const { notification, message } = App.useApp();
	const { confirm } = Modal;

	const showConfirm = (id: number) => {
		confirm({
			title: 'Do you really want to delete this user ?',
			icon: <ExclamationCircleFilled />,
			content: 'The actions are irreversible',
			okButtonProps:{
				loading: deleteUserMutation.isLoading
			},
			onOk() {
				deleteUserMutation.mutate(id)
			},
			onCancel() {},
		});
	};

	const handleConfirm = (value: TUser) => {
		createUserMutation.mutate(value)
	}

	useEffect(() => {
		if (createUserMutation?.isSuccess) {
			setIsModalVisible(false)
			notification.success({
				message: 'User created',
			})
			createUserMutation.reset()
			invalidateQuery()
		}
	},[createUserMutation.isLoading])

	useEffect(() => {
		if (deleteUserMutation?.isSuccess) {
			deleteUserMutation.reset()
			notification.success({
				message: 'User deleted',
			})
			invalidateQuery()
		}
	},[deleteUserMutation.isSuccess])

	return (
		<>
			<Row style={{paddingBlock : "10px", display: 'flex', justifyContent: 'flex-end'}}>
				<Button type="primary" onClick={()=>setIsModalVisible(true)} icon={<UsergroupAddOutlined />}>Add New User</Button>
			</Row>
			<Table columns={columns} dataSource={data} />
			<UserModal visible={isModalVisible} onOk={handleConfirm} onCancel={()=>setIsModalVisible(false)} confirmLoading={createUserMutation?.isLoading}/>
		</>
	)
}

const useUserColumns = (props: TUserColProps): ColumnsType<TUser> => [
	{
		title: 'ID',
		dataIndex: 'id',
		key: 'id'
	},
	{
		title: 'Name',
		dataIndex: 'username',
		key: 'username',
		render: (text) => <>{_.capitalize(text)}</>,
	},
	{
		title: 'Balance',
		dataIndex: 'amount',
		key: 'amount',
		render: (text) => <>{text} €</>,
	},
	{
		title: 'Role',
		dataIndex: 'role',
		key: 'role',
		render: (_, { role }) => {
			const color = role === 1 ? 'green' : 'geekblue'
			const label = role === 1 ? 'Admin' : 'User'
			return (
				<Tag color={color} key={role}>
					{label?.toUpperCase()}
				</Tag>
			)
		},
	},
	{
		title: 'Actions',
		key: 'actions',
		render: (_, record) => (
			<Space wrap>
				<Tooltip title={`Edit ${record?.username}`} placement='left'>
					<Button shape="circle" icon={<EditOutlined />} onClick={() => props?.onEdit?.(record?.id!)} />
				</Tooltip>
				<Tooltip title={`Delete ${record?.username}`} placement='right'>
					<Button shape="circle" danger icon={<DeleteOutlined />} onClick={() => props?.onDelete?.(record?.id!)} />
				</Tooltip>
			</Space>
		),
	}
]

type TUserColProps = {
	onEdit: (id: number) => void
	onDelete: (id: number) => void
}
export default UserList