import React from 'react'

function InputField({inputType, labelText}) {
    return (
        <div className='inputField'>
            <input type={inputType} required/>
            <label>{labelText}</label>
        </div>
    )
}

export default InputField
