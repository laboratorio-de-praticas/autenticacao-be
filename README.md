<p align="center">
  <a href="https://fatecregistro.cps.sp.gov.br/" target="blank"><img src="https://bkpsitecpsnew.blob.core.windows.net/uploadsitecps/sites/40/2024/03/fatec_registro.png" width="300" alt="Fatec Logo" /></a>
</p>

  <p align="center">Laboratório de Práticas é de realização da <a href="https://fatecregistro.cps.sp.gov.br/" target="_blank">Fatec Registro</a> com o objetivo de acrescentar aos alunos um portfólio, e não menos importante, experiência (boas ou ruins).</p>
    <p align="center">
<a href="https://www.instagram.com/fatecregistro/" target="_blank"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Fatec Registro Instagram" /></a>
</p>

<h1 align="center">Autenticação e Segurança</h1>

## 📋 Descrição

Projeto responsável por toda segurança dos projetos envolvidos no LP (Laboratório de Práticas).

## 🔧 Iniciando o projeto

> [!IMPORTANT]
> Antes mesmo de iniciar no projeto, é preciso realizar algumas configurações.

<details>

<summary> 🐳 Configurando o Banco de Dados Postgres com o Docker</summary>

### 🐋 Instalando e configurando o Docker

Vai lá no site deles e baixa ele direitinho, instala e reinicia o computador.

Após instalar o Docker na máquina tudo certinho, rode o seguinte comando.

```bash
   $ docker run --name meu-postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=meubanco -p 5432:5432 -d postgres
```

Esse comando vai inicializar um container do Postgres.

#### 📌 Explicação dos parâmetros se você estiver interessado:

- `-name meu-postgres`: Nome do container.
- `-e POSTGRES_USER=admin`: Define o usuário do banco.
- `-e POSTGRES_PASSWORD=admin`: Define a senha do banco.
- `-e POSTGRES_DB=meubanco`: Nome do banco de dados inicial.
- `-p 5432:5432`: Mapeia a porta do container para a máquina local.
- `-d postgres`: Roda o container em segundo plano usando a imagem oficial do PostgreSQL.

Se o comando rodar sem nenhum aviso, explosão ou texto vermelho, provavelmente deu tudo certo e o container com o seu banco de dados já está pronto para ser acessado tanto pela API quanto por um SGDB de sua preferência.

