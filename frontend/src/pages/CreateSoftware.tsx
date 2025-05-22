import React, { useState } from 'react';
import axios from 'axios';

const CreateSoftware = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [accessLevels, setAccessLevels] = useState<string[]>([]);

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/software', {
        name,
        description,
        accessLevels
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Software created successfully!');
      setName('');
      setDescription('');
      setAccessLevels([]);
    } catch (error) {
      alert('Error creating software');
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Software</h2>
      <input
        type="text"
        placeholder="Software Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="checkbox-group">
        {['Read', 'Write', 'Admin'].map(level => (
          <label key={level}>
            <input
              type="checkbox"
              checked={accessLevels.includes(level)}
              onChange={(e) => {
                if (e.target.checked) {
                  setAccessLevels([...accessLevels, level]);
                } else {
                  setAccessLevels(accessLevels.filter(l => l !== level));
                }
              }}
            />
            {level}
          </label>
        ))}
      </div>
      <button onClick={handleSubmit}>Create Software</button>
    </div>
  );
};

export default CreateSoftware;