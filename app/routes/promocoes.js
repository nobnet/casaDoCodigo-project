module.exports = function(app) {
    app.get("/promocoes/form",function(req,res,next){
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.lista(function(erros,resultados){
            if(erros)
                next(erros);
            res.format({
                html: function(){
                res.render('promocoes/index',{lista:resultados});
                },
                json: function(){
                res.json(resultados)
            }
            });            
        });
        connection.end();
    });
    
    app.post("/promocoes",function(req,res){
        var promocao = req.body;
        app.get('io').emit('novaPromocao',promocao);
        res.redirect('promocoes/form');
    });
}
