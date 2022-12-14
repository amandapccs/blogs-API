# Project Blogs API
# Contexto
No projeto de backend da Trybe, API de Blogs, utilizamos #CRUDs para as diversas operações em um blog, tudo armazenado em SQL. Como padrão de organização foi utilizado o MSC, o que contribuiu para a API ser REST. Os erros foram tratados de maneira customizada por um Custom Error. Os commits estão no padrão convencional.

## Técnologias usadas
Back-end:
> Desenvolvido usando: NodeJS, ExpressJS, Docker, Sequelize, JWT e Joi.
## Instalando Dependências
> Backend
```bash
cd Project-Blogs-API
npm install
``` 
## Executando aplicação em docker
* Para rodar o back-end:
  ```
  docker-compose up -d
  *A aplicação estará rodando na porta 3000: http://localhost:3000/ do navegador
  ```
  * Para subir o nodemon e poder fazer as requisições:
    ```
    Abra um terminal e rode: docker exec -it blogs_api bash
    Dentro do bash execute: npm run debug  
    ```
## Executando Testes
* Para rodar todos os testes:
  ```
    npm test
  ```
