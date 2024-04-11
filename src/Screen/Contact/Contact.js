import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import ListChat from '../../component/BoxChat/ListChat/ListChat';
import ItemChat from '../../component/BoxChat/ListChat/ItemChat';
import Navbar from '../../component/Navbar/Navbar';
import axios from 'axios';
import styles from './Contact.module.scss';

const cx = classNames.bind(styles);

function Contact() {
    const [friendRequestsSent, setFriendRequestsSent] = useState([]);
    const storedData = localStorage.getItem('loginData');

    useEffect(() => {
        const fetchFriendRequestsSent = async () => {
            try {
                const userId = JSON.parse(storedData).foundUser._id; // Replace 'userId' with the actual user ID
                const response = await axios.get(`http://localhost:4000/user/getFriendRequestsSentToUser/${userId}`);
                setFriendRequestsSent(response.data.friendRequestsSent);
            } catch (error) {
                console.error('Error fetching friend requests sent:', error);
            }
        };

        fetchFriendRequestsSent();
    }, []);

    // Function to handle accepting friend request
    const handleAccept = async (user) => {
        try {
            const response = await axios.post('http://localhost:4000/user/acceptFriendRequestAndSendMessage', {
                userId: JSON.parse(storedData).foundUser._id, // Lấy ID của người gửi từ localStorage
                friendId: user._id,
            });
            console.log(response.data.message);

            // Update friendRequestsSent by filtering out the accepted user
            setFriendRequestsSent((prevRequests) => prevRequests.filter((request) => request._id !== user._id));
            alert('Đã chấp nhận lời mời kết bạn');
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };
    const handleDecline = async (user) => {
        try {
            const response = await axios.post('http://localhost:4000/user/rejectFriendRequest', {
                userId: JSON.parse(storedData).foundUser._id, // Lấy ID của người gửi từ localStorage
                friendId: user._id,
            });
            console.log(response.data.message);

            // Update friendRequestsSent by filtering out the declined user
            setFriendRequestsSent((prevRequests) => prevRequests.filter((request) => request._id !== user._id));
            alert('Đã từ chối lời mời kết bạn');
        } catch (error) {
            console.error('Error declining friend request:', error);
        }
    };
    const getAvatarUrl = (user) => {
        // Kiểm tra xem avatar có hợp lệ không
        return user.avatar
            ? user.avatar
            : 'https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg';
    };

    return (
        <div className={cx('wrapper')}>
            <Navbar />
            <div className={cx('container')}>
                <ListChat>
                    {friendRequestsSent.map((user, index) => (
                        <div key={index} className={cx('itemChat')}>
                            <ItemChat
                                avatar={<img className={cx('avatarImg')} src={getAvatarUrl(user)} alt="avatar" />}
                                title={user.name}
                                email={user.email}
                                iconAccept={faCheck}
                                iconDecline={faXmark}
                                onAdd={() => handleAccept(user)} // Pass a function reference
                                onDec={() => handleDecline(user)} // Pass a function reference
                            />
                        </div>
                    ))}
                </ListChat>
            </div>
        </div>
    );
}

export default Contact;
