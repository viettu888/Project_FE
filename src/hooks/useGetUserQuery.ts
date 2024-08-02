import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IUser } from "../types/user";

type TParams = {
  page: number;
  results: number;
};

export const useGetUserQuery = (params: TParams) => {
  const fetcher = async () => {
    const response = await axios.get("https://randomuser.me/api", {
      params,
    });
    return response.data.results as IUser[];
  };

  return useQuery({
    queryKey: ["userList", params],
    queryFn: fetcher,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
