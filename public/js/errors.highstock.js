$(function() {

  var seriesOptions = [],
  yAxisOptions = [],
  seriesCounter = 0,
  names = ['404', '500', '502', '503'];

  $.each(names, function(i, name) {
    seriesOptions[i] = {
      name: name,

      data: (function() {
			  var data = [], time = (new Date()).getTime(), j;
			  for( k = -60; k <= 0; k++) {
				  data.push([ time + k * 1000, seriesCounter ]);
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

					  var line404 = this.series[0],
            line500 = this.series[1],
            line502 = this.series[2],
            line503 = this.series[3];
						var conn = new WebSocket("ws://127.0.0.1:8081/");

						conn.onmessage = function(evt) {
						  var x = (new Date()).getTime(),
						  y = parseFloat(evt.data),
              a = Math.round(Math.random() * 6000),
              b = Math.round(Math.random() * 4000),
              c = Math.round(Math.random() * 5640),
              d = Math.round(Math.random() * 3260);
						  line404.addPoint([x, a], true, true);
						  line500.addPoint([x, b], true, true);
						  line502.addPoint([x, c], true, true);
						  line503.addPoint([x, d], true, true);
						};

						conn.onclose = function(evt) {
						};

				  }
			  }
		  },

		  rangeSelector: {
			  buttons: [{
				  count: 5,
				  type: 'minute',
				  text: '5m'
			  }],
			  inputEnabled: false,
			  selected: 1
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
          plotLines: [{
              value: 0,
              width: 5,
              color: 'silver'
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
