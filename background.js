chrome.browserAction.onClicked.addListener(function(tab) {
/*
    var dx, dy;
    chrome.tabs.sendMessage(tab.id, {command: "prepare"}, function(msg) {
        dx = msg.dx;
        dy = msg.dy;
    });
*/

    chrome.tabs.captureVisibleTab(null, {"format":"png"}, function(dataUrl) {
/*
        chrome.tabs.sendMessage(tab.id,
                                {command: "undo", dx: dx, dy: dy},
                                null);
*/
        chrome.tabs.sendMessage(tab.id,
                                {command: "trimming", dataUrl: dataUrl},
                                function(msg) {
            if(!msg) return;
            window.open(msg);
            var a = document.createElement("a");
            a.href = msg;
            a.setAttribute("download", name || "nicovideo.png");
            a.dispatchEvent(new CustomEvent("click"));
        });
    });
});
