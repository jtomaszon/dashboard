data = (function() {
	var data = [], time = (new Date()).getTime(), i;
	for( i = -600; i <= 0; i++) {
		data.push([ time + i * 1000, 0 ]);
	}
	return data;
})()

$(function() {
	
	Highcharts.setOptions({
		global : {
			useUTC : false
		}
	});
	
	// Create the chart
	window.chart = new Highcharts.StockChart({
		chart : {
			renderTo : 'container',
			type : 'spline',
			events : {
				load : function() {

					var code200 = this.series[0];
					var code300 = this.series[1];
					var code500 = this.series[2];


					var conn = new WebSocket("ws://192.168.110.18:8082/");

					conn.onmessage = function(evt) {
						var x = (new Date()).getTime();
						var codes = evt.data.split(",");

						var y200 = parseFloat(codes[0]);
						var y300 = parseFloat(codes[1]);
						var y500 = parseFloat(codes[2]);

						code200.addPoint([x, y200], true, true);
						code300.addPoint([x, y300], true, true);
						code500.addPoint([x, y500], true, true);

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
	        }, {
				value : 1200,
				color : 'green',
				dashStyle : 'shortdash',
				width : 2,
				label : {
					text : ''
				}
			}, {
				value : 800,
				color : 'red',
				dashStyle : 'shortdash',
				width : 2,
				label : {
					text : ''
				}
			}],
	    },
	    legend: {
	        enabled: false
	    },
	    exporting: {
	        enabled: true
	    },

		series : [{
			name : 'Code 500',
			data : data
		}, {
			name : 'Code 300',
			data : data
		}, {
			name : 'Code 200',
			data : data
		}]

	});

});
