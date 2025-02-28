import React from 'react'

function InputField({inputType, labelText, inputName, onChangeFunction, ref}) {

    return (
        <div className='inputField'>
            <input type={inputType} ref={ref} name={inputName} onChange={onChangeFunction} required/>
            <label>{labelText}</label>
        </div>
    )
}

export default InputField
