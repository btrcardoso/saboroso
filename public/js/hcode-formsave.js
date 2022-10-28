/*
Add a method in HTMLFormElement
You can see this class writing dir(document.querySelector("form")) on console.
*/

HTMLFormElement.prototype.save = function(config){

    let form = this;

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

                if(json.error){ 

                    if(typeof config.failure === 'function') config.failure(json.error);

                } else {
                    
                    if(typeof config.success === 'function') config.success(json);

                }

        }).catch(err=>{

            if(typeof config.failure === 'function') config.failure(err);
            
        });

        // The global fetch() method starts the process of fetching a resource
            // from the network, returning a promise which is fulfilled once the 
            // response is available
            
    });

}

