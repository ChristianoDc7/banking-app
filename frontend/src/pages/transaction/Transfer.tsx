import { Card, Form, Input, Select, Button, AutoComplete, Statistic } from 'antd'
import React from 'react'
import { useGetUsers } from '../../data/hooks/user/useGetUsers';
import { useRuntimeCookies } from '../../data/hooks/env/useRuntimeCookies';

const Transfer = () => {
    const { Option } = AutoComplete;
    const { data } = useGetUsers()
    const { env } = useRuntimeCookies()
    return (
        <>
            <Card bordered={false} style={{marginBottom: "15px"}}>
                <Statistic title="Your current Balance (€)" value={env?.amount} precision={2} />
            </Card>
            <Card title="Payment Form">
                <Form layout="vertical">
                    <Form.Item label="Recipient Name">
                        <AutoComplete
                            options={data?.map(x => ({ value: x.username }))}
                            filterOption={(inputValue, option) =>
                                option?.value?.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Amount">
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item label="Your Pin code">
                        <Input.Password maxLength={4} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}

export default Transfer
