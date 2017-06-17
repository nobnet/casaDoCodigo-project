function ProdutosDAO(connection){
    this._connection = connection;
}

ProdutosDAO.prototype.lista = function(callback){
    if(!process.env.NODE_ENV) {
        this._connection.query('select * from Livros',callback);
    }
    
    if(process.env.NODE_ENV == 'production') {
        this._connection.query('select * from produtos',callback);        
    }
}

ProdutosDAO.prototype.salva = function(produto,callback){
    if(!process.env.NODE_ENV) {
        this._connection.query('insert into Livros set ?',produto,callback);
    }
    
    if(process.env.NODE_ENV == 'production') {
        this._connection.query('insert into produtos set ?',produto,callback);    
    }
}


module.exports = function(){
    return ProdutosDAO;
}
