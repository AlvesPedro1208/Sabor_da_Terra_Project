from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from models.usuarios_model import get_all_users, cadastrar_usuario, autenticar_usuario
from models.produtos_model import get_all_products, add_product
from models.carrinho_model import add_to_cart, get_cart_items, update_cart_item, remove_from_cart
from models.agricultores_model import get_all_farmers, add_farmer, update_farmer, delete_farmer, get_farmer_by_id

class RequestHandler(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Content-Type", "application/json")
        self.end_headers()

    def do_GET(self):
        if self.path == "/usuarios":
            self._set_headers()
            usuarios = get_all_users()
            print("Dados retornados: ", usuarios)
            self.wfile.write(json.dumps(usuarios).encode())

        elif self.path == "/produtos":
            self._set_headers()
            produtos = get_all_products()
            print("Dados retornados: ", produtos)
            self.wfile.write(json.dumps(produtos).encode())

        elif self.path.startswith("/carrinho"):
            self._set_headers()

        # Extraindo o usuário ID da query string
            from urllib.parse import urlparse, parse_qs
            query_components = parse_qs(urlparse(self.path).query)
            usuario_id = int(query_components.get("usuario_id", [0])[0])

            if usuario_id:
                items = get_cart_items(usuario_id)
                response = {"status": "success", "carrinho": items}
            else:
                response = {"status": "error", "message": "Usuário ID não fornecido"}

            self.wfile.write(json.dumps(response).encode())

        # Listar agricultores
        elif self.path == "/agricultores":
            self._set_headers()
            farmers = get_all_farmers()
            self.wfile.write(json.dumps(farmers).encode())

        # Obter detalhes de um agricultor
        elif self.path.startswith("/agricultor"):
            self._set_headers()
            from urllib.parse import urlparse, parse_qs
            query_components = parse_qs(urlparse(self.path).query)
            farmer_id = int(query_components.get("id", [0])[0])

            farmer = get_farmer_by_id(farmer_id)
            if farmer:
                response = {"status": "success", "agricultor": farmer}
            else:
                response = {"status": "error", "message": "Agricultor não encontrado"}

            self.wfile.write(json.dumps(response).encode())

    def do_POST(self):
        if self.path == "/login":
            self._set_headers()
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

            # Autenticar usuário
            email = data.get("email")
            senha = data.get("senha")
            usuario = autenticar_usuario(email, senha)

            if usuario:
                response = {"status": "success", "usuario": usuario}
            else:
                response = {"status": "error", "message": "Credenciais inválidas"}

            self.wfile.write(json.dumps(response).encode())

        # Rota para cadastro de usuário
        elif self.path == "/cadastrar":
            self._set_headers()
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

            # Cadastrar usuário
            nome = data.get("nome")
            email = data.get("email")
            senha = data.get("senha")
            tipo_usuario = data.get("tipo_usuario")

            sucesso = cadastrar_usuario(nome, email, senha, tipo_usuario)

            if sucesso:
                response = {"status": "success", "message": "Usuário cadastrado com sucesso"}
            else:
                response = {"status": "error", "message": "Erro ao cadastrar usuário"}

            self.wfile.write(json.dumps(response).encode())

        # Rota para cadastrar produto
        elif self.path == "/cadastrar-produto":
            self._set_headers()
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

            nome = data.get("nome_produto")
            preco = data.get("preco_produto")
            tipo = data.get("tipo_produto")
            descricao = data.get("descricao_produto")

            sucesso = add_product(nome, preco, tipo, descricao)

            if sucesso:
                response = {"status": "success", "message": "Produto cadastrado com sucesso"}
            else:
                response = {"status": "error", "message": "Erro ao cadastrar produto"}

            self.wfile.write(json.dumps(response).encode())

        # Adicionar produto ao carrinho
        elif self.path == "/adicionar-carrinho":
            self._set_headers()
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

            usuario_id = data.get("usuario_id")
            produto_id = data.get("produto_id")
            quantidade = data.get("quantidade")

            sucesso = add_to_cart(usuario_id, produto_id, quantidade)

            if sucesso:
                response = {"status": "success", "message": "Produto adicionado ao carrinho"}
            else:
                response = {"status": "error", "message": "Erro ao adicionar produto ao carrinho"}

            self.wfile.write(json.dumps(response).encode())            

         # Listar itens do carrinho
        elif self.path == "/carrinho":
            self._set_headers()
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

            usuario_id = data.get("usuario_id")
            items = get_cart_items(usuario_id)

            response = {"status": "success", "carrinho": items}
            self.wfile.write(json.dumps(response).encode())

        # Atualizar item do carrinho
        elif self.path == "/atualizar-carrinho":
            self._set_headers()
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

            usuario_id = data.get("usuario_id")
            produto_id = data.get("produto_id")
            quantidade = data.get("quantidade")

            sucesso = update_cart_item(usuario_id, produto_id, quantidade)

            if sucesso:
                response = {"status": "success", "message": "Quantidade atualizada com sucesso"}
            else:
                response = {"status": "error", "message": "Erro ao atualizar quantidade"}

            self.wfile.write(json.dumps(response).encode())

        # Remover item do carrinho
        elif self.path == "/remover-carrinho":
            self._set_headers()
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

            usuario_id = data.get("usuario_id")
            produto_id = data.get("produto_id")

            sucesso = remove_from_cart(usuario_id, produto_id)

            if sucesso:
                response = {"status": "success", "message": "Produto removido do carrinho"}
            else:
                response = {"status": "error", "message": "Erro ao remover produto do carrinho"}

            self.wfile.write(json.dumps(response).encode())       
        
        elif self.path == "/cadastrar-agricultor":
            self._set_headers()
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

            nome = data.get("nome")
            descricao = data.get("descricao")
            avaliacao = data.get("avaliacao")

            sucesso = add_farmer(nome, descricao, avaliacao)

            if sucesso:
                response = {"status": "success", "message": "Agricultor cadastrado com sucesso"}
            else:
                response = {"status": "error", "message": "Erro ao cadastrar agricultor"}

            self.wfile.write(json.dumps(response).encode())

    # Atualizar agricultor
    def do_PUT(self):
        if self.path == "/atualizar-agricultor":
            self._set_headers()
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

            id = data.get("id")
            nome = data.get("nome")
            descricao = data.get("descricao")
            avaliacao = data.get("avaliacao")

            sucesso = update_farmer(id, nome, descricao, avaliacao)

            if sucesso:
                response = {"status": "success", "message": "Agricultor atualizado com sucesso"}
            else:
                response = {"status": "error", "message": "Erro ao atualizar agricultor"}

            self.wfile.write(json.dumps(response).encode())

    # Remover agricultor
    def do_DELETE(self):
        if self.path == "/remover-agricultor":
            self._set_headers()
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

            id = data.get("id")

            sucesso = delete_farmer(id)

            if sucesso:
                response = {"status": "success", "message": "Agricultor removido com sucesso"}
            else:
                response = {"status": "error", "message": "Erro ao remover agricultor"}

            self.wfile.write(json.dumps(response).encode())

server_address = ("", 8000)
httpd = HTTPServer(server_address, RequestHandler)
print("Servidor rodando na porta 8000")
httpd.serve_forever()
