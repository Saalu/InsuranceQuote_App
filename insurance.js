// variables
const form = document.getElementById('insurance-form')
const html = new UITemplate()

// eventListeners
eventListeners()

function eventListeners(){
    // onPageLoad
    document.addEventListener('DOMContentLoaded', function(){
        html.displayYears()
    })

    // onSubmit
    form.addEventListener('submit', function(e){
        e.preventDefault()

        const make = document.getElementById('make').value
        const year = document.getElementById('year').value
        const level = document.querySelector('input[name="level"]:checked ').value
        console.log(make, year, level)

        if(make === '' || year === '' || level === '' ){
            console.log('Error')
            html.displayError('All inputs are required ')
          }else{
              console.log('Correct')
            //   continue if not empty

          }

    })
}




//object constructor or functions
function UITemplate(){}



UITemplate.prototype.displayYears = function(){

    const max = new Date().getFullYear(),
        min = max -20;
    const selectYear = document.getElementById('year');

    for(let i = max; i >= min; i--){
        const option = document.createElement('option')
        option.value = i
        option.textContent= i
        selectYear.appendChild(option)
    }
}

UITemplate.prototype.displayError = function(message){
    const div = document.createElement('div')
    div.classList = 'error'
    div.innerHTML =`
    <p>${message}</p>
    `;

    form.insertBefore(div, document.querySelector('.message'))


    setTimeout(()=>{
        document.querySelector('.error').remove()
    },3000)
}