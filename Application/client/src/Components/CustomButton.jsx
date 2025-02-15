import React from 'react'

function CustomButton({Identifier, ButtonType, DisplayText}) {
    return (
        <button className='customButton' id={Identifier} type={ButtonType}>
            {DisplayText}
        </button>
    )
}

export default CustomButton
