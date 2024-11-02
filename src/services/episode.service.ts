import axios from "axios";

export const getAllEpisodes = async () => {
    try {
      const res = await axios.get("https://rickandmortyapi.com/api/episode");
      return res?.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const getSingleEpisode=async(id:number)=>{
    // console.log(id,"checking Iddd")
    try {
      const res = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
      // console.log(res,"resssssssssss")
      const charactersPromises = res?.data?.characters?.map((url:string)=>axios.get(url));
      const charactersResponses = await Promise.all(charactersPromises)
      // console.log(charactersResponses,"charactersPromises")
      // return charactersResponses
       return charactersResponses?.map((res:any)=>res?.data)
    } catch (error) {
      throw error;
    }
  }