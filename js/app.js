var app = angular.module('app', ['smoothScroll']);

app.controller('appController', function($scope, $http, $filter, $rootScope, $window, smoothScroll) {

	var data = new Date();
	$scope.data = new Date();
	$scope.hora = $filter('date')(data, "H");

	$scope.getLocation = function(){

		if (navigator.geolocation) {

			navigator.geolocation.getCurrentPosition(function(position){
				$scope.position = position.coords;
				console.log(position.coords);
				$scope.getData();
			}, function(error){
				switch(error.code) {
					case error.PERMISSION_DENIED:
					$scope.loadingMsg = "Sorry. \n Is GPS connected?";
					break;
					case error.POSITION_UNAVAILABLE:
					$scope.loadingMsg = "I could not get his location. Is GPS connected?";
					break;
					case error.TIMEOUT:
					$scope.loadingMsg = "The request to get location timed out.";
					break;
					case error.UNKNOWN_ERROR:
					console.log("An unknown error occurred.");
					break;
				}
				$scope.$apply();
			});

		} else {

			alert("Geolocation is not supported by this browser.");

		}

	}

	$scope.initial = function(){
		
		$scope.loadingMsg = "Loading...";
		$scope.getLocation();
		tryn = 1;

	}
	
	$scope.getData = function(){

		if(tryn <= 2){
			$scope.loadingMsg = "Loading...";
		}
		if(tryn > 2 && tryn <= 4){
			$scope.loadingMsg = "One more moment...";
		}

		$http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text%3D%22(' + $scope.position.latitude + '%2C' + $scope.position.longitude + ')%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
		.then(function(response) {

			if(!response.data.query.results){
				console.log(response.data.query.results);
				tryn = tryn++;
				console.log(tryn + " attempts.");
				$scope.getData();
			}else{
				$scope.datas = response.data.query.results.channel;
				console.log(response.data.query.results.channel);
			}

		}, function errorCallback(response) {

			console.log(response);
			$scope.getData();

		});

	}

	$scope.hero = function(){

		if($scope.hora >= 0 && $scope.hora < 5){
			return 'noite';
		}
		if($scope.hora >= 5 && $scope.hora < 18){
			return 'dia';
		}
		else{
			return 'anoitecendo';
		}

	}

	$scope.toForecast = function(){

		// var y = window.innerHeight;

		// $window.scrollTo(0, y);

		var element = document.getElementById('my-element-3');
		smoothScroll(element);

	}

});


app.filter('miniaturas', function() {

	return function(y){

		var x = Number(y);

		if(x === 20 || x === 22 || x === 26){ //foggy, haze, cloudy
			return "cloudy-weather";
		}
		if(x === 21){ //haze
			return "haze-weather";
		}
		if(x === 27){ //mostly cloudy (night)
			return "mostly-cloudy-night";
		}
		if(x === 28){ //mostly cloudy (day)
			return "mostly-cloudy";
		}
		if(x === 29){ //partly cloudy (night)
			return "partly-cloudy-night";
		}
		if(x === 30 || x === 44){ //partly cloudy (day), partly cloudy
			return "partly-cloudy";
		}
		if(x === 31){ //clear (night)
			return "clear-night";
		}
		if(x === 32){ //sunny
			return "clear";
		}
		if(x === 4 || x === 37 || x === 38 || x === 39){ //thunderstorms, isolated thunderstorms, scattered thunderstorms, scattered thunderstorms
			return "storm-weather";
		}
		if(x === 47){ //isolated thundershowers
			return "thunder-weather";
		}
		if(x === 47 || x === 40 || x === 11 || x === 12){ //showers, scattered showers, showers, showers
			return "rainy-weather";
		}

	}
});

app.filter('convertCelsius', function(){

	return function(x){

		return Math.round((x - 32) / (9 / 5));

	}

});

app.filter('convertKmh', function(){

	return function(x){

		return x / 1.609344;

	}

});