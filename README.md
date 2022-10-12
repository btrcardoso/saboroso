# Saboroso

Site de Restaurante do curso "JavaScript - Curso COMPLETO com 6 Projetos REAIS" da HCode escrito em Node / Express e uso do banco de dados MySQL.

## Instalação dos pacotes utilizados

Na raiz do projeto, insira no terminal:
```bash
npm install express-generator -g
express –view=ejs saboroso
npm install mysql2 --save
npm install nodemon --save
```

Na pasta public/admin, insira no terminal: 
```bash
bower install
```

## Instalação do Redis para Express Session 

No [repositório da Microsoft](https://github.com/microsoftarchive/redis/releases), instale o msi para utilizá-lo no Windows. Então, na raiz do projeto, insira no terminal:
```bash
npm install express-session connect-redis --save 
```

Ou você pode apenas, na raiz do projeto, inserir no terminal:
```bash
npm install redis connect-redis express-session --save
```

## Instalação final

Na raiz do projeto, insira no terminal:
```bash
npm install 
```

## Execução

Na raiz do projeto,  insira no terminal:
```bash
SET DEBUG=saboroso:* & npm start
```