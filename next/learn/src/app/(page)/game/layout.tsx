export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Ka hereko</h1>
      {children}
      <h3>Fucche</h3>
    </div>
  );
}
