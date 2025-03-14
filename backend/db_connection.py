import oracledb


# Função para criar a conexão com o banco de dados
def create_connection():
    try:
        conn = oracledb.connect(
            user="rm558897",
            password="fiap24",
            dsn="oracle.fiap.com.br:1521/ORCL"
        )
        return conn
    except oracledb.DatabaseError as e:
        print("Erro ao conectar ao banco de dados:", e)
        return None

# Função para fechar a conexão
def close_connection(conn):
    if conn:
        conn.close()

