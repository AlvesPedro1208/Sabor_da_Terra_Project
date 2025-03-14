from db_connection import create_connection, close_connection

# Método para listar todos os produtos do DB
def get_all_products():
    conn = create_connection()
    if not conn:
        return []

    try:
        cursor = conn.cursor()
        cursor.execute("SELECT id, nome_produto, preco_produto, tipo_produto, descricao_produto FROM PRODUTOS")
        rows = cursor.fetchall()

    # Converter CLOB para string
        produtos = []
        for row in rows:
            descricao = str(row[4].read()) if row[4] is not None else ""
            produto = {
                "id": row[0],
                "nome": row[1],
                "preco": row[2],
                "tipo": row[3],
                "descricao": descricao
            }
            produtos.append(produto)

        return produtos
    except Exception as e:
        print("Erro ao buscar produtos:", e)
        return []
    finally:
        cursor.close()
        close_connection(conn)

# Método para inserir novos produtos no DB
def add_product(nome, preco, tipo, descricao):
    conn = create_connection()
    if not conn:
        return False

    try:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO PRODUTOS (nome_produto, preco_produto, tipo_produto, descricao_produto) VALUES (:1, :2, :3, :4)",
            (nome, preco, tipo, descricao)
        )
        conn.commit()
        return True
    except Exception as e:
        print("Erro ao adicionar produto:", e)
        return False
    finally:
        cursor.close()
        close_connection(conn)

def remove_product(produto_id):
    conn = create_connection()
    if not conn:
        return False

    try:
        cursor = conn.cursor()
        cursor.execute(
            "DELETE FROM PRODUTOS WHERE usuario_id = :1",
            (produto_id)
        )
        conn.commit()
        return cursor.rowcount > 0
    except Exception as e:
        print("Erro ao remover item do carrinho:", e)
        return False
    finally:
        cursor.close()
        close_connection(conn)


