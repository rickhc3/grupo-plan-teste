# Projeto de Cadastro de Eletrodomésticos

Este repositório contém um projeto de cadastro de eletrodomésticos, desenvolvido como parte de um desafio técnico. O projeto consiste em uma API no backend, construída em PHP utilizando o framework Laravel, e uma aplicação frontend, desenvolvida em Vue.js utilizando o framework Nuxt.js.

## Requisitos Técnicos

O projeto foi desenvolvido utilizando as seguintes tecnologias e ferramentas:

- Linguagem de programação: PHP 8.0 ou superior
- Framework: Laravel 9.0 ou superior (utilizando Sanctum para autenticação)
- Banco de dados: MySQL (utilizando um container Docker)
- Frontend: Vue.js (utilizando o framework Nuxt.js)

## Funcionalidades

O projeto possui as seguintes funcionalidades:

- Criação, listagem, edição e remoção de registros de eletrodomésticos.
- Campos dos registros: Nome, Descrição, Tensão, Marca.
- Listagem das possíveis marcas: Electrolux, Brastemp, Fischer, Samsung, LG.
- Autenticação de usuário para acesso às rotas protegidas da API.
- Filtragem dos registros por id, nome, tensão e marca.
- Paginação dos registros.
- Validação dos campos dos registros.
- Retorno de mensagens de erro em caso de falha na requisição.

## Ambiente de Desenvolvimento

O ambiente de desenvolvimento é configurado utilizando Docker, com os seguintes containers:

- Container MySQL: contendo o banco de dados relacional utilizado pela aplicação.
- Container PHP/Laravel: contendo o backend da aplicação.
- Container Node/Nuxt: contendo o frontend da aplicação.

## Como Testar o Projeto

Siga as etapas abaixo para testar o projeto em seu ambiente local:

1. Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

2. Clone este repositório em sua máquina:
`git clone https://github.com/rickhc3/grupo-plan-teste.git`

3. Acesse o diretório do projeto: `cd grupo-plan-teste`

4. Inicie os containers utilizando o Docker Compose: `docker-compose up -d`

5. Aguarde até que os containers sejam iniciados e todos os serviços estejam disponíveis. Nessa etapa, o Docker irá instalar as dependências da API e do Frontend, rodar as migrations e as seeds (50 eletrodomésticos e 1 usuário admin). Você pode verificar o status dos containers utilizando o comando `docker-compose ps`. Quando todos os serviços estiverem disponíveis, você pode acessar a aplicação frontend em seu navegador, utilizando o seguinte endereço: http://localhost:4001

6. Agora você pode utilizar a aplicação para cadastrar, visualizar, editar e remover eletrodomésticos.

7. No canto superior direito, é possível logar para ter acesso às rotas protegidas da API (cadastrar, editar e excluir eletrodomésticos). Ao clicar, espera-se que já esteja nos inputs o usuário e a senha. Caso não esteja, utilize o seguinte usuário:

- E-mail: admin@admin.com
- Senha: password

## Exemplos de Requisições para a API

A API possui as seguintes rotas disponíveis:

- `GET /api/home-appliances`: Retorna a lista de eletrodomésticos cadastrados.
- `GET /api/home-appliances/{id}`: Retorna um registro específico de eletrodomésticos cadastrados.
- `POST /api/home-appliances`: Cria um novo registro de eletrodoméstico.
- `PUT /api/home-appliances/{id}`: Atualiza um registro de eletrodoméstico existente.
- `DELETE /api/home-appliances/{id}`: Remove um registro de eletrodoméstico existente.

Certifique-se de substituir `{id}` pelo ID do eletrodoméstico desejado.

A API espera receber e retornar os dados no formato JSON.

Aqui estão alguns exemplos de requisições para a API:

1. Listar os eletrodomésticos cadastrados:

`GET /api/home-appliances`:

```json
"current_page": 1,
"data": [
    {
        "id": 1,
        "name": "Geladeira",
        "description": "Geladeira Frost Free",
        "voltage": "110",
        "brand": "Electrolux",
        "created_at": "2023-06-18T21:00:00.000000Z",
        "updated_at": "2023-06-18T21:00:00.000000Z"
    },
    {
        "id": 2,
        "name": "Fogão",
        "description": "Fogão 4 bocas",
        "voltage": "220",
        "brand": "Brastemp",
        "created_at": "2023-06-18T21:00:00.000000Z",
        "updated_at": "2023-06-18T21:00:00.000000Z"
    }
],
"first_page_url": "http:\/\/localhost:4002\/api\/home-appliances?page=1",
"from": 1,
"last_page": 1,
"last_page_url": "http:\/\/localhost:4002\/api\/home-appliances?page=1",
"links": [
		{
			"url": null,
			"label": "&laquo; Previous",
			"active": false
		},
		{
			"url": "http:\/\/localhost:4002\/api\/home-appliances?page=1",
			"label": "1",
			"active": true
		},
		{
			"url": null,
			"label": "Next &raquo;",
			"active": false
		}
	],
"next_page_url": null,
"path": "http:\/\/localhost:4002\/api\/home-appliances",
"per_page": 100,
"prev_page_url": null,
"to": 50,
"total": 50
```

