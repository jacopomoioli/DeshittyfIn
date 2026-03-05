function deshittyfy() {
  chrome.storage.sync.get(['forbiddenChars', 'isEnabled'], (data) => {
    if (data.isEnabled === false) return;

    const forbiddenChars = data.forbiddenChars || "";
    if (!forbiddenChars) return;

    const charList = forbiddenChars.split('');
    
    const posts = document.querySelectorAll('.feed-shared-update-v2, .occludable-update, [data-urn]');

    posts.forEach(post => {
      const text = post.innerText || "";
      const hasForbiddenChar = charList.some(char => text.includes(char));

      if (hasForbiddenChar) {
        post.setAttribute('style', 'display: none !important');
      }
    });
  });
}

let filterTimeout = null;
const observer = new MutationObserver(() => {
  clearTimeout(filterTimeout);
  filterTimeout = setTimeout(deshittyfy, 200);
});

observer.observe(document.body, { 
  childList: true, 
  subtree: true 
});

deshittyfy();