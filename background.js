chrome.history.onVisited.addListener((historyItem) => {
  chrome.storage.sync.get("blockedSites", (data) => {
      const blockedSites = data.blockedSites || [];
      if (blockedSites.some((site) => historyItem.url.includes(site))) {
          chrome.history.deleteUrl({ url: historyItem.url }, () => {
              if (chrome.runtime.lastError) {
                  console.error(`Error deleting URL: ${chrome.runtime.lastError.message}`);
              } else {
                  console.log(`Deleted: ${historyItem.url}`);
              }
          });
      }
  });
});
