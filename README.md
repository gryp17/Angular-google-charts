# Angular-google-charts
AngularJS google charts wrapper directive that lets you create flexible and responsive google charts

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






