document.addEventListener('DOMContentLoaded', () => {
  const charsInput = document.getElementById('charsFilter');
  const enabledToggle = document.getElementById('isEnabled');
  const saveBtn = document.getElementById('save');

  const defaultBlocklist = "🚀👇🤔💡🔥📈📢✅🤝✨";

  chrome.storage.sync.get(['forbiddenChars', 'isEnabled'], (data) => {
    if (data.forbiddenChars === undefined) {
      charsInput.value = defaultBlocklist;
    } else {
      charsInput.value = data.forbiddenChars;
    }
    
    enabledToggle.checked = data.isEnabled !== false;
  });

  saveBtn.addEventListener('click', () => {
    const chars = charsInput.value;
    const enabled = enabledToggle.checked;

    chrome.storage.sync.set({ 
      forbiddenChars: chars, 
      isEnabled: enabled 
    }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].url.includes("linkedin.com")) {
          chrome.tabs.reload(tabs[0].id);
        }
      });
      window.close();
    });
  });

  charsInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') saveBtn.click();
  });
});