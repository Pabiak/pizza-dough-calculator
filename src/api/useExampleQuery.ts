import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";

interface IQueryProps {
  uid: string;
}

const useGetData = ({ uid }: IQueryProps) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["key", uid],
    queryFn: async ({ signal }) => {
      const response = await axiosInstance.get(`/endpoint/${uid}`, {
        signal,
      });
      return response.data;
    },
    staleTime: 30 * 1000,
  });
  return [isPending, error, data] as const;
};

export default useGetData;
