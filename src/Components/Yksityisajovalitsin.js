import React from 'react';
import '../styles.css';

function Yksityisajovalitsin({ checked, onChange }) {
    const handleChange = () => {
        onChange(!checked);
      };
    
      return (
        <div className='div7'>
            <p className='p2'>Yksityisajo</p>
            <label className="lever-switch">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                />
                <span className="lever"></span>
            </label>
        </div>
      );
    }

export default Yksityisajovalitsin;