(function() {


    function erro(mensagem, tipo) {
        $('#erro').empty();
        alerta = $('<div></div>');
        alerta.html(mensagem);
        alerta.addClass('alert');
        alerta.addClass('alert-' + tipo);
        $('#erro').empty().append(alerta);
        setTimeout(function() {
            $('#erro').empty();
        }, 2000);
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
                if (dbData.conexao) {
                    $("#sql_editor").show();
                    $("#conectar").hide();
                    $('#ultimo_sql').empty();
                    $('#tabela_sql').find('thead').empty();
                    $('#tabela_sql').find('tbody').empty();
                    console.log(dbData);
                    console.log(dbData.conexao);
                    erro(dbData.pgErroMensagem,'success');
                } else {
                    console.log(dbData.conexao);
                    erro(dbData.pgErroMensagem,'danger');
                }

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
                erro('Desconectado com sucesso!', 'success');
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
                    erro('Comando executado com sucesso!', 'success');
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
                    imprime_na_pagina(dbData.sql);
                    $('#dica').show();
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
                    if(dbData.pgErroMensagem){
                        erro(dbData.pgErroMensagem,'danger');
                    }
                }
            });
    });

    var div = document.getElementsByClassName('drill_cursor')[0];
    div.addEventListener('click', function (event) {
        if (event.target.tagName == "DIV") {
            var valor = $(event.target).text();
            $form.campos.sql.val(valor);
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
                        erro('Comando executado com sucesso!', 'success');
                        var linha = $('<tr></tr>');
                        for (var h = 0; h < dbData.colunas.length; h++) {
                            linha.append('<th>' + dbData.colunas[h] + '</th>');
                            tabela.find('thead').append(linha);
                        }
                        $.each(dbData.tabela, function (i, obj) {
                            linha = $('<tr></tr>')
                            $.each(obj, function (campo, valor) {
                                linha.append('<td>' + valor + '</td>');
                                tabela.find('tbody').append(linha);
                            });
                        });
                    }
                });
        }
    });

        function imprime_na_pagina(mensagem){
            sql = $('<div></div>');
            sql.html(mensagem);
            sql.addClass('alert');
            sql.addClass('drill_cursor');
            sql.addClass('alert-success');
            $('#ultimo_sql').append(sql);

        }

    })();



