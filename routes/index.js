var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/alun',function(req,res){
  global.db.listarAlunos((error,documentos)=>{
    if(error){console.log(error);}
    res.render('alun',{title:"Listar Alunos",
    documentos:documentos});
  })
});

router.get('/newAlun',function(req,res){
  res.render('newAlun',{title:"Cadastrar Aluno",
  alunos:{"nome":"","matricula":"","sexo":"","idade":""},
  action:'/newAlun'});
});

router.post('/newAlun',function(req,res){
  var nome = req.body.nome;
  var matricula = req.body.matricula;
  var sexo = req.body.sexo;
  var idade = req.body.idade;
  global.db.cadastrarAlunos({nome,matricula,sexo,idade},(error,documentos)=>{
    if(error){return console.log(error);}
    res.redirect('/alun');
  })
});

router.get('/delete/:id',function(req,res){
  var id = req.params.id;
  global.db.excluirAlunos(id,(error,resultado)=>{
    if(error){return console.log(error);}
    res.redirect('/alun');
  })
});

router.get('/edit/:id' ,function(req, res){
  var id = req.params.id;
  global.db.buscarAlunoPorId(id, (error, documentos) => {
    if(error){ return console.log(error);}
    res.render('newAlun', {title: 'Atualizar Aluno', alunos: documentos[0], action: '/edit/' + documentos[0]._id});
  })
});

router.post('/edit/:id', function(req, res){
  var id = req.params.id;
  var nome = req.body.nome;
  var matricula = req.body.matricula;
  var sexo = req.body.sexo;
  var idade = req.body.idade;

	global.db.atualizarAlunos(id, {nome, matricula,sexo,idade} ,(error,resultado) => {
		if(error){ return console.log(error);}
    res.redirect('/alun');
  })
});

module.exports = router;
