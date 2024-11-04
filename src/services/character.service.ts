import axios from "axios";



export const getAllCharacter = async (activePage:number) => {
  try {
    const res = await axios.get("https://rickandmortyapi.com/api/character/?page="+activePage);
    return res?.data;
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