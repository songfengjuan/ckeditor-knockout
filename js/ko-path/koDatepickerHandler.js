define(["knockout", "jquery-ui"], function(ko) {
    ko.bindingHandlers.datepicker = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            //initialize datepicker with some optional options
            var options = allBindingsAccessor().datepickerOptions || {
                clearText           : '清除',
                clearStatus         : '清除已选日期',
                closeText           : '关闭',
                closeStatus         : '不改变当前选择',
                prevText            : '<上月',
                prevStatus          : '显示上月',
                prevBigText         : '<<',
                prevBigStatus       : '显示上一年',
                nextText            : '下月>',
                nextStatus          : '显示下月',
                nextBigText         : '>>',
                nextBigStatus       : '显示下一年',
                currentText         : '今天',
                currentStatus       : '显示本月',
                monthNames          : ['一月','二月','三月','四月','五月','六月', '七月','八月','九月','十月','十一月','十二月'],
                monthNamesShort     : ['一','二','三','四','五','六', '七','八','九','十','十一','十二'],
                monthStatus         : '选择月份',
                yearStatus          : '选择年份',
                weekHeader          : '周',
                weekStatus          : '年内周次',
                dayNames            : ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
                dayNamesShort       : ['周日','周一','周二','周三','周四','周五','周六'],
                dayNamesMin         : ['日','一','二','三','四','五','六'],
                dayStatus           : '设置 DD 为一周起始',
                dateStatus          : '选择 m月 d日, DD',
                dateFormat          : 'yy-mm-dd',
                firstDay            : 1,
                initStatus          : '请选择日期',
                isRTL               : false
            }, $el = $(element);


            $el.datepicker(options);

            //handle the field changing by registering datepicker's changeDate event
            ko.utils.registerEventHandler(element, "changeDate", function () {
                var observable = valueAccessor();
                observable($el.datepicker("getDate"));
            });

            //handle disposal (if KO removes by the template binding)
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $el.datepicker("destroy");
            });
        },
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor()), $el = $(element);

            //handle date data coming via json from Microsoft
            if (String(value).indexOf('/Date(') == 0) {
                value = new Date(parseInt(value.replace(/\/Date\((.*?)\)\//gi, "$1")));
            }

            var current = $el.datepicker("getDate");
            if (value - current !== 0) {
                $el.datepicker("setDate", value);
            }
        }
    };
});