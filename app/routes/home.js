module.exports = function(app)  {
    app.get('/',function(req,res,next){
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.lista(function(erros,resultados){
            if(erros){
                return next(erros);
            }

            res.render('home/index',{livros:resultados});
        });
        connection.end();    
    });  
}
