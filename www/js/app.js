// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'



var username = '';
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('tabs',{
		url:'/tabs',
		templateUrl:'components/tabs.html'
	})
	.state('tabs.home',{
		url:'/home',
		views:{
			'home-tab':{
				templateUrl:'components/home.html',
				controller:'ctrl'
			}
		}
	})
	.state('tabs.login',{
		url:'/login',
		views:{
			'login-tab':{
				templateUrl:'components/login.html'
			}
		}
	})
	.state('tabs.register',{
		url:'/register',
		views:{
			'register-tab':{
				templateUrl:'components/register.html'
			}
		}
	})
	.state('tabs.cart',{
		url:'/cart',
		views:{
			'cart-tab':{
				templateUrl:'components/cart.html'
				
			}
		}
	})
	.state('tabs.first',{
		url:'/first',
		views:{
			'home-tab':{
				templateUrl:'components/first.html'
			}
		}
	})
	.state('tabs.second',{
		url:'/second',
		views:{
			'home-tab':{
				templateUrl:'components/second.html'
			}
		}
	})
	.state('tabs.list',{
		url:'/list/:id',
		views:{
			'home-tab':{
				templateUrl:'components/list.html'
				
			}
		}
	})
	.state('tabs.about',{
		url:'/about',
		views:{
			'about-tab':{
				templateUrl:'components/about.html'
			}
		}
	})
	.state('tabs.other',{
		url:'/other',
		views:{
			'other-tab':{
				templateUrl:'components/other.html'
			}
		}
	})
	$urlRouterProvider.otherwise('/tabs/home')
}])

//注册

.controller('ctrl3',function($scope,$http,$stateParams,$location,$timeout){
	$scope.tap = function(){
		console.log($scope.user)
		$http({
			method:'post',
			url:'http://datainfo.duapp.com/shopdata/userinfo.php',
			params:{status:'register',userID:$scope.user,password:$scope.pass1}
		}).success(function(data){
			console.log(data)
			if($scope.user == ''){
					alert('用户名不能为空')
				}else{
					if(data == 0 ){
						alert('用户名重复')
					
					}else{
						if($scope.pass1 == ''){
						alert('密码不能为空')
						}else{
							if($scope.pass2 == ''){
								alert('确认密码不能为空')
							}else{
								if($scope.pass1 != $scope.pass2){
									alert('两次输入密码不一致')
								}else{
									if(data == 1){
										alert('注册成功')
										var timer = $timeout(function(){
											$location.path('tabs/login')
									
										})
									}else{
										alert('数据库错误')
									}
								}
							}
						}
					}
						
					
				}
		})
	}
})
//登陆
.controller('ctrl4',function($scope,$http,$stateParams,$location,$timeout){
	$scope.dian = function(){
		$http({
			method:'get',
			url:'http://datainfo.duapp.com/shopdata/userinfo.php',
			params:{status:'login',userID:$scope.user,password:$scope.pass1}
		}).success(function(data){
			console.log(data)
			if($scope.user==''){
					alert('用户名为空')
				}else{
					if(data == 0 ){
						alert('用户名不存在')	
					}else{
						if($scope.pass1 == ''){
							alert('密码不能为空')
						}else{
							if(data == 2){
								alert('用户名密码不符')
							}else{
								alert('登陆成功')
								
									var timer = $timeout(function(){
										$location.path('tabs/home')
										username=$scope.user;
									},3000)
						
							}
						}
					}
				}
		})
	}
})







.controller('ctrl',function($scope,$http,$stateParams){
	var classID='';
	
		$http({
			url:'http://datainfo.duapp.com/shopdata/getclass.php'
			
		}).success(function(data){
			console.log(data)
			$scope.str = eval(data)
			
		})
		
		
		
	$scope.cap=function(i){
		
				 $scope.arr = '';
				 $scope.id = i.classID;
		$http({
			
			url:'http://datainfo.duapp.com/shopdata/getGoods.php?callback=',
			params:{classID:$scope.id,goodsID:$stateParams.id}
		}).success(function(data){
			console.log(eval(data))
			$scope.arr = eval(data)
		})
	}
	
	
	
	$http({
		url:'http://datainfo.duapp.com/shopdata/getGoods.php?callback='
	}).success(function(data){
		$scope.arr = eval(data)
		console.log(eval(data))
	})
	
	
	
	
	
	
})
.controller('ctrl1',function($scope,$http,$stateParams){
	$http({
		url:'http://datainfo.duapp.com/shopdata/getGoods.php?callback=',
		params:{goodsID:$stateParams.id,callback:''}
	}).success(function(data){
		console.log(eval(data))
		$scope.list = eval(data)
		
		
	})
	
	
	
	var i=0;
	$scope.tap=function(){
		console.log(1)
		console.log(username)
		i++;
		$http({
		url:'http://datainfo.duapp.com/shopdata/updatecar.php',
		params:{goodsID:$stateParams.id,callback:'',userID:username,number:i}
		}).success(function(data){
			console.log(i)
			console.log(data)
			
		})
	
	}
	
})
//购物车数据
.controller('ctrl2',function($scope,$http,$stateParams){
	$http({
		url:'http://datainfo.duapp.com/shopdata/getCar.php?callback=',
		params:{userID:username}
	}).success(function(data){
		console.log(username)
		console.log(eval(data))
		
		$scope.arr = eval(data)
	})
})
