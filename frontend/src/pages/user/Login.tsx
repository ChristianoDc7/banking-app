import { Button, Card, Form, Input } from 'antd'
import React, { useEffect, useMemo } from 'react'
import PinInput from 'react-pin-input'
import { useLogin } from '../../data/hooks/auth/useLogin'
import { useFormData } from '../../utils/useFormData'
import { LoginPayload } from '../../types/User'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [step, setStep] = React.useState(1)
    const userNameField = useMemo(() => step === 1, [step])
    const pinField = useMemo(() => step === 2, [step])

    const loginMutation = useLogin()

    const { formData, getTextFieldProps, setFormData } = useFormData<LoginPayload>({
        formData: {
            username: '',
            password: ''
        }
    })

    const onUserNameFilled = () => {
        setStep(2)
    }

    const onFinish = () => {
        loginMutation.mutate(formData)
    };

    useEffect(()=>{
        if(loginMutation.isSuccess){
            navigate('/dashboard')
        }
    },[loginMutation.isSuccess])

    return (
        <Card title={userNameField ? "Please login with your username" : "Enter your pin"} style={{ width: 300 }}>
            {
                userNameField && (
                    <Form onFinish={onUserNameFilled}>
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your username!',
                                },
                            ]}
                        >
                            <Input placeholder="Username" {...getTextFieldProps("username")}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className='full-width'>
                                Continue
                            </Button>
                        </Form.Item>
                    </Form>
                )
            }
            {
                pinField && (
                    <Form onFinish={onFinish}>
                        <PinInput length={4} focus type="numeric"
                            secret onComplete={(value) => setFormData(v=>({...v, password: value }))}
                            inputMode="text"
                            inputStyle={{ borderRadius: 4 }}
                            style={{ paddingBottom: "1rem", display:'flex', justifyContent: 'space-between' }} />
                        <Form.Item>
                            <Button type="primary" loading={loginMutation.isLoading} htmlType="submit" className='full-width'>
                                Continue
                            </Button>
                        </Form.Item>
                    </Form>
                )
            }
        </Card>
    )
}

export default Login