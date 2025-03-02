import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import isEmpty from "lodash/isEmpty";

import { GetPicsumPhotoAPIResponseDTO } from "@/models/dto/GetPicsumPhotoAPI.dto";

// Fetch images with pagination and limit
const fetchImages = async ({
  pageParam = 1,
  limit = 9,
}): Promise<GetPicsumPhotoAPIResponseDTO[]> => {
  const { data } = await axios.get<GetPicsumPhotoAPIResponseDTO[]>(
    `https://picsum.photos/v2/list?page=${pageParam}&limit=${limit}`
  );

  return data;
};

// Custom Hook for Infinite Scroll
export const useFetchImages = () => {
  return useInfiniteQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
    initialPageParam: 1, // Start from page 1
    getNextPageParam: (lastPage, allPages) => {
      console.log("getNextPageParam lastPage", lastPage);
      console.log("getNextPageParam allPages", allPages);

      return isEmpty(lastPage) ? undefined : allPages.length + 1;
    }, // Increment page number
  });
};
