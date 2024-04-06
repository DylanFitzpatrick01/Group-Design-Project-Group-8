import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DirectMessageService from './DirectMessageService';
import ChatComponent from './ChatComponent';
import { uploadImage } from "./UploadImage";
import { auth } from '../../firebase.js';
import './TextInput.css';
import './ChatPage.css';
import Modal from './Modal';


function DirectMessagesComponent() {
    const { uid: otherUserUid } = useParams(); 
    const [conversationId, setConversationId] = useState('');
    const [messages, setMessages] = useState([]);
    const [currentUserUid, setCurrentUserUid] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [otherUser, setOtherUser] = useState({});
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const navigate = useNavigate(); 
    const textareaRef = useRef(null);
    const messagesEndRef = useRef(null);


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            setCurrentUserUid(user.uid);
            // Initialize or fetch existing conversation
            initAndListenToConversation(user.uid, otherUserUid);
            DirectMessageService.getUserInfo(user.uid).then(setCurrentUser);
        }
     
        });
        return () => unsubscribe();
    }, [navigate, otherUserUid]);

    useEffect(() => {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });;
    }, [newMessage]);

    const initAndListenToConversation = async (currentUserUid, otherUserUid) => {
        if (!currentUserUid || !otherUserUid) return;
        const id = await DirectMessageService.initConversation(currentUserUid, otherUserUid);
        setConversationId(id);
        DirectMessageService.listenForMessages(id, setMessages);
    
        // Fetch other user info
        try {
            const userData = await DirectMessageService.getUserInfo(otherUserUid);
            setOtherUser(userData);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleSendMessage = async (event) => {
        event.preventDefault();
        if (newMessage.trim() || selectedFiles.length > 0) {
            const displayName = currentUser.name; 
            const senderEmail = currentUser.email; 
        if (newMessage.trim()) {
            await DirectMessageService.sendMessage(
                conversationId, 
                currentUserUid,
                newMessage,
                null,
                displayName, 
                senderEmail);
            setNewMessage('');
        }
        for (const file of selectedFiles) {
            const imageUrl = await uploadImage(file);
            await DirectMessageService.sendMessage(
                conversationId, 
                currentUserUid, 
                '', 
                imageUrl,
                displayName, 
                senderEmail);
        }
        setSelectedFiles([]);
        setImagePreviews([]);
        }
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);

        const newSelectedFiles = [...selectedFiles, ...files];
        setSelectedFiles(newSelectedFiles);

        const newImagePreviews = [...imagePreviews, ...files.map(file => URL.createObjectURL(file))];
        setImagePreviews(newImagePreviews);
        // Reset file input so that onChange is triggered when the same file is selected again
        event.target.value = '';
    };

    const removeImage = (index) => {
        const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(newSelectedFiles);

        const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
        setImagePreviews(newImagePreviews);
    };

    const openModalWithImage = (image) => {
        setModalImage(image); 
        setShowModal(true); 
    };

    const handleInputChange = (event) => {
        setNewMessage(event.target.value);
    };

    return (
        <>
        <div className="module-chat-title">
            <div className="row justify-content-between align-items-center">
                <div className="col">
                    <button className='back-button' onClick={() => navigate(-1)}>
                        <i className="bi bi-arrow-left-square" style={{ color: 'var(--accent)', fontSize: '30px' }}></i>
                    </button>
                    <span style={{ marginLeft: '10px' }}>{otherUser?.name || "Unknown"}</span>
                </div>
            </div>
        </div>
        <div className="chat-container">
            <div className="chat-content">
                <div className="messages-container">
                    {messages.map((msg, index) => {
                        const isMyMessage = msg.senderUid === currentUserUid;

                        // Choose the name and avatar to display based on who sent the message
                        const displayName = isMyMessage ? currentUser.name : otherUser.name || "Unknown";
                        const displayAvatar = isMyMessage ? currentUser.avatar : otherUser.avatar || "/default-avatar.png";
                        const userPrefix = !isMyMessage && otherUser?.email ? otherUser.email.split('@')[0] : undefined;
                        return (
                            <ChatComponent
                            key={index}
                            message={msg.text}
                            isMyMessage={isMyMessage}
                            timestamp={msg.timestamp.toLocaleString()}
                            name={displayName}
                            avatar={displayAvatar}
                            prefix={userPrefix}
                            imageUrl={msg.imageUrl}

                            />
                        );
                    })
                    }
                    <div ref={messagesEndRef} />
                </div>
                <div className="textBoxContainer">
                    <form onSubmit={handleSendMessage}>
                        <div className="imagePreviewContainer">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="imagePreview">
                                    <img src={preview} alt="" style={{maxWidth: '100px', maxHeight: '100px'}} onClick={() => openModalWithImage(preview)} />
                                    <button 
                                        type="button" 
                                        onClick={() => removeImage(index)}
                                        className="removeImageButton"
                                    >
                                        X 
                                    </button>
                                </div>
                            ))}
                        </div>
    
                        <div className='inputContainer'>
                            <label htmlFor="file-upload" className="uploadButton">📎</label>
                            <input 
                                id="file-upload" 
                                type="file" 
                                multiple 
                                onChange={handleImageChange}
                                accept="image/*" // only accept image
                                style={{display: 'none'}} 
                            />
                            <textarea 
                                type="text"
                                ref={textareaRef}
                                className='textBox'
                                placeholder="Type your message..."
                                value={newMessage} 
                                onChange={handleInputChange}
                            />
                            <button 
                                className={`sendButton ${newMessage || imagePreviews.length ? 'textBoxNotEmpty' : 'textBoxEmpty'}`} 
                                type="submit"
                            >
                                Send
                            </button>
                        </div>
                    </form>

                {showModal && (
                    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                        <img src={modalImage} alt="Preview" style={{ maxWidth: '90vw', maxHeight: '90vh' }} />
                    </Modal>
                )}
                </div> 
            {/*<div ref={messagesEndRef} /> */}
            </div>
        </div>
        </>
    );
}
export default DirectMessagesComponent;