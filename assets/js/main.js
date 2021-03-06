/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});

	// html5up-multiverse
	// Main.
	var $main = $('#main');

	// Thumbs.
		$main.children('.thumb').each(function() {

			var	$this = $(this),
				$image = $this.find('.image'), $image_img = $image.children('img'),
				x;

			// No image? Bail.
				if ($image.length == 0)
					return;

			// Image.
			// This sets the background of the "image" <span> to the image pointed to by its child
			// <img> (which is then hidden). Gives us way more flexibility.

				// Set background.
					$image.css('background-image', 'url(' + $image_img.attr('src') + ')');

				// Set background position.
					if (x = $image_img.data('position'))
						$image.css('background-position', x);

				// Hide original img.
					$image_img.hide();

		});

	// Poptrox.
		$main.poptrox({
			baseZIndex: 20000,
			caption: function($a) {

				var s = '';

				$a.nextAll('figcaption').each(function() {
					s += this.outerHTML;
				});

				return s;

			},
			fadeSpeed: 300,
			onPopupClose: function() { $body.removeClass('modal-active'); },
			onPopupOpen: function() { $body.addClass('modal-active'); },
			overlayOpacity: 0,
			popupCloserText: '',
			popupHeight: 150,
			popupLoaderText: '',
			popupSpeed: 300,
			popupWidth: 150,
			selector: '.thumb > a.image',
			usePopupCaption: true,
			usePopupCloser: true,
			usePopupDefaultStyling: false,
			usePopupForceClose: true,
			usePopupLoader: true,
			usePopupNav: true,
			windowMargin: 50
		});

		// Hack: Set margins to 0 when 'xsmall' activates.
			breakpoints.on('<=xsmall', function() {
				$main[0]._poptrox.windowMargin = 0;
			});

			breakpoints.on('>xsmall', function() {
				$main[0]._poptrox.windowMargin = 50;
			});

})(jQuery);