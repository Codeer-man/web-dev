export const Child = ({ ContactMessage }) => {
  return <h1>{ContactMessage}</h1>;
};

export default function ContactUs() {
  const message = "Hello from contact message";
  return (
    <div>
      <Child ContactMessage={message} />
      <h1>This is contact us page</h1>
    </div>
  );
}
