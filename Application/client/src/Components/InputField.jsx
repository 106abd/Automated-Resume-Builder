import React from 'react'

function InputField({identifier, inputType, labelText}) {
    return (
        <div className='inputField' id={identifier}>
            <input type={inputType} required/>
            <label>{labelText}</label>
        </div>
    )
}

export default InputField
