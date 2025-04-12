import React from "react";
import '@testing-library/jest-dom/vitest'
import {render, screen} from '@testing-library/react'
import {describe, it, expect} from 'vitest'
import CustomButton from "./CustomButton"


describe('CustomButton', () => {

    it('Renders Button with Text', () => {
        render(<CustomButton Identifier='test' ButtonType='button' DisplayText='TEST'/>)
        expect(screen.getByText('TEST')).toBeInTheDocument()
    })
})
