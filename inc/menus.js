let conn = require('./db');
var path = require('path');

module.exports = {

    getMenus(){

        return new Promise((resolve, reject) => {

            conn.query(`
                SELECT * FROM tb_menus ORDER BY title
            `, (err, results) =>{

                if(err){
                    reject(err);
                } 
                
                resolve(results);

            });

        });

    },

    save(fields, files){

        return new Promise((resolve, reject)=>{

            //let photo = `images/${path.parse(files.photo.path).base}`;
            console.log(files.photo.newFilename);

            conn.query(`
                INSERT INTO tb_menus (title, description, price, photo)
                VALUES (?, ?, ?, ?)
            `, [
                fields.title, 
                fields.description, 
                fields.price,
                `images/${files.photo.newFilename}`
            ], (err, results) => {

                if(err){
                    reject(err);
                } else {
                    resolve(results);
                }

            });

        });

    }

}