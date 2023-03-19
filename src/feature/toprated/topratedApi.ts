import { IErrResponsive } from "@src/app/axios";
import axios, { AxiosError, AxiosResponse } from "axios";

export const topratedService = {
  getTopRated: async () => {
    try {
      const { data }: AxiosResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=52ed89c20c5b58b56b6e843a83b2e0fb&language=en-US`
      );
      return data || null;
    } catch (error) {
      const mayAxiosError = error as AxiosError<IErrResponsive>;
      if (mayAxiosError?.response?.data) {
        throw mayAxiosError.response.data;
      }
    }
  },
};
