from db_connection import create_connection, close_connection

# Listar todos os agricultores
def get_all_farmers():
    conn = create_connection()
    if not conn:
        return []

    try:
        cursor = conn.cursor()
        cursor.execute("SELECT id, nome_agricultor, descricao_agricultor, avaliacao_agricultor FROM AGRICULTORES")
        rows = cursor.fetchall()

        # Converter CLOB para string
        farmers = [
            {
                "id": row[0],
                "nome": row[1],
                "descricao": str(row[2].read()) if row[2] else "",
                "avaliacao": row[3]
            }
            for row in rows
        ]
        return farmers
    except Exception as e:
        print("Erro ao buscar agricultores:", e)
        return []
    finally:
        cursor.close()
        close_connection(conn)

# Cadastrar um novo agricultor
def add_farmer(nome, descricao, avaliacao):
    conn = create_connection()
    if not conn:
        return False

    try:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO AGRICULTORES (nome_agricultor, descricao_agricultor, avaliacao_agricultor) VALUES (:1, :2, :3)",
            (nome, descricao, avaliacao)
        )
        conn.commit()
        return True
    except Exception as e:
        print("Erro ao cadastrar agricultor:", e)
        return False
    finally:
        cursor.close()
        close_connection(conn)

# Atualizar informações do agricultor
def update_farmer(id, nome, descricao, avaliacao):
    conn = create_connection()
    if not conn:
        return False

    try:
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE AGRICULTORES SET nome_agricultor = :1, descricao_agricultor = :2, avaliacao_agricultor = :3 WHERE id = :4",
            (nome, descricao, avaliacao, id)
        )
        conn.commit()
        return cursor.rowcount > 0
    except Exception as e:
        print("Erro ao atualizar agricultor:", e)
        return False
    finally:
        cursor.close()
        close_connection(conn)

# Remover agricultor
def delete_farmer(id):
    conn = create_connection()
    if not conn:
        return False

    try:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM AGRICULTORES WHERE id = :1", (id,))
        conn.commit()
        return cursor.rowcount > 0
    except Exception as e:
        print("Erro ao remover agricultor:", e)
        return False
    finally:
        cursor.close()
        close_connection(conn)

# Obter detalhes de um agricultor
def get_farmer_by_id(id):
    conn = create_connection()
    if not conn:
        return None

    try:
        cursor = conn.cursor()
        cursor.execute("SELECT id, nome_agricultor, descricao_agricultor, avaliacao_agricultor FROM AGRICULTORES WHERE id = :1", (id,))
        row = cursor.fetchone()

        if row:
            return {
                "id": row[0],
                "nome": row[1],
                "descricao": str(row[2].read()) if row[2] else "",
                "avaliacao": row[3]
            }
        return None
    except Exception as e:
        print("Erro ao buscar agricultor:", e)
        return None
    finally:
        cursor.close()
        close_connection(conn)
