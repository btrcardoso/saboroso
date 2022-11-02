var conn = require('./db');

class Pagination {

    constructor(query, params = [], itensPerPage = 10){

        this.query = query;
        this.params = params;
        this.itensPerPage = itensPerPage;
        this.currentPage = 1;

    }

    getPage(page){
        return new Promise((resolve, reject) => {

            this.currentPage = page - 1

            this.params.push(
                this.currentPage * this.itensPerPage,
                this.itensPerPage
            );

            conn.query([this.query, "SELECT FOUND_ROWS() AS FOUND_ROWS"].join(";"), this.params, (err, results) =>{ 

                if(err){
                    reject(err);
                } else {

                    this.data = results[0];                 // result of this.query
                    this.total = results[1][0].FOUND_ROWS   // first line of result of "SELECT FOUND_ROWS AS FOUND_ROWS"
                    this.totalPages = Math.ceil( this.total / this.itensPerPage ) 
                    this.currentPage++;
                    
                    resolve(this.data);

                }
                
                

            });

        })
    }

    getTotal(){
        return this.total;
    }

    getCurrentPage(){
        return this.currentPage;
    }

    getTotalPages(){
        return this.totalPages;
    }

}

module.exports = Pagination;