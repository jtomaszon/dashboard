dataCreator = (function() {
	var data = [], time = (new Date()).getTime(), i;
	for( i = -120; i <= 0; i++) {
		data.push([ time + i * 1000, 0 ]);
	}
	return data;
})()

$(document).ready(function() {
	Highcharts.setOptions({
		global: {
			useUTC: false
		}
	});

	var colors = Highcharts.getOptions().colors;
	var chart;
	chart = new Highcharts.Chart({
		chart: {
			renderTo: 'nginxRequests',
			type: 'spline',
			marginRight: 10,
			marginRight: 130,
			marginBottom: 25,
            events : {
                load : function() {

                    var y = this.series;
                    var conn = new WebSocket("ws://dashboard.kibibyte.net:8082/");

                    conn.onmessage = function(evt) {
                        var x = (new Date()).getTime();
                        var codes = evt.data.split(",");

                        for (i=0; i<y.length; i++) {
	                        y[i].addPoint([x, parseFloat(codes[i])], true, true);
                        }
                    };

                    conn.onclose = function(evt) {
                    };
                }
            }

		},
		title: {
			text: 'Live requests per second'
		},
		subtitle: {
			text: 'Source: bbsld1lb03'
		},
		xAxis: {
			type: 'datetime',
			tickPixelInterval: 180
		},
		yAxis: {
			title: {
				text: 'Requests'
			},
			plotLines: [{
				value: 0,
				width: 2,
				color: '#808080'
			}]
		},
		tooltip: {
			formatter: function() {
					return '<b>'+ this.series.name +'</b><br/>'+
					Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
					Highcharts.numberFormat(this.y, 2);
			}
		},
		legend: {
			enabled: true,
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			x: -10,
			y: 100,
			borderWidth: 0
		},

		exporting: {
			enabled: true
		},

		plotOptions: {
			spline: {
				lineWidth: 2,
				marker: {
					enabled: false,
					states: {
						hover: {
							enabled: false,
							symbol: 'circle',
							radius: 5,
							lineWidth: 2
						}
					}
				},

			}, 	
			series: {
				stickyTracking: false,
				shadow: false,
				turboThreshold: 10,

			},			
		},

		credits: {
			enabled: false
		},

		series: [{
			name: 'Code 200',
			data: dataCreator,
			color: 'blue'
		}, {
			name: 'Code 300',
			data: dataCreator,
			color: 'green'
		}, {
			name: 'Code 500',
			data: dataCreator,
			color: 'red'
		}]
	});
});