#### 🙄 Se você quer acessar o banco de dados:
Se você não alterou nenhuma informação do comando, não tem segredo, só colocar elas no lugar certinho no momento da conexão.
- Vou usar o DBeaver de exemplo:
  
  ![image](https://github.com/user-attachments/assets/45b33518-fa9e-40ff-aac7-232a0139ca3b)
  
  Inserindo as informações no devido lugar, não tem como dar errado. Na teoria.


</details>

<details>

<summary> 🥱 Variáveis de ambiente</summary>

### 📂 Arquivo .env

Sem muito segredo, crie na raiz do projeto um arquivo .env (sim, PONTO + env).
Dentro do arquivo, insira as chaves

```js
DB_USER = nomeDoSeuUsuarioNoBanco;
DB_PASSWORD = aSenhaDele;
DB_NAME = nomeDoDatabase;
DB_PORT = portaDoContainer;
SECRET_KEY = aquiPodeSerQualquerCoisa;
WHITELIST_DOMAIN = qualquerDominioParaTeste;
```

</details>

Após realizar as configurações acima, em teoria, as próximas etapas tem tudo para dar certo!

### Instalando módulos

```bash
$ npm install
```

### Iniciando o projeto

```bash
# desenvolvimento
$ npm run start

# aquele hot reload legal
$ npm run start:dev

# para quando for em prod!
$ npm run start:prod
```

### Rodando testes

```bash
# testes unitarios
$ npm run test

# testes e2e
$ npm run test:e2e

# teste de cobertura
$ npm run test:cov
```
## 📚 Documentação

> [!IMPORTANT]
> Não deixe de documentar as rotas que você desenvolver!

O projeto está utilizando o *Swagger* para a criação da documentação.

Ao rodar o projeto em sua máquina, você tem acesso a documentação pela URL:

 ``http://localhost:3000/api#/``

 ### Fluxograma de funcionamento da API
 ```mermaid
flowchart LR
    A["User"] -- POST /v1/auth/login ---> rectId["API"]
    A -- Requests with Bearer Token --> paraRevId["API"]
    paraRevId -- Token --> route["Protected Routes"] & route1["Protected Routes"] & route3["Protected Routes"]
    rectId -- Capture email and password --> B["AuthGuard"]
    B --> n1["Verify Input"]
    n1 --> decisionId{"Valid?"}
    decisionId -- No --> E["Identify the wrong inputs"]
    decisionId -- Yes --> D["LocalStrategy"]
    D --> hexId["User exists and credentials are valid?"]
    hexId -. "Find user by e-mail" .- db["Postgres"]
    hexId -. Compare body password with hash password .- n3["Bcrypt"]
    hexId -- Yes --> dbId["Generate JWT Token"]
    hexId -- No --> doubleCircleId["Identify the problem"]
    E -- 400 Bad Request --> A
    doubleCircleId -- 401 Unauthorized --> A
    dbId -- 200 OK {access_token} --> A

    rectId@{ shape: procs}
    paraRevId@{ shape: procs}
    route@{ shape: lin-proc}
    route1@{ shape: lin-proc}
    route3@{ shape: lin-proc}
    B@{ shape: subproc}
    n1@{ shape: tag-proc}
    E@{ shape: proc}
    D@{ shape: subproc}
    hexId@{ shape: diam}
    db@{ shape: db}
    n3@{ shape: proc}
    dbId@{ shape: rounded}
    doubleCircleId@{ shape: rect}
```

## 👨‍💻 Desenvolvimento
> [!TIP]
> Manter o padrão na criação de arquivos como dtos, interface, guards. Siga o exemplo do que já está no repositório! Isso também vale para variáveis e funções.

- 💽 <strong>Nome</strong> de variáveis, arquivos, pastas, funções sempre em inglês.
- - <strong>Retorno de _Exceptions_</strong> em inglês também? Não, pode retornar a mensagem em português.

- 🈺 Uso de <strong>prefixos explicítos</strong> nas rotas deixando claro o objetivo da mesma.
- - Exemplos:
  - - Ao invés de `POST /v1/user/`
    - Tente `POST /v1/user/create/`
 
- 🔢 Retorno semântico de <strong>_status code_</strong> com base na resposta da rota.
- - Exemplos:
  - - Ao invés de `POST /v1/user/create/ -> Response 200 OK`
    - Tente `POST /v1/user/create/ -> Response 201 CREATED`
 
- 🔞 Uso semântico dos <strong>métodos _HTTP_</strong> com base na ação da rota.
- - Exemplos:
  - - Ao invés de `GET /v1/user/delete/1 -> Response 204 NO CONTENT`
    - Tente `DELETE /v1/user/delete/1 -> Response 204 NO CONTENT`
   
### Configurações e particularidades da API
<details>

<summary>Uso do Guard <strong>JwtAuthGuard</strong></summary>

### Todos os módulos devem configurar o uso global do JwtAuthGuard

A intenção é que todas as rotas do seu módulo necessitem de um token. Evita ter que adicionar o Guard individualmente para cada rota.

Exemplo do [_users.module.ts_](https://github.com/laboratorio-de-praticas/autenticacao-be/blob/bf1589cb3b6aa2f94bfdcaaf7f2cafa6fee21ea3/src/users/users.module.ts#L14):
```ts
  @Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
```
O que você deve fazer é apenas acrescentar a configuração abaixo no providers do módulo alvo:
```ts
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }
```

</details>

<details>

<summary>Decorator personalizado: <strong>@Public()</strong></summary>

### Decorator anti-token

O uso desse decorator faz com que a sua rota não necessite de um _token_ (acho difícil você querer isso)

Exemplo do [_app.controller.ts_](https://github.com/laboratorio-de-praticas/autenticacao-be/blob/bf1589cb3b6aa2f94bfdcaaf7f2cafa6fee21ea3/src/app/app.controller.ts#L41):
```ts
  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
```
o _@Public()_ faz com que não seja necessário um _token_ para fazer requisição a essa rota.

</details>
