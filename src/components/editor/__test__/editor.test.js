import React from 'react'
import { render, cleanup, waitForElement } from '@testing-library/react'
import Editor from '../index'

jest.mock("./../../../services/auth");
jest.mock("./../../../services/database");
jest.mock("./../../../services/firebase");

describe('Editor', () => {
    test.only("Should render mobile in small screen", () => {
        
        const { getByTestId } = render(<Editor />)
        const mobile = getByTestId("mobile-editor")
        expect(mobile).toBeInTheDocument();
    })
});

