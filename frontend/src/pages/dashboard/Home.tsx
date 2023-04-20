import React, { useMemo } from 'react'
import { useGetTransactions } from '../../data/hooks/transactions/useGetTransactions'
import { useRuntimeCookies } from '../../data/hooks/env/useRuntimeCookies'
import { Area } from '@ant-design/plots';
import moment from 'moment';


const Home = () => {
	const { env } = useRuntimeCookies()
	const { data } = useGetTransactions()

	const computedTransactions = useMemo(() => data?.sort((a, b) => moment(b.date).diff(moment(a.date))), [data])

	const transactionsWithAmounts = useMemo(() => {
		let actualAmount = 50000;

		return computedTransactions?.map((transaction, i) => {
			const prevTransac = computedTransactions?.[i - 1] || {};
			if (i === 0) {
				return { ...transaction, remainingAmount: actualAmount };
			}
			else {
				if (env?.username === prevTransac?.receiverName) {
					actualAmount -= prevTransac?.amount || 0;
				} else {
					actualAmount += prevTransac?.amount || 0;
				}
			}
			
			return { ...transaction, remainingAmount: actualAmount };
		})
	}, [computedTransactions])

	return (
		<div style={{ color: 'black' }}>

			{
				transactionsWithAmounts?.map(item => (
					<>{item.date} ---- {item.remainingAmount} --- {item.amount}<br /></>
				))
			}
		</div>
	)
}

export default Home