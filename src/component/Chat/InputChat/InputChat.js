import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faFile, faFaceGrinWide, faCircleRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './InputChat.module.scss';
import EmojiPicker from 'emoji-picker-react';
import { emitter } from '../../BoxChat/ListChat/ItemChat';
import axios from 'axios';

const cx = classNames.bind(styles);

function InputChat({ onSend }) {
    const [message, setMessage] = useState('');
    const [selectedEmojis, setSelectedEmojis] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const textareaRef = useRef(null);
    const emojiPickerRef = useRef(null);
    const [itemData, setItemData] = useState({ id: '' }); // Thêm id vào itemData
    useEffect(() => {
        const handler = (data) => {
            setItemData(data);
        };

        emitter.on('itemClick', handler);

        return () => {
            emitter.off('itemClick', handler);
        };
    }, []);
    console.log('ID in InputChat:', itemData.id); // Log id của ItemChat được chọn từ localStorage

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleMessageChange = (event) => {
        if (event.key === 'Enter') {
            handleSendClick();
        } else {
            setMessage(event.target.value);
        }
    };

    const handleSendClick = () => {
        if (message.trim() !== '') {
            onSend(message);
            setMessage('');
            if (textareaRef.current) {
                textareaRef.current.focus();
            }
        }
    };

    const handleEmojiClick = (emoji) => {
        setMessage(message + emoji.emoji);
        setSelectedEmojis([...selectedEmojis, emoji]);
        // Update the textarea with selected emojis
        if (textareaRef.current) {
            textareaRef.current.focus();
            const cursorPosition = textareaRef.current.selectionStart;
            const newText = message.slice(0, cursorPosition) + emoji.emoji + message.slice(cursorPosition);
            setMessage(newText);
            // Move the cursor position after the inserted emoji
            textareaRef.current.setSelectionRange(
                cursorPosition + emoji.emoji.length,
                cursorPosition + emoji.emoji.length,
            );
        }
    };

    const handleEmojiPickerClose = () => {
        setShowEmojiPicker(false);
    };

    const handleEmojiPickerToggle = () => {
        setShowEmojiPicker(!showEmojiPicker);
        if (!showEmojiPicker && emojiPickerRef.current) {
            emojiPickerRef.current.focus();
        }
    };

    const handleOutsideClick = (event) => {
        if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
            handleEmojiPickerClose();
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('crossBarIcon')}>
                <div className={cx('tickerIcon')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faFile} />
                </div>
                <div className={cx('tickerIcon')}>
                    <label htmlFor="imageInput">
                        <FontAwesomeIcon className={cx('icon')} icon={faImage} />
                    </label>
                    <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onClick={handleSendClick}
                    />
                </div>
            </div>
            <div className={cx('boxInpChat')}>
                <textarea
                    className={cx('chatInp')}
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    value={message}
                    ref={textareaRef}
                    onChange={handleMessageChange}
                    onKeyDown={handleMessageChange}
                />
                <div className={cx('boxIcon')}>
                    <div className={cx('iconInpChat')}>
                        <FontAwesomeIcon
                            className={cx('iconInp')}
                            icon={faFaceGrinWide}
                            onClick={handleEmojiPickerToggle}
                        />
                    </div>
                    <div className={cx('iconInpChat')}>
                        <FontAwesomeIcon className={cx('iconInp')} icon={faCircleRight} onClick={handleSendClick} />
                    </div>
                </div>
            </div>
            {showEmojiPicker && (
                <div className={cx('emojiPickerWrapper')} ref={emojiPickerRef}>
                    <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        className={cx('emojiPicker')}
                        disableSkinTonePicker
                        disableSearchBar
                        groupVisibility={{
                            recently_used: false,
                        }}
                        onClose={handleEmojiPickerClose}
                    />
                </div>
            )}
            <div></div>
        </div>
    );
}

export default InputChat;
