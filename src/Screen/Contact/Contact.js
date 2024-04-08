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
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Navbar />
            <div className={cx('container')}>
                <ListChat>
                    {friendRequestsSent.map((user, index) => (
                        <div key={index} className={cx('itemChat')}>
                            <ItemChat
                                avatar={<img className={cx('avatarImg')} src={user.avatar} alt="avatar" />}
                                title={user.name}
                                email={user.email}
                                iconAccept={faCheck}
                                iconDecline={faXmark}
                                onItemClick={() => handleAccept(user)} // Pass a function reference
                            />
                        </div>
                    ))}
                </ListChat>
            </div>
        </div>
    );
}

export default Contact;
