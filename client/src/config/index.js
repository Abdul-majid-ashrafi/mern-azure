import axios from "axios";

export const auth0Config = {
  domain: "dev-e--008ul.au.auth0.com",
  client_id: "Nm1QFDGTf8IC5MAnegeOldXcYOEttV4C",
};

export const httpRequst = axios

// // import axios from "axios";

// const baseUrl = 'api/';

// const interceptor = () => {
//     axios.defaults.baseURL = baseUrl;
//     axios.interceptors.request.use(
//         function (config) {
//             return config;
//         },
//         function (error) {
//             return Promise.reject(error);
//         }
//     );
//     // axios.interceptors.response.use(
//     //     function (response) {
//     //         return response;
//     //     },
//     //     function (error) {
//     //         return Promise.reject(error);
//     //     }
//     // )
// };

// // const get = (url, headers = {}) => {
// //     return axios.get(url, headers)
// // };
// // const post = (url, payload, headers) => {
// //     return axios.post(url, payload, headers)
// // };

// export {
//     // get,
//     // post,
//     interceptor,
//     // baseUrl,
//     // streamingServerURL,
// }
