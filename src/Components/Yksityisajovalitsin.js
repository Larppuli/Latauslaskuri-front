import React from 'react';
import '../styles.css';

function Yksityisajovalitsin({ checked, onChange }) {
    const handleChange = () => {
        onChange(!checked);
      };
    
      return (
        <label className="lever-switch">
          <input
            type="checkbox"
            checked={checked}
            onChange={handleChange}
          />
          <span className="lever"></span>
        </label>
      );
    }

export default Yksityisajovalitsin;