const aiBuzzwords = [
  "ai",
  "generative ai",
  "agi",
  "chatbot",
  "agentic ai",
  "prompt engineering",
  "ai bubble",
];

function deshittyfy() {
  chrome.storage.sync.get(
    ["forbiddenChars", "isEnabled", "aiFilterEnabled"],
    (data) => {
      if (data.isEnabled === false) return;

      const aiFilterEnabled = data.aiFilterEnabled;
      const forbiddenChars = data.forbiddenChars || "";
      if (!forbiddenChars) return;

      const charList = forbiddenChars.split("");

      const posts = document.querySelectorAll(
        ".feed-shared-update-v2, .occludable-update, [data-urn]",
      );

      posts.forEach((post) => {
        const text = post.innerText?.toLowerCase() || "";
        const hasForbiddenChar = charList.some((char) => text.includes(char));
        const containsAiBuzzwords = aiBuzzwords.some((x) =>
          text.toLowerCase().includes(x),
        );

        if (hasForbiddenChar || (aiFilterEnabled && containsAiBuzzwords)) {
          post.setAttribute("style", "display: none !important");
        }
      });
    },
  );
}

let filterTimeout = null;
const observer = new MutationObserver(() => {
  clearTimeout(filterTimeout);
  filterTimeout = setTimeout(deshittyfy, 200);
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

deshittyfy();
