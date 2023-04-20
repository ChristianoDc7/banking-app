import React from 'react'
import { useGetTransactions } from '../../data/hooks/transactions/useGetTransactions'
import { Button, Space, Table, Tooltip } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'
import { TTransaction } from '../../types/Transaction'
import _ from 'lodash'
import moment from 'moment'

const TransactionDashboard = () => {
	const { data } = useGetTransactions()

	return (
		<Table columns={columns} dataSource={data} />
	)
}

const columns: ColumnsType<TTransaction> = [
	{
		title: 'Transaction ID',
		dataIndex: 'id',
		key: 'id'
	},
	{
		title: 'Remitter',
		dataIndex: 'senderName',
		key: 'senderName',
		render: (text) => <>{_.capitalize(text)}</>,
	},
	{
		title: 'Recipient',
		dataIndex: 'receiverName',
		key: 'receiverName',
		render: (text) => <>{_.capitalize(text)}</>,
	},
	{
		title: 'Amount',
		dataIndex: 'amount',
		key: 'amount',
		render: (text) => <>{text} €</>,
	},
	{
		title: 'Description',
		dataIndex: 'description',
		key: 'description',
	},
	{
		title: 'Date',
		dataIndex: 'date',
		key: 'date',
		render: (text) => <>{moment(text).format("DD/MM/YYYY")}</>,
	},
	{
		title: 'Hour',
		dataIndex: 'date',
		key: 'hour',
		render: (text) => <>{moment(text).format("HH:mm")}</>,
	}
]

export default TransactionDashboard