2. Criar um novo eletrodoméstico (rota protegida):

`POST /api/home-appliances`

```json
{
    "name": "Geladeira",
    "description": "Geladeira Frost Free",
    "voltage": "110",
    "brand": "Electrolux"
}
```
3. Obter um eletrodoméstico específico:

`GET /api/home-appliances/1`

```json
{
    "id": 1,
    "name": "Geladeira",
    "description": "Geladeira Frost Free",
    "voltage": "110",
    "brand": "Electrolux",
    "created_at": "2023-06-18T21:00:00.000000Z",
    "updated_at": "2023-06-18T21:00:00.000000Z"
}
```

4. Atualizar um eletrodoméstico (rota protegida):

`PUT /api/home-appliances/1`

```json
{
    "name": "Geladeira",
    "description": "Geladeira Frost Free",
    "voltage": "110",
    "brand": "Electrolux"
}
```

5. Remover um eletrodoméstico (rota protegida):

`DELETE /api/home-appliances/1`

```json
{
    "message": "Recurso deletado",
	  "status": 204,
}
```

A API também possui autenticação, utilizando Sanctum. Para utilizar as rotas protegidas, você deve primeiro obter um token de autenticação, utilizando a seguinte rota:

- `POST /api/login`

Para obter o token de autenticação, você deve enviar um JSON no corpo da requisição, com os seguintes campos:

```json
{
    "email": "admin@admin.com",
    "password": "password"
}
```

Para utilizar as rotas protegidas, você deve incluir o token de autenticação no cabeçalho `Authorization` da requisição, utilizando o seguinte formato:

`Bearer {token}`

Certifique-se de substituir `{token}` pelo token de autenticação obtido na rota `/api/login`.

Há rotas para gerenciamento de usuários, mas nem todas estão disponíveis no frontend. Somente Login e Logout. Para utilizá-las, você deve utilizar o Postman ou Insomnia. Como o foco do desafio não envolvia o gerenciamento de usuários, não foi desenvolvido um frontend para essas rotas. Mas aqui estão alguns exemplos de requisições para essas rotas:


1. Listar os usuários cadastrados:

`GET /api/users`

```json
{
	"current_page": 1,
	"data": [
		{
			"id": 1,
			"name": "Admin User",
			"email": "admin@admin.com",
			"email_verified_at": "2023-06-20T00:27:55.000000Z",
			"role": "admin",
			"created_at": "2023-06-20T00:27:55.000000Z",
			"updated_at": "2023-06-20T00:27:55.000000Z"
		}
	],
	"first_page_url": "http:\/\/127.0.0.1:4002\/api\/users?page=1",
	"from": 1,
	"last_page": 1,
	"last_page_url": "http:\/\/127.0.0.1:4002\/api\/users?page=1",
	"links": [
		{
			"url": null,
			"label": "&laquo; Previous",
			"active": false
		},
		{
			"url": "http:\/\/127.0.0.1:4002\/api\/users?page=1",
			"label": "1",
			"active": true
		},
		{
			"url": null,
			"label": "Next &raquo;",
			"active": false
		}
	],
	"next_page_url": null,
	"path": "http:\/\/127.0.0.1:4002\/api\/users",
	"per_page": 100,
	"prev_page_url": null,
	"to": 1,
	"total": 1
}
```

2. Criar um novo usuário:

`POST /api/users`

```json
{
  "name": "Admin User",
  "email": "admin@admin.com",
  "password": "12345678",
  "role": "admin"
}
```

3. Obter um usuário específico:

`GET /api/users/1`

```json
{
  "id": 1,
  "name": "Admin User",
  "email": "admin@admin.com",
  "email_verified_at": "2023-06-20T00:27:55.000000Z",
  "role": "admin",
  "created_at": "2023-06-20T00:27:55.000000Z",
  "updated_at": "2023-06-20T00:27:55.000000Z"
}
```

4. Atualizar um usuário:

`PUT /api/users/1`

```json
{
  "name": "Admin User",
  "email": "admin@admin.com",
  "password": "12345678",
  "role": "admin"
}
```

5. Remover um usuário:

`DELETE /api/users/1`

```json
{
  "message": "Recurso deletado",
  "status": 204,
}
```

## Diferenciais Técnicos

O projeto também inclui os seguintes diferenciais técnicos:

- Autenticação utilizando Sanctum.
- Utilização do framework Nuxt.js no frontend.
- Utilização do Vuex para gerenciamento de estado.
- Utilização do Vue Router para gerenciamento de rotas no frontend.
- Utilização do TypeScript no frontend.
- Para gerar o gráfico foi utilizado o Chart.js.

## Possíveis falhas

Na hora de criar os containers no Docker, caso dê erro no container da API, veja se o arquivo que está na pasta `api/run.sh` utiliza a Sequencia de Fim de Linha (EOL) configurada para Unix. Caso não esteja, altere para Unix e tente novamente. Pelo VS Code e Sublime Text, você pode alterar a EOL no canto inferior direito da tela, clicando em CRLF e alterando para LF. Abra o arquivo `run.sh` e altere a EOL para Unix (LF). Salve o arquivo e tente novamente utilizando o comando `docker compose up --build`.
