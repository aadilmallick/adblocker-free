async function fetchEasyFilterList() {
  const response = await fetch("https://easylist.to/easylist/easylist.txt");
  const text = await response.text();
  const file = Bun.file("easyfilter.txt");
  await Bun.write(file, text);
}

await fetchEasyFilterList();
