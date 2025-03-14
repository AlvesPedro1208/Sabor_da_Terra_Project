import bcrypt
from db_connection import create_connection, close_connection

# Solicita a tabela de usuários do DB
def get_all_users():
    conn = create_connection()
    if not conn:
        return []

    try:
        cursor = conn.cursor()
        cursor.execute("SELECT ID, NOME_USUARIO, EMAIL, TIPO_USUARIO FROM USUARIOS")
        rows = cursor.fetchall()
        usuarios = [{"id": row[0], "nome": row[1], "email": row[2], "tipo": row[3]} for row in rows]
        return usuarios
    except Exception as e:
        print("Erro ao buscar usuários:", e)
        return []
    finally:
        cursor.close()
        close_connection(conn)

# Função para cadastrar um novo usuário
def cadastrar_usuario(nome, email, senha, tipo_usuario):
    conn = create_connection()
    if not conn:
        return False

    try:
        cursor = conn.cursor()

        # Hash da senha para criptografar
        senha_hashed = bcrypt.hashpw(senha.encode(), bcrypt.gensalt())

        # Inserir usuário no banco de dados
        cursor.execute(
            "INSERT INTO USUARIOS (nome_usuario, email, senha, tipo_usuario) VALUES (:1, :2, :3, :4)",
            (nome, email, senha_hashed.decode(), tipo_usuario)
        )
        conn.commit()
        return True
    except Exception as e:
        print("Erro ao cadastrar usuário:", e)
        return False
    finally:
        cursor.close()
        close_connection(conn)

# Função para autenticar o usuário
def autenticar_usuario(email, senha):
    conn = create_connection()
    if not conn:
        return None

    try:
        cursor = conn.cursor()

        # Buscar usuário pelo email
        cursor.execute("SELECT id, nome_usuario, senha, tipo_usuario FROM USUARIOS WHERE email = :1", (email,))
        user = cursor.fetchone()

        if user:
            user_id, nome, senha_hashed, tipo_usuario = user

        # Verificar se a senha inserida corresponde ao hash
            if bcrypt.checkpw(senha.encode(), senha_hashed.encode()):
                return {"id": user_id, "nome": nome, "tipo": tipo_usuario}

        return None
    except Exception as e:
        print("Erro ao autenticar usuário:", e)
        return None
    finally:
        cursor.close()
        close_connection(conn)