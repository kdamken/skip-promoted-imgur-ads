chrome.runtime.onInstalled.addListener(function (details) {
  // if the extension is either installed or updated, check local storage to see if it's already active
  if (details.reason == "install" || details.reason == "update") {
    chrome.storage.local.get('isActive', function (val) {
      if (val.isActive) {
        chrome.browserAction.setIcon({ path: 'img/spip-on.png' });
      } else {
        chrome.browserAction.setIcon({ path: 'img/spip-off.png' });
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
