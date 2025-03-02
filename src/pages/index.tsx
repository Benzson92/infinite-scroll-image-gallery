// import Image from "next/image";
// import { Geist, Geist_Mono } from "next/font/google";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function Home() {
//   return (
//     <div
//       className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
//     >
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               src/pages/index.tsx
//             </code>
//             .
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }

// ✅ Structural Import Grouping
import { useEffect, useRef, useCallback, useState } from "react";
import { saveAs } from "file-saver";
import { Loader2 } from "lucide-react";
import Image from "next/image";

// ✅ React Query Hook
import { useFetchImages } from "@/hooks/useFetchImages.hook";

// ✅ API Response DTO
import { GetPicsumPhotoAPIResponseDTO } from "@/models/dto/GetPicsumPhotoAPI.dto";

// ✅ UI Components
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; // Import Button Component

// ✅ Loading & Error Components
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

  console.log("Home data", data);
  console.log("Home isLoading", isLoading);

  // ✅ Ref for the Intersection Observer
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // ✅ State for selected image in modal
  // const [selectedImage, setSelectedImage] = useState<{
  //   src: string;
  //   author: string;
  //   width: number;
  //   height: number;
  // } | null>(null);
  const [selectedImage, setSelectedImage] =
    useState<GetPicsumPhotoAPIResponseDTO | null>(null);

  // ✅ Intersection Observer (Detect when user reaches bottom)
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage]
  );

  // ✅ Setup Intersection Observer
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

  // // ✅ Function to download the image
  // const handleDownloadImage = (imageUrl: string, author: string) => {
  //   const anchor = document.createElement("a");
  //   anchor.href = imageUrl;
  //   anchor.download = `${author.replace(/\s+/g, "_")}.jpg`; // Save as author's name
  //   document.body.appendChild(anchor);
  //   anchor.click();
  //   document.body.removeChild(anchor);
  // };

  // // ✅ Function to download the image efficiently
  // const handleDownloadImage = async (imageUrl: string, author: string) => {
  //   try {
  //     const response = await fetch(imageUrl, { mode: "no-cors" }); // Fetch the image as a blob
  //     const blob = await response.blob();

  //     const blobUrl = window.URL.createObjectURL(blob);
  //     const anchor = document.createElement("a");

  //     anchor.href = blobUrl;
  //     anchor.download = `${author.replace(/\s+/g, "_")}.jpg`; // Sanitize filename
  //     document.body.appendChild(anchor);
  //     anchor.click();

  //     // ✅ Cleanup after download
  //     window.URL.revokeObjectURL(blobUrl);
  //     document.body.removeChild(anchor);
  //   } catch (error) {
  //     console.error("Failed to download image:", error);
  //     alert("Failed to download the image. Please try again.");
  //   }
  // };

  // const handleDownloadImage = (imageUrl: string, imageName: string) => {
  //   saveAs(imageUrl, `${imageName}.jpg`);
  // };

  // const handleDownloadImage = async (imageUrl: string, imageName: string) => {
  //   try {
  //     const response = await fetch(imageUrl, { mode: "cors" });

  //     console.log("handleDownloadImage response", response);

  //     const blob = await response.blob();

  //     console.log("handleDownloadImage blob", blob);

  //     saveAs(blob, `${imageName}.jpg`);
  //   } catch (error) {
  //     console.error("Error downloading the image:", error);
  //   }
  // };

  const handleDownloadImage = async (
    imageUrl: string,
    imageSourceUrl: string
  ) => {
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
      console.error("Error downloading the image:", error);
    }
  };

  return (
    <Dialog>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold text-center mt-10 mb-14">
          A Collection of Beautiful Moments - A Symphony of Memories
        </h1>
        {/* <div className="sm:bg-blue-500 lg:bg-green-500 text-sky-500 lg:text-violet-500 transform scale-100">
        Responsive Test
      </div>

      <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div> */}

        {/* ✅ Error Handling */}
        {isError && (
          <Alert variant="destructive" className="w-full max-w-lg text-center">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error?.message || "Failed to fetch images. Please try again."}
            </AlertDescription>
          </Alert>
        )}

        {/* ✅ Responsive Image Gallery using Flexbox & Percentage Widths */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {isLoading ? (
            // ✅ Skeleton Loading State
            Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-64 rounded-lg" />
              // <div
              //   key={index}
              //   className="w-full h-48 rounded-lg bg-gray-200 animate-pulse"
              // ></div>
            ))
          ) : data?.pages?.flatMap((page) => page)?.length === 0 ? (
            // ✅ Empty State
            <p className="text-center text-gray-500">No images available.</p>
          ) : (
            data?.pages.flatMap((page, pageIndex) =>
              page.map((image) => (
                // <Dialog key={image.id}>
                <DialogTrigger asChild key={image.id}>
                  {/* <Card
                    className="cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <CardContent>
                      <img
                        src={image.download_url}
                        alt={image.author}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <p className="text-center">{image.author}</p>
                    </CardContent>
                  </Card> */}
                  <Card
                    className="cursor-pointer relative flex"
                    onClick={() => setSelectedImage(image)}
                  >
                    {/* <CardContent className="relative"> */}
                    <div className="relative flex flex-grow group overflow-hidden rounded-lg">
                      {/* <img
                        src={image.download_url}
                        alt={image.author}
                        className="w-full h-64 object-cover rounded-lg"
                      /> */}
                      <Image
                        src={image.download_url}
                        alt={image.author}
                        width={image.width} // Explicit width
                        height={image.height} // Explicit height
                        className="w-full object-cover rounded-lg flex-grow"
                        // priority // Helps improve LCP for important images
                        priority={pageIndex < 1} // Prioritize the first page
                      />
                      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-sm px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {image.author}
                      </div>
                    </div>
                    {/* </CardContent> */}
                  </Card>
                </DialogTrigger>

                // </Dialog>
              ))
            )
          )}
        </div>

        {/* ✅ Load More Indicator */}
        <div ref={loadMoreRef} className="h-10"></div>
        {/* {isFetchingNextPage && <p>Loading more...</p>} */}
        <div className="flex flex-row justify-center ">
          {isFetchingNextPage && (
            <Button disabled>
              <Loader2 className="animate-spin" />
              Loading...
            </Button>
          )}
        </div>

        {/* ✅ Image Modal */}
        {selectedImage && (
          <DialogContent className="max-w-3xl">
            <DialogTitle className="text-lg text-center font-semibold">
              Photographer: {selectedImage.author}
            </DialogTitle>
            <DialogDescription className="text-sm text-center text-gray-500">
              Original size: {selectedImage.width} x {selectedImage.height}
            </DialogDescription>
            {/* <img
              src={selectedImage.download_url}
              alt={selectedImage.author}
              className="w-full h-auto rounded-lg"
            /> */}

            <Image
              src={selectedImage.download_url}
              alt={selectedImage.author}
              width={selectedImage.width}
              height={selectedImage.height}
              className="w-full h-auto object-cover rounded-lg mt-2"
              // priority // Helps improve LCP for important images
              // priority
            />

            {/* ✅ Download Button */}
            <div className="flex flex-row justify-center mt-2">
              <Button
                onClick={() =>
                  handleDownloadImage(
                    selectedImage.download_url,
                    selectedImage.url
                  )
                }
              >
                Download Image
              </Button>
            </div>
          </DialogContent>
        )}
      </div>
    </Dialog>
  );
}
