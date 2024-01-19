# API Controle de clientes 

O Objetivo da API é entregar a listagem de clientes otimizados pelo melhor caminho. Baseado em sua localização cartesiana (X,Y).

A API conta também com end-points para controle de clientes, com métodos de inserção, atualização e deleção.

### Instalação

Antes de tudo é necessário a configuração do banco de dados, para isso pode prosseguir com os seguintes passos Postgre. Nesse caso utilizei a versão do PostgreSQL 12.

Criação de usuário

    CREATE USER andre WITH PASSWORD 'qwepoi123'
    ALTER USER andre WITH SUPERUSER;
    \q

Crie também um schema específico para o projeto

    create database facilitaJuridico owner = "andre"


Depois dessa etapa já é possível executar o DDL para criar as estruturas necessárias

    psql -U andre -d facilitajuridico -f ./scripts/ddl.sql

Caso o comando acima tenha ocorrido como o esperado, separei 30 registros que podem ser utilizados inicialmente

    psql -U andre -d facilitajuridico -f ./scripts/dml.sql

## Instalação do Back-End

Foi utilizada a versão 18.17.0 do node.

Utilize o comando para a instalação das dependencias.

    yarn

Ou mesmo.

    npm install

### Rodando o Ambiente

Para iniciar o ambiente utilize o comando, o servidor irá rodar por definição na porta 3300.

    yarn start
