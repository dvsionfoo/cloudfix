import {REFRESH_URL, LOCAL_STORAGE_KEY} from './../app/appConfig';

export default function setupAxios(axios) {
  axios.interceptors.request.use(
    config => {
      const userDetails = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (userDetails && userDetails.accessToken) {
        config.headers = {
          Authorization: `${userDetails.accessToken}`
        }
      }
      return config;
    },
    err => Promise.reject(err)
  );
  axios.interceptors.response.use(response => {
    return response;
  }, err => {
    return new Promise((resolve, reject) => {
      console.info('A request a failed with 401 error.', err);
      const originalReq = err.config;
      if (err.response.status === 401 && err.config && !originalReq._retry) {
        console.info('Setting a flag to call refresh only once.');
        originalReq._retry = true;

        const userDetails = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

        if(!userDetails) {
          // User already logged out or did not login. No local sesssion in place. A reload will take care of that
          console.log('Logging out the user as there is no sesson data');
          window.location.reload();
        }

        const reqBody = JSON.stringify({
          username: userDetails.username,
          refreshToken: userDetails.refreshToken
        });

        let res = axios.post(REFRESH_URL, reqBody)
           .then(res => {
              console.info('Called refresh token API. Response', res);
              const newAuthDetails = {...userDetails, ...res.data};

              newAuthDetails.lastRequestedDate =  new Date().toISOString();
              window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newAuthDetails));

              axios.defaults.headers.common['Authorization'] = newAuthDetails.accessToken;

              console.info('New refreshed authTokens are added');
              console.info('Calling the failed API request again, after getting the new tokens');
              return axios(originalReq);
           });
           
           resolve(res);
      } else if (err.response.status === 401 && err.config && originalReq._retry) {
        console.info('API to get refresh token already called and it resulted in the 401 error again');
        console.log('Logging out the user as refresh token failed');
        window.localStorage.removeItem(LOCAL_STORAGE_KEY);
        window.location.reload();
      } else {
        console.log('It is not a 401 error');
        console.log('Logging out the user as refresh token failed');
        window.localStorage.removeItem(LOCAL_STORAGE_KEY);
        window.location.reload();
        return reject(err);
      }      
    });

  });
}
