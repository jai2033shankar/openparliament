OP.utils = {

    rot13: function (t){
        return t.replace(/[a-z0-9]/ig, function(chr) {
            var cc = chr.charCodeAt(0);
            if (cc >= 65 && cc <= 90) cc = 65 + ((cc - 52) % 26);
            else if (cc >= 97 && cc <= 122) cc = 97 + ((cc - 84) % 26);
            else if (cc >= 48 && cc <= 57) cc = 48 + ((cc - 43) % 10);
            return String.fromCharCode(cc);
        });
    },

    getQueryParam: function(name, qs) {

        if (!qs) {
            qs = window.location.search;
        }
        else {
            qs = '?' + qs.split('?')[1];
        }

        var match = RegExp('[?&]' + name + '=([^&]*)')
            .exec(qs);

        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));

    },

    openShareWindow: function(url) {
        var width = 550;
        var height = 450;
        var left = Math.round((screen.width / 2) - (width / 2));
        var top = 0;
        if (screen.height > height) {
            top = Math.round((screen.height / 2) - (height / 2));
        }
        window.open(url, "openparliament_share", "width=" + width +
            ",height=" + height + ",left=" + left, ",top=" + top +
            "personalbar=no,toolbar=no,scrollbars=yes,location=yes,resizable=yes");
    }

};

jQuery.fn.overflowtip = function() {
    return this.each(function() {
        if (this.clientWidth < this.scrollWidth
            || (this.clientHeight + 5) < this.scrollHeight) {
            $(this).attr('title', $(this).text());
        	$(this).attr('data-tooltip', true);
        	$(this).addClass('has-tip');
        }
    });
};

$('.overflowtip').overflowtip();
$(document).foundation();

$(function() {
	if (window.Raven) {
	    Raven.config(
	        'https://b5fd50dac5844b9a872b9fb5718ae980@sentry.io/113972',
	        {
	            whitelistUrls: [ /openparliament\.ca/ ],
	            ignoreUrls: [  /extensions\//i, /^chrome:\/\//i ]
	        }
	    ).install();
	}

	$('#navbar-buttons-search').click(function(e) {
		e.preventDefault();
		var $searchbar = $('#navbar-search');
		if ($searchbar.is(':visible')) {
			$searchbar.slideUp('fast');
			$('#navbar-buttons-search').removeClass('active');
		}
		else {
			$searchbar.slideDown('fast', function() {
				$searchbar.find('input').focus();
			});
			$('#navbar-buttons-search').addClass('active');
		}
	});

    // This event is to be triggered on AJAX loads too
    $(document).bind('contentLoad', function() {
        // $('.tip, .related_link').tooltip({delay: 100, showURL: false});

        $('a.maillink').attr('href', OP.utils.rot13('znvygb:zvpunry@zvpunryzhyyrl.pbz'));

        $('a[href$="#hl"]').each(function () {
            this.href = this.href.substring(0, this.href.length - 3);
        });
    });

    $(document).trigger('contentLoad');

});