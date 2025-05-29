export default function extractBusTimeTips(segments = []) {
  const tipsSet = new Set();

  if (!Array.isArray(segments)) return;

  segments?.forEach(item => {
    if (item?.busTimeTips) {
      tipsSet.add(item.busTimeTips);
    }
  });

  return [...tipsSet];
}
