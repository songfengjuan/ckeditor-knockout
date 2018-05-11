/*在textarea上面显示一栏加减乘除的符号，点击可以在textarea中插入字符*/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['knockout', 'jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS之类的
        module.exports = factory(require('knockout', 'jquery'));
    } else {
        // 浏览器全局变量(root 即 window)
        factory(ko, $);
    }
}(this, function (ko, $) {
	ko.bindingHandlers.operatorinput = {
        init: function(element, valueAccessor, allBindingsAccessor) {
            var $el = $(element);
            var operatorbar = $el.prev('.operatorbar');
            operatorbar.find('a').off().on('click', function(){
                var $this = $(this);
                var op = $this.data('op');
                var cont = $this.text();
                $tools.insertText(element, cont);
                var observable = valueAccessor();
                observable($el.val());
            });
        },
        update: function(element, valueAccessor){
            
        }
	}

}));