define(function () {

    var browser = (function () {
        var UA = navigator.userAgent;
        var ie = UA.indexOf('MSIE') > -1;
        var version = ie ? /\d+/.exec(UA.split(';')[1]) : 'no ie';

        return {
            ie: ie,
            version: version
        };
    })();

    /**
     * 获取元素的背景图片地址
     * @param  {HTMLElement} ele 要获取北京图片的元素
     * @return {String}      图片地址
     */
    var getImg = function (ele) {
        var img;
        if (ele.currentStyle) {
            img = ele.currentStyle['backgroundImage'];
        }
        else if (window.getComputedStyle) {
            img = window.getComputedStyle(ele, null)['background-image'];
        }

        if (img == 'none') {
            img = undefined;
        }
        return img;
    };

    /**
     * 转换ie6下的png图片透明
     * @param  {Array} arr dom元素数组
     */
    var convertImg = function (arr) {
        if (browser.ie && browser.version <= 6) {

            for (var i = 0; i < arr.length; i++) {
                
                var item = arr[i];
                var bkimg = getImg(item);

                if (bkimg) {
                    if (/^\s*url\(\s*["'']?(.*?)["'']?\s*\)/g.test(bkimg)) {
                        var imgUrl = bkimg.replace(/^\s*url\(\s*["'']?(.*?)["'']?\s*\)/g, '$1');
                        item.style.filter = ''
                            + 'progid:DXImageTransform.Microsoft.AlphaImageLoader('
                            +   'enabled="true",'
                            +     'sizingMethod="image",'
                            +     'src="' + imgUrl + '"'
                            + ')';  
                        item.style.background = 'none';  
                    }
                }
            }  
        }∏
    };
    
    return {
        enter: convertImg
    };
});
    