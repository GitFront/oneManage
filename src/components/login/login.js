angular.module('login', [])
  .directive('nglLogin', [//元素指令，封装可复用性组件
    function() {
      return {
        scope: {},
        restrict: 'E',
        templateUrl: '/src/components/login/login.html',
        replace: true,
        controller: 'nglLoginCtrl'
      };
    }
  ])
  // 功能点：1、登陆跳到到首页 2、登陆成功的返回信息要本地持久化存储 3、历史登陆用户的头像展示
  .controller('nglLoginCtrl', [
    '$scope',
    '$location',
    'api',
    function($scope, $location, api) {

      // 登陆功能
      $scope.user = {
        tc_name: '',
        tc_pass: ''
      };
      $scope.login = function() {

        // 调用封装好的login方法请求接口，这里我们不需要关心接口的method与url，
        // 只需要关心请求成功后做什么就可以了。
        api.login(function(data) {
          localStorage.setItem('userInfo', JSON.stringify(data.result));
          $location.path('/');
        }, $scope.user);
      };

      // 历史登陆用户的头像回显
      var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      $scope.userInfo = userInfo || { tc_avatar: '/public/img/default.png' };
    }
  ]);
