var substitute = function(str, o, regexp) {
    return str.replace(regexp || /\\?\{\{\s*([^{}\s]+)\s*\}\}/g, function(match, name) {
        if (match.charAt(0) === '\\') {
            return match.slice(1);
        }
        return (o[name] === undefined) ? '' : o[name];
    });
};

angular.module("tbtx.directive", []).directive('ngCopy', ['$rootScope',
    function() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,         设置模板中相对于其他元素上指令的执行顺序
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change 为这个指令创建一个新的作用域而不是继承父作用域.
            // cont­rol­ler: function($scope, $element, $attrs, $transclue) {},
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements 需要其他指令服务于这个指令来正确的发挥作用.
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            // templateUrl: '',
            // replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),  以编程的方式修改一个指令的DOM模板的副本特性, 如同使用`ng-repeat`时. 你的编译函数也可以返回链接函数来修改生成元素的实例.
            link: function($scope, element, iAttrs, controller) {
                new ZeroClipboard(element);
            }
        };
    }
])

angular.module('tbtx.filter', []).filter('choiceTrans', function() {
    return function(input, pcid, cid) {
        var pattern = /(.*)\/detail\/(\d+)\/t\/(\d+)_(\d+).htm(.*)/;
        var retPattern = "http://m.miiee.com/mobile/choiceDetail.html?itemId={{itemId}}&contentId={{contentId}}&pcid={{pcid}}&cid={{cid}}"
        var match, pcid, cid;

        match = pattern.exec(input);

        if (match) {
            var data = {
                contentId: match[3],
                itemId: match[4],
                pcid: pcid,
                cid: cid
            };
            return substitute(retPattern, data);
        } else {
            return "单品格式不正确：" + input;
        }
    };
}).filter('popularTrans', function() {
    return function(input) {
        var pattern = /(.*)\/detail\/(\d+)\/c\/(\d+).htm(.*)/;
        var retPattern = "http://m.miiee.com/mobile/popularDetail.html?id={{id}}"
        var match;

        match = pattern.exec(input);
        console.log(match);
        if (match) {
            var data = {
                id: match[3]
            };
            return substitute(retPattern, data);
        } else {
            return "资讯格式不正确：" + input;
        }
    };
}).filter('dressTrans', function() {
    return function(input) {
        var pattern = /(.*)\/detail\/(\d+)\/d\/(\d+).htm(.*)/;
        var retPattern = "http://m.miiee.com/mobile/dressDetail.html?id={{id}}"
        var match;

        match = pattern.exec(input);

        if (match) {
            var data = {
                id: match[3]
            };
            return substitute(retPattern, data);
        } else {
            return "搭配格式不正确：" + input;
        }
    };
});
