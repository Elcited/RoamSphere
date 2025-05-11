export default function extractBusTimeTips(segments = []) {
  const tipsSet = new Set();

  segments.forEach(item => {
    if (item?.busTimeTips) {
      tipsSet.add(item.busTimeTips);
    }
  });

  return [...tipsSet];
}
