from db_connection import create_connection, close_connection

# Adicionar produto ao carrinho
def add_to_cart(usuario_id, produto_id, quantidade):
    conn = create_connection()
    if not conn:
        return False

    try:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO CARRINHO (usuario_id, produto_id, quantidade) VALUES (:1, :2, :3)",
            (usuario_id, produto_id, quantidade)
        )
        conn.commit()
        return True
    except Exception as e:
        print("Erro ao adicionar ao carrinho:", e)
        return False
    finally:
        cursor.close()
        close_connection(conn)

# Listar itens do carrinho
def get_cart_items(usuario_id):
    conn = create_connection()
    if not conn:
        return []

    try:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT c.id, p.nome_produto, p.preco_produto, c.quantidade "
            "FROM CARRINHO c "
            "JOIN PRODUTOS p ON c.produto_id = p.id "
            "WHERE c.usuario_id = :1",
            (usuario_id,)
        )
        rows = cursor.fetchall()
        items = [
            {"id": row[0], "nome_produto": row[1], "preco_produto": row[2], "quantidade": row[3]}
            for row in rows
        ]
        return items
    except Exception as e:
        print("Erro ao buscar itens do carrinho:", e)
        return []
    finally:
        cursor.close()
        close_connection(conn)

# Atualizar quantidade de produto no carrinho
def update_cart_item(usuario_id, produto_id, quantidade):
    conn = create_connection()
    if not conn:
        return False

    try:
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE CARRINHO SET quantidade = :1 WHERE usuario_id = :2 AND produto_id = :3",
            (quantidade, usuario_id, produto_id)
        )
        conn.commit()
        return cursor.rowcount > 0
    except Exception as e:
        print("Erro ao atualizar item do carrinho:", e)
        return False
    finally:
        cursor.close()
        close_connection(conn)

# Remover produto do carrinho
def remove_from_cart(usuario_id, produto_id):
    conn = create_connection()
    if not conn:
        return False

    try:
        cursor = conn.cursor()
        cursor.execute(
            "DELETE FROM CARRINHO WHERE usuario_id = :1 AND produto_id = :2",
            (usuario_id, produto_id)
        )
        conn.commit()
        return cursor.rowcount > 0
    except Exception as e:
        print("Erro ao remover item do carrinho:", e)
        return False
    finally:
        cursor.close()
        close_connection(conn)
