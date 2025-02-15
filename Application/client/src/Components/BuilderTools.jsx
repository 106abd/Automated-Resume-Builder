import React from 'react'
import CustomButton from './CustomButton'

function BuilderTools() {
    return (
        <div className='builderTools'>
            <div>
                <CustomButton ButtonType={'button'} DisplayText={'RESUMES'}/>
                <CustomButton ButtonType={'button'} DisplayText={'CODE'}/>
                <CustomButton ButtonType={'button'} DisplayText={'PREVIEW'}/>
                <CustomButton ButtonType={'button'} DisplayText={'EXPORT'}/>
            </div>
        </div>
    )
}

export default BuilderTools
