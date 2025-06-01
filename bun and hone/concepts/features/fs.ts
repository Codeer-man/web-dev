import type { BunFile } from "bun";

async function fileSystemOperation() {
  const file: BunFile = Bun.file("read.txt");

  console.log(file.size);
  console.log(file.type);
  const extraFileContent = await file.text();
  console.log(extraFileContent);

  const arrayBuffer = await file.arrayBuffer();
  const bites = await file.bytes();
  console.log(arrayBuffer, bites);

  const content = "Hello I am reading bun right now";
  await Bun.write("output.txt", content);
  console.log("File created");

  const copy = Bun.file("read.txt");
  await Bun.write("read_copy.txt", copy);
  console.log("File cloned successfully");

  const isFileExists = await Bun.file("read_copy.txt").exists();
  console.log(isFileExists);

  await Bun.file("read_copy.txt").delete();
}

fileSystemOperation();
