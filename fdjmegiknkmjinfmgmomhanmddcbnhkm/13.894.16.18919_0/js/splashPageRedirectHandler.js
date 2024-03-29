var ask;
(function (ask) {
    var apps;
    (function (apps) {
        var background;
        (function (background) {
            var SplashPageRedirectHandler = (function () {
                function SplashPageRedirectHandler(config) {
                    var _this = this;
                    this.start = function () {
                        chrome.tabs.onUpdated.addListener(_this.newTabRedirectHandler);
                    };
                    this.stop = function () {
                        chrome.tabs.onUpdated.removeListener(_this.newTabRedirectHandler);
                    };
                    this.isNewTabPage = function (urlStrToValidate) {
                        return urlStrToValidate && _this.newTabHostnameSearchPathRegexp.test(urlStrToValidate);
                    };
                    this.newTabRedirectHandler = function (tabId, changeInfo, tab) {
                        var tabURLString = decodeURI(changeInfo.url || tab.url);
                        if (_this.isNewTabPage(tabURLString)) {
                            var tabUrlParams = UrlUtils.parseQueryString(UrlUtils.parseUrl(tabURLString).getQueryString()).nameValues;
                            var uniqueParams = tabUrlParams
                                .filter(function (param) { return !~_this.newTabUrlParams.map(function (ntParam) { return ntParam.name; }).indexOf(param.name); })
                                .map(function (param) { return param.name + "=" + param.value; });
                            chrome.tabs.update(tabId, { url: PageUtils.appendParams(PageUtils.getNewTabResourceUrl(), uniqueParams) });
                        }
                    };
                    var newTabUrlStr = decodeURI(TextTemplate.parse(config.state.toolbarData.newTabURL, config.state.replaceableParams));
                    var newTabUrl = UrlUtils.parseUrl(newTabUrlStr);
                    this.newTabUrl = newTabUrl;
                    var pathDelimiterIndex = newTabUrl.getPath().indexOf("/");
                    var productName = pathDelimiterIndex === -1
                        ? newTabUrl.getPath()
                        : newTabUrl.getPath().substr(0, pathDelimiterIndex);
                    this.newTabHostnameSearchPathRegexp = new RegExp("^(http(s)?://" + newTabUrl.getDomain() + "/" + productName + "/)", "i");
                    var newTabParsedQueryString = UrlUtils.parseQueryString(newTabUrl.getQueryString());
                    this.newTabUrlParams = newTabParsedQueryString.nameValues;
                }
                return SplashPageRedirectHandler;
            }());
            background.SplashPageRedirectHandler = SplashPageRedirectHandler;
        })(background = apps.background || (apps.background = {}));
    })(apps = ask.apps || (ask.apps = {}));
})(ask || (ask = {}));
