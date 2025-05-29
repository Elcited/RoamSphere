export const recordUserActivity = (recordFn, type, data) => {
  if (!recordFn || !data) return;
  recordFn({ endpoint: type, data });
};
