export default async function GameSlug({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { slug } = await params;

  return <div>Game you selected is {slug}</div>;
}
