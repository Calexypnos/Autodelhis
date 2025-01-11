document.addEventListener("DOMContentLoaded", () => {
    const blockForm = document.getElementById("block-form");
    const siteInput = document.getElementById("site-input");
    const blockList = document.getElementById("block-list");
  
    chrome.storage.sync.get("blockedSites", (data) => {
      const blockedSites = data.blockedSites || [];
      blockedSites.forEach((site) => addSiteToList(site));
    });
  

    blockForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const site = siteInput.value.trim();
      if (site) {
        chrome.storage.sync.get("blockedSites", (data) => {
          const blockedSites = data.blockedSites || [];
          if (!blockedSites.includes(site)) {
            blockedSites.push(site);
            chrome.storage.sync.set({ blockedSites }, () => {
              addSiteToList(site);
              siteInput.value = "";
            });
          }
        });
      }
    });
  
    function addSiteToList(site) {
      const li = document.createElement("li");
      li.textContent = site;
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", () => {
        chrome.storage.sync.get("blockedSites", (data) => {
          const blockedSites = data.blockedSites.filter((s) => s !== site);
          chrome.storage.sync.set({ blockedSites }, () => {
            li.remove();
          });
        });
      });
      li.appendChild(removeBtn);
      blockList.appendChild(li);
    }
  });
  