define(['knockout'], function(ko){
    ko.bindingHandlers.editorinput = {
        init  : function(element, valueAccessor) {
            $(element).on('blur keyup', function() {
                try {
                    var value = valueAccessor();
                    value($(this).html());
                } catch (err) {
                    console.log('err:' + err);
                }
            });

            $("body").on("afterInsertImage_tk", function(){
                try {
                    var value = valueAccessor();
                    value($(element).html());
                } catch (err) {
                    console.log('err:' + err);
                }
            });

            ko.selectExtensions.writeValue(element, ko.utils.unwrapObservable(valueAccessor()));

        },
        //
        // update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        //     var value = valueAccessor();
        //     // Next, whether or not the supplied model property is observable, get its current value
        //     var valueUnwrapped = ko.unwrap(value) || "";
        //     // Now manipulate the DOM element
        //     $(element).html(valueUnwrapped); // Make the element visible
        // }
    };
});
