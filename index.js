const express = require ('express') // require('express') carrega a biblioteca instalada pelo npm.
//Express é um framework do Node.js usado para criar servidores e APIs.
const app = express() // chama a função
//Executa a função express()
 
 
app.use(express.json())
 
const alunos = [
    {
        id: 1,
        nome: "Arthur Duque",
        email: "arthur@gmail.com"
    },
    {
        id: 2,
        nome: "Pedro Sperati",
        email: "pedro@gmail.com"
    },
    {
        id: 3,
        nome: "Arthur Sperati",
        email: "pedro@gmail.com"
    },
    {
        id: 4,
        nome: "Julia Lopes",
        email: "julia@gmail.com"
    }
]
app.get("/", function(req, res){
    res.send("Hello word!, você conseguiu!")
})
 
app.get("/alunos", function(req, res){
    const nome = req.query.nome // o query parameter é uma forma de passar informações na url, ele fica depois do ? e tem a forma chave=valor, nesse caso a chave é nome e o valor é o nome do aluno que queremos buscar

    if(!nome){ // se o nome não for passado na url, ele retorna a lista completa de alunos
        return res.json(alunos)
    }

    const alunosFiltrados = alunos.filter(a => a.nome.toLowerCase().includes(nome.toLowerCase()))
    
    res.json(alunosFiltrados)
})
 
app.post("/alunos", function(req, res){
    const nomeQueVeioDoCliente = req.body.nome
    const emailQueVeioDoCliente = req.body.email  
   
    //Validação
    if (!nomeQueVeioDoCliente ||!emailQueVeioDoCliente){ // A ! confere se algo foi escrito
        return res.status(400).json({erro: "Nome e E-mail são obrigatórios!"})
    }
 
    //Criando um objeto novo com as informações
    //
    const novoAluno ={
        id: 4,
        nome: nomeQueVeioDoCliente,
        email: emailQueVeioDoCliente
 
    }
 
    alunos.push(novoAluno)
    res.status(201).send()
})
 
 
//O aluno/: cria uma variavel chamada id que permite ele retornar os alnos pelo id
app.get("/alunos/:id", function(req, res){
    const id = parseInt(req.params.id) //o Query parameter volta como texto,
                                       // mas como o id é um número usamos o parseInt
    //Retorna só o id que veio na url
    const aluno = alunos.find(a => a.id == id) // procura algum objeto onde a a condição seja verdadeira
    //nesse caso ele vai procurar na lista de alunos, algum objeto onde o ID seja igual o Id da url, setornando o objeto em si
 
    //Se a variavel for nula é igual a falso,
    // se tiver algo é verdadeira
    if(aluno){
        return res.json(aluno)
    }else{
        res.status(404).json("Aluno não encontrado!")
    }
})
 
app.put("/alunos/:id", function(req , res){
 
    const id = parseInt(req.params.id)
    // const nome = req.body.nome
    // const email = req.body.nome
    //Desestruturação do objeto
   
    const {nome, email} = req.body
 
    if( !nome || !email){
        return res.status(400).json("Nome e Email são obrigatórios")
    }
  
 
 
    //Precisa descobrir em qual posição do aray/lista
    // o aluno esta pelo id
    const indexDoAluno = alunos.findIndex( a => a.id == id) // mesma função do find, porem o findIndex retorna a posição dentro do array
    // se ele não encontrar o usuario ele retorna -1
 
    if(indexDoAluno === -1){
        return res.status(404). json ("Aluno não encontrado")
    }
 
    //Substitui os dados do alunos pelos novos dados da requisição
    alunos[indexDoAluno] .email = email
    alunos[indexDoAluno] .nome = nome
 
    return res.json(alunos[indexDoAluno])
 
})

app.delete("/alunos/:id", function(req, res){
    const id = parseInt(req.params.id)
    const index = alunos.findIndex(a => a.id == id)

    if(index === -1){
        return res.status(404).json("Aluno não encontrado")
    }

    //Remover o aluno da lista
    // o splice é um método do array que remove um elemento do array, o primeiro parametro é a posição do elemento a ser removido, e o segundo parametro é a quantidade de elementos a serem removidos a partir daquela posição
    // o splice retorna um array com os elementos removidos, nesse caso ele vai retornar um array com um elemento, que é o aluno removido
    // o splice modifica o array original, ou seja, ele remove o elemento do array original, diferente do filter que retorna um novo array sem modificar o array original
    // o splice é mais eficiente para remover um elemento do array, pois ele não precisa criar um novo array, diferente do filter que precisa criar um novo array sem o elemento removido

 
    const alunoRemovido = alunos.splice(index, 1) // o splice remove um elemento do array, o primeiro parametro é a posição do elemento a ser removido, e o segundo parametro é a quantidade de elementos a serem removidos a partir daquela posição
    return res.status(204).json("Aluno removido com sucesso!")
    }
)
 
