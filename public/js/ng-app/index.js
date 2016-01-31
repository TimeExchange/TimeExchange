var ngApp = angular.module('indexApp', ['webStorageModule']);

ngApp.controller('indexCtrl', ['$scope','$http','webStorage', function ($scope,$http,webStorage) {
  $scope.login = function () {
    var data = $scope.loginData;
    $http.post('/api/login', data)
    .then(function sueccess(response){
      var status  = response.status,
          msg     = response.data.msg,
          token   = '';
      if (status === 200){
        token = response.data.token;
        webStorage.session.set('apiToken',token);
        $scope.checkLoginStatus();
      }
      $('#loginModal').hide();
    },function error(response){
      var status  = response.status,
          msg     = response.data.msg;
      if (status === 401){
        $scope.message = msg;
      }
    })

  }
  $scope.signup = function () {
    var data = $scope.signupData;
    console.log(data);
    $http.post('/api/signup', data)
    .success(function(response){
      console.log(response);
    })
  }
  $scope.facebookAuth = function () {

  }

  $scope.checkLoginStatus = function () {
    var token = webStorage.session.get('apiToken');
    console.log(token);
    if (token.length !== 0){
      $scope.isLogin = true;
    } else {
      $scope.isLogin = false;
    }
  }
}])