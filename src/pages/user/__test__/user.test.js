import React from "react"
import User from "./../index"
import { render, cleanup, waitForElement } from '@testing-library/react'

describe('User page', () => {
    test("should be render", () => {
        const { getByTestId } = render(<User />)
        const hello = getByTestId("hello")
        expect(hello).toBeInTheDocument()
    })
});