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
			renderTo: 'mysqlStatus',
			type: 'spline',
			marginRight: 10,
			marginRight: 130,
			marginBottom: 25,
            events : {
                load : function() {

					var deletes = this.series[0];
                    var inserts = this.series[1];
                    var selects = this.series[2];
                    var updates = this.series[3];


                    var conn = new WebSocket("ws://dashboard.kibibyte.net:8083/");

                    conn.onmessage = function(evt) {
                        var x = (new Date()).getTime();
                        var codes = evt.data.split(",");

                        var deletesPoint = parseFloat(codes[0]);
                        var insertsPoint = parseFloat(codes[1]);
                        var selectsPoint = parseFloat(codes[2]);
                        var updatesPoint = parseFloat(codes[3]);

                        selects.addPoint([x, selectsPoint], true, true);
                        inserts.addPoint([x, insertsPoint], true, true);
                        updates.addPoint([x, updatesPoint], true, true);
                        deletes.addPoint([x, deletesPoint], true, true);

                    };

                    conn.onclose = function(evt) {
                    };
                }
            }

		},
		title: {
			text: 'MySQL Status'
		},
		subtitle: {
			text: 'Source: MySQL Business Servers'
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
			name: 'Delete',
			legendIndex: 1,
			data: dataCreator
		}, {
			name: 'Insert',
			legendIndex: 2,
			data: dataCreator
		}, {
			name: 'Select',
			legendIndex: 3,
			data: dataCreator
		}, {
			name: 'Update',
			legendIndex: 4,
			data: dataCreator
		}]
	});
});

