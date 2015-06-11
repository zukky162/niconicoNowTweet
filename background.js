chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.captureVisibleTab(null, {"format":"png"}, function(dataUrl) {
        chrome.tabs.sendMessage(
            tab.id, {command: "trimming", dataUrl: dataUrl}, function(msg) {
                if(!msg) return;
                var a = document.createElement("a");
                a.href = msg;
                var url = tab.url;
                var id = url.match("watch/([a-z]{2}[0-9]+)")[1];
                a.setAttribute("download", id + ".png");
                a.dispatchEvent(new CustomEvent("click"));
            });
    });
});
