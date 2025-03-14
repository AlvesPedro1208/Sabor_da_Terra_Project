import oracledb

# Função para criar a conexão com o banco de dados
def create_connection():
    try:
        conn = oracledb.connect(
            user="XXXXXXXX",
            password="XXXXXXXXX",
            dsn="XXXXXXXXXXXXXXXXXXXXXXXXX"
        )
        return conn
    except oracledb.DatabaseError as e:
        print("Erro ao conectar ao banco de dados:", e)
        return None

# Função para fechar a conexão
def close_connection(conn):
    if conn:
        conn.close()

