$(function() {

    var seriesOptions = [],
    yAxisOptions = [],
    seriesCounter = 0,
    names = ['503', '502', '500', '404'],

    $.each(names, function(i, name) {
      seriesOptions[i] = {
        name: name,
        data: (function() {
				  var data = [], time = (new Date()).getTime(), i;
				  for( i = -14400; i <= 0; i++) {
					  data.push([ time + i * 1000, 0 ]);
				  }
				  return data;
			  })()
      };
      seriesCounter++;

      if (seriesCounter == names.length) {
        createChart();
      }
    });




function createChart() {

	Highcharts.setOptions({
		global : {
			useUTC : false
		}
	});
	
	// Create the chart
	window.chart = new Highcharts.StockChart({
		chart : {
			renderTo : 'container',
			events : {
				load : function() {

					var series = this.series[0];
						var conn = new WebSocket("ws://127.0.0.1:8081/");

						conn.onmessage = function(evt) {
							var x = (new Date()).getTime(),
							y = parseFloat(evt.data);
							series.addPoint([x, y], true, true);
						};

						conn.onclose = function(evt) {
						};
				}
			}
		},

		rangeSelector: {
			buttons: [{
				count: 1,
				type: 'minute',
				text: '1m'
			}, {
				count: 5,
				type: 'minute',
				text: '5m'
			}, {
				count: 15,
				type: 'minute',
				text: '15m'
			}, {
				type: 'all',
				text: 'All'
			}],
			inputEnabled: false,
			selected: 0
		},
		
    title: {
        text: 'Unique visitors per second'
    },
    xAxis: {
        enabled: true,
        type: 'datetime',
        tickPixelInterval: 300
    },
    yAxis: {
        title: {
            text: 'Value'
        },
        plotLines: [{
            value: 0,
            width: 5,
            color: '#808080'
        }]
    },
    legend: {
        enabled: false
    },
    exporting: {
        enabled: true
    },
		
		series: seriesOptions

	});

}

});
