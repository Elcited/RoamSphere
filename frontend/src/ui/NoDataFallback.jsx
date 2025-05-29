export default function NoDataFallback({ message = "暂无相关数据" }) {
  return (
    <div
      style={{
        height: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#aaa",
        fontSize: 14,
      }}
    >
      {message}
    </div>
  );
}
