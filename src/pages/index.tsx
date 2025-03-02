import { useEffect, useRef, useCallback, useState } from "react";
import { saveAs } from "file-saver";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import isEmpty from "lodash/isEmpty";

import { useFetchImages } from "@/hooks/useFetchImages.hook";
import { GetPicsumPhotoAPIResponseDTO } from "@/models/dto/GetPicsumPhotoAPI.dto";

import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; // Import Button Component
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function Home() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useFetchImages();

  const images = data?.pages?.flatMap((page) => page) ?? [];

  // Ref for the Intersection Observer
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const [selectedImage, setSelectedImage] =
    useState<GetPicsumPhotoAPIResponseDTO | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Intersection Observer (Detect when user reaches bottom)
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage]
  );

  // Setup Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [observerCallback]);

  const handleDownloadImage = async (
    imageUrl: string,
    imageSourceUrl: string
  ) => {
    setIsDownloading(true);

    try {
      // Extract the image ID from the source URL (last part of the URL)
      const imageFileName =
        imageSourceUrl.split("/").pop() || "downloaded-image";

      // Fetch the image as a blob
      const response = await fetch(imageUrl, { mode: "cors" });
      const blob = await response.blob();

      // Save the image with the extracted ID as the filename
      saveAs(blob, `${imageFileName}.jpg`);
    } catch (error) {
      toast.error("Error downloading the image. Please try again.", {
        description: (
          <p className="text-red-500">
            {(error as Error)?.message || "An unknown error occurred."}
          </p>
        ),
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Dialog>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold text-center mt-10 mb-14">
          A Collection of Beautiful Moments - A Symphony of Memories
        </h1>

        {isError && (
          <div className="mb-14 flex flex-row justify-center">
            <Alert
              variant="destructive"
              className="w-full max-w-lg text-center"
            >
              <AlertTitle className="font-bold mb-2">
                Symphony Interrupted
              </AlertTitle>
              <AlertDescription>
                {error?.message
                  ? `${error.message}, Please try again.`
                  : "Failed to fetch images. Please try again."}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {!isLoading && isEmpty(images) && (
          <p className="text-center text-gray-500 w-full">
            No stories captured yet, but soon this space will bloom with
            unforgettable scenes
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="w-full h-64 rounded-lg" />
              ))
            : data?.pages.flatMap((page, pageIndex) =>
                page.map((image) => (
                  <DialogTrigger asChild key={image.id}>
                    <Card
                      className="cursor-pointer relative flex"
                      onClick={() => setSelectedImage(image)}
                    >
                      <div className="relative flex flex-grow group overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={image.download_url}
                          alt={image.author}
                          width={image.width}
                          height={image.height}
                          className="w-full object-cover rounded-lg flex-grow"
                          priority={pageIndex < 1} // Prioritize the first page
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-sm px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {image.author}
                        </div>
                      </div>
                    </Card>
                  </DialogTrigger>
                ))
              )}
        </div>

        {/* Load More Indicator */}
        <div ref={loadMoreRef} className="h-10"></div>
        <div className="flex flex-row justify-center ">
          {isFetchingNextPage && (
            <Button disabled>
              <Loader2 className="animate-spin" />
              Loading...
            </Button>
          )}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <DialogContent className="max-w-3xl">
            <DialogTitle className="text-lg text-center font-semibold">
              Photographer: {selectedImage.author}
            </DialogTitle>
            <DialogDescription className="text-sm text-center text-gray-500">
              Original size: {selectedImage.width} x {selectedImage.height}
            </DialogDescription>

            <Image
              src={selectedImage.download_url}
              alt={selectedImage.author}
              width={selectedImage.width}
              height={selectedImage.height}
              className="w-full h-auto object-cover rounded-lg mt-2"
            />

            <div className="flex flex-row justify-center mt-2">
              <Button
                disabled={isDownloading}
                onClick={() =>
                  handleDownloadImage(
                    selectedImage.download_url,
                    selectedImage.url
                  )
                }
              >
                {isDownloading && <Loader2 className="animate-spin " />}
                {isDownloading ? "Downloading..." : "Download Image"}
              </Button>
            </div>
          </DialogContent>
        )}
      </div>
    </Dialog>
  );
}
