
let promptAi;

function sendPrompt(){

}

function setNewPrompt(prompt){
    promptAi = prompt;
}

function setPathForPrompts(){

    fetch("http://localhost:5500/join")
        .then(function(res){

            console.log(res);

            if(res.ok){

                res.json()
                .then(function(response){
                    setNewPrompt(response);
                })
            }

        })
    }

setPathForPrompts();
