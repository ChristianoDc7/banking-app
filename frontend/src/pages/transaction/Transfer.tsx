import { Card, Form, Input, Select, Button, AutoComplete, Statistic, App, Modal } from 'antd'
import { useGetUsers } from '../../data/hooks/user/useGetUsers';
import { useRuntimeCookies } from '../../data/hooks/env/useRuntimeCookies';
import { useCheckPassword } from '../../data/hooks/auth/useCheckPassword';
import { useEffect } from 'react';
import { useInitTransactions } from '../../data/hooks/transactions/useInitTransactions';
import { ExclamationCircleFilled } from '@ant-design/icons'

import _ from 'lodash';

const Transfer = () => {
    const { notification } = App.useApp();
    const { data } = useGetUsers()
    const { env, setEnv } = useRuntimeCookies()
    const [form] = Form.useForm();

    const { confirm } = Modal;

    const checkPasswordMutation = useCheckPassword()
    const initTransactionMutation = useInitTransactions()

    const handleOpenTransfer = (values: any) => {
        confirm({
            title: `Do you really want to send ${values.amount} € to ${values.recipient} ?`,
            icon: <ExclamationCircleFilled />,
            centered: true,
            content: 'There are no rollback',
            okButtonProps: {
                loading: initTransactionMutation.isLoading
            },
            onOk() {
                handleSubmit(values)
            },
            onCancel() { },
        });
    }

    const handleSubmit = (values: any) => {
        const receiverId = data?.find(x => x.username === values.recipient)?.id
        const payload = {
            receiverId,
            amount: Number(values.amount),
            ..._.omit(values, ['recipient', 'password', 'amount']),
        }
        initTransactionMutation.mutate(payload)
    }

    const checkPWD = async (pwd: string) => {
        if (await form.validateFields(['password', 'recipient', 'amount', 'description'])) {
            checkPasswordMutation.mutate({ password: pwd })
        }
    }

    useEffect(() => {
        if (checkPasswordMutation.isSuccess) {
            form.submit()
            checkPasswordMutation.reset()
        }
    }, [checkPasswordMutation.isSuccess])

    useEffect(() => {
        if (initTransactionMutation.isSuccess) {
            notification.success({ message: "Transaction successful" })
            setEnv({ ...env, amount: (env?.amount || 0) - (initTransactionMutation.variables?.amount || 0) })
            form.resetFields()
            initTransactionMutation.reset()
        }
    }, [initTransactionMutation.isSuccess])

    return (
        <>
            <Card bordered={false} style={{ marginBottom: "15px" }}>
                <Statistic title="Your current Balance (€)" value={env?.amount} precision={2} />
            </Card>
            <Card title="Payment Form">
                <Form layout="vertical" form={form} onFinish={handleOpenTransfer} onKeyDown={(e) => e.key === "Enter" && checkPWD(form.getFieldValue("password"))}>
                    <Form.Item label="Recipient Name" name="recipient" rules={[{ required: true, message: 'Please input the recipient name' }]}>
                        <AutoComplete
                            options={data?.map(x => ({ value: x.username }))}
                            filterOption={(inputValue, option) =>
                                option?.value?.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please give a brief description' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Amount" name="amount"
                        rules={[{
                            required: true, message: 'Please give amount that you have', validator: (_, value) => {
                                if (value && value > (env?.amount || 0)) {
                                    return Promise.reject("You don't have enough amount")
                                }
                                return Promise.resolve()
                            }
                        }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item label="Your Pin code" name="password" rules={[{ required: true, message: 'Please input your pincode to confirm transaction' }]}>
                        <Input.Password maxLength={4} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" loading={checkPasswordMutation.isLoading || initTransactionMutation.isLoading} onClick={() => checkPWD(form.getFieldValue("password"))}>Submit</Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}

export default Transfer
