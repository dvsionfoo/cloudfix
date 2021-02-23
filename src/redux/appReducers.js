import { takeLatest } from "redux-saga/effects";
import { LOCAL_STORAGE_KEY } from './../app/appConfig';

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  Recommendations: "[Recommendations] Action",
  Savings: "[Savings] Action",
  Accounts: "[Accounts] Action",
  User: "[User] Action"
};

const userAuthData = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY));

const initialAuthState = {
  userDetails: undefined,
  authToken: undefined,
  accessToken:  undefined,
  tokenType:  undefined,
  refreshToken:  undefined,
  expirationDate: undefined,
  recommendations: {
    newRecommendations: undefined,
    completedRecommendations: undefined,
    scheduledRecommendations: undefined,
    allRecommendations: undefined
  },
  totalAccounts: 0,
  recommendedSavings: 0,
  realizedSavings: 0,
  accounts: undefined,
};

const enrichedAuthState = {...initialAuthState, ...userAuthData};

export const reducer = (state = enrichedAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken, accessToken, tokenType, refreshToken, expirationDate, totalAccounts } = action.payload;
        return { ...state, authToken, accessToken, tokenType, refreshToken, expirationDate, totalAccounts};
      }

      case actionTypes.Register: {
        return { ...state, userDetails: action.payload };
      }

      case actionTypes.User: {
        return { ...state, userDetails: action.payload };
      }

      case actionTypes.Logout: {
        return initialAuthState;
      }

      case actionTypes.Recommendations: {
        const recommendations = action.payload;
        const newRecommendations = recommendations.filter(r => r.status.toLowerCase() === 'suggested');
        const scheduledRecommendations = recommendations.filter(r => r.status.toLowerCase() === 'scheduled');
        const completedRecommendations = recommendations.filter(r => { 
            return r.status.toLowerCase() !== 'suggested' && r.status.toLowerCase() !== 'scheduled';
        });
        return { ...state, recommendations: {newRecommendations, scheduledRecommendations, completedRecommendations, allRecommendations: recommendations}};
      }

      case actionTypes.Savings: {
        const { savings } = action.payload;
        const recommendedSavings = savings.recommended;
        const realizedSavings = savings.realized;
        return { ...state, recommendedSavings, realizedSavings };
      }

      case actionTypes.Accounts: {
        const accounts = action.payload;
        return { ...state, accounts, totalAccounts: accounts.length };
      }

      default:
        return state;
    }
  }

export const actions = {
  login: (authCredentials) => ({ type: actionTypes.Login, payload: authCredentials }),
  register: (userDetails) => ({
    type: actionTypes.Register,
    payload: userDetails,
  }),
  logout: () => ({ type: actionTypes.Logout }),
  recommendations: (recommendations) => ({ type: actionTypes.Recommendations, payload: recommendations }),
  savings: (savings) => ({ type: actionTypes.Savings, payload: savings }),
  accounts: (accounts) => ({ type: actionTypes.Accounts, payload: accounts }),
  user: (userDetails) => ({ type: actionTypes.User, payload: userDetails }),
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    /// yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    // yield put(actions.requestUser());
  });
}
