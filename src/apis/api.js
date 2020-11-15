import axios from "axios";

const url = "https://jsonplaceholder.typicode.com";

export const fetchImagesFromAPI = async () => {
  try {
    const response = await axios.get(`${url}/photos/`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
