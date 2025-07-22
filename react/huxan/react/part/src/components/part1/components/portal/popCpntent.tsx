interface popContent {
  copied: boolean;
}

export default function PopContent({ copied }: popContent) {
  return (
    <section>
      {copied && (
        <h1 style={{ position: "absolute", bottom: "20px" }}>
          Copied To clipboard
        </h1>
      )}
    </section>
  );
}
