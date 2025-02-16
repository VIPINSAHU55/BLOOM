import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import Header2 from '../Layouts/Header2';
import Spinner from "../Layouts/Spinner";

const SubscriptionPage = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingSubscription, setEditingSubscription] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const fetchSubscriptions = async () => {
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem("user"));
            const res = await axios.post('/subscriptions/get-subscriptions', { userId: user._id });
            setSubscriptions(res.data);
        } catch (error) {
            console.error(error);
            message.error("Failed to fetch subscriptions");
        } finally {
            setLoading(false);
        }
    };



    const handleEditSubscription = (subscription) => {
        setEditingSubscription(subscription);
        form.setFieldsValue({
            name: subscription.name,
            billingCycle: subscription.billingCycle,
            cost: subscription.cost,
            nextRenewal: moment(subscription.nextRenewal),
        });
        setIsModalVisible(true);
    };

    const handleDeleteSubscription = async (subscriptionId) => {
        try {
            setLoading(true);
            await axios.post('/subscriptions/delete-subscription', { subscriptionId });
            message.success("Subscription deleted successfully");
            fetchSubscriptions(); // Refresh table
        } catch (error) {
            console.error(error);
            message.error("Failed to delete subscription");
        } finally {
            setLoading(false);
        }
    };



    const handleAddOrUpdateSubscription = async (values) => {
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem("user"));

            const subscriptionData = {
                userId: user._id,
                name: values.name,
                billingCycle: values.billingCycle,
                cost: parseFloat(values.cost),
                nextRenewal: values.nextRenewal,
                dueStatus: "Paid", // Default to Overdue
            };

            if (editingSubscription) {
                // UPDATE EXISTING SUBSCRIPTION
                await axios.put(`/subscriptions/update-subscription/${editingSubscription._id}`, subscriptionData);
                message.success("Subscription updated successfully");
            } else {
                // ADD NEW SUBSCRIPTION
                await axios.post('/subscriptions/add-subscription', subscriptionData);
                message.success("Subscription added successfully");
            }

            setIsModalVisible(false);
            setEditingSubscription(null);
            form.resetFields();
            fetchSubscriptions(); // Refresh the table
        } catch (error) {
            console.error(error);
            message.error("Failed to save subscription");
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { title: 'Name', dataIndex: 'name' },
        { title: 'Billing', dataIndex: 'billingCycle' },
        { title: 'Cost', dataIndex: 'cost', render: text => `$${text.toFixed(2)}` },
        { title: 'Next Renewal', dataIndex: 'nextRenewal', render: text => moment(text).format('MMMM D, YYYY') },
        { title: 'Yearly Cost', dataIndex: 'yearlyCost', render: text => `$${text.toFixed(2)}` },
        { title: 'Due', dataIndex: 'dueStatus', render: text => <span style={{ color: text === 'Overdue' ? 'red' : 'green' }}>{text}</span> },
        {
            title: 'Actions',
            render: (text, record) => (
                <>
                    <Button onClick={() => handleEditSubscription(record)} style={{ marginRight: 8 }}>
                        Edit
                    </Button>
                    <Button onClick={() => handleDeleteSubscription(record._id)} danger>
                        Delete
                    </Button>
                </>
            )
        }
    ];


    return (
        <>
            <nav>
                <Header2 />
            </nav>
            {loading && (<div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                <Spinner />
            </div>)}
            <div className='p-4'>
                <Button type="primary" onClick={() => setIsModalVisible(true)} className="mb-4">
                    Add Subscription
                </Button>

                <Table columns={columns} dataSource={subscriptions} loading={loading} rowKey='_id' />
            </div>

            {/* Add Subscription Modal */}
            <Modal
                title={editingSubscription ? "Edit Subscription" : "Add Subscription"}
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    setEditingSubscription(null);
                    form.resetFields();
                }}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleAddOrUpdateSubscription}>
                    <Form.Item name="name" label="Subscription Name" rules={[{ required: true, message: "Please enter the subscription name" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="billingCycle" label="Billing Cycle" rules={[{ required: true, message: "Please select a billing cycle" }]}>
                        <Select>
                            <Select.Option value="Monthly">Monthly</Select.Option>
                            <Select.Option value="Quarterly">Quarterly</Select.Option>
                            <Select.Option value="Annual">Annual</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="cost" label="Cost (र्)" rules={[{ required: true, message: "Please enter the cost" }]}>
                        <Input type="number" min={0} />
                    </Form.Item>

                    <Form.Item name="nextRenewal" label="Next Renewal Date" rules={[{ required: true, message: "Please select a renewal date" }]}>
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {editingSubscription ? "Update Subscription" : "Add Subscription"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

        </>
    );
};

export default SubscriptionPage;
