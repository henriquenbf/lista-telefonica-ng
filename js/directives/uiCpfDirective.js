angular.module("listaTelefonica").directive("uiCpf", function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attrs, ctrl) {
            
            var regexCpf = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
            
            var _formatCpf = function(cpf) {
                
                if (cpf.length > 14) {
                    cpf = cpf.substring(0, 14);
                }
                
                if (cpf.length === 11) {
                    cpf = cpf.replace(regexCpf, "$1.$2.$3-$4");
                }
                
                return cpf;
            };
            
            element.bind("keyup", function() {
                ctrl.$setViewValue(_formatCpf(ctrl.$viewValue));
                ctrl.$render();
            });
            
        }
        
        
        
    }
});