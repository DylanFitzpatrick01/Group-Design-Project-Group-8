import React from 'react';
import { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AllChatsForAModule from './AllChatsForAModule';
import TextInput from './TextInput';
import { useUpdatedChats } from './SendReceiveChats';
import User from '../../models/User';
import { useParams } from 'react-router-dom';
import './ChatPage.css';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase.js';


function ChatPage() {
    const { moduleCode } = useParams();

    const textInputRef = useRef(null);

    const [userInfo, setUserInfo] = useState(null);


    useEffect(() => {
        textInputRef.current?.scrollIntoView({ behavior: 'smooth' });
        getUser();
    }, []);

    // current User
    const getUser = async () => {
        try {
            const docRef = doc(db, "users", localStorage.getItem('userPrefix'));
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                const userData = docSnap.data();
                const { activeStatus, avatar, bio, courseTitle, email, name, yearOfStudy } = userData;
                const user = new User(activeStatus, avatar, bio, courseTitle, email, name, yearOfStudy);
                console.log(user);
                setUserInfo(user);
            } else {
                console.log("No such document!");
            }
        } catch (e) {
            console.error("Error fetching document: ", e);
        }
    };


    return (
        <>
            <div className="module-chat-title">
                <Link to="/modules">
                    <button className='back-button'>
                        <i className="bi bi-arrow-left-square" style={{ color: 'var(--accent)', fontSize: '30px' }}></i>
                    </button>
                </Link>
                {moduleCode}
            </div>
            <div className="chat-container">
                <div className="chat-content">
                    <AllChatsForAModule moduleCode={moduleCode} />
                    <TextInput ref={textInputRef} moduleCode={moduleCode} user={userInfo} />

                </div>
            </div>
        </>
    );
}

export default ChatPage;