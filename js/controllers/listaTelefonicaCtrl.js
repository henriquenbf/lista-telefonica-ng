angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, contatosAPI, operadorasAPI, serialGenerator, $filter, uppercaseFilter) {
    $scope.app = "Lista telefônica";
    $scope.contatos = [];
    $scope.operadoras = [];

    var carregarContatos = function () {
        contatosAPI.getContatos().success(function (data, status) {
            $scope.contatos = data;
        }).error(function() {
            $scope.error = "Não foi possível carregar os dados";
        });
    };

    var carregarOperadoras = function () {
        operadorasAPI.getOperadoras().success(function (data, status) {
            $scope.operadoras = data;
        });
    };

    $scope.adicionarContato = function (contato) {
        
        contato.serial = serialGenerator.generate();
        
        contato.data = new Date();
        contatosAPI.saveContato(contato).success(function (data) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        }).error(function (data) {
            $scope.error = "Ocorreu um problema ao gravar o contato: " + data;
        });

    };

    $scope.apagarContatos = function (contatos) {
        $scope.contatos = contatos.filter(function (contato) {
            if (!contato.selecionado) return contato;
        });
    };

    $scope.isAlgumContatoSelecionado = function (contatos) {
        return contatos.some(function (contato) {
            return contato.selecionado;
        });
    };

    $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };

    carregarContatos();
    carregarOperadoras();

    $scope.classe = "selecionado";
});