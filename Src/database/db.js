// importar sqlite3
const sqlite3 = require("sqlite3").verbose() //.verbose() sempre que trazer algo no obj vai trazer informações

// // pegando um caminho absoluto
// const patch = require("path")
// const dbpatch = patch.resolve(__dirname,'database.db')

// // preparar obj para fazer operações no banco de dados
// const db = new sqlite3.Database(dbpatch)

// pode fazer assim ou dessa forma 
const db = new sqlite3.Database("./Src/database/database.db")

// fazendo a exportação do Object 
module.exports = db


// utilizando o banco de dados para fazer nossas operações
// db.serialize(() => {
    
    
//     // criar uma tabela
//     const creatTable = `
           
//                 CREATE TABLE IF NOT EXISTS places(
//                     id INTEGER PRIMARY KEY AUTOINCREMENT,
//                     image TEXT,
//                     name TEXT,
//                     adress2 TEXT,
//                     state TEXT,
//                     city TEXT,
//                     items TEXT
                    
//                 );

            
//             `
//     db.run(creatTable)


//     // inserir dados na tabela 
//     const query = `
//                 INSERT INTO places(
//                     image,
//                     name,
//                     adress,
//                     adress2,
//                     state,
//                     city,
//                     items
                    

//                 )  VALUES(?,?,?,?,?,?);
//         `
//     const values = [

//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
//         "Paperside",
//         "N 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos,lâmpadas"


//     ]

//     function afterInsertData(err) {
//         if (err) {
//             console.log(err)
//         }

//         console.log('Cadastro realizado com sucesso')
//         console.log(this)
//     }

//     db.run(query,values,afterInsertData)
    

    
//     // consultar os dados da tabela
//     // * SIGNIFICA QUE VOCÊ VAI SELECIONAR TUDO
//     // rows é os registros da tabela no formato de array
//     db.all(`SELECT * FROM places`, function (err, rows) {
//         if (err) {
//             return console.log(err)
//         }
//         console.log('Aqui estão os seus registros')
//         console.log(rows)
//     })
    


    // deletar um dado da tabela
    // db.run(`DELETE FROM places`) // deleta tudo
    // // o valor da interrogação vem no array e cada ? é  um valor 
    // // só pode um por vez
    // db.run(`DELETE FROM places WHERE id = ?`,[5], function (err) {
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log("Registro deletado com sucesso")
    // })

    
    
// })


