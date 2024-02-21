import { db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

const AddModulesDemo = () => {
  const modulesToAdd = [
    { id: 'CSU11001', name: 'Mathematics I' },
    { id: 'CSU11011', name: 'Introduction to Programming I' },
    { id: 'CSU11021', name: 'Introduction to Computing I' },
    { id: 'CSU11031', name: 'Electronics and Information Technology' },
    { id: 'CSU11081', name: 'Computers and Society' },
    { id: 'CSU11012', name: 'Introduction to Programming II' },
    { id: 'CSU11013', name: 'Programming Project' },
    { id: 'CSU11022', name: 'Introduction to Computing II' },
    { id: 'CSU12002', name: 'Mathematics II' },
    { id: 'STU11002', name: 'Statistical Analysis I' },
    { id: 'CSU11026', name: 'Digital Logic Design' },
    { id: 'MAU22C00', name: 'Discrete Mathematics' },
    { id: 'CSU22011', name: 'Algorithms and Data Structures I' },
    { id: 'CSU22014', name: 'Systems Programming I' },
    { id: 'CSU22022', name: 'Computer Architecture I' },
    { id: 'CSU22041', name: 'Information Management I' },
    { id: 'STU22004', name: 'Applied Probability I' },
    { id: 'CSU22012', name: 'Algorithms and Data Structures II' },
    { id: 'CSU22013', name: 'Software Engineering Project I' },
    { id: 'CSU23016', name: 'Concurrent Systems and Operating Systems' },
    { id: 'CSU23021', name: 'Microprocessor Systems' },
    { id: 'STU22005', name: 'Applied Probability II' },
    { id: 'CSU33012', name: 'Software Engineering' },
    { id: 'CSU33031', name: 'Computer Networks' },
    { id: 'CSU34011', name: 'Symbolic Programming' },
    { id: 'CSU33081', name: 'Computational Mathematics' },
    { id: 'CSU34016', name: 'Introduction to Functional Programming' },
    { id: 'CSU34021', name: 'Computer Architecture II' },
    { id: 'CSU33013', name: 'Software Engineering Project II' },
    { id: 'CSU33061', name: 'Artificial Intelligence I' },
    { id: 'CSU34041', name: 'Information Management II' },
    { id: 'CSU33014', name: 'Concurrent Systems I' },
    { id: 'CSU33032', name: 'Advanced Computer Networks' },
    { id: 'CSU33071', name: 'Compiler Design I' },
    { id: 'CSU44081', name: 'Entrepreneurship & High-Tech Venture Creation' },
    { id: 'CSU44099', name: 'Final Year Project' },
    { id: 'CSU44097', name: 'Project Methods' },
    { id: 'CS7091', name: 'Internship' },
    { id: 'CSU44000', name: 'Internet Applications' },
    { id: 'CSU44004', name: 'Formal Verification' },
    { id: 'CSU44031', name: 'Next Generation Networks' },
    { id: 'CSU44052', name: 'Computer Graphics' },
    { id: 'CSU44061', name: 'Machine Learning' },
    { id: 'STU44003', name: 'Data Analytics' },
    { id: 'CSU44001', name: 'Fuzzy Logic and Control Systems' },
    { id: 'CSU44012', name: 'Topics in Functional Programming' },
    { id: 'CSU44051', name: 'Human Factors' },
    { id: 'CSU44053', name: 'Computer Vision' },
    { id: 'CSU44062', name: 'Advanced Computational Linguistics' },
    { id: 'STU45006', name: 'Strategic Information Systems' },
    { id: 'CS7092', name: 'Dissertation' },
    { id: 'CS7CS6', name: 'Research and Innovation' },
    { id: 'CS7DS1', name: 'Data Analytics' },
    { id: 'CS7DS2', name: 'Optimisation Algorithms for Data Analysis' },
    { id: 'CS7DS3', name: 'Applied Statistical Modelling' },
    { id: 'CS7DS4', name: 'Data Visualisation' },
    { id: 'CS7CS4', name: 'Machine Learning' },
    { id: 'CS7GV1', name: 'Computer Vision' },
    { id: 'CS7GV2', name: 'Mathematics of Light and Sound' },
    { id: 'CS7GV3', name: 'Real-Time Rendering' },
    { id: 'CS7GV4', name: 'Augmented Reality' },
    { id: 'CS7GV5', name: 'Real-Time Animation' },
    { id: 'CS7GV6', name: 'Computer Graphics' },
    { id: 'CS7IS1', name: 'Knowledge and Data Engineering' },
    { id: 'CS7IS2', name: 'Artificial Intelligence' },
    { id: 'CS7IS3', name: 'Information Retrieval and Web Search' },
    { id: 'CS7IS4', name: 'Text Analytics' },
    { id: 'CS7IS5', name: 'Adaptive Applications' },
    { id: 'CS7NS1', name: 'Scalable Computing' },
    { id: 'CS7NS2', name: 'Internet of Things' },
    { id: 'CS7NS3', name: 'Next Generation Networks' },
    { id: 'CS7NS4', name: 'Urban Computing' },
    { id: 'CS7NS5', name: 'Security and Privacy' },
    { id: 'CS7NS6', name: 'Distributed Systems' },
    { id: 'CSP55031', name: 'Open Configurable Networks' },
    { id: 'CSU44081', name: 'Entrepreneurship & High-Tech Venture Creation' }
  ];

  const addModulesToFirestore = async () => {
    try {
      await Promise.all(modulesToAdd.map(module =>
        setDoc(doc(db, "modules", module.id), { name: module.name })
      ));
      console.log("All modules added successfully!");
      alert("Modules added successfully!");
    } catch (error) {
      console.error("Error adding modules: ", error);
      alert("Failed to add modules.");
    }
  };

  return (
    <button onClick={addModulesToFirestore}>Add Demo Modules to Firestore</button>
  );
};

export default AddModulesDemo;