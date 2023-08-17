import http from "../http";

export function addNewAirlineCompany(data) {
  try {
    // using http for permissions check
    console.log(data);
    const response = http.post("http://127.0.0.1:8000/api/airlines/", data);
    console.log("api response for addNewAirlineCompany", response, data);
    return response;
  } catch (error) {
    console.log("Error in addNewAirlineCompany", error.message);
  }
};

export const getAllAirlines = async () => {
  try {
    // using http for permissions check
    const response = await http.get("http://127.0.0.1:8000/api/airlines/");
    console.log("Api response for getAllAirlines", response);
    console.log("Api response for getAllAirlines", response.data);
    return response.data;
  } catch (error) {
    console.log("Error in getAllAirlines ", error);
  }
};

export const updateAirlineCompany = async (id, data) => {
  try {
    console.log("update airline api", id, data);
    // using http for permissions check
    const response = await http.put(
      `http://127.0.0.1:8000/api/airlines/${id}/`,data
    );
    console.log("api response for updateAirlineCompany", response);
    return response;
  } catch (error) {
    console.log("error in updateAirlineCompany", error);
    console.log("error in updateAirlineCompany", error.message);
  }
};


export const deleteAirlineCompany = async (id) => {
  try {
    // using http for permissions check
    const response = await http.delete(
      `http://127.0.0.1:8000/api/airlines/${id}/`
    );
    console.log("api response for deleteAirlineCompany", response);
    return response;
  } catch (error) {
    console.log("error in deleteAirlineCompany", error);
    throw error; // Re-throw the error for the calling code to handle
  }
};
