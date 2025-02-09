import React from 'react'

function CustomButton({ButtonType, DisplayText}) {
    return (
        <button className='customButton' type={ButtonType}>
            {DisplayText}
        </button>
    )
}

export default CustomButton
