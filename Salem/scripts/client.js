(function (window, document, $) {
    /* Constants */
    var ACTIVE_CLASS = 'active',
        SECOND_CLASS = 'second-class', 
        THIRD_CLASS  = 'third-class';

    /* Globals */
    var $sections,
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

    var initializeArrowHandlers = function() {
        $(document).keydown(function(e) {
            switch(e.which) {
                case 37: // left
                break;

                case 38: // up
                    if (active > 0) {
                        updateActive(active - 1);
                    }
                break;

                case 39: // right
                break;

                case 40: // down
                    if (active < $sections.length - 1) {
                        updateActive(active + 1);
                    }
                break;

                default: return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        });
    };


    /* Initialize on page load */
    $(document).ready(function() {
        // Get all sections
        $sections = $('.content section');

        // Starting state
        updateActive(0);

        // Bind handlers
        initializeArrowHandlers();
       
        console.log('good to go');
    });

})(window, document, jQuery);