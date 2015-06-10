chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if(msg.command == "trimming") {
        var player = document.getElementById("nicoplayerContainer");
        var rect   = player.getBoundingClientRect();
        var zoomer = window.devicePixelRatio;

        var x      = Math.round(rect.left   * zoomer);
        var y      = Math.round(rect.top    * zoomer);
        var width  = Math.round(rect.width  * zoomer);
        var height = Math.round(rect.height * zoomer);

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
    }
});
