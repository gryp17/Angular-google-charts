# Angular-google-charts
AngularJS google charts wrapper directive that lets you create flexible and responsive google charts.

The directive is built to work with the [google charts data formats and configuration options](https://developers.google.com/chart/).

## Installation:

1. Include angularJS and the google charts library like you would normally do:

	```html
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
	
	<script src="https://www.google.com/jsapi" type="text/javascript"></script>
	
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	<script type="text/javascript">
		google.load('visualization', '1.0', {'packages': ['corechart']});
	</script>
	```

2. Include the Angular-google-charts module:

	```html
	<script src="libs/angular-google-charts.min.js"></script>
	```

3. Inject the module in your app:

	```javascript
	var app = angular.module("MyApp", ["AngularGoogleCharts"]);
	```

## Examples:

#### Simple responsive bar chart

The javascript:
```javascript 
//google charts formated array
$scope.data = [
	["Downloads", "Plamen", "Fran", "Jacobo"],
	["Today", 2, 3, 5],
	["Yesterday", 6, 4, 2]
];

$scope.myChart = {
	config: {
		//any google chart type (BarChart, ColumnChart, PieChart...)
		type: "BarChart",
		data: $scope.data,
		//google chart options object
		options: {
			width: "100%",
			series: [
				{color: "red"}, 
				{color: "blue"}, 
				{color: "green"}
			]
		}
	}
};
```

The markup:
```html
<div responsive-google-chart chart-config="myChart.config"></div>
```

#### Using the "preprocess" callback function

The preprocess function is an optional middleware function can be used to preprocess the chartConfig.data before passing it to the google charts library. It is also run every time the page is resized which allows us to modify the data dynamically based on the page resolution.

It receives one parameter:

* data - the data that was passed in chartConfig.data

The javascript:

```javascript
$scope.myChart = {
	config: {
		//any google chart type (BarChart, ColumnChart, PieChart...)
		type: "BarChart",
		data: $scope.data,
		//google chart options object
		options: {
			width: "100%",
			series: [
				{color: "red"}, 
				{color: "blue"}, 
				{color: "green"}
			]
		}
	},
	preprocess: function (data) {
	
		data = data.map(function (item){
			//modify the chart data...
		});
		
		return data;
	}
};
```

The markup:

```html
<div responsive-google-chart 
	chart-config="myChart.config"
	preprocess="myChart.preprocess(data)"></div>
```

#### Using the "resizeCallback" function

The resizeCallback function can be used to modify the chartConfig.options attribute on page resize.
It receives two parameters:

* width - the current page width
* options - the config.options object

The javascript:

```javascript
$scope.myChart = {
	config: {
		//any google chart type (BarChart, ColumnChart, PieChart...)
		type: "BarChart",
		data: $scope.data,
		//google chart options object
		options: {
			width: "100%",
			series: [
				{color: "red"}, 
				{color: "blue"}, 
				{color: "green"}
			]
		}
	},
	resizeCallback: function (width, options) {

		//change the chart width based on the page resolution
		if(width > 768){
			options.width = "50%";
		}else{
			options.width = "100%";
		}
		
		return options;
	}
};
```

The markup:

```html
<div responsive-google-chart
	chart-config="myChart.config"
	resize-callback="myChart.resizeCallback(width, options)"></div>
```



