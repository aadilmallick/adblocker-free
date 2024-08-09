import { PrintAdvanced, Print } from "@2022amallick/print-colors";
import { shouldFetch } from "./DateModel";

const boldPrint = new PrintAdvanced({
  shouldBold: true,
});

async function fetchEasyFilterList() {
  let text: string;
  if (await shouldFetch()) {
    const response = await fetch("https://easylist.to/easylist/easylist.txt");
    text = await response.text();
    Print.green("fetched");
  } else {
    const file = Bun.file("easyfilter.txt");
    text = await file.text();
    Print.green("cached");
  }
  return text;
}

const text = await fetchEasyFilterList();
const lines = text.split("\n");
// const rules: chrome.declarativeNetRequest.Rule[] = lines
//   .slice(18)
//   .map((line, i) => {
//     const str = line.trim();
//     return {
//       id: i,
//       action: {
//         type: chrome.declarativeNetRequest.RuleActionType.BLOCK,
//       },
//       priority: 1,
//       condition: {
//         urlFilter: str,
//         isUrlFilterCaseSensitive: false,
//       },
//     };
//   });
const rules = lines.slice(18).map((line, i) => {
  const str = line.trim();
  return {
    id: i,
    action: {
      type: "block",
    },
    priority: 1,
    condition: {
      urlFilter: str,
      isUrlFilterCaseSensitive: false,
    },
  };
});

const jsonFile = Bun.file("easyfilter.json");
await Bun.write(jsonFile, JSON.stringify({ rules }));
