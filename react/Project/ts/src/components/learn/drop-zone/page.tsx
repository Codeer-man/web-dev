import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function DropZone() {
  const onDrop = useCallback((acceptFile) => {}, []);

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 5,
    maxSize: 1024 * 1024 * 5,
  });

  return (
    <div className=" overflow-auto h-screen border-2 p-4 flex items-center justify-center">
      <div
        {...getRootProps()}
        className=" border-dotted border-2 hover:border-double h-100 w-200 flex items-center justify-center cursor-pointer"
      >
        <input {...getInputProps()} type="file" />
        {isDragActive ? (
          <p>Drop The File Here</p>
        ) : (
          <p>Drag & drop the file here, or click to select files</p>
        )}
      </div>
    </div>
  );
}
