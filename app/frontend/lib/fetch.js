import axios from "axios";

const csrf = document.querySelector("[name=csrf-token]").content;

const apiInstance = axios.create({
  headers: {
    "X-CSRF-Token": csrf,
    "Content-type": "application/json"
  }
});

// const apiFileSelfInstance = axios.create({
//   headers: {
//     "X-CSRF-Token": csrf,
//     "Content-Type": "multipart/form-data"
//   }
// });

export const Fetch = apiInstance;

// export const FetchFile = apiFileSelfInstance;
export default axios;