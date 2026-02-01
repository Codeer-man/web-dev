import { useCallback, useState } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { toast } from "react-toastify";

export const DropZone = () => {
  const [files, setFiles] = useState<
    Array<{
      id: string;
      files: File;
      uploaded: boolean;
      progess: number;
      key: string;
      isDeleting: boolean;
      error: boolean;
      objectUrl: string;
    }>
  >([]);

  const onDrop = useCallback((acceptedFile: File[]) => {
    console.log(acceptedFile);

    if (acceptedFile.length > 0) {
      setFiles((prevfile) => [
        ...prevfile,
        ...acceptedFile.map((file) => ({
          id: "sdg",
          files: file,
          uploaded: false,
          isDeleting: false,
          key: "sdg",
          objectUrl: URL.createObjectURL(file),
          error: false,
          progess: 0,
        })),
      ]);
    }
  }, []);

  const onDropRejected = useCallback((fileRejected: FileRejection[]) => {
    console.log(fileRejected);

    if (fileRejected.length > 0) {
      const tooManyFIle = fileRejected.find(
        (fileRejection) => fileRejection.errors[0].code === "too-many-files"
      );
      if (tooManyFIle) {
        toast.error("You can only upload 5 images at most");
      }

      const tooLargeFile = fileRejected.find(
        (fileRejected) => fileRejected.errors[0].code === "too-large-file"
      );
      if (tooLargeFile) {
        toast.error(
          "File excluded the size of 5 mb please select a small size file"
        );
      }
    }
  }, []);

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 5,
    maxSize: 1024 * 1024 * 5,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div className=" h-screen w-full flex flex-col items-center justify-center bg-gray-50 gap-10">
      <div
        {...getRootProps()}
        className={` border-2 hover:border-amber-950 border-dashed transition-all rounded-2xl duration-200 w-100 h-60  flex flex-col gap-3 items-center justify-center cursor-pointer ${
          isDragActive ? "border-blue-500" : "border-gray-500 hover:bg-gray-100"
        }`}
      >
        <input type="file" {...getInputProps()} />
        <svg
          className="w-12 h-12 text-gray-400 mb-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12M5 20h14a2 2 0 002-2v-5a1 1 0 00-1-1H4a1 1 0 00-1 1v5a2 2 0 002 2z"
          />
        </svg>
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <p>Drag and drop the file here</p>
        )}
      </div>
      <div className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mt-6">
        {files.map((files, index) => (
          <div key={index}>
            <img src={files.objectUrl} alt={files.files.name} />
          </div>
        ))}
      </div>
    </div>
  );
};
