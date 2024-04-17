import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import socketIOClient from 'socket.io-client';
import ListChat from './ListChat/ListChat';
import ItemChat from './ListChat/ItemChat';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './BoxChat.module.scss';

const cx = classNames.bind(styles);

function BoxChat() {
    const [friendList, setFriendList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const storedData = localStorage.getItem('loginData');
    const userId = JSON.parse(storedData).foundUser._id;
    const socketRef = useRef();
    const host = 'http://localhost:4000';
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/group/getGroupList/${userId}`);
            setFriendList(response.data.userData.friendList);
            setGroupList(response.data.userData.groupList);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        socketRef.current = socketIOClient.connect(host);
        socketRef.current.on('getId', (data) => {});

        socketRef.current.on('addGroup', () => {
            fetchData();
        });
        socketRef.current.on('leaveGroup', () => {
            fetchData();
        });
        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    useEffect(() => {
        fetchData();
    }, [userId]);

    const onItemClick = (item, type) => {
        console.log('Đã chọn:', type, item);
    };

    const getAvatarUrl = (friend) => {
        return friend.avatar
            ? friend.avatar
            : 'https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg';
    };

    return (
        <div className={cx('boxChat')}>
            <ListChat>
                {friendList.map((friend) => (
                    <ItemChat
                        key={friend._id}
                        id={friend._id}
                        avatar={<img className={cx('avatarImg')} src={getAvatarUrl(friend)} alt="avatar" />}
                        title={friend.name}
                        onItemClick={() => onItemClick(friend, 'friend')}
                        type="friend"
                    />
                ))}
            </ListChat>
            <ListChat>
                {groupList.map((group) => (
                    <ItemChat
                        key={group._id}
                        id={group._id}
                        avatar={<img className={cx('avatarImg')} src={group.avatar} alt="avatar" />}
                        title={group.name}
                        onItemClick={() => onItemClick(group, 'group')}
                        type="group"
                        groupID={group._id}
                    />
                ))}
            </ListChat>
        </div>
    );
}

export default BoxChat;
