# API Escola - Node.Js + Express

API REST simples para gerenciar alunos e professores
 
## Pré-requisitos

- Node.js instalado
 
## Como rodar
 
### Instalar dependências

```bash

npm i

```
 
### Iniciar o servidor

```bash

npm index.js

```
 
### Acessar

Abra o navegador em `http://localhost:3000`
 
## Endpoints

 | Método | Endpoint | Descrição |
 | ----- | ----- | ----- |
 | GET | '/alunos' | Lista todos os alunos |
 | GET | '/alunos/:id' | Buscar um aluno específico |
 | POST | '/alunos' | Cria um novo aluno |
 | PUT | '/alunos/:id' | Atualiza um aluno |
 | DELETE | '/alunos/:id' | Remove um aluno |

 ###professores 

 | Método | Endpoint | Descrição |
 | ----- | ----- | ----- |
 | GET | '/professores' | Lista todos os alunos |
 | POST | '/professores' | Buscar um aluno específico |
 | PUT | '/professores/:id' | Cria um novo aluno |
 | DELETE | '/professores/:id' | Remove um aluno |

 ##Tecnologias 
 - Node.js
 - Express
 - Os dados são armazenados em memória RAM (reiniciar o servidor apaga tudo)


  -

 
