/*
Add a method in HTMLFormElement
You can see this class writing dir(document.querySelector("form")) on console.
*/

HTMLFormElement.prototype.save = function(){

    let form = this;

    return new Promise((resolve, reject) => {

        form.addEventListener('submit', e=> {

            // cancel the standard form submission
            e.preventDefault();
    
            let formData = new FormData(form);
    
            // form.action: route url
            fetch(form.action,{
                method: form.method,
                body: formData
            })
                .then(response => response.json())
                .then(json => {

                    resolve(json);

            }).catch(err=>{

                reject(err);
                
            });
    
            
            // The global fetch() method starts the process of fetching a resource
            // from the network, returning a promise which is fulfilled once the 
            // response is available
            
        });

    });

}

