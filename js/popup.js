function updateStatus() {
    var storage = chrome.storage.local;
    var checkbox = document.querySelector('.toggle');
    storage.get('isActive', function (val) {
        if (val.isActive) {
            checkbox.checked = false;
            chrome.browserAction.setIcon({ path: 'img/spip-off.png' });
            storage.set({ 'isActive': false });
        } else {
            chrome.browserAction.setIcon({ path: 'img/spip-on.png' });
            checkbox.checked = true;
            storage.set({ 'isActive': true });
        }
    });
}

function onLoad() {
    var checkbox = document.querySelector('.toggle');
    var bodyEl = document.querySelector('body');
    chrome.storage.local.get('isActive', function (val) {
        if (val.isActive) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
    });
    setTimeout(() => {
        bodyEl.classList.remove('preload');
    }, 50);
}

onLoad();
document.querySelector('.toggle').addEventListener('change', updateStatus)