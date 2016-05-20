angular.module("listaTelefonica").directive("uiAccordions", function () {
    return {
        controller: function($scope, $element, $attrs) {
            var accordions = [];
            
            this.registerAccordion = function(childAccordionScope) {
                accordions.push(childAccordionScope);
            };
            
            this.closeAll = function() {
                accordions.forEach(function(accordion) {
                    accordion.isOpened = false;
                });
            };
        }
    };
});
angular.module("listaTelefonica").directive("uiAccordion", function () {
    return {
        templateUrl: "view/accordion.html",
        transclude: true,
        scope: {
            title: "@"
        },
        require: "^uiAccordions",
        link: function(scope, element, attrs, ctrl) {
            ctrl.registerAccordion(scope);
            scope.open = function() {
                ctrl.closeAll();
                scope.isOpened = !scope.isOpened;
            };
        }
    }
});