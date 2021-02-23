import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as app from "./appReducers";

export const rootReducer = combineReducers({
  cloudFix: app.reducer
});

export function* rootSaga() {
  yield all([app.saga()]);
}
