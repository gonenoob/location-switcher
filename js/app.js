var app = angular.module('tbtx', ['tbtx.directive', 'tbtx.filter']);

var nav = [{
    name: '服饰装配',
    pcid: 8101,
    sub: [{
        name: '女装',
        cid: 8101001
    }, {
        name: '女鞋',
        cid: 8101002
    }, {
        name: '女包',
        cid: 8101003
    }, {
        name: '内衣',
        cid: 8101004
    }, {
        name: '礼服',
        cid: 8101005
    }, {
        name: '饰品',
        cid: 8101006
    }, {
        name: '配饰',
        cid: 8101007
    }]
}, {
    name: '美容护肤',
    pcid: 8102,
    sub: [{
        name: '护肤',
        cid: 8102001
    }, {
        name: '彩妆',
        cid: 8102002
    }, {
        name: '香氛',
        cid: 8102003
    }, {
        name: '美体',
        cid: 8102004
    }]
}, {
    name: '家居百货',
    pcid: 8103,
    sub: [{
        name: '百货',
        cid: 8103001
    }, {
        name: '家饰',
        cid: 8103002
    }, {
        name: '美食',
        cid: 8103003
    }, {
        name: '旅行',
        cid: 8103004
    }]
}, {
    name: '全球购',
    pcid: 8104,
    sub: [{
        name: '女装',
        cid: 8104001
    }, {
        name: '女鞋',
        cid: 8104002
    }, {
        name: '女包',
        cid: 8104003
    }, {
        name: '配饰',
        cid: 8104004
    }, {
        name: '美容',
        cid: 8104005
    }, {
        name: '家居',
        cid: 8104006
    }]
}, {
    name: '我的男友',
    pcid: 8106,
    sub: [{
        name: '男装',
        cid: 8106001
    }, {
        name: '男鞋',
        cid: 8106002
    }, {
        name: '男包',
        cid: 8106003
    }, {
        name: '配饰',
        cid: 8106004
    }]
}];

function ChoiceCtrl($scope) {
    $scope.$watch('input',
        function(to, from) {
        	to = $.trim(to);
        	if (to && typeof to == "string") {
            	$scope.list = to.split(/\s+/);
        	} else {
        		$scope.list = [];
        	}
        }
    );

    $scope.$watch('pcid',
        function(to, from) {
        	for (var i = 0; i < nav.length; i++) {
        		if (nav[i].pcid == to) {
        			$scope.cids = nav[i].sub;
        			break;
        		}
        	}
        }
    );

    var handler = function() {
    	var $item = $(this);
    	new ZeroClipboard($item);
    };
    $('body').on('click', '.copy-button', handler);

    $scope.nav = nav;
}
ChoiceCtrl.$inject = ['$scope'];


function PopularCtrl($scope) {

    $scope.$watch('input',
        function(to, from) {
        	to = $.trim(to);
        	if (to && typeof to == "string") {
            	$scope.list = to.split(/\s+/);
        	} else {
        		$scope.list = [];
        	}
        }
    );
}
PopularCtrl.$inject = ['$scope'];

function DressCtrl($scope) {
    $scope.$watch('input',
        function(to, from) {
        	to = $.trim(to);
        	if (to && typeof to == "string") {
            	$scope.list = to.split(/\s+/);
        	} else {
        		$scope.list = [];
        	}
        }
    );
}
DressCtrl.$inject = ['$scope'];

// angular.bootstrap(document.documentElement);
