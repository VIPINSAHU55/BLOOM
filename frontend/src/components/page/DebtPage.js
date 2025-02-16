import React, { useState, useEffect } from 'react';
import { Modal, Form, Select, Input, message, Table, DatePicker } from 'antd';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import moment from 'moment';
import Header2 from '../Layouts/Header2';

const DebtPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [allDebts, setAllDebts] = useState([]);
    const [editable, setEditable] = useState(null);

    const columns = [
        { title: 'Debt Name', dataIndex: 'debtName' },
        { title: 'Lender', dataIndex: 'lender' },
        { title: 'Debt Type', dataIndex: 'debtType' },
        { title: 'Total Amount', dataIndex: 'totalAmount', render: (text) => `$${text}` },
        { title: 'Remaining Balance', dataIndex: 'remainingBalance', render: (text) => `$${text}` },
        { title: 'Account', dataIndex: 'account' },
        { title: 'Amount Paid', dataIndex: 'amountPaid', render: (text) => `$${text}` },
        { title: 'Percentage Paid', dataIndex: 'percentagePaid', render: (text) => `${text}%` },
        { title: 'Interest Rate (%)', dataIndex: 'interestRate' },
        { title: 'Last Payback Date', dataIndex: 'lastPaybackDate', render: (text) => moment(text).format('YYYY-MM-DD') },
        { title: 'Next Payment Due', dataIndex: 'nextPaymentDue', render: (text) => moment(text).format('YYYY-MM-DD') },
        { title: 'Remaining Days', dataIndex: 'remainingDays', render: (text) => `${text} Days Left` },
        {
            title: 'Actions',
            render: (text, record) => (
                <div className='flex gap-2'>
                    <AiOutlineEdit size={24} color='green' onClick={() => {
                        setEditable(record);
                        setShowModal(true);
                    }} />
                    <AiOutlineDelete size={24} color='red' onClick={() => handleDelete(record)} />
                </div>
            )
        },
    ];

    useEffect(() => {
        const getAllDebts = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                setLoading(true);
                const res = await axios.post('/debts/get-debts', { userId: user._id });
                setLoading(false);
                setAllDebts(res.data);
            } catch (error) {
                setLoading(false);
                message.error('Failed to fetch debts');
            }
        };
        getAllDebts();
    }, []);

    const handleDelete = async (record) => {
        try {
            setLoading(true);
            await axios.post('/debts/delete-debt', { debtId: record._id });
            setLoading(false);
            message.success('Debt deleted successfully');
        } catch (error) {
            setLoading(false);
            message.error('Unable to delete debt');
        }
    };

    const handleSubmit = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            setLoading(true);
            if (editable) {
                await axios.post('/debts/edit-debt', { payload: { ...values, userId: user._id }, debtId: editable._id });
                message.success('Debt Updated Successfully');
            } else {
                await axios.post('/debts/add-debt', { ...values, userId: user._id });
                message.success('Debt Added Successfully');
            }
            setShowModal(false);
            setEditable(null);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            message.error('Failed to add/edit debt');
        }
    };

    return (
        <>
        <nav>
        <Header2 />
        </nav>
            
            <div className='flex justify-end p-4'>
                <button className='bg-blue-500 text-white py-2 px-4 rounded' onClick={() => setShowModal(true)}>Add Debt</button>
            </div>
            <Table columns={columns} dataSource={allDebts} rowKey='_id' />
            <Modal title={editable ? 'Edit Debt' : 'Add Debt'} open={showModal} onCancel={() => setShowModal(false)} footer={null}>
                <Form layout='vertical' onFinish={handleSubmit} initialValues={editable}>
                    <Form.Item label='Debt Name' name='debtName'><Input /></Form.Item>
                    <Form.Item label='Lender' name='lender'><Input /></Form.Item>
                    <Form.Item label='Debt Type' name='debtType'><Select><Select.Option value='Loan'>Loan</Select.Option><Select.Option value='Mortgage'>Mortgage</Select.Option><Select.Option value='Credit Card'>Credit Card</Select.Option></Select></Form.Item>
                    <Form.Item label='Total Amount' name='totalAmount'><Input type='number' /></Form.Item>
                    <Form.Item label='Remaining Balance' name='remainingBalance'><Input type='number' /></Form.Item>
                    <Form.Item label='Account' name='account'><Input /></Form.Item>
                    <Form.Item label='Amount Paid' name='amountPaid'><Input type='number' /></Form.Item>
                    <Form.Item label='Interest Rate (%)' name='interestRate'><Input type='number' /></Form.Item>
                    <Form.Item label='Last Payback Date' name='lastPaybackDate'><DatePicker /></Form.Item>
                    <Form.Item label='Next Payment Due' name='nextPaymentDue'><DatePicker /></Form.Item>
                    <div className='flex justify-end'><button className='bg-green-500 text-white py-2 px-4 rounded' type='submit'>Save</button></div>
                </Form>
            </Modal>
        </>
    );
};

export default DebtPage;
