dataCreator = (function() {
	var data = [], time = (new Date()).getTime(), i;
	for( i = -180; i <= 0; i++) {
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

                    var code200 = this.series[0];
                    var code500 = this.series[1];
                    var code300 = this.series[2];


                    var conn = new WebSocket("ws://dashboard.kibibyte.net:8082/");

                    conn.onmessage = function(evt) {
                        var x = (new Date()).getTime();
                        var codes = evt.data.split(",");

                        var y200 = parseFloat(codes[0]) + parseFloat(codes[1]);
                        var y300 = parseFloat(codes[1]);
                        var y500 = parseFloat(codes[2]);

                        code500.addPoint([x, y500], true, true);
                        code300.addPoint([x, y300], true, true);
                        code200.addPoint([x, y200], true, true);

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
			tickPixelInterval: 120
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
		},

		credits: {
			enabled: false
		},

		series: [{
			name: 'Code 200',
			legendIndex: 1,
			data: dataCreator
		}, {
			name: 'Code 500',
			legendIndex: 3,
			data: dataCreator
		}, {
			name: 'Code 300',
			legendIndex: 2,
			data: dataCreator
		}]
	});
});

