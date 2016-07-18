
var responsiveGoogleChart = function ($window) {    
    return {
        restrict: "A",
        scope: {
            /**
             * Object with 3 attributes:
             *
             * type: the chart type. possible values:
             * BarChart, ColumnChart, PieChart...
             *
             * data: the chart data. can be a google charts data array (compatible with the arrayToDataTable function)
             * or any other array/object that will be passed to the preprocess function for preprocessing
             *
             * options: google charts options object
             */
            "chartConfig": "=",
            /**
             * Optional preprocess function that can be used to preprocess the provided chartConfig.data attribute
             * in order to turn it into a correct google charts data array
             *
             * accepts one argument: data
             *
             * must return the modified data array
             */
            "preprocess": "&?",
            /**
             * Optional resize callback function that can be used to modify the chartConfig.options attribute
             * accepts two arguments:
             *
             * width: the current page innerWidth
             *
             * options: the chart options object
             *
             * must return the modified options object
             */
            "resizeCallback": "&?"
        },
        link: function ($scope, $element) {

            /**
             * Window resize handler
             */
            angular.element($window).on("resize", function () {
                renderChart($scope.chartConfig);
            });

            /**
             * watch for chartConfig changes and re-render the chart
             */
            $scope.$watch("chartConfig", function () {
                renderChart($scope.chartConfig);
            }, true);

            /**
             * Callback function that is called when the chart data/options change
             * It renders the entire chart using the loaded chart configuration.
             *
             * @param {object} config
             */
            function renderChart(config) {
                if (angular.isDefined(config)) {
                    var data = angular.copy(config.data);
                    var options = angular.copy(config.options);

                    //if there is additional preprocess function - run it before calling arrayToDataTable in order to preprocess the data
                    if (angular.isDefined($scope.preprocess)) {
                        data = $scope.preprocess({data: data});
                    }

                    //if there is additional resize callback function - run it before initializing the chart
                    if (angular.isDefined($scope.resizeCallback)) {
                        options = $scope.resizeCallback({width: $window.innerWidth, options: options});
                    }

                    data = google.visualization.arrayToDataTable(data);

                    var chart = new google.visualization[$scope.chartConfig.type]($element[0]);
                    chart.draw(data, options);
                }
            }

        }
    };
};

responsiveGoogleChart.$inject = ["$window"];

angular.module("AngularGoogleCharts", []).directive("responsiveGoogleChart", responsiveGoogleChart);
