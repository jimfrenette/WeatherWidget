
(function($){
 
	var yWeatherWidget = {
 
		init: function(zip) {
		
			$.getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20location%3D%22'+zip+'%22&format=json').done(function(data) {
				
				if (data.query.results.channel.item) {
				
					//data
					var item = data.query.results.channel.item;
					var titleParts = item.title.split(',');					
					var location = $.trim(titleParts[0].replace('Conditions for', '')) + ', ' + titleParts[1].substr(0, 3);
				
					//elements
					var $caption = $('#yWeatherWidget figure figcaption');
					var $conditions = $('#yWeatherWidget [data-name="conditions"]');
					var $icon = $('#yWeatherWidget figure img');
					var $location = $('#yWeatherWidget [data-name="location"]');
					var $temperature = $('#yWeatherWidget [data-name="temperature"]');
					
					//output
					$location.html(location);
					$temperature.html(item.condition.temp + '&deg;');
					$icon.attr('src','http://l.yimg.com/a/i/us/we/52/' + item.condition.code + '.gif').attr('alt',item.condition.text);
					$caption.html(item.condition.text);
					$conditions.show();
					
					$('#yWeatherWidget ul li').each(function(index) {
						$(this).html(item.forecast[index].day + '<br /><small>' + item.forecast[index].high + '&deg; / ' + item.forecast[index].low + '&deg;</small>');
					});
				
				}
				
			});
		}
	}
	yWeatherWidget.init('22102');
	//yWeatherWidget.init('90001'); //LA - test city with space
  
})(jQuery);

