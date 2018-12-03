(function() {


    function alerta(mensagem, tipo) {
        alerta = $('<div></div>');
        alerta.html(mensagem);
        alerta.addClass('alert');
        alerta.addClass('alert-' + tipo);
        $('#conexao_erro').empty().append(alerta);
    }

    $form = {
        _self: $('#form_sql'),
        campos: {
            host: $('#host'),
            porta: $('#porta'),
            database: $('#database'),
            usuario: $('#usuario'),
            senha: $('#senha'),
            sql: $('#sql'),
            tabela_sql: $('#tabela_sql')
        },
        botoes: {
            conectar: $('#botao_conectar'),
            executar: $('#executar'),
            desconectar: $('#desconectar'),
        }
    };

    $form._self.on('submit', function (e) {
        e.preventDefault();
    });

    $form.botoes.conectar.on('click', function (e) {
        $.ajax({
            method: "post",
            url: "consultas.php",
            data: {
                host: $form.campos.host.val(),
                porta: $form.campos.porta.val(),
                database: $form.campos.database.val(),
                usuario: $form.campos.usuario.val(),
                senha: $form.campos.senha.val(),
                acao: 'conectar'
            },
            dataType: 'json',
        })
            .done(function (dbData) {
                if (dbData["conexao"] == true) {
                    $("#sql_editor").show();
                    $("#conectar").hide();
                    console.log(dbData);
                    console.log(dbData.conexao);
                } else {
                    console.log(dbData.conexao)
                }
                $('#erro').removeClass('alert-danger').removeClass('alert-warning').addClass('alert-success').show().text("Conectado com sucesso!");
            }).fail(function(){

                var aviso = "Erro ao executar o comando no banco de dados.";
                $('#erro').removeClass('alert-success').removeClass('alert-warning').addClass('alert-danger').show().text(aviso);
            });
    });

    $form.botoes.desconectar.on('click', function (e) {
        $.ajax({
            method: "post",
            url: "consultas.php",
            data: {
                acao: 'desconectar'
            },
            dataType: 'json',
        })
            .done(function (dbData) {
                $("#sql_editor").hide();
                $("#conectar").show();
                console.log(dbData.conexao);
            });
    });


    $form.botoes.executar.on('click', function (e) {
        $.ajax({
            method: "post",
            url: "consultas.php",
            data: {
                acao: 'executar',
                sql: $form.campos.sql.val()
            },
            dataType: 'json'
        })
            .done(function (dbData) {
                if (dbData.numeroCampos > 0) {
                    tabela = $('#tabela_sql');
                    tabela.find('tbody').empty();
                    tabela.find('thead').empty();
                    $('#erro').removeClass('alert-danger').removeClass('alert-warning').addClass('alert-success').show().text("Comando executado com sucesso!");
                    var linha = $('<tr></tr>');
                    for (var h = 0; h < dbData.colunas.length; h++) {
                        linha.append('<th>'+dbData.colunas[h]+'</th>');
                        tabela.find('thead').append(linha);
                    }
                    $.each(dbData.tabela,function(i,obj){
                        linha =$('<tr></tr>')
                        $.each(obj,function(campo,valor){
                            linha.append('<td>'+valor+'</td>');
                            tabela.find('tbody').append(linha);
                        });
                    });
                } else {
                    console.log(dbData.pgErroMensagem);
					tabela = $('#tabela_sql');
                    tabela.find('tbody').empty();
                    tabela.find('thead').empty();
                    var linha = $('<tr></tr>');
                    $.each(dbData.tabela,function(i,obj){
                        linha =$('<tr></tr>')
                        $.each(obj,function(campo,valor){
                            linha.append('<td>'+valor+'</td>');
                            tabela.find('tbody').append(linha);
                        });
                    });
                }
                if(dbData.pgErroMensagem){
                    erro = dbData.pgErroMensagem;
                    $('#erro').removeClass('alert-success').removeClass('alert-warning').addClass('alert-danger').show().text(erro);
                }
            });
    });

})();



