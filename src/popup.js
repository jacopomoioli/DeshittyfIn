document.addEventListener("DOMContentLoaded", () => {
  const charsInput = document.getElementById("charsFilter");
  const enabledToggle = document.getElementById("isEnabled");
  const aiFilterToggle = document.getElementById("aiFilterEnabled");
  const saveBtn = document.getElementById("save");

  const defaultBlocklist = "🚀👇🤔💡🔥📈📢✅🤝✨";

  chrome.storage.sync.get(
    ["forbiddenChars", "isEnabled", "aiFilterEnabled"],
    (data) => {
      if (data.forbiddenChars === undefined) {
        charsInput.value = defaultBlocklist;
      } else {
        charsInput.value = data.forbiddenChars;
      }

      aiFilterToggle.value = !!data.aiFilterEnabled;
      enabledToggle.checked = data.isEnabled !== false;
    },
  );

  saveBtn.addEventListener("click", () => {
    const chars = charsInput.value;
    const forbiddenCharsFilterEnabled = enabledToggle.checked;
    const aiBuzzwordsFilterEnabled = aiFilterToggle.checked;

    chrome.storage.sync.set(
      {
        forbiddenChars: chars,
        isEnabled: forbiddenCharsFilterEnabled,
        aiFilterEnabled: aiBuzzwordsFilterEnabled,
      },
      () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0] && tabs[0].url.includes("linkedin.com")) {
            chrome.tabs.reload(tabs[0].id);
          }
        });
        window.close();
      },
    );
  });

  charsInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") saveBtn.click();
  });
});
