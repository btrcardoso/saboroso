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
            //console.log(files.photo.newFilename);

            let query, queryPhoto = '', params = [
                fields.title, 
                fields.description, 
                fields.price
            ];

            if(files.photo.size > 0){

                queryPhoto = `, photo = ?`;
                params.push (`images/${files.photo.newFilename}`);

            }

            if(parseInt(fields.id) > 0){ // UPDATE

                params.push(fields.id);

                query = `
                    UPDATE tb_menus
                    SET title = ?, 
                        description = ?,
                        price = ?
                        ${queryPhoto}
                    WHERE id = ?
                `;

            } else { // CREATE

                if(!files.photo){
                    reject("Envie a foto do prato");
                }

                query = `
                    INSERT INTO tb_menus (title, description, price, photo)
                    VALUES (?, ?, ?, ?)
                `;

            }

            conn.query(query, params, (err, results) => {

                if(err){
                    reject(err);
                } else {
                    resolve(results);
                }

            });

        });

    }

}