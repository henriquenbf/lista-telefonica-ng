angular.module("listaTelefonica").controller("detalhesContatoCtrl", function ($scope, $routeParams, contatosAPI) {
    contatosAPI.getContato($routeParams.id).success(function(contato) {
        $scope.contato = contato;
    });
    
});