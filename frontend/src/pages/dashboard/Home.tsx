import { useMemo } from 'react'
import { useGetTransactions } from '../../data/hooks/transactions/useGetTransactions'
import { useRuntimeCookies } from '../../data/hooks/env/useRuntimeCookies'
import { Area } from '@ant-design/plots';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import moment from 'moment';
import { AreaConfig } from '@ant-design/charts';
import { Row, Col, Card, Statistic } from 'antd';

const Home = () => {
	const { env } = useRuntimeCookies()
	const { data } = useGetTransactions()

	const computedTransactions = useMemo(() =>
		data?.filter(x => [x.senderId, x.receiverId].includes(env?.id))?.
			sort((a, b) => moment(b.date).diff(moment(a.date))),
		[data, env])

	const transactionsWithAmounts = useMemo(() => {
		let actualAmount = env?.amount || 0;
		return computedTransactions?.map((transaction, i) => {
			const prevTransac = computedTransactions?.[i - 1] || {};
			if (i === 0) {
				return { ...transaction, remainingAmount: actualAmount };
			}
			else {
				if (env?.id === prevTransac?.senderId) {
					actualAmount += prevTransac?.amount || 0;
				} else {
					actualAmount -= prevTransac?.amount || 0;
				}
			}
			return { ...transaction, remainingAmount: actualAmount };
		})?.sort((a, b) => moment(a.date).diff(moment(b.date)))

	}, [computedTransactions, env])

	const config: AreaConfig = {
		data: transactionsWithAmounts || [],
		xField: 'date',
		yField: 'remainingAmount',

		xAxis: {
			range: [0, 1],
			label: {
				formatter(text, item, index) {
					return moment(text).format('DD MMMM - HH:mm')
				},
			}
		},
		yAxis: {
			range: [0, 1],
			label: {
				formatter(text, item, index) {
					return text + ' €'
				},
			}
		}
	};

	return (
		<div style={{ color: 'black' }}>
			<Row gutter={16} style={{ paddingBlock: "20px" }}>
				<Col span={12}>
					<Card bordered={false}>
						<Statistic title="Account Balance (€)" value={env?.amount} precision={2} />
					</Card>
				</Col>
				<Col span={12}>
					<Card bordered={false}>
						<Statistic
							title="Rate"
							value={9.3}
							precision={2}
							valueStyle={{ color: '#cf1322' }}
							prefix={<ArrowDownOutlined />}
							suffix="%"
						/>
					</Card>
				</Col>
			</Row>

			<Area {...config} />;
		</div>
	)
}

export default Home