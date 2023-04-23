import { useState } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { TUser } from '../../../types/User';

const { Option } = Select;

const UserModal = ({ visible, onCancel, onOk, confirmLoading }: UserModalProps) => {
    const [form] = Form.useForm();
    const [confirmDirty, setConfirmDirty] = useState(false);

    const handleOk = async () => {
        if(await form.validateFields(['password', 'username', 'confirm', 'role'])){
            onOk(form.getFieldsValue());
            form.resetFields();
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    const handleConfirmBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setConfirmDirty(confirmDirty || !!value);
    };

    const compareToFirstPassword = (_: any, value: string, callback: any) => {
        if (value && value !== form.getFieldValue('password')) {
            callback('Les deux mots de passe que vous avez saisis ne correspondent pas !');
        } else {
            callback();
        }
    };

    const validateToNextPassword = (_: any, value: string, callback: any) => {
        if (value && confirmDirty) {
            form.validateFields(['confirm']);
        }
        callback();
    };

    return (
        <Modal
            open={visible}
            title="Add User"
            onCancel={handleCancel}
            onOk={handleOk}
            confirmLoading={confirmLoading}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true, message: 'Please input the username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        { required: true, message: 'Please input the password!' },
                        { validator: validateToNextPassword },
                    ]}
                >
                    <Input.Password maxLength={4}/>
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        { required: true, message: 'Please confirm the password!' },
                        { validator: compareToFirstPassword },
                    ]}
                >
                    <Input.Password  maxLength={4}/>
                </Form.Item>
                <Form.Item
                    name="role"
                    label="Role"
                    rules={[{ required: true, message: 'Please select a role!' }]}
                >
                    <Select>
                        <Option value={1}>Admin</Option>
                        <Option value={2}>User</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

type UserModalProps = {
    visible: boolean;
    onCancel: () => void;
    onOk: (values: TUser) => void;
    confirmLoading?: boolean;
}

export default UserModal;