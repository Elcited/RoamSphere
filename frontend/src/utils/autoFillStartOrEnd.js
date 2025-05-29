export default function autoFillStartOrEnd({
  start,
  end,
  dispatch,
  reversedAddress,
}) {
  if (!reversedAddress) return;

  if (!start && !end) {
    dispatch(setStart(reversedAddress));
  } else if (start && !end) {
    dispatch(setEnd(reversedAddress));
  }
}
