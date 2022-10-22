var conn = require("./db");

module.exports = {

    render(req, res, error, success){

        res.render('reservations', {
            title: 'Reservas - Restaurante Saboroso',
            background: 'images/img_bg_2.jpg',
            h1: 'Reserve uma mesa!',
            body: req.body,
            error,
            success
        });

    },

    save(fields){

        return new Promise((resolve, reject)=>{

            let date = fields.date;

            if(fields.date.indexOf('/') > -1){
                date = fields.date.split('/');
                date = `${date[2]}-${date[1]}-${date[0]}`;
            }

            let query, params = [
                fields.name, 
                fields.email, 
                fields.people, 
                date, 
                fields.time
            ];

            if(parseInt(fields.id) > 0){

                query = `
                    UPDATE tb_reservations
                    SET 
                        name = ?,
                        email = ?,
                        people = ?,
                        date = ?, 
                        time = ?
                    WHERE id = ?
                `;

                params.push(fields.id);

            } else {

                query = `
                    INSERT INTO tb_reservations (name, email, people, date, time)
                    VALUES ( ?, ?, ?, ?, ?)
                `;

            }

            // conn.query(sql string, vector data, callback)
            conn.query(query, params, (err, results) => {
                
                if(err){
                    reject(err);
                } else {
                    resolve(results);
                }

            });

        });

    }

};