angular.module("listaTelefonica").controller("novoContatoCtrl", function ($scope, contatosAPI, serialGenerator, $location, operadoras) {
    
    $scope.operadoras = operadoras.data;
    
    $scope.adicionarContato = function (contato) {
        
        contato.serial = serialGenerator.generate();
        
        contatosAPI.saveContato(contato).success(function (data) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            $location.path("/contatos");
        }).error(function (data) {
            $scope.error = "Ocorreu um problema ao gravar o contato: " + data;
        });

    };
    
    $scope.cancelar = function() {
         $location.path("/contatos");
    }
    
    // Tratado no routeConfig
    //carregarOperadoras();

});