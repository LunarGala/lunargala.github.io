(function (window, document, $) {
    /* Constants */
    var ACTIVE_CLASS = 'active',
        SECOND_CLASS = 'second-class', 
        THIRD_CLASS  = 'third-class';

    /* Globals */
    var $sections,
        $plqyer,
        active = 0;

    /* Makes the @idx-th element active, and adjusts the 
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
            .eq(active - 1)
                .addClass(SECOND_CLASS).end()
            .eq(active + 2)
                .addClass(THIRD_CLASS).end()
            .eq(active - 2)
                .addClass(THIRD_CLASS).end();
    };

    /* Let people scroll with arrow keys */
    var initializeArrowHandlers = function() {
        // TODO: Make sure this fires at most once every .3 seconds
        var keyhandler = _.throttle(function(e) {
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

                default: return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        }, 350);
        $(document).keydown(keyhandler);
    };


    /* Let people set an active element by clicking */
    var initializeClickHandlers = function() {
        $('.content section').click(function() {
            console.log('click', this);
            var idx = $(this).data('index');
            updateActive(idx);
        });
    };

    /* Handle play/pause video events */
    var initializeVideoHandlers = function() {

    };

    /* Initialize on page load */
    $(document).ready(function() {
        // Get all sections
        $sections = $('.content section');
        $sections.each(function(idx, elem) {
            $(elem).data('index', idx);
        });

        // Initialize vimeo player
        $player = $f( $('.video iframe')[0] );

        // Starting state
        updateActive(active);

        // Bind handlers
        initializeArrowHandlers();
        initializeClickHandlers();
       
        console.log('good to go');
    });

})(window, document, jQuery);