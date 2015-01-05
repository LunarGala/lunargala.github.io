$(document).ready(function(){
    var scrollDistance,
        numberOfSections = $("body > section.content > section").length,
        sections = $("body > section.content > section");
        
    setSectionHeight();
//     addVideo();
    
    function setSectionHeight() {
        var currentSection = 0,
            newCurrentSection = currentSection;
        
        sections.each(function(){
            var i = $(this).index();
                
            $(this).css("height", scale(i) * 100 + "%");
            $(this).data("scaleIndex", i);
        });
        
        $(sections).click(function(event) {
            event.preventDefault();
            var scrollTo = ($(document).height() - $(window).height()) * (($(this).index())/$(sections).length);
            $(document).scrollTop(scrollTo);
        });
        
        $(document).on("scroll", function(event){
            var scrollPercentage = $(window).scrollTop() / ($(document).height() - $(window).height());
            
            newCurrentSection = Math.min(
                                    Math.max(
                                        Math.round(numberOfSections * scrollPercentage),
                                        0), 
                                    numberOfSections);

            if (currentSection != newCurrentSection) {
                var diff = newCurrentSection - currentSection;
                $(sections[currentSection]).removeClass("open");
                $(sections[newCurrentSection]).addClass("open");
                /*
$(sections[newCurrentSection]).children(".inside").css({
                    transform : "scale(" + 
                });
*/
                currentSection = newCurrentSection;
//                 console.log("————————————————————————————————————————————————————");
                
                sections.each(function(){
                    var i = $(this).index(),
                            newScaleIndex,
                            scaleMultiple;
                    
                    if (currentSection < sections.length) { // if not at end
                        if (currentSection < i) { // above
                            newScaleIndex = $(this).data("scaleIndex") - diff;
                        } else if (currentSection > i) { // below
                            newScaleIndex = $(this).data("scaleIndex") + diff;
                            if (newScaleIndex === 0) {
                                console.log("WHOA");
                            }
                        } else {
                            newScaleIndex = 0;
                        }
                        
                        if (currentSection < 3) {
                            addVideo();
                        } else if ((currentSection > 4) && (currentSection < 7)) { // range to handle very fast scrollign
                            removeVideo();
                        }
                    }
                                        
                    $(this).data("scaleIndex", newScaleIndex);
//                     console.log(currentSection, i, $(this).data("scaleIndex"));
                    console.log(scale($(this).data("scaleIndex")), $(this).data("scaleIndex"));
                    if ($(this).data("scaleIndex") < 13) {
                        scaleMultiple = scale($(this).data("scaleIndex"));
                    } else {
                        scaleMultiple = 0.002;
                    }
                    $(this).css("height", scaleMultiple * 100 + "%");
//                     $(this).css("-webkit-filter", scale($(this).data("scaleIndex")) * 100 + "%");
                    /*
$(this).children(".inside").css({
                        "transform" : "scaleY(" + scale($(this).data("scaleIndex")) + ")"
                    });
*/
                });
            }
        });
    }
    
    function addVideo() {
        /*
if ($("section.video iframe")) {
            var iframe = '<iframe src="http://player.vimeo.com/video/115355275?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="1281" height="720" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
            $("section.video").html(iframe);
        }
*/
    }
    
    function removeVideo() {
//         $("section.video iframe").remove();
    }
    
    function scale(x) {
        x++;
        var scaleMax = 500,
            xFactor  = 1.1,
            scaleX   = ((1 + ((scaleMax - 1) / (Math.pow((x * xFactor), 3)))) / scaleMax);
            
        return(scaleX);
    }
});