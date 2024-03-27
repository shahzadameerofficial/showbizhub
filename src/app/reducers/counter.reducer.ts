import { createReducer, on } from "@ngrx/store"
import { decreament, increament, reset } from "../counter.actions"

export const initialState = 3333

export const counterReducer = createReducer(
    initialState,
    on(increament, (state) => state + 1),
    on(decreament, (state) => state - 1),
    on(reset, (state) => 0),
)