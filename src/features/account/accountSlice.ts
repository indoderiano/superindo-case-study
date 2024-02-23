import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice.ts"
import type { AppThunk } from "../../app/store"
import { fetchCount } from "./accountAPI.ts"

export interface CounterSliceState {
  value: number
  username: string
  email: string
  role: string
  access_token: string
  status: "idle" | "loading" | "failed"
}

export interface UserData {
  username: string
  email: string
  role: string
  access_token: string
}

const initialState: CounterSliceState = {
  value: 0,
  username: "user",
  email: "",
  role: "",
  access_token: "",
  status: "idle",
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const accountSlice = createAppSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    updateUserData: create.reducer(
      ( state, action: PayloadAction<UserData>) => {
        let user_data = action.payload;
        state.username = user_data.username;
        state.email = user_data.email;
        state.role = user_data.role;
        state.access_token = user_data.access_token;
      },
    ),
    reset: create.reducer(state => {
      return initialState;
    }),
    increment: create.reducer(state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    }),
    decrement: create.reducer(state => {
      state.value -= 1
    }),
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    incrementByAmount: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.value += action.payload
      },
    ),
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
    incrementAsync: create.asyncThunk(
      async (amount: number) => {
        const response = await fetchCount(amount)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.value += action.payload
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectAccount: account => account.value,
    selectAccountUsername: account => account.username,
    selectAccountRole: account => account.role,
    selectStatus: account => account.status,
  },
})

// Action creators are generated for each case reducer function.
export const { updateUserData, reset, decrement, increment, incrementByAmount, incrementAsync } =
  accountSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectAccount, selectAccountUsername, selectAccountRole, selectStatus } = accountSlice.selectors

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectAccount(getState())

    if (currentValue % 2 === 1 || currentValue % 2 === -1) {
      dispatch(incrementByAmount(amount))
    }
  }
