var json = '{ "name": ["Africa", "America", "Asia", "Europe", "Oceania"], "data1800": [133, 156, 947, 408, 16]}';
var categories = jQuery.parseJSON(json);

var chart;
$(document).ready(function() {
	chart = new Highcharts.Chart({
		chart: {
			renderTo: 'other_container',
			type: 'bar'
		},
		title: {
			text: 'Historic World Population by Region'
		},
		subtitle: {
			text: 'Source: Wikipedia.org'
		},
		xAxis: {
			categories: categories.name,
			title: {
				text: null
			}
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Population (millions)',
				align: 'high'
			},
			labels: {
				overflow: 'justify'
			}
		},
		tooltip: {
			formatter: function() {
				return ''+
					this.series.name +': '+ this.y +' millions';
			}
		},
		plotOptions: {
			bar: {
				dataLabels: {
					enabled: true
				}
			}
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			x: 0,
			y: 100,
			floating: false,
			borderWidth: 1,
			backgroundColor: '#FFFFFF',
			shadow: true
		},
		credits: {
			enabled: false
		},
			series: [{
			name: 'Year 1800',
			data: categories.data1800
		}, {
			name: 'Year 1900',
			data: [33, 56, 197, 40, 160]
		}, {
			name: 'Year 2008',
			data: [973, 914, 454, 732, 34]
		}]
	});
});
