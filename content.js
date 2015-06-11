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
        // 中画面の場合はcPanelHを83に設定。こうしないと余白除去がずれる。
        var clist = document.body.classList;
        if(clist && clist.contains("size_medium")) cPanelH = 83;
        // 1ピクセルを何倍で表示しているか（＝拡大率）
        var zoomer = window.devicePixelRatio;
        // スクショから切り抜く部分を決める
        var x      = rect.left   * zoomer;
        var y      = rect.top    * zoomer;
        var width  = rect.width  * zoomer;
        var height = rect.height * zoomer - cPanelH;
        // 余白除去の処理
        if(height * 16 <= width * 9) {
            // ぴったり、または横に余白有り
            var offsetX = (width * 9 - height * 16) / 18.0;
            x += offsetX;
            width -= offsetX * 2;
        } else {
            // 縦に余白有り
            var offsetY = (height * 16 - width * 9) / 32.0;
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
});
