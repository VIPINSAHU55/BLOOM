import React, { useState, useEffect } from 'react'
import { Modal, Form, Select, Input, message, Table, DatePicker } from 'antd'
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import axios from 'axios'
import Spinner from "../Layouts/Spinner";
import moment from "moment";
import Header2 from "../Layouts/Header2"
const { RangePicker } = DatePicker;


const TransactionPage = () => {
    const [showModal, setshowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [allTransaction, setAllTransaction] = useState([])
    const [filter, setFilter] = useState('7');
    const [selectedDate, setSelected] = useState([]);
    const [type, setType] = useState('all')
    const [edittable, setEdittable] = useState(null)


    //table data
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Category',
            dataIndex: 'category',
        },
        {
            title: 'Reference',
            dataIndex: 'reference',
        },
        {
            title: 'Actions',
            render: (text, record) => (
                <div className='flex gap-2'>
                    <AiOutlineEdit size={24} color="green" onClick={() => {
                        setEdittable(record)
                        setshowModal(true)
                    }} />
                    <AiOutlineDelete size={24} color="red" onClick={() => {
                        handleDelete(record);
                    }} />
                </div>
            )
        },
    ]


    //getall transactions
    //useEffect Hook
    useEffect(() => {
        const getAllTransactions = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                setLoading(true);
                const res = await axios.post("/transactions/get-transactions",
                    {
                        userid: user._id,
                        filter,
                        selectedDate,
                        type,
                    });
                setLoading(false);

                if (Array.isArray(res.data)) {
                    setAllTransaction(res.data.map((transaction) => ({
                        ...transaction,
                        key: transaction._id || Math.random().toString(36),
                    })));
                } else {
                    console.error("Invalid response format:", res.data);
                    message.error("Failed to fetch transactions. Please try again later.");
                }

                console.log(res.data);
            } catch (error) {
                console.log(error);
                message.error('Fetch Issue with Transaction');
            }
        }
        getAllTransactions();
    }, [filter, selectedDate, type]);


    // handle delete
    const handleDelete = async (record) => {
        try {
            setLoading(true);
            await axios.post('/transactions/delete-transaction',
                {
                    transactionId: record._id,
                });
            setLoading(false);
            message.success('Transaction deleted successfully');
        } catch (error) {
            setLoading(false);
            console.log(error)
            message.error("Unable To Delete")

        }
    }

    //form handling
    const handleSubmit = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"))
            setLoading(true);
            if (edittable) {
                await axios.post('/transactions/edit-transaction', {
                    payload: {
                        ...values,
                        userId: user._id,
                    },
                    transactionId: edittable._id,
                });
                setLoading(false);
                message.success("Transaction Updated Successfully")
            } else {
                await axios.post('/transactions/add-transaction', {
                    ...values,
                    userid: user._id
                })
                setLoading(false);
                message.success("Transaction Added Successfully")
            }
            setshowModal(false);
            setEdittable(null);
        } catch (error) {
            setLoading(false);
            message.success("Failed To Add Transaction")
            console.log("Failed To Add Transaction")
        }
    }



    return (
        <>
            <Header2 />
            {loading && (<div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                <Spinner />
            </div>)}

            <div className='filters'>
                <div>
                    <h6>Select Filter</h6>
                    <Select value={filter} onChange={(values) => setFilter(values)}>
                        <Select.Option value="7">LAST 1 Week</Select.Option>
                        <Select.Option value="30">LAST 1 Month</Select.Option>
                        <Select.Option value="365">LAST 1 Year</Select.Option>
                        <Select.Option value="custom">custom</Select.Option>
                    </Select>
                    {filter === "custom" && (<RangePicker value={selectedDate} onChange={(values) => setSelected(values)} />)}
                </div>
                <div>
                    <h6>Select Type</h6>
                    <Select value={type} onChange={(values) => setType(values)}>
                        <Select.Option value="all">ALL</Select.Option>
                        <Select.Option value="income">INCOME</Select.Option>
                        <Select.Option value="expense">EXPENSE</Select.Option>
                    </Select>
                    {filter === "custom" && (<RangePicker value={selectedDate} onChange={(values) => setSelected(values)} />)}
                </div>
                <div className="flex justify-center md:justify-start">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded 
               text-sm sm:text-base md:text-lg 
              sm:py-2.5 md:py-3  sm:px-6 md:px-8"
                        onClick={() => setshowModal(true)}
                    >
                        Add New
                    </button>
                </div>

            </div>

            <div className='overflow-x-auto'>
                <Table
                    columns={columns}
                    dataSource={allTransaction}
                    scroll={{ x: 800 }}
                    className="w-full"
                />
            </div>
            <Modal
                title={edittable ? "Edit Transaction" : "Add Transaction"}
                open={showModal}
                onCancel={() => setshowModal(false)}
                footer={false}
            >
                <Form
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={edittable}
                >
                    <Form.Item label="Amount" name="amount">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="Type" name="type">
                        <Select>
                            <Select.Option value='income'>Income</Select.Option>
                            <Select.Option value='expense'>Expence</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Category" name="category">
                        <Select>
                            <Select.Option value='salary'>Salary</Select.Option>
                            <Select.Option value='home'>Home</Select.Option>
                            <Select.Option value='project'>project</Select.Option>
                            <Select.Option value='tax'>Tax</Select.Option>
                            <Select.Option value='food'>food</Select.Option>
                            <Select.Option value='fees'>Fees</Select.Option>
                            <Select.Option value='movie'>Movie</Select.Option>
                            <Select.Option value='medical'>Medical</Select.Option>
                            <Select.Option value='bills'>Bills</Select.Option>
                            <Select.Option value='tip'>Tip</Select.Option>
                            <Select.Option value='tip'>Other</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Date" name="date">
                        <Input type='date' />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item label="Reference" name="reference">
                        <Input type='text' />
                    </Form.Item>
                    <div className="flex justify-end">
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" type="submit">
                            SAVE
                        </button>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default TransactionPage
