/**
 * 比较版本
 *
 * @param  {string} a 版本号a
 * @param  {string} b 版本号b
 * @return {number}   比较结果：0:相等 | 1:a > b | 2:a < b
 */
var compare = function (a, b) {
    a = a.split('.');
    b = b.split('.');

    for (var i = 0; i < 3; i++) {
        var segA = parseInt(a[i], 10);
        var segB = parseInt(b[i], 10);

        if (segA > segB) {
            return 1;
        }

        if (segB > segA) {
            return -1;
        }

        if (!isNaN(segA) && isNaN(segB)) {
            return 1;
        }

        if (isNaN(segA) && !isNaN(segB)) {
            return -1;
        }
    }
    return 0;
};

/**
 * 版本构造函数
 *
 * @param {Object} ua ua
 */
var Version = function (ua) {
    this.ua = ua;
    debugger
    this.version = ua.browser.version.original;
};

/**
 * 构造函数
 *
 * @type {Object}
 */
Version.prototype = {
    constructor: Version,

    /**
     * 比目标版本号低
     *
     * @param  {string} version 目标版本号
     * @return {Boolean}        比较结果
     */
    lt: function (version) {
        return (compare(this.version, version) == -1);
    },


    /**
     * 小于等于目标版本号
     *
     * @param  {string} version 目标版本号
     * @return {Boolean}        比较结果
     */
    lte: function (version) {
        return (compare(this.version, version) <= 0);
    },

    /**
     * 比目标版本号高
     *
     * @param  {string} version 目标版本号
     * @return {Boolean}        比较结果
     */
    gt: function (version) {
        return (compare(this.version, version) == 1);
    },

    /**
     * 大于等于目标版本号
     *
     * @param  {string} version 目标版本号
     * @return {Boolean}        比较结果
     */
    gte: function (version) {
        return (compare(this.version, version) >= 0);
    },

    /**
     * 与目标版本号相等
     *
     * @param  {string} version 目标版本号
     * @return {Boolean}        比较结果
     */
    eq: function (version) {
        return (compare(this.version, version) == 0);
    }
};

module.exports = Version;

