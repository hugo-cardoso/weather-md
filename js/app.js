var app = angular.module('app', []);

app.controller('appController', function($scope, $http, $filter, $rootScope) {

	var data = new Date();

	$scope.data = new Date();
	$scope.hora = $filter('date')(data, "H");

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			$scope.$apply(function(){
				$scope.position = position.coords;
				console.log(position.coords);
				$scope.getData();
			});
		});
	}

	$scope.getData = function(){

		// Atual
		$http({
			method: 'GET',
			url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text%3D%22(' + $scope.position.latitude + '%2C' + $scope.position.longitude + ')%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
		}).then(function successCallback(response) {

			$scope.datas = response.data.query.results.channel;
			console.log(response.data.query.results.channel);

		}, function errorCallback(response) {

			console.log(response);

		});

	}

});


app.filter('miniaturas', function() {

	return function(y){

		var x = angular.lowercase(y);

		if(x === "thunderstorm"){
			return "thunderstorms";
		}
		if(x === "rain"){
			return "rain";
		}
		if(x === "shower rain"){
			return "rain_s_cloudy";
		}
		if(x === "few clouds" || x === "scattered clouds" || x === "broken clouds"){
			return "partly_cloudy";
		}
		if(x === "clear sky"){
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

	return function(y){

		var x = angular.lowercase(y);

		if(x === "thunderstorm"){
			return "Tempestade";
		}
		if(x === "rain"){
			return "Chuva";
		}
		if(x === "Chuva com neblina"){
			return "rain_s_cloudy";
		}
		if(x === "few clouds" || x === "scattered clouds" || x === "broken clouds"){
			return "Parcialmente núblado";
		}
		if(x === "clear sky"){
			return "Limpo";
		}

	}

});

app.filter('meses', function(){

	return function(x){

		if(x === "January"){
			return "Janeiro"
		}
		if(x === "February"){
			return "Fevereiro"
		}
		if(x === "March"){
			return "Março"
		}
		if(x === "April"){
			return "Abril"
		}
		if(x === "May"){
			return "Maio"
		}
		if(x === "June"){
			return "Junho"
		}
		if(x === "July"){
			return "Julho"
		}
		if(x === "August"){
			return "Agosto"
		}
		if(x === "September"){
			return "Setembro"
		}
		if(x === "October"){
			return "Outubro"
		}
		if(x === "November"){
			return "Novembro"
		}
		if(x === "December"){
			return "Dezembro"
		}

	}

});

app.filter('timestamp', function(){

	return function(x){

		var timestamp = x;
		var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		var date = new Date(timestamp * 1000);
		var datevalues = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2);
		var semana = days[date.getDay()].substring(0,3);

		return semana;

	}

});

app.filter('convertCelsius', function(){

	return function(x){

		return Math.round((x - 32) / (9 / 5));

	}

});