
const navigation = document.querySelector('.navigation');
const allLinks = document.querySelectorAll('.nav-link');
const views = document.querySelectorAll('.view');

const mailInput = document.querySelector('input[name="email"');
const phoneInput = document.querySelector('input[name="phone"');
const currencyField = document.querySelectorAll('input[name="currency"');
const agreeField = document.querySelector('#agree');

let mailTrue;
let phoneTrue;
let submit = document.querySelector('.submit');

const formContainer = document.querySelector(".form-container");

// hides/shows different views.
function showHideNavs(e) {
    if ( e.target.nodeName === 'A' ) {
        const nav = e.target.getAttribute('data-id');
        const field = document.querySelector(`#${nav}-view`);
        const inputs = document.querySelector('.inputs');   


        if ( field ) {
            inputs.querySelector('.active').classList.remove('active');
            navigation.querySelector('.active').classList.remove('active');
            field.classList.add('active');
            e.target.classList.add('active');
        }
    }
}

function errorMessage(element, msg) {
    const msgEl = element.parentElement.querySelector('.message');
    msgEl.classList.add('active');
    msgEl.textContent = msg;
}

function clearMessage(element) {
    const msgEl = element.parentElement.querySelector('.message');
    msgEl.classList.remove('active');
    msgEl.textContent = '';
}

function mailValidation() {
    const mailformat = /[^@]+@[^\.]+\..+/;

    if(! mailInput.value.match(mailformat)) {
        errorMessage(mailInput, 'You have entered an invalid email address!');
        mailTrue = false;
    } else {
        clearMessage(mailInput);
        mailTrue = true;
    }
}

function phoneValidation() {
    const phoneformat = /^[0-9()+-]+$/;

    if(! phoneInput.value.match(phoneformat)) {
        errorMessage(phoneInput, 'You have entered an invalid phone number!');
        phoneTrue = false;
    } else {
        clearMessage(phoneInput);
        phoneTrue = true;
    }
}

function fieldValidation(e) {
    const field = e.target;

    if ( field.name === 'email' ) mailValidation();
    if ( field.name === 'phone' ) phoneValidation();
}

function noEmptyFields(fields) {
    let result = true;

    fields.forEach(function(field) {
        if ( field.length ) {
            // if it is checkbox group
            let checked = false;
            field.forEach(function(item){
                if ( item.checked ) checked = true;
            });

            if ( ! checked ) {
                errorMessage(field[0], 'This field is required!');  
                result = false;
            }

        } else {
            // for single fields
            const type = field.type;
            const inputs = ['input', 'email', 'tel'];
            if ( inputs.indexOf(type) !== -1 ) {
                if ( ! field.value ) {
                    errorMessage(field, 'This field is required!');
                    result = false;
                }
            
            } else if ( type === 'checkbox' ) {
                if ( ! field.checked ) {
                    errorMessage(field, 'This field is required!');
                   
                    result = false;
                }
            }
        }
    });

    return result;
}

function submitCb(e) {
    e.preventDefault();
    const fields = [currencyField, agreeField];
    
    if ( navigation.querySelector('.active').getAttribute('data-id') === 'email' ) {
        fields.push(mailInput);

    } else {
        fields.push(phoneInput);
    }
    // run checks for empty fields
    if ( noEmptyFields(fields) && phoneTrue != false && mailTrue != false) {

        // if everything is OK proceed with submit
        const loader = document.querySelector('#loader');
        loader.classList.add('active');
    
        setTimeout(function(){
            const success = document.querySelector('#success');
            loader.classList.remove('active');
            document.querySelector('form').remove();
            navigation.remove();
            success.classList.add('active');
            success.querySelector('p').textContent = 'Congratulations! You successfully registered!'
        }, 2000)
    } else {
        console.log('Error');
        formContainer.classList.add("shake");
        setTimeout(function(){
            formContainer.classList.remove("shake");}, 400);


        let centerX = document.body.clientWidth;
        let centerY = document.body.clientHeight;
        for (let i = 0; i < 100; i++) {
            createParticle(centerX/2, centerY/2);
        }
    }
}

// mailView.style.display = "block";
const fields = [mailInput, phoneInput];

navigation.addEventListener('click', showHideNavs);

fields.forEach(function(field) {
    field.addEventListener('change', fieldValidation);
})

submit.addEventListener("click", submitCb);




// kreiranje partikla. 
function createParticle(x, y) {
 
    let particle = document.createElement("particle");
    document.body.appendChild(particle);
  
    let size = Math.floor(Math.random() * 10 + 5);
  
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
  
   
    let destinationX = x + (Math.random() - 0.5) * 2 * 190;
    let destinationY = y + (Math.random() + 0.5) * 2 * 300;
  
    let animation = particle.animate(
      [
        {
          
          transform: `translate(${destinationX }px, ${y - size}px)`,
          opacity: 1,
          filter: `hue-rotate(${0}deg`
        },
        {
         
          transform: `translate(${destinationX}px, ${destinationY}px)`,
          opacity: 1,
          filter: `hue-rotate(${360}deg`
          
        }
      ],
      {
       
        duration: 800 ,
        easing: "linear",
        
      
        delay: Math.random() * 200
      }
    );
  
    animation.onfinish = () => {
      particle.remove();
    };
  }
  