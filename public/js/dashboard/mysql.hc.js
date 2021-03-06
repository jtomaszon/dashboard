function renderChart(target) {
	var json = '{ "id": "sqlmbus01", "name": "MySQL Commands", "server": "sqlmbus01", "commands": {"I": {"name": "Ins", "value": 2104634},"S":{"name":"Sel","value": 33248373},"D": {"name": "Del","value": 1570271},"U": {"name": "Upd", "value": 15198281}}}';
	var database = jQuery.parseJSON(json);

	var result = (function() {
		var data = [];
		$.each(database.commands, function() {
			data.push([ this['name'], this['value'] ]);
		});
		return data;
	})()
	
	var chart = new Highcharts.Chart({
		chart: {
			renderTo: target,
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
		},
		title: {
			text: database.name
		},
		subtitle: {
			text: database.server
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
			name: database.name,
			data: result
			}]
	});
}

$(document).ready(function() {
	$(".mysqldata").each(function(){
		target = $(this).attr('id');
		renderChart(target);	
	});
});
