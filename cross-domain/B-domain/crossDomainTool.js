
var crossDomainTool = (function () {
    
    /**
     * 闭包中维护iframe的引用
     * @type {HTMLElement}
     */
    var iframe = null;

    /**
     * 传入的跨域文件地址
     * @type {string}
     */
    var address = '';

    /**
     * 传送消息
     * @param  {string} method 方法名
     * @param  {Object} parmas 传参对象
     */
    var postMsg = function (method, parmas) {
        parmas = parmas || {};
        parmas.method = method;

        // 打个时间戳
        parmas.t = (new Date()).getTime();

        var urlParmas = [];
        for (var item in parmas) {
            urlParmas.push(item + '=' + encodeURIComponent(parmas[item]));
        }

        // 第一次要建立iframe
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            window.document.body.appendChild(iframe);
        }

        // 发请求了
        iframe.src = address + '?' + urlParmas.join('&');
    };
    
    /**
     * 配置地址
     * @param  {string} url 跨域文件地址
     */
    var config = function (url) {
        address = url;
    };

    // 暴露接口
    return {
        config: config,
        postMsg: postMsg
    };
})();
    