import dateStore from "./date.json";

export async function shouldFetch() {
  const startDate = new Date(dateStore.start_time);
  const now = new Date();

  const monthDiff = now.getMonth() - startDate.getMonth();

  // a new month has started
  if (monthDiff >= 1) {
    const file = Bun.file("date.json");
    await Bun.write(file, JSON.stringify({ start_time: now.getTime() }));
    return true;
  }
  return false;
}
