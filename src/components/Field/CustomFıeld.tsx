import React from 'react';

type CustomFieldProps = {
    props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    label: string
}

// CustomField bileşeni, generic bir giriş alanı oluşturur.

function CustomField({ label, props }: CustomFieldProps) {
    return (
        <div className="form-group">
            <label htmlFor="customInput">{label}</label>
            <input
                type="text"
                className="form-control"
                id="customInput"
                placeholder="Enter something"
                {...props}
            />
        </div>
    );
}

export default CustomField;
