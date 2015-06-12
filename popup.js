(function() {
    var BG = chrome.extension.getBackgroundPage();
    var img, textarea;

    document.addEventListener('DOMContentLoaded', function () {
        img = document.getElementById("img");
        textarea = document.getElementById("status");

        BG.getImageUrl(function(imgUrl) {
            img.src = imgUrl;
        });

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var tab = tabs[0];
            chrome.tabs.sendMessage(tab.id, {command: "getTweetText"});
        });
        
        img.onclick = function() {
            BG.saveFromUrl(img.src);
            window.close();
        };

        document.getElementById("btn-tweet").onclick = function() {
            BG.tweetWithImageUrl(textarea.value, img.src);
            window.close();
        };
        
        document.getElementById("btn-add").onclick = function() {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var tab = tabs[0];
                chrome.tabs.sendMessage(tab.id, {command: "getTweetText"}, function(text) {
                    if(!text) return;
                    textarea.value = text;
                });
            });
        };

        document.getElementById("btn-account").onclick = function() {
            BG.oauth.clearTokens();
            window.close();
        };
        
    });
})();
