$(document).ready(function()
                  {
		      var widget_divs = $(".ol_widget");
		      $.each(widget_divs, function(index, value) { 
			      var classes = $(value).attr('class');
			      var x = classes.split(" ");
			      var olid;
			      var i;
				  for (i = 0; i < x.length; i++) {
				      if (x[i].substring(0,2) == 'OL') {
					  olid = x[i];
					  var url = 'http://openlibrary.org/books/' + olid + '.json?callback=widgetcallback';
					  $.ajax({url: url, dataType: 'script'});
					      }
				  }
			  });

                  }
                  )

    function widgetcallback(data) {
    var j;
    for (j = 0; j < data.authors.length; j++) {
	var openid = data.key.substring(7);
	var authkey = data.authors[j].key.substring(9);
	var divstring = '<div class="ol_author ' + authkey + '"></div>';
	$('.ol_widget.' + openid).append(divstring);
	var authurl = 'http://openlibrary.org' + data.authors[j].key + '.json?callback=authorcallback';
	$.ajax({url: authurl, dataType: 'script'});
    }
    $('.ol_widget.' + data.key.substring(7)).append(data.title);
    var img = '<br><img src = "http://covers.openlibrary.org/b/olid/' + openid + '-S.jpg">';
    $('.ol_widget.' + data.key.substring(7)).append(img);
}

function authorcallback(authdata) {
    $('.ol_author.' + authdata.key.substring(9)).text(authdata.name);
}