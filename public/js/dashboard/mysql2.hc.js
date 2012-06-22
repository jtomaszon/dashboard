var chart;
$(document).ready(function() {
	chart = new Highcharts.Chart({
		chart: {
			renderTo: 'sqlsbus01',
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
		},
		title: {
			text: 'MySQL Commands'
		},
		subtitle: {
			text: 'sqlsbus01'
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
				showInLegend: true,
				dataLabels: {
					enabled: false,
				}
			}
		},
		credits: {
			enabled: false
		},

		exporting: {
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
