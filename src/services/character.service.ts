import axios from "axios";



export const getAllCharacter = async () => {
  try {
    const res = await axios.get("https://rickandmortyapi.com/api/character");
    return res?.data?.results;
  } catch (error) {
    throw error;
  }
};

export const getCharactersByEpisode = async (url:string) => {
  try {
    const response = await axios.get(url);
    return { success: true, data: response.data };
  } catch (error:any) {
    return { success: false, error: error.message };
  }
};