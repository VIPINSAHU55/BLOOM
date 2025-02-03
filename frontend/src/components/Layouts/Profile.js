import React, { useState, useEffect } from 'react';
import { message, Dropdown, Space, Drawer } from 'antd'
import userImage from "../images/user.png"
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout, AiOutlineProfile } from "react-icons/ai";


const Profile = () => {
    const navigate = useNavigate();
    const [loginUser, setLoginUser] = useState('');
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);

    // Handle opening the drawer
    const showDrawer = () => {
        setIsDrawerVisible(true);
    };

    // Handle closing the drawer
    const closeDrawer = () => {
        setIsDrawerVisible(false);
    };


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setLoginUser(user);
        }
    }, [])

    const logoutHandler = () => {
        localStorage.removeItem("user")
        message.success('Logout Successfully')
        navigate('/')
    }

    const items = [
        {
            key: '1',
            label: (
                <span style={{ color: 'green', fontWeight: 'bold' }}>
                    {loginUser && loginUser.name}
                </span>
            ),
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: <span onClick={showDrawer}>Profile</span>,
            icon: <AiOutlineProfile/>
        },
        {
            key: '3',
            label: (
                <span style={{ color: 'red', fontWeight: 'bold' }}>
                    Logout
                </span>
            ),
            onClick: logoutHandler,
            icon: <AiOutlineLogout/>
        },
    ];


    return (
        <nav>
            {/* Desktop Buttons */}
                    <Dropdown
                        menu={{
                            items,
                        }}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <img className='h-12 w-12 hover:bg-gray-500 rounded-full' src={userImage} alt='User' /> {/* User profile icon */}
                            </Space>
                        </a>
                    </Dropdown>

                    {/* Drawer for Profile */}
                    <Drawer
                        title="User Profile"
                        placement="right"
                        onClose={closeDrawer}
                        open={isDrawerVisible}
                    >
                        <p><strong>Username:</strong> {loginUser && loginUser.name}</p>
                        <p><strong>Email:</strong> {loginUser && loginUser.email}</p>
                        <p><strong>Mobile Number:</strong> {loginUser && loginUser.tel}</p>
                    </Drawer>
        </nav>
    )
}

export default Profile
