import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { useCanSaveRestrictedHeliblocks } from "../index";
import { AuthContext } from "services/auth";
import { usersCollection } from "services/database";
import { getHeliblock } from "services/heliblocks";

jest.mock("services/users");
jest.mock("services/database");
jest.mock("services/heliblocks");

describe("useCanSaveRestrictedHeliblocks", () => {
  let auth = { isLoaded: false, user: null };
  const wrapper = ({ children }) => (
    <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
  );

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Should return false if user is null", async () => {
    const { result, rerender } = renderHook(
      () => useCanSaveRestrictedHeliblocks(),
      { wrapper }
    );

    expect(result.current).toStrictEqual([false, false]);

    auth = { isLoaded: true, user: null };
    rerender();
    expect(result.current).toStrictEqual([true, false]);
  });
  test("Should return true if user is pro", async () => {
    auth = { isLoaded: true, user: { stripeRole: "pro" } };
    const { result } = renderHook(() => useCanSaveRestrictedHeliblocks(), {
      wrapper,
    });

    expect(result.current).toStrictEqual([true, true]);
  });

  test("Should return true if user have´t heliblocks", async () => {
    const mockDoc = jest.fn().mockReturnValue({
      onSnapshot: (cb) => {
        cb({
          data: () => {
            return {};
          },
        });
      },
    });
    usersCollection.doc = mockDoc;

    auth = { isLoaded: true, user: { uid: "a1" } };
    const { result } = renderHook(() => useCanSaveRestrictedHeliblocks(), {
      wrapper,
    });

    expect(result.current).toStrictEqual([true, true]);
    expect(mockDoc).toHaveBeenCalledWith("a1");
  });

  test("Should return true if user has not privates heliblocks", async () => {
    const heliblocksIDs = ["1", "2", "3"];
    usersCollection.doc = jest.fn().mockReturnValue({
      onSnapshot: (fn) => {
        fn({
          data: () => ({ heliblocks: heliblocksIDs }),
        });
      },
    });

    getHeliblock.mockResolvedValue({ restricted: false });

    auth = { isLoaded: true, user: { uid: "a1" } };
    const { result, waitForNextUpdate } = renderHook(
      () => useCanSaveRestrictedHeliblocks(),
      { wrapper }
    );

    expect(result.current).toStrictEqual([false, false]);

    await waitForNextUpdate();
    expect(result.current).toStrictEqual([true, true]);
    expect(getHeliblock).toHaveBeenCalledTimes(3);
  });

  test("Should return false if user has privates heliblocks", async () => {
    const heliblocksIDs = ["1", "2", "3"];
    usersCollection.doc = jest.fn().mockReturnValue({
      onSnapshot: (fn) => {
        fn({
          data: () => ({ heliblocks: heliblocksIDs }),
        });
      },
    });

    getHeliblock.mockResolvedValue({ restricted: true });

    auth = { isLoaded: true, user: { uid: "a1" } };
    const { result, waitForNextUpdate } = renderHook(
      () => useCanSaveRestrictedHeliblocks(),
      { wrapper }
    );

    expect(result.current).toStrictEqual([false, false]);

    await waitForNextUpdate();
    expect(result.current).toStrictEqual([true, false]);
    expect(getHeliblock).toHaveBeenCalledTimes(3);
  });
});
