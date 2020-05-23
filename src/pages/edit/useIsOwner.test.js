import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import useIsOwner from "./useIsOwner"
import { AuthContext } from "./../../services/auth"
import { getUser } from "./../../services/users";

jest.mock('./../../services/users');

describe('useIsOwner', () => {
    let auth = {isLoaded: false, user: null };
    const wrapper = ({ children}) => (
        <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
    )
    afterEach(() => {    
        jest.restoreAllMocks();
    })

    test('should to be falsy if user is not signed', () => {
        const { result, rerender } = renderHook(() => useIsOwner(), { wrapper })
        
        expect(result.current).toStrictEqual({isLoaded: false, isOwner: null})
    
        auth = {isLoaded: true, user: null }
        rerender()

        expect(result.current).toStrictEqual({isLoaded: true, isOwner: false})
    })

    test('should to be falsy if user is not found', async () => {
        const uid = "a1"
        auth = {isLoaded: true, user: { uid } }
        getUser.mockResolvedValue({
            notFound: true
        });
        const { result, waitForNextUpdate } = renderHook(() => useIsOwner(), { wrapper })
        
        expect(result.current).toStrictEqual({isLoaded: false, isOwner: null})
        expect(getUser).toHaveBeenCalledWith(uid)
    
        await waitForNextUpdate()
        expect(result.current).toStrictEqual({isLoaded: true, isOwner: false})
    })

    test('should to be truthy if id is found into user heliblocks', async () => {
        auth = {isLoaded: true, user: { uid: "a" } }
        getUser.mockResolvedValue({
            notFound: false,
            heliblocks: ["a2"]
        });
        const { result, waitForNextUpdate } = renderHook(() => useIsOwner(1), { wrapper })
        expect(result.current).toStrictEqual({isLoaded: false, isOwner: null})
        await waitForNextUpdate()

        expect(result.current).toStrictEqual({isLoaded: true, isOwner: false})
    })

    test('should to be truthy if id is found into user heliblocks', async () => {
        const heliblockId = "id"
        auth = {isLoaded: true, user: { uid: "a" } }
        getUser.mockResolvedValue({
            notFound: false,
            heliblocks: ["a2", heliblockId]
        });
        const { result, waitForNextUpdate } = renderHook(() => useIsOwner(heliblockId), { wrapper })
        expect(result.current).toStrictEqual({isLoaded: false, isOwner: null})
        await waitForNextUpdate()

        expect(result.current).toStrictEqual({isLoaded: true, isOwner: true})
    })
});