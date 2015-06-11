(function() {
    var oauth = ChromeExOAuth.initBackgroundPage({
        'request_url':     'https://twitter.com/oauth/request_token',
        'authorize_url':   'https://twitter.com/oauth/authorize',
        'access_url':      'https://twitter.com/oauth/access_token',
        'consumer_key':    'nHbl3wTI54uEIlsTH0Qr28mtt',
        'consumer_secret': '8OpkebpEVaEzB0XUZO2ctvMavCiQQBfMyhYw2ew0zB2fvmQoaz',
        'oath_scope': '',
        'app_name': ''
    });
    
    var postTweet = function(content, media_id) {
        var request_url = "https://api.twitter.com/1.1/statuses/update.json";
        var params = {"status": content, "media_ids": media_id};
        var onReceive = function(text, xhr) {
            var status = JSON.parse(text);
        };
        oauth.authorize(function() {
            oauth.sendSignedRequest(
                request_url, onReceive,
                {
                    "method": "POST",
                    "parameters": params
                });
        });
    };

    var tweetWithImage = function(content, dataUrl) {
        var blob = base64ToBlob(dataUrl);
        var request_url = "https://upload.twitter.com/1.1/media/upload.json";
        var opt_params = {
            method: "POST",
        };
        formData = new FormData();
        formData.append("media", blob);
        opt_params["body"] = formData;
        var onReceive = function(text, xhr) {
            var status = JSON.parse(text);
            postTweet(content, status.media_id_string);
        };
        oauth.authorize(function() {
            oauth.sendSignedRequest(
                request_url, onReceive,
                opt_params);
        });
    };

    chrome.browserAction.onClicked.addListener(function(tab) {
        chrome.tabs.captureVisibleTab(null, {"format": "png"}, function(dataUrl) {
            chrome.tabs.sendMessage(
                tab.id, {command: "trimming", dataUrl: dataUrl}, function(msg) {
                    if(!msg) return;
                    tweetWithImage("test", msg);
                    return;
                    var a = document.createElement("a");
                    a.href = msg;
                    var id = tab.url.match(/watch\/([a-z]{2}[0-9]+)/)[1];
                    a.setAttribute("download", id + ".png");
                    a.dispatchEvent(new CustomEvent("click"));
                });
        });
    });

    var base64ToBlob = function(dataUrl) {
        var type = dataUrl.match(/^data:(.*?)[,;]/)[1];
        console.log(type);
        var bin = atob(dataUrl.split(',')[1]);
        var buffer = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) {
            buffer[i] = bin.charCodeAt(i);
        }
        return new Blob([buffer.buffer], {type: type});
    };
})();
