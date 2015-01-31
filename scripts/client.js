(function (window, document, $) {
    /* Constants */
    var ACTIVE_CLASS    = 'active',
        SECOND_CLASS    = 'second-class', 
        THIRD_CLASS     = 'third-class',
        THROTTLE_RATE   = 350;

    /* Globals */
    var $sections,
        $player,
        active = 0; // TODO: Remove this. 



    /* 
     * Stops the video playing, covers it, hides the player.
     * This is to keep from having to animate an iframe.
     */
    var killVideo = function() {
        var $video = $('section.video'),
            $playerFrame = $video.find('iframe'),
            $videoCover = $video.find('.video-cover');
        
        $player.api('pause');
        $videoCover.show();
        $playerFrame.hide();
    };


    /* 
     * Makes the @idx-th element active, and adjusts the 
     * surrounding elements appropriately.
     */
    var updateActive = function(idx) {
        // Sanity check
        if(idx >= $sections.length || idx < 0) {
            console.log($sections);
            console.log($sections.length);
            return console.log('Update index out of bounds', idx);
        }

        // Adjust state
        active = idx;

        // Update classes
        $sections
            .removeClass(ACTIVE_CLASS + ' ' + SECOND_CLASS + ' ' + THIRD_CLASS)
            .eq(active)
                .addClass(ACTIVE_CLASS).end()
            .eq(active + 1)
                .addClass(SECOND_CLASS).end()
            .eq(active - 1 < 0 ? undefined : active - 1)
                .addClass(SECOND_CLASS).end()
            .eq(active + 2)
                .addClass(THIRD_CLASS).end()
            .eq(active - 2 < 0 ? undefined : active - 2)
                .addClass(THIRD_CLASS).end();
    };


    /* 
     * Let people navigate with arrow keys.
     * Useful for testing.
     */
    var initializeArrowHandlers = function() {
        // _.throttle prevents key events happening faster than css animations
        var keyhandler = _.throttle(function(e) {
            
            // Pause the video if we're leaving it.
            if (active === 0) { 
                killVideo();
            }

            switch(e.which) {
                case 37: // left
                case 38: // up
                    if (active > 0) {
                        updateActive(active - 1);
                    }
                break;

                case 39: // right
                case 40: // down
                    if (active < $sections.length - 1) {
                        updateActive(active + 1);
                    }
                break;

                // Ignore other keys
                default: return; 
            }
            e.preventDefault(); // prevent the default action
        }, THROTTLE_RATE);

        $(document).keydown(keyhandler);
    };


    /* 
     * Let people set an active element by clicking 
     */
    var initializeClickHandlers = function() {
        $('.content section').click(function() {
            console.log('click', this);
            var idx = $(this).data('index');
            updateActive(idx);
        });
    };

    /* 
     * Handle scrolling
     */
    var initializeScrollHandler = function() {
        // We can't help fast scrolling, but we can help fast updating. 
        var updateScroll = _.throttle(updateActive, THROTTLE_RATE);

        $(window).scroll(function() {
            console.log('scroll');
            // Figure out how far the user has scrolled
            var scrollPercent = ($(window).scrollTop() / $(document).height());

            // Figure out which section should be active
            var newActive = Math.floor(scrollPercent * $sections.length);

            // Update the screen
            updateScroll(newActive);
        });
    }

    /* 
     * Handle play/pause video events 
     */
    var initializeVideoHandlers = function() {
        var $video = $('section.video'),
            $playerFrame = $video.find('iframe'),
            $videoCover = $video.find('.video-cover');

        // Make the video appear and play when you click the cover.
        $videoCover.click(function() {
            // Don't do anything if it's not active
            if(!$video.hasClass('active')) {
                return;
            }

            $playerFrame.show();
            $videoCover.fadeOut(1000, function() {
                $player.api('play');
            });
        });
    };

    /* 
     * Initialize on page load 
     */
    $(document).ready(function() {
        // Get all sections
        $sections = $('.content section');
        $sections.each(function(idx, elem) {
            $(elem).data('index', idx);
        });

        // Initialize vimeo player
        $player = $f( $('.video iframe')[0] );
        window.$player = $player;

        // Starting state
        updateActive(active);

        // Bind handlers
        initializeArrowHandlers();
        initializeClickHandlers();
        initializeVideoHandlers();
        initializeScrollHandler();
       
        // Prevent some of the flash of unloaded content.
        $('body').fadeIn(200);
        console.log('good to go');
    });

})(window, document, jQuery);