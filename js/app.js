var app = angular.module('app', []);

app.controller('appController', function($scope, $http, $filter, $rootScope) {

	$scope.datas = '';

	var data = new Date();

	$scope.hora = $filter('date')(data, "H");

	$http.get("https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='são paulo, sp') and u = 'c'&format=json")
	.then(function(response){
		$scope.datas = response.data.query.results.channel;
		alert("ok");
		$scope.$apply;
	}, function myError(response) {
		alert(response.statusText);
	});

});


app.filter('miniaturas', function() {

	return function(x){

		if(x === "cloudly_day"){
			return "partly_cloudy";
		}
		if(x === "Scattered Thunderstorms" || x === "Thunderstorms"){
			return "thunderstorms";
		}
		if(x === "Mostly Cloudy"){
			return "cloudy";
		}
		if(x === "clear_day"){
			return "sunny";
		}

	}
});

app.filter('semana', function(){

	return function(x){

		if(x === "Sun"){
			return "Dom"
		}
		if(x === "Mon"){
			return "Seg"
		}
		if(x === "Tue"){
			return "Ter"
		}
		if(x === "Wed"){
			return "Qua"
		}
		if(x === "Thu"){
			return "Qui"
		}
		if(x === "Fri"){
			return "Sex"
		}
		if(x === "Sat"){
			return "Sab"
		}

	}

});

app.filter('descricao', function(){

	return function(x){

		if(x === "Mostly Cloudy"){
			return "Nublado"
		}
		if(x === "Scattered Thunderstorms"){
			return "Chuva com trovoadas"
		}
		if(x === "Thunderstorms"){
			return "Tempestade"
		}

	}

});