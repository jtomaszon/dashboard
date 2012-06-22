var chart;
$(document).ready(function() {
	chart = new Highcharts.Chart({
		chart: {
			renderTo: 'mysql2_container',
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
		},
		title: {
			text: 'MySQL Commands'
		},
		tooltip: {
			formatter: function() {
				return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
			}
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					color: '#000000',
					connectorColor: '#000000',
					formatter: function() {
						return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
					}
				}
			}
		},
		credits: {
			enabled: false
		},
		series: [{
			type: 'pie',
			name: 'MySQL Commands',
			data: [
				['Insert',	104634],
				['Select',	338373],
				['Delete',	205271],
				['Update',	198281]
			]
		}]
	});
});
