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

## 👨‍💻 Desenvolvimento
> [!TIP]
> Manter o padrão na criação de arquivos como dtos, interface, guards. Siga o exemplo do que já está no repositório! Isso também vale para variáveis e funções.

- 💽 <strong>Nome</strong> de variáveis, arquivos, pastas, funções sempre em inglês.

- ❗ <strong>Retorno de _Exceptions_</strong> em inglês também? Não, pode retornar a mensagem em português.

<details>

<summary>Uso do Guard <strong>JwtAuthGuard</strong></summary>

### Todos os módulos devem configurar o uso global do JwtAuthGuard

A intenção é que todas as rotas do seu módulo necessitem de um token.

Exemplo do _users.module.ts_:
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

Exemplo do _app.controller.ts_:
```ts
  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
```
o _@Public()_ faz com que a mesma fique disponivel sem o uso de um token.
</details>
