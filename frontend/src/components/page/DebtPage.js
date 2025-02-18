import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, message, Progress, Checkbox, DatePicker, Select } from 'antd';
import axios from 'axios';
import Header2 from '../Layouts/Header2';
import Spinner from "../Layouts/Spinner";
import moment from 'moment';

const { Option } = Select;

const DebtPage = () => {
    const [debts, setDebts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingDebt, setEditingDebt] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchDebts();
    }, []);

    const fetchDebts = async () => {
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem("user"));
            const res = await axios.post('/debts/get-debts', { userId: user._id });
            setDebts(res.data);
        } catch (error) {
            message.error("Failed to fetch debts");
        } finally {
            setLoading(false);
        }
    };

    const handleAddOrUpdateDebt = async (values) => {
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem("user"));
            const debtData = {
                userId: user._id,
                name: values.name,
                totalAmount: parseFloat(values.totalAmount),
                paidAmount: parseFloat(values.paidAmount),
                dueDate: values.dueDate ? values.dueDate.format("YYYY-MM-DD") : null,
                category: values.category,
                status: values.status || "Ongoing",
            };

            if (editingDebt) {
                await axios.put('/debts/update-debt', { debtId: editingDebt._id, ...debtData });
                message.success("Debt updated successfully");
            } else {
                await axios.post('/debts/add-debt', debtData);
                message.success("Debt added successfully");
            }

            setIsModalVisible(false);
            setEditingDebt(null);
            form.resetFields();
            fetchDebts();
        } catch (error) {
            message.error("Failed to save debt");
        } finally {
            setLoading(false);
        }
    };

    const handleEditDebt = (debt) => {
        setEditingDebt(debt);
        form.setFieldsValue({
            ...debt,
            dueDate: debt.dueDate ? moment(debt.dueDate) : null,
        });
        setIsModalVisible(true);
    };

    const handleDeleteDebt = async (debtId) => {
        try {
            setLoading(true);
            await axios.delete(`/debts/delete-debt/${debtId}`);
            message.success("Debt deleted successfully");
            fetchDebts();
        } catch (error) {
            message.error("Failed to delete debt");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <nav>
                <Header2 />
            </nav>
            {loading && <Spinner />}
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">💰 Debts</h2>

                <div className="flex flex-wrap gap-4 mt-4">
                    {debts.length > 0 ? (
                        debts.map((debt) => (
                            <div key={debt._id} className="bg-white shadow-lg p-4 rounded-lg text-black w-60">
                                <h3 className="text-lg font-semibold">{debt.name}</h3>
                                <p>💰 Total Amount: ₹{debt.totalAmount.toFixed(2)}</p>
                                <p>✅ Paid Amount: ₹{debt.paidAmount.toFixed(2)}</p>
                                <p>📅 Due Date: {debt.dueDate ? moment(debt.dueDate).format("YYYY-MM-DD") : "Not set"}</p>
                                <p>📂 Category: {debt.category}</p>

                                <Progress percent={(debt.paidAmount / debt.totalAmount) * 100} />

                                <div className="mt-2 flex gap-2">
                                    <Button type="primary" onClick={() => handleEditDebt(debt)}>✏️ Edit</Button>
                                    <Button type="primary" danger onClick={() => handleDeleteDebt(debt._id)}>🗑️ Delete</Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No debts added yet.</p>
                    )}
                </div>
                
                <Button className='mt-4' type="primary" onClick={() => setIsModalVisible(true)}>
                    ➕ {editingDebt ? "Edit Debt" : "Add Debt"}
                </Button>


                <Modal
                    title={editingDebt ? "Edit Debt" : "Add Debt"}
                    open={isModalVisible}
                    onCancel={() => {
                        setIsModalVisible(false);
                        setEditingDebt(null);
                        form.resetFields();
                    }}
                    footer={null}
                >
                    <Form form={form} layout="vertical" onFinish={handleAddOrUpdateDebt}>
                        <Form.Item name="name" label="Debt Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="totalAmount" label="Total Amount" rules={[{ required: true }]}>
                            <Input type="number" min={0} />
                        </Form.Item>
                        <Form.Item name="paidAmount" label="Paid Amount">
                            <Input type="number" min={0} />
                        </Form.Item>
                        <Form.Item name="dueDate" label="Due Date">
                            <DatePicker className="w-full" />
                        </Form.Item>
                        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                            <Select>
                                <Option value="Loan">Loan</Option>
                                <Option value="Credit Card">Credit Card</Option>
                                <Option value="Mortgage">Mortgage</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {editingDebt ? "Update Debt" : "Add Debt"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    );
};

export default DebtPage;
