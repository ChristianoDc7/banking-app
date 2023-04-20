import React from 'react'
import { useGetUsers } from '../../data/hooks/user/useGetUsers'
import { Button, Space, Tag, Tooltip, Table, Modal } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table';
import { TUser } from '../../types/User';
import _ from 'lodash';

const UserList = () => {
	// const [idToDelete, setIdToDelete] = React.useState<number | null>(null)
	const { data } = useGetUsers()
	const columns = useUserColumns({
		onDelete(id) {
			// setIdToDelete(id)
			showConfirm()
		},
		onEdit(id) { }
	})
	const { confirm } = Modal;

	const showConfirm = () => {
		confirm({
			title: 'Do you really want to delete this user ?',
			icon: <ExclamationCircleFilled />,
			content: 'The actions are irreversible',
			onOk() {
				// setIdToDelete(null)
			},
			onCancel() {
				// setIdToDelete(null)
			},
		});
	};

	return (
		<Table columns={columns} dataSource={data} />
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