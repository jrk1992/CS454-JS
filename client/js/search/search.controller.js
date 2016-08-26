angular.module('search.controller', ['ngCookies','ngAnimate','firebase','ui.bootstrap'])
.directive('showPreview',function(){
	return {
		restrict: 'EA',
		scope: {
			show: '='
		},
		templateUrl: '../views/show.preview.html'
	}
})
.controller('SearchController',function ($scope, SearchService, $cookies,$firebaseArray) {
	var ref = new Firebase("https://cs454tvmaze.firebaseio.com/");
	//$scope.shistory = $firebaseArray(ref);
	var shistory="";
	var users=$firebaseArray(ref);
	var coo=$cookies.get("user");
	var shistory;
	users.$loaded()
	.then(function(){
		angular.forEach(users, function(user) {
			if(coo==user.name){
			shistory= shistory + user;
			console.log(user.text);
		}

		})
	});
	$scope.shistory = $firebaseArray(ref);
	var userSearchH=$firebaseArray(ref);


	$scope.searchHistory = $firebaseArray(ref);
	var userName=$cookies.get("user");
	if(userName!=""){
		$scope.cookieValue=userName;
	}else{
		var userValue=token();
		setCookie(userValue);
		$scope.cookieValue=userValue;
	}

	$scope.search2 = function(item){
		$scope.name = item;
		$scope.search();
	};
        
         $scope.search = function(){
         	var userName=$cookies.get("user");

         	if(userName != undefined){
         		
         		write(userName,$scope.name);
         	}else{
         		var userValue=token();
         		$cookies.put('user', userValue);
         		write(userValue,$scope.name);
         	}
         	SearchService.query({ name: $scope.name},function(response){



         		$scope.shows= response;

         	});
         };
	
     });




function write(key,value) {
	var myDataRef = new Firebase('https://cs454tvmaze.firebaseio.com/');
	myDataRef.push({name: key, text: value});
}


//Refered Stackoverflow
var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function() {
    return rand() + rand(); // to make it longer
};







