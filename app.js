const user = document.querySelector('#menu');
const formArea = document.querySelector('.home .form-area');
const form = document.querySelector(".b7validator");
const btnForm = document.querySelector('.btn')
const userField = document.querySelector('#user');
const emailField = document.querySelector('#email');
const passField = document.querySelector('#password')
const inputs = document.querySelectorAll('input')

user.onclick = () => {
    formArea.classList.toggle('active')
}


let B7Validator = {
    handleSubmit:(event) =>{
        event.preventDefault();
        let send = true;

        B7Validator.clearErrors()

        for(let i = 0; i < inputs.length; i++) {
            let input = inputs[i];

            let check = B7Validator.checkInput(input);
            if(check !== true) {
                send = false;
                //Mostrar o erro
                B7Validator.showError(input, check)
            }
        }

        if(send) {
            form.submit()
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');
        if(rules !== null) {
            rules = rules.split('|');
            for(let k in rules) {
                let rDetails = rules[k].split('=');

                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Required Field'
                        }
                    break;
                    case 'min':
                        if(userField.value.length < rDetails[1]) {
                            return `Please, fill out this field with, at leat ${rDetails[1]} strig`
                        }
                    break;
                    case 'email':
                        if(emailField.value.length != '') {
                            let RE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            
                            if(RE.test(emailField.value.toLowerCase())) {
                                return "this email address isn't valid"
                            }
                        }
                    break;
                }
            }
        }
        return true;
    },
    showError:(input, error) => {
        input.classList.toggle('error');

        let errorElement = document.createElement('div');
        errorElement.classList.add('fault');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input)
    },
    clearErrors:() => {
        // let inputs = form.querySelectorAll('.error');
        // for (let i=0; i<inputs.length; i++) {
        //     inputs[i].classList.remove()
        // }


        let errorElemets = document.querySelectorAll('.fault');
        for(let i=0; i< errorElemets.length; i++) {
            errorElemets[i].remove()
        }
    }
};

form.addEventListener('submit', B7Validator.handleSubmit)

///05:20