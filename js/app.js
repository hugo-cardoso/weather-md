var app = angular.module('app', []);

app.controller('appController', function($scope, $http, $filter, $rootScope) {

	var data = new Date();

	$scope.data = new Date();
	$scope.hora = $filter('date')(data, "H");

	$http({
		method: 'GET',
		url: 'https://api.darksky.net/forecast/2bc28a61c75680417d0d7dadec7ab9d7/37.8267,-122.4233'
	}).then(function successCallback(response) {

		$scope.datas = response;
		console.log($scope.datas);

	}, function errorCallback(response) {

		console.log(response);

	});

});


app.filter('miniaturas', function() {

	return function(y){

		var x = y.toLowerCase();

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

		var x = y.toLowerCase();

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
