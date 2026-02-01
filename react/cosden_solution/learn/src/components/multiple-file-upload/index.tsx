import React, { useRef, useState, type ChangeEvent } from "react";

interface fileWIthProgess {
  id: string;
  file: File;
  progess: number;
  uploaded: boolean;
}

export default function MFileUpload() {
  const [file, setFile] = useState<fileWIthProgess[]>([]);

  const inputRef = useRef<HTMLInputElement>(null); // used the clear the value from the value as we change the value

  function handlInputFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) {
      return console.error("Inmage not found");
    }

    const newFile = Array.from(e.target.files).map((img) => ({
      file: img,
      progess: 0,
      id: img.name,
      uploaded: false,
    }));

    setFile([...file, ...newFile]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  console.log(file, "File");

  return (
    <>
      <div>
        <h2 style={{ font: "30px" }}>File Uplaod</h2>
        <FileUpload
          inputRef={inputRef}
          disabled={false}
          onFileSelect={handlInputFile}
        />
      </div>
    </>
  );
}

interface FileInputProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  disabled: boolean;
  onFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FileUpload({ inputRef, disabled, onFileSelect }: FileInputProps) {
  return (
    <>
      <form>
        <label htmlFor="file-upload"> Select File </label>
        <input
          style={{ display: "none" }}
          type="file"
          ref={inputRef}
          onChange={onFileSelect}
          multiple
          disabled={disabled}
          id="file-upload"
        />
      </form>
    </>
  );
}
