chrome.runtime.onInstalled.addListener(function (details) {
  // turn on plugin when installed  
  if (details.reason == "install") {
    // alert('installed') - need to use alert and remove and reload the unpacked extension when testing this
    chrome.storage.local.set({ 'isActive': true });
    chrome.browserAction.setIcon({
      path: {
        "16": "img/16-icon.png",
        "32": "img/32-icon.png",
        "48": "img/48-icon.png",
        "128": "img/128-icon.png"
      }
    });
  }
  // if the extension is updated, check local storage to see if it's already active
  if (details.reason == "update") {
    chrome.storage.local.get('isActive', function (val) {
      if (val.isActive) {
        chrome.browserAction.setIcon({
          path: {
            "16": "img/16-icon.png",
            "32": "img/32-icon.png",
            "48": "img/48-icon.png",
            "128": "img/128-icon.png"
          }
        });
      } else {
        chrome.browserAction.setIcon({
          path: {
            "16": "img/16-icon-off.png",
            "32": "img/32-icon-off.png",
            "48": "img/48-icon-off.png",
            "128": "img/128-icon-off.png"
          }
        });
      }
    });
  }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    // check to see if the extension is turned on before running the rest of it
    chrome.storage.local.get('isActive', function (val) {
      if (val.isActive) {
        chrome.tabs.sendMessage(tabId, { type: 'tabUpdated' });
      }
    });
  }
});
