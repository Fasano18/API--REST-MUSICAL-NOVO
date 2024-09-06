
# API de Usuários e Músicas

## Descrição

Este projeto é uma API para gerenciar usuários e músicas. Inclui funcionalidades para autenticação, operações CRUD (Criar, Ler, Atualizar, Excluir) de usuários e músicas, além de criação de administradores e listagem de usuários com paginação.

A API foi desenvolvida com **Node.js** utilizando o framework **Express** e **MongoDB** para armazenamento de dados, com suporte a **JWT** para autenticação. Além disso, será implementada uma rota para instalação do banco de dados e documentação via Swagger.

---

## Instalação

1. **Clone o repositório:**

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_DIRETORIO>
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configuração do Banco de Dados:**

Crie um arquivo `.env` e adicione suas variáveis de ambiente:

```env
PORT=5000
MONGO_URI=<sua_uri_mongodb>
JWT_SECRET=<sua_chave_secreta>
```

4. **Inicialize o servidor:**

```bash
npm start
```

O servidor estará rodando localmente em `http://localhost:5000`.

---

## Rotas Disponíveis

### Autenticação e Usuários

1. **Registrar Usuário**
    - **URL:** `/api/users/register`
    - **Método:** `POST`
    - **Body Exemplo:**
      ```json
      {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "password123"
      }
      ```

2. **Login de Usuário**
    - **URL:** `/api/users/login`
    - **Método:** `POST`
    - **Body Exemplo:**
      ```json
      {
        "email": "johndoe@example.com",
        "password": "password123"
      }
      ```

3. **Atualizar Usuário**
    - **URL:** `/api/users/:id`
    - **Método:** `PUT`
    - **Autenticação:** Requer token JWT.
    - **Body Exemplo:**
      ```json
      {
        "name": "John Doe Updated",
        "email": "johnupdated@example.com"
      }
      ```

4. **Criar Administrador**
    - **URL:** `/api/users/admins/create`
    - **Método:** `POST`
    - **Autenticação:** Requer token JWT de um Admin.
    - **Body Exemplo:**
      ```json
      {
        "email": "user@example.com"
      }
      ```

5. **Excluir Usuário**
    - **URL:** `/api/users/admins/:id`
    - **Método:** `DELETE`
    - **Autenticação:** Requer token JWT de um Admin.

6. **Listar Usuários com Paginação**
    - **URL:** `/api/users?page=1&limit=10`
    - **Método:** `GET`
    - **Autenticação:** Requer token JWT de um Admin.

### Músicas

1. **Adicionar Música**
    - **URL:** `/api/musics`
    - **Método:** `POST`
    - **Autenticação:** Requer token JWT.
    - **Body Exemplo:**
      ```json
      {
        "title": "Song Title",
        "artist": "Artist Name",
        "album": "Album Name",
        "genre": "Genre",
        "duration": 200,
        "year": 2023
      }
      ```

2. **Listar Músicas**
    - **URL:** `/api/musics?page=1&limit=10`
    - **Método:** `GET`
    - **Autenticação:** Requer token JWT.

3. **Obter Detalhes de uma Música**
    - **URL:** `/api/musics/:id`
    - **Método:** `GET`
    - **Autenticação:** Requer token JWT.

4. **Atualizar Música**
    - **URL:** `/api/musics/:id`
    - **Método:** `PUT`
    - **Autenticação:** Requer token JWT.
    - **Body Exemplo:**
      ```json
      {
        "title": "Updated Title",
        "artist": "Updated Artist",
        "album": "Updated Album",
        "genre": "Updated Genre",
        "duration": 210,
        "year": 2024
      }
      ```

5. **Excluir Música**
    - **URL:** `/api/musics/:id`
    - **Método:** `DELETE`
    - **Autenticação:** Requer token JWT.

### Rotas Futuras

1. **Instalação do Banco de Dados**
    - **URL:** `/install`
    - **Método:** `POST`
    - **Descrição:** Inicializa e popula o banco de dados.

2. **Documentação Swagger**
    - **URL:** `/docs`
    - **Método:** `GET`
    - **Descrição:** Acessa a documentação da API.

---

## Autenticação

A autenticação é feita via **JWT** (JSON Web Tokens). Para acessar as rotas protegidas, é necessário incluir o token no cabeçalho da requisição:

```http
Authorization: Bearer <seu_token_jwt>
```

---

## Testes

As rotas podem ser testadas com ferramentas como **Insomnia** ou **Postman**. Certifique-se de adicionar os tokens JWT quando necessário e configurar o corpo das requisições corretamente.

---

## Contribuição

1. Faça um **fork** do repositório.
2. Crie uma **branch** para sua feature (`git checkout -b feature/MinhaFeature`).
3. Faça o **commit** das suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Faça um **push** para a branch (`git push origin feature/MinhaFeature`).
5. Abra um **Pull Request**.

---

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
