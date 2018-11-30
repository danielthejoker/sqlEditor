<?php
session_start();
$stringConexao = isset($_SESSION['conexao'])?$_SESSION['conexao']:false;
$sql = "";
if ($_POST){
    $acao = $_POST['acao'];
    $retorno = array();

    switch ($acao){
        case 'conectar':
            $host = $_POST['host'];
            $porta = $_POST['porta'];
            $banco = $_POST['database'];
            $usuario = $_POST['usuario'];
            $senha = $_POST['senha'];
            $stringConexao = "host={$host} port={$porta} dbname={$banco} user={$usuario} password={$senha}";
            $db = @pg_connect($stringConexao);
            if (!$db){
                $stringConexao = false;
                $errorMessage = "Não foi possível conectar ao banco de dados.";
                break;
            }
            $_SESSION['conexao']=$stringConexao;
            $stringConexao = true;
            break;
        case 'desconectar':
            $stringConexao = false;
            $_SESSION['conexao']=$stringConexao;
            break;
        case 'executar':
            $db = @pg_connect($stringConexao);
            if (!$db){
                $stringConexao = false;
                $errorMessage = "Não foi possível conectar ao banco de dados.";
            } else {
                $sql = $_POST['sql'];
                $result = @pg_query($db,$sql);
                if (!$result){
                    $errorMessage = pg_last_error ( $db );
                } else {
                    $afetados = pg_affected_rows($result);
                    $linhas = pg_num_rows($result);

                    if($linhas > 0){
                        $tabela= pg_fetch_all($result);
                        $campos = array();
                        $i = pg_num_fields($result);
                        for ($j = 0; $j < $i; $j++) {
                            $campos[] = pg_field_name($result, $j);
                        }
                    } else if ($afetados > 0){
                        $warningMessage = "Número de linhas afetadas: ".$afetados;
                    }
                }
            }
            break;
    }
    $dbData = @array(
        'tabela' => $tabela ,
       'conexao' => $stringConexao,
        'aviso' => $warningMessage,
        'colunas' => $campos,
        'numeroCampos' => $i,
        'pgErroMensagem' => $errorMessage,
        'linhas' => $linhas
    );
    echo json_encode($dbData);
}
?>