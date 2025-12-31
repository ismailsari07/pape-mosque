import { useQuery } from "@tanstack/react-query";
import { getTestData } from "../app/api/test";

export function TestQuery() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["testData2"],
    queryFn: getTestData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Hata: {error.message}</div>;

  return (
    <div className="p-4 border rounded">
      <h1 className="font-bold">Test Query:</h1>
      <p>{data?.title}</p>
      <p>{data?.body}</p>
    </div>
  );
}
