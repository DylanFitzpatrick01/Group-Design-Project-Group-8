import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TextInput.css';
import { sendChat, getAllUserNames } from './SendReceiveChats';
import { uploadImage } from "./UploadImage";
import Modal from './Modal';
import { checkAndReplaceBadWords } from './BadWordDetection';


function TextInput({ societyOrModule, moduleCode, user }) {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [modalImage, setModalImage] = useState(''); // State to hold the current image for the modal


    useEffect(() => {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }, [message]);

    const [userNames, setUserNames] = useState(null);

    useEffect(() => {
        if (!userNames) {
            getAllUserNames()
                .then(names => setUserNames(names))
                .catch(error => console.error("Error getting user names: ", error));
        }
    }, [userNames]);


    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSend = async (event) => {
        event.preventDefault();
        console.log(message);
        // convert message to a all lowercase copy
        let lowerCaseMessage = message.toLowerCase();
        let CleanMessage = message;
        if (message.trim() !== '') {
            let tempCleanMessage = "";
            if (lowerCaseMessage != "hello") {
                tempCleanMessage = await checkAndReplaceBadWords(lowerCaseMessage);
                // copy all * in tempCleanMessage to CleanMessage
                for (let i = 0; i < tempCleanMessage.length; i++) {
                    if (tempCleanMessage.charAt(i) == "*") {
                        CleanMessage = CleanMessage.substring(0, i) + "*" + CleanMessage.substring(i + 1);
                    }
                }
            }
            else {
                CleanMessage = message;
            }
            console.log(CleanMessage)
            await sendChat(userNames, societyOrModule, moduleCode, CleanMessage, user);
            setMessage('');
        }

        // If a picture preview exists, the picture is uploaded and a message containing the image URL is sent
        for (const file of selectedFiles) {
            const imageUrl = await uploadImage(file);
            await sendChat(userNames, societyOrModule, moduleCode, '', user, imageUrl);
        }
        setSelectedFiles([]); // Clear the selected files
        setImagePreviews([]); // Clear image previews

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
    // Function to open modal with the clicked image
    const openModalWithImage = (image) => {
        setModalImage(image);
        setShowModal(true);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { // check if the key pressed is 'Enter' and not 'Shift' + 'Enter'
            e.preventDefault(); // prevent a new line from being added
            handleSend(e);
        }
    };


    return (
        <div className="textBoxContainer">
            <form onSubmit={handleSend}>
                <div className="imagePreviewContainer">
                    {imagePreviews.map((preview, index) => (
                        <div key={index} className="imagePreview">
                            <img src={preview} alt="" style={{ maxWidth: '100px', maxHeight: '100px' }} onClick={() => openModalWithImage(preview)} />
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
                        style={{ display: 'none' }}
                    />
                    <textarea
                        type="text"
                        ref={textareaRef}
                        className='textBox'
                        placeholder="Type your message..."
                        value={message}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className={`sendButton ${message || imagePreviews.length ? 'textBoxNotEmpty' : 'textBoxEmpty'}`}
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
    );
}

export default TextInput;