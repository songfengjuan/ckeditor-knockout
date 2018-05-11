define(['knockout', 'moment', 'datetimepicker', 'moment-locale', "jquery-ui", 'css!datetimepicker_css'], function(ko, moment){
    ko.bindingHandlers.dateTimePicker = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            //initialize datepicker with some optional options
            var options = allBindingsAccessor().dateTimePickerOptions || {};

            var defaults = {
                locale: 'zh-cn',
                sideBySide: true,
                ignoreReadonly: true,
                defaultDate: moment()
            }

            options = $.extend(defaults, options);

            $(element).datetimepicker(options);

            var updateValue = function(event){
                var value = valueAccessor();
                if (ko.isObservable(value)) {
                    if (event.date != null && !(event.date instanceof Date)) {
                        value(event.date.format(options.format));
                    } else {
                        value(event.date);
                    }
                }
            }

            //when a user changes the date, update the view model
            ko.utils.registerEventHandler(element, "dp.change", function (event) {
                updateValue(event);
            });

            ko.utils.registerEventHandler(element, "dp.hide", function (event) {
                updateValue(event); 
            });

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                var picker = $(element).data("DateTimePicker");
                if (picker) {
                    picker.destroy();
                }
            });
        },
        // update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        //     var picker = $(element).data("DateTimePicker");
        //     //when the view model is updated, update the widget
        //     if (picker) {

        //         var koDate = ko.utils.unwrapObservable(valueAccessor());

        //         //in case return from server datetime i am get in this form for example /Date(93989393)/ then fomat this
        //         koDate = (typeof (koDate) !== 'object') ? new Date(parseFloat(koDate.replace(/[^0-9]/g, ''))) : koDate;

        //         picker.date(koDate);
        //     }
        // }
    };
});
