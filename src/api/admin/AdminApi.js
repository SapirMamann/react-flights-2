import http from "../http";


export function addNewAdmin(data) {
  try {
    // using http for permissions check
    console.log(data);
    const response = http.post("http://127.0.0.1:8000/api/admins/", data);
    console.log("api response for addNewAdmin", response, data);
    return response;
  } catch (error) {
    console.log("Error in addNewAdmin", error.message);
  }
};
