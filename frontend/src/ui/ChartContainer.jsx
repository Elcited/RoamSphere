export default function ChartContainer({ isLoading, error, children }) {
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>加载失败，请稍后再试</div>;
  return children;
}
