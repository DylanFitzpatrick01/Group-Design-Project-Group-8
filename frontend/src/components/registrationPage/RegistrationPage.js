import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './RegistrationPage.css'; // import the CSS file

function RegistrationPage() {
  const [getMessage, setGetMessage] = useState({});
  const [image, setImage] = useState({});

  useEffect(()=>{
    axios.get('http://localhost:5000/flask/hello').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

  }, [])

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <div className="RegistrationPage">
      <header className="RegistrationPage-header">
        <h1>Registration</h1>
      </header>
      <div className = "RegistrationBox">
          <div className="ProfilePicture">
            <p className="ProfilePictureText">Profile Picture</p>
            <img src={image} alt="Preview" className="PreviewImage"/>
            <input className="ImageUpload" type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className = "row row-cols-2">
          <div className="col">
            <div className= "FirstName">
              <p>First Name</p>
              <input required className="FirstNameInput" />
            </div>
          </div>
          <div className="col">
            <div className= "LastName">
              <p>Surname</p>
              <input required className="LastNameInput" />
            </div>
          </div>
          <div className =" col">
            <div className = "Email">
              <p>TCD Email Address</p>
              <input required className="EmailInput"/>
            </div>
          </div>
          <div className = "col">
            <div className= "CourseName">
              <p>Course Title</p>
              <input required className="CourseNameInput" />
            </div>
          </div>
          <div className='col'>
            <div className= "YearOfStudy">
              <p>Year Of Study</p>
              <input required className="YearOfStudyInput" />
            </div>
          </div>
          <div className= "Bio">
            <p>Bio</p>
            <input className="BioInput" />
          </div>
        </div>
      </div>
      <button className="SubmitButton">
        Submit
      </button>
    </div>
  );
}

export default RegistrationPage;