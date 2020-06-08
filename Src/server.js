const express = require("express") // faz um pedido do express e ele volta armazenado na variável.
// usando o express que é uma função e foi instalado na máquina


const server = express() 

// pegar o banco de dados
const db = require('./database/db')

// Configurar pasta pública

server.use(express.static("Public")) //fazendo uma configuração no servidor também.
// express.static("Public") configura a pasta Public para ficar visível na web tipo isso para que o express entenda..

// habilitar o uso do req.body no usa da nossa aplicação
// urlencoded({extended:true})) é uma função que recebe um obj
// extended:true propriedade 
server.use(express.urlencoded({extended:true}))

// utilizando a template enigme

const nunjuncks = require("nunjucks")
nunjuncks.configure("Src/views",{
    express: server, //falando qual nosso servidor express e ligando o server ao nunjucks
    noCache:true // ele devolve o que tem no cache e as vezes atrapalha.

}) //fazendo configuração no nunjacks passando as pastas que tem os html




server.listen(3000) //ligar o servidor
// ouvindo a porta 3000 que eu coloquei
// executar o arquivo js na nossa página
// acessa o terminal bash entra na pasta que se encontra o server.js e executa o comando server.js
// criando atalho vai no package.json em teste e coloca no lugar de test start e aí coloca
// no parâmetro node Src/server.js
// toda vez que quiser rodar esse arquivo só colocar npm start no terminal



//Configurar caminhos da minha aplicação
// página inicial
//req = requisição
// resp = resposta
server.get("/",(req,resp)=>{ //pedindo a barra e vai rodar a função.
    // resp.send("cheguei aqui")
    // send envia a resposta para nossa página
        // resp.sendFile(__dirname + "/views/index.html") //envie um arquivo
        // __dirname significa qual o diretório que eu estou

      return  resp.render("index.html",{title:"um título"})
        //faz tipo o sendFile mas usando o nunjucks
    // pra não ficar reiniciando o servidor toda hora vamos colocar um modolo nodemon
    // lá np package.json vai lá e  muda de node para nodemon nos parâmetros do start
    
})

server.get("/creat-ponto",(req,resp) =>{
    // req.query pega todas as informações da url o nome que se dá é quwry strings
    // console.log(req.query)



   return resp.render("creat-ponto.html")
})


server.post("/savepoint",(req,resp) =>{
   
    // req.body o corpo do formulário
   console.log(req.body)
   
   // inserir dados no banco de dados
   
   const query = `
   INSERT INTO places(
       image,
       name,
       adress2,
       state,
       city,
       items
       
       
       )  VALUES(?,?,?,?,?,?);
       `
       const values = [ 
           req.body.image,
           req.body.name,
           req.body.adress2,
           req.body.state,
           req.body.city,
           req.body.items            
        ]
        
        function afterInsertData(err) {
            if (err) {
                console.log(err)
                return resp.send("Erro no cadastro ")

            }
            
            console.log('Cadastro realizado com sucesso')
            console.log(this)
            return resp.render("creat-ponto.html",{saved:true})
        }

    db.run(query,values,afterInsertData)
    

})




server.get("/search",(req,resp) =>{

    const search = req.query.search

        if(search ==""){
            // pesquisa vazia
                     return resp.render("Search.html",{total:0})
        }

    // pegar os dados do banco de dados 
    // consultar os dados da tabela

    // * SIGNIFICA QUE VOCÊ VAI SELECIONAR TUDO
    // rows é os registros da tabela no formato de array
    db.all(`SELECT * FROM places`, function (err, rows) {
        // db.all(`SELECT * FROM places WHERE city = '${search}'`, function (err, rows) pra pesquisar por cidade
        // db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'` FUNCIONA TIPO SE ELE COLOCAR SÕ RIO E NÃO RIO DE JANEIRO
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        // mostrar a página html com os dados do banco de dados 
        return resp.render("Search.html",{places: rows, total:total})
        // passando o obj places dentro do rows 
    })

 })