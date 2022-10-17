/*
This is a plugin that puts the chosen image in the <img></img>
*/

class HcodeFileReader{

    constructor(inputEl, imgEl){

        this.inputEl = inputEl;
        this.imgEl = imgEl

        this.initInputEvent();

    }

    initInputEvent(){

        document.querySelector(this.inputEl).addEventListener("change", e => {

            this.reader(e.target.files[0]).then(result => {
                document.querySelector(this.imgEl).src = result;
            }).catch(error => {
                console.log(error);
            });


        });

    }

    reader(file){

        return new Promise((resolve, reject) => {

            let reader = new FileReader();

            reader.onload = function(){

                resolve(reader.result);

            }

            reader.onerror = function(){

                reject("Não foi possível ler a imagem");

            }

            reader.readAsDataURL(file);

        });

    }

}