(function() {
    var initTweetText = "";

    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
        if(msg.command == "trimming") {
            // プレーヤー
            var player = document.getElementById("nicoplayerContainer");
            // 現在のページにプレーヤーが存在しない
            if(!player) return;
            // プレーヤーの矩形
            var rect   = player.getBoundingClientRect();
            // 動画の下についてるコントロールパネルの高さ。
            // 本当は自動で取得したいけどやりかたわからぬ。
            var cPanelH = 77;
            // 画面のアス比。rateH/rateWの値が処理に影響する。
            var rateW = 16;
            var rateH = 9;
            // 中画面の場合の設定。こうしないと余白除去がずれる。
            var clist = document.body.classList;
            if(clist && clist.contains("size_medium")) {
                rateW = 672;
                rateH = 461 - cPanelH;
            }
            // 1ピクセルを何倍で表示しているか（＝拡大率）
            var zoomer = window.devicePixelRatio;
            // スクショから切り抜く部分を決める
            var x      = rect.left   * zoomer;
            var y      = rect.top    * zoomer;
            var width  = rect.width  * zoomer;
            var height = rect.height * zoomer - cPanelH;
            // 余白除去の処理
            if(height * rateW <= width * rateH) {
                // ぴったり、または横に余白有り
                var offsetX = (width * rateH - height * rateW) / (rateH * 2.0);
                x += offsetX;
                width -= offsetX * 2;
            } else {
                // 縦に余白有り
                var offsetY = (height * rateW - width * rateH) / (rateW * 2.0);
                y += offsetY;
                height -= offsetY * 2;
            }
            // 実数なので四捨五入
            x      = Math.round(x);
            y      = Math.round(y);
            width  = Math.round(width);
            height = Math.round(height);

            var canvas = document.createElement('canvas');
            canvas.width  = width;
            canvas.height = height;
            
            var context = canvas.getContext('2d');

            var img = new Image();
            img.src = msg.dataUrl;

            context.drawImage(img,
                              x, y,
                              width, height,
                              0, 0,
                              width, height);
            sendResponse(canvas.toDataURL());
            return;
        }

        if(msg.command == "getTweetText") {
            if(initTweetText == "") setTweetText();
            sendResponse(initTweetText);
            return;
        }

        if(msg.command == "clearTweetText") {
            initTweetText = "";
            return;
        }
    });

    var setTweetText = function() {
        var widget = document.getElementById("twitter-widget-0");
        if(!widget) return;
        var url1 = widget.src;
        var url2 = "https://twitter.com/intent/tweet?" + url1.split("#")[1];
        var textarea = getElementByIdFromOtherPage(url2, "status");
        if(!textarea) return;
        initTweetText = textarea.innerText;
    }

    var getElementByIdFromOtherPage = function(url, id) {
        var request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send(null);
        if(request.readyState == 4 && request.status == 200) {
            var dom_parser = new DOMParser();
            var document_obj
                = dom_parser.parseFromString(request.responseText,
                                             "text/html");
            return document_obj.getElementById(id);
        } else {
            return null;
        }
    };

})();
