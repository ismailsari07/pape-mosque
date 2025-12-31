export async function getTestData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  if (!response.ok) throw new Error("Veri Cekilemedi");
  return response.json();
}
