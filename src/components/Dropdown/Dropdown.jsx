import * as React from 'react';
import './Dropdown.scss';

export const Dropdown = ({ options, id, selectedValue, onSelectedValueChange }) => (
    <div className="select-container">
        <select id={id} onChange={e => onSelectedValueChange(e.target.value)}>
            {options.map(({ value, label }) => (
                <option value={value} selected={value === selectedValue}>
                    {label}
                </option>
            ))}
        </select>
    </div>
);