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

        if(make === '' || year === '' || level === '' ){
            html.displayError('All inputs are required ')
          }else{
            
            //   quotation instantiation
            const insurance = new Insurance(make, year, level)
            const price = insurance.calculateQuotation(insurance)

            console.log(price)
            html.showResults(price,insurance)
          }

    })
}

//object constructor or 
function Insurance(make, year, level){
    this.make = make;
    this.year = year;
    this.level = level;
}

Insurance.prototype.calculateQuotation = function (insurance){
    let price;
    const base = 2000,
          make = insurance.make;
/*
        1 = American 15%
        2 = Asian 5%
        3 = European 35%
        */  
    switch(make){
        case '1':
            price = base * 1.15;
            break;
        case '2':
            price = base * 1.05;
            break;
        case '3':
            price = base * 1.35;
            break;
            // return price
    } 

    const year = insurance.year;
    const difference = this.getYearDifference(year) 

    //each year insurance price is going to be 3% cheaper
    price = price - ((difference * 3) * price) / 100;

    const level = insurance.level;
    price = this.calculateLevel(price, level)

    return price
}

//Return year difference
Insurance.prototype.getYearDifference = function(year){
    return new Date().getFullYear() - year
}
//Add values base on the level of protection
Insurance.prototype.calculateLevel = function(price, level){
   /*
    Basic level increase by 30%
    Complete level increase by 50%
   */
  if(level === 'basic'){
      price = price * 1.30;
  }else{
      price = price * 1.50;
  }

  return price

}

/* End of Insurance object */

// UI related object
function UITemplate(){}


// functions
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

UITemplate.prototype.showResults =function(price,insurance){
    const results = document.querySelector('.results-container')
    const div = document.createElement('div')
    div.className = 'results'
    div.innerHTML =`
        <p class="total">Total: ${price}</p>
    `;
    
// if(results.childNodes == null){
//     console.log(yes)
// }else{

    results.appendChild(div)
// }

}