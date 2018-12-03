
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>SQL Editor</title>
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/bootstrap-grid.css">
    <link rel="stylesheet" type="text/css" href="DataTables-1.10.18/css/dataTables.bootstrap.css"/>
    <script src="js/bootstrap.bundle.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
</head>
<body>
<div class="container">
    <div id="erro" class="alert alert-danger" role="alert" style="display: none;"></div>
    <form id="formulario_sql">
        <div id="conectar" class="card bg-light mb-3">

            <div class="card-header"><h1 class="display-4">Dados da Conexao</h1></div>
            <div class="form-row justify-content-center">
                <div class="form-group col-md-5">
                    <label for="host">Host</label>
                    <input type="text" class="form-control" id="host" name="host" placeholder="Host" value="localhost">
                </div>
                <div class="form-group col-md-5">
                    <label for="porta">Porta</label>
                    <input type="text" class="form-control" id="porta" name="porta" placeholder="Porta" value="5432">
                </div>
            </div>
            <div class="form-row justify-content-center">
                <div class="form-group col-md-5">
                    <label for="database">Database</label>
                    <input type="text" class="form-control" id="database" name="porta" placeholder="Database" value="testeDB">
                </div>
                <div class="form-group col-md-5">
                    <label for="usuario">Usuario</label>
                    <input type="text" class="form-control" id="usuario" name="usuario" placeholder="Usuario" value="postgres">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-5 offset-1">
                    <label for="senha">Senha</label>
                    <input type="password" class="form-control" id="senha" name="senha" placeholder="Senha" value="123456">
                </div>
            </div>
            <div class="btn-group offset-1">
                <button type="button" id="botao_conectar" class="btn btn-info">Conectar</button>
            </div>
        </div>
        <div id="sql_editor" class="card bg-light mb-3" style="display: none">
            <div class="card-header"><h1 class="display-4">SQL Editor</h1></div>
            <div class="form-group col-md-10 offset-1">
                <label for="sql">SQL</label>
                <textarea class="form-control" id="sql" name="sql" rows="5">select * from pessoa</textarea>
            </div>
            <div class="btn-group justify-content-end">
                <button type="button" id="executar" value="executar" name="executar" class="btn btn-info btn-lg">Executar</button>
                <button type="button" id="desconectar" value="desconectar" name="desconectar" class="btn btn-danger btn-lg offset-2">Desconectar</button>
            </div>
            <div class="container">
                <h1>Dados</h1>
                <table id="tabela_sql" class="table table-striped table-bordered table-hover">
                    <thead>
                    <tr><th></th></tr>
                    </thead>
                    <tbody>
                    <tr><td></td></tr>
                    </tbody>
                    <tfoot>
                    </tfoot>
                </table>
            </div>

        </div>
    </form>


</div>
<script src="jquery-3.3.1.js"></script>
<script src="js/scripts.js"></script>
<script src="DataTables-1.10.18/js/jquery.dataTables.js"></script>
<script src="DataTables-1.10.18/js/dataTables.bootstrap4.js"></script>
<script>
    $('#tabela_sql').dataTable();
</script>
</body>
</html>
