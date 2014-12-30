$(document).ready(function(){
    var scrollDistance,
        numberOfSections = $("body > section.content > section").length,
        sections = $("body > section.content > section");
        
    setSectionHeight();
    
    function setSectionHeight() {
        var currentSection = 0,
            newCurrentSection = currentSection;
        
        sections.each(function(){
            var i               = $(this).index();
                
            $(this).css("height", scale(i) * 100 + "%");
            $(this).data("scaleIndex", i);
        });
        
        $(document).on("scroll", function(event){
            var scrollPercentage = $(window).scrollTop() / ($(document).height() - $(window).height()),
                newCurrentSection = Math.min(
                                        Math.max(
                                            Math.round(numberOfSections * scrollPercentage),                                        
//                                         numberOfSections * scrollPercentage,
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
                    var i = $(this).index(), newScaleIndex;
                    
                    if (currentSection < sections.length) {
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
                    }
                                        
                    $(this).data("scaleIndex", newScaleIndex);
//                     console.log(currentSection, i, $(this).data("scaleIndex"));
                    $(this).css("height", scale($(this).data("scaleIndex")) * 100 + "%");
                    $(this).children(".inside").css({
                        "transform" : "scaleY(" + scale($(this).data("scaleIndex")) + ")"
                    });
                });
            }
        });
    }
    
    function scale(x) {
        x++;
        var scaleMax = 1000,
            xFactor  = 1.1,
            scaleX   = ((1 + ((scaleMax - 1) / (Math.pow((x * xFactor), 3)))) / scaleMax);
            
        return(scaleX);
    }
});