import React, { useState } from 'react';
import { db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import './AddModuleBar.css'; // Ensure you have this CSS file for styling

const AddModuleBar = () => {
  const [showForm, setShowForm] = useState(false);
  const [moduleId, setModuleId] = useState('');
  const [moduleName, setModuleName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (moduleId && moduleName) {
      const moduleRef = doc(db, "modules", moduleId);
      await setDoc(moduleRef, { name: moduleName });
      setModuleId('');
      setModuleName('');
      alert("Module added successfully!");
      setShowForm(false); // Hide the form (modal) after submission
    }
  };

  return (
    <div className="add-module-container">
      <div className="button-container" style={{ textAlign: 'left', paddingBottom: '20px' }}>
        <div onClick={() => setShowForm(true)} className="add-button">
          Add
        </div>
      </div>
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowForm(false)}>&times;</span>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={moduleId}
                onChange={(e) => setModuleId(e.target.value)}
                placeholder="Module ID"
                required
              />
              <input
                type="text"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
                placeholder="Module Name"
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddModuleBar;