//Monitora/escuta a porta 3000
app.listen(3000, function(){
    console.log("Servidor rodando na porta 3000!")
})


 
 
 



//Criar lista de professores
//cadastrsar professores
// retorna professores cadastrados
// Deve ser possível filtrar um professor pelo que foi contratado
// Deletar um professor pelo id
// Editar um professor 


const professores = [
    {
        id: 1,
        nome: "Betania",
        disciplina: "Filosofia",
        anoContratacao: 2022
    },
    {
        id: 2,
        nome: "Gabriel",
        disciplina: "Educação Física",
        anoContratacao: 2023
    },
    {
        id: 3,
        nome: "Carlos",
        disciplina: "História",
        anoContratacao: 2025
    }
]

// GET /professores
// Retorna todos os professores
// Também permite filtrar pelo ano de contratação


app.get("/professores", function(req, res){

    // Pegando o ano que pode ter vindo pela URL (query parameter)
    const ano = req.query.ano

    // Se nenhum ano for informado, retorna todos
    if(!ano){
        return res.json(professores)
    }

    // Se o ano foi informado, filtra apenas os professores
    // contratados naquele ano
    const professoresFiltrados = professores.filter(p => 
        p.anoContratacao == parseInt(ano)
    )

    res.json(professoresFiltrados)
})


// POST /professores
// Cadastra um novo professor


app.post("/professores", function(req, res){

    // Pegando as informações que vieram do cliente (body da requisição)
    const nomeQueVeioDoCliente = req.body.nome
    const disciplinaQueVeioDoCliente = req.body.disciplina
    const anoQueVeioDoCliente = req.body.anoContratacao  

    // Validação básica:
    // Se algum campo estiver vazio, retorna erro 400
    if (!nomeQueVeioDoCliente || !disciplinaQueVeioDoCliente || !anoQueVeioDoCliente){
        return res.status(400).json({erro: "Nome, disciplina e anoContratacao são obrigatórios!"})
    }

    // Criando um novo objeto professor com os dados recebidos
    const novoProfessor = {
        id: 4, // Aqui está fixo (pode melhorar depois gerando automaticamente)
        nome: nomeQueVeioDoCliente,
        disciplina: disciplinaQueVeioDoCliente,
        anoContratacao: parseInt(anoQueVeioDoCliente) // garantindo que seja número
    }

    // Adicionando o novo professor na lista
    professores.push(novoProfessor)

    // Retornando status 201 (criado com sucesso)
    res.status(201).send()
})



// GET /professores/:id
// Retorna um professor específico pelo ID


app.get("/professores/:id", function(req, res){

    // O ID vem como texto, então convertimos para número
    const id = parseInt(req.params.id)

    // Procurando dentro do array o professor com esse ID
    const professor = professores.find(p => p.id == id)

    // Se encontrar, retorna o professor
    if(professor){
        return res.json(professor)
    } else {
        // Se não encontrar, retorna erro 404
        res.status(404).json("Professor não encontrado!")
    }
})


// PUT /professores/:id
// Atualiza os dados de um professor


app.put("/professores/:id", function(req, res){

    const id = parseInt(req.params.id)

    // Pegando os novos dados enviados no body
    const { nome, disciplina, anoContratacao } = req.body

    // Se algum campo obrigatório não vier, retorna erro
    if(!nome || !disciplina || !anoContratacao){
        return res.status(400).json("Nome, disciplina e anoContratacao são obrigatórios")
    }

    // Descobrindo a posição do professor dentro do array
    const indexDoProfessor = professores.findIndex(p => p.id == id)

    // Se não encontrar, retorna erro
    if(indexDoProfessor === -1){
        return res.status(404).json("Professor não encontrado")
    }

    // Atualizando os dados do professor
    professores[indexDoProfessor].nome = nome
    professores[indexDoProfessor].disciplina = disciplina
    professores[indexDoProfessor].anoContratacao = parseInt(anoContratacao)

    // Retorna o professor atualizado
    return res.json(professores[indexDoProfessor])
})


// DELETE /professores/:id
// Remove um professor pelo ID


app.delete("/professores/:id", function(req, res){

    const id = parseInt(req.params.id)

    // Encontrando a posição do professor
    const index = professores.findIndex(p => p.id == id)

    // Se não existir, retorna erro
    if(index === -1){
        return res.status(404).json("Professor não encontrado")
    }

    // Remove o professor do array
    professores.splice(index, 1)

    // 204 significa "removido com sucesso e sem conteúdo para retornar"
    return res.status(204).json("Professor removido com sucesso!")
})