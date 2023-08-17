import http from "../http";


export function addNewAdmin(data) {
  try {
    // using http for permissions check
    console.log(data);
    const response = http.post("http://127.0.0.1:8000/api/admins/", data);
    console.log("api response plus data for addNewAdmin", response, data);
    return response;
  } catch (error) {
    console.log("Error in addNewAdmin", error.message);
  }
};



// Getting admin by its user id
export const getAdminByUserID = async () => {
  try {
    // using http for permissions check
    const response = await http.get(`http://127.0.0.1:8000/api/admins/get_admin_by_user_id/`);
    console.log("api response for getAdminByUserID", response);
    return response;
  } catch (error) {
    console.log("Error in getAdminByUserID", error);
  }
};



// Update admin by passing its ID
export const UpdateAdmin = async (adminID, data) => {
  try {
    console.log("UpdateAdmin api", adminID, data);
    // using http for permissions check
    const response = await http.put(
      `http://127.0.0.1:8000/api/admins/${adminID}/`, data
    );
    console.log("api response plus data for UpdateAdmin", response, data);
    return response;
  } catch (error) {
    console.log("error in UpdateAdmin", error);
  }
};