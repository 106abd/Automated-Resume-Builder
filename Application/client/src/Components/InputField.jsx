import React from 'react'

function InputField({inputType, labelText, ref}) {
    return (
        <div className='inputField'>
            <input ref={ref} type={inputType} required/>
            <label>{labelText}</label>
        </div>
    )
}

export default InputField
