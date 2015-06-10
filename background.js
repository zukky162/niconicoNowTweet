chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.captureVisibleTab(null, {"format":"png"}, function(dataUrl) {
        chrome.tabs.sendMessage(tab.id, {command: "trimming", dataUrl: dataUrl}, function(msg) {
            var a = document.createElement("a");
            a.href = msg;
            a.setAttribute("download", name || "nicovideo.png");
            a.dispatchEvent(new CustomEvent("click"));
        });
    });
});