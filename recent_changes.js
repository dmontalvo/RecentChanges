var timer = 60;

$(document).ready(function() {

	loadRecentChanges();
	setInterval(decrementTimer,1000);

    } );

function decrementTimer() {
    timer--;
    $('#refresh').text(timer);
    if (timer == 0) {
	loadRecentChanges();
	timer = 60;
    }
}

function loadRecentChanges() {
    var url = 'http://openlibrary.org/recentchanges.json?callback=changescallback';
    $.ajax({url: url, dataType: 'script'});
}

function changescallback(data) {
    var stuff = '';
    var rows = [];
    var table = '<table border="1"><tr><th>TIME</th><th>WHAT</th><th>WHO</th><th>COMMENT</th></tr>';
    for (var x = 0; x < 10; x++) {
	console.log(data[x]);
	for (key in data[x]) {
	    console.log(key);
	}
	var timestamp = data[x]['timestamp'];
	var author = 'No author';
	var comment = data[x]['comment'];
	var changes;
	if (data[x]['changes'].length == 1) {
	    changes = '<a href="http://openlibrary.org' + data[x]['changes'][0]['key'] + '">' + data[x]['changes'][0]['key'] + '</a>';
	}
	else {
	    changes = '<a href="#" id = "anchor' + x + '">' + data[x]['changes'].length + ' changes</a>';
	    changes += '<div id = "' + x + '" style = "display:none;">';
	    for (z = 0; z < data[x]['changes'].length; z++) {
	    changes += '<br><a href="http://openlibrary.org' + data[x]['changes'][z]['key'] + '">' + data[x]['changes'][z]['key'] + '</a>';
	    }
	    changes += '</div>';
	}
	if (data[x]['author'] != null) {
 	    author = data[x]['author']['key'];
	}
	table += '<tr><td>' + timestamp + '</td><td>' + changes + '</td><td>' + author + '</td><td>' +comment + '</td></tr>';
    }
    table += '</table>';
    $('#container').html(table);
    for (var i = 0; i < 10; i++) {
	var tempi = i;
	$('#anchor' + tempi).click(function() {
                $(this).next().slideToggle();
            });
    }
}