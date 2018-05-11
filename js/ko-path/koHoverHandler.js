define(["knockout", "jquery"], function (ko, $) {
    ko.bindingHandlers.hover = {
        init: function(element, valueAccessor){
            $(element).hover(
                function(){
                    $(element).addClass(valueAccessor());
                },
                function(){
                    $(element).removeClass(valueAccessor());
                }
            );
        }
    };
});
