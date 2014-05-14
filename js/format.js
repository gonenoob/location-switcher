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
                var clip = new ZeroClipboard(element);
                clip.on('complete', function(client, args) {
                    // this.style.display = 'none'; // "this" is the element that was clicked
                    // alert("Copied text to clipboard: " + args.text);
                    var animateArray = ['swing', 'shake', 'wobble', 'pulse', 'bounceIn'];
                    var m = 0,
                        n = animateArray.length;
                    var seed = Math.floor(Math.random() * (n-m) + m);

                    var name = 'animated ' + animateArray[seed];
                    var $item = $(this);
                    $item.addClass(name);
                    setTimeout(function() {
                        $item.removeClass(name);
                    }, 500);
                });
            }
        };
    }
]);
var app = angular.module('tbtx', ['tbtx.directive']);

function appController($scope) {

    var getTitle = function() {
            return $scope.title || "";
        },
        getUrl = function() {
            return $scope.url || "";
        };

    $scope.$watch('title',
        function(to, from) {
            $scope.result = formatData(getTitle(), getUrl(), $scope.filters);
        }
    );
    $scope.$watch('url',
        function(to, from) {
            $scope.result = formatData(getTitle(), getUrl(), $scope.filters);
        }
    );
    $scope.$watch('filters',
        function(to, from) {
            $scope.result = formatData(getTitle(), getUrl(), $scope.filters);
        }
    );

    $scope.filters = "http://miiee.taobao.com";

    $scope.toHtml = function() {
        var template = Handlebars.compile($scope.template);
        var json = JSON.parse($scope.result);
        var html = template(json);
        $scope.html = html;
    };

    $scope.template = $("#template-theme").html();

    $scope.$watch("images", function(to, from) {
        if (!to) {
            return;
        }
        var source = to.split("\n"),
            template = Handlebars.compile($("#template-image").html()),
            ret = template(source);

        $scope.imageHtml = ret;
    });
}

function formatData(title, url, filters) {
    var ret = [];

    // 过滤空行，个数不正确的行
    title.split("\n").forEach(function(line, i) {
        line = line.trim();
        if (line) {
            ret[i] = ret[i] || {};
            ret[i].title = line;
        }
    });
    url.split("\n").forEach(function(line, i) {
        line = line.trim();
        if (line) {
            ret[i] = ret[i] || {};
            ret[i].url = line;
        }
    });

    ret = JSON.stringify(ret);
    filters && filters.split("\n").forEach(function(value, index) {
        value = value.trim();

        ret = ret.replace(new RegExp(value, "g"), "");
    });
    // return JSON.parse(ret);
    return ret;
}
