define(["knockout", "jquery"], function (ko, $) {
    ko.bindingHandlers.textcut = {
        init: function(element, valueAccessor){
            var options = ko.utils.unwrapObservable(valueAccessor());

            $(element).text(options.text.length > options.length ? options.text.substring(0, options.length) + "..." : options.text);
        },
        update: function(element, valueAccessor){
            var options = ko.utils.unwrapObservable(valueAccessor());

            $(element).text(options.text.length > options.length ? options.text.substring(0, options.length) + "..." : options.text);
        }
    }
});
