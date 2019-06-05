var conexao = require("mongodb").MongoClient;

conexao.connect("mongodb://localhost/escola")
.then(conn => global.conn = conn.db("escola"))
.catch(error => console.log(error))

//Read
function listarAlunos(callback){
    global.conn.collection("alunos").find({}).sort({nome:1}).toArray(callback);
}

//Create
function cadastrarAlunos(dados,callback){
    global.conn.collection("alunos").insert(dados,callback);
}
//ID
var ObjectId = require("mongodb").ObjectId;

function buscarAlunoPorId(id,callback){
    global.conn.collection("alunos").find(new ObjectId(id)).toArray(callback);
}
//Delete
function excluirAlunos(id,callback){
    global.conn.collection("alunos").deleteOne({_id:new ObjectId(id)},callback);
}

//Atualizar
function atualizarAlunos(id,dados,callback){
    global.conn.collection("alunos").updateOne({_id:new ObjectId(id)},
    {$set:{nome:dados.nome,
        matricula: dados.matricula,
        sexo: dados.sexo,
        idade: dados.idade}},callback);

}


module.exports = { listarAlunos,cadastrarAlunos,buscarAlunoPorId,excluirAlunos,atualizarAlunos }