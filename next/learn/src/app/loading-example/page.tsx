async function getData() {
  await new Promise((result) => setTimeout(result, 2000));

  return {
    status: {
      user: 1000,
    },
  };
}

export default async function loading() {
  const data = await getData();
  return (
    <div>
      <h1>Loading example</h1>
      <p className="font-bold text-xl">{data.status.user} </p>
    </div>
  );
}
