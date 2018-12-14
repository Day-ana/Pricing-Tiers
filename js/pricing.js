//start RC script
let range = document.querySelector('.user-range');
let tierSwitch = document.querySelector('#switch');
let notAvailable = document.querySelector('.not-available');
let priceElements = document.querySelectorAll('[data-price]');
let yearElement = document.querySelectorAll('.price-yearly');
let monthElement = document.querySelectorAll('.price-monthly');
let smallElement = document.querySelectorAll('.small');


// key
// 1 = Essentials
// 2 = Standard
// 3 = Premium
// 4 = ultimate

//Key value pairs are made to strings
let prices = {
  '1': {'price-monthly': [39, 49, 54, 69],'price-yearly':[29, 34, 44, 59]},
  '2': {'price-monthly': [29, 34, 44, 59],'price-yearly':[19, 24, 34, 49]},
  '3': {'price-monthly': [null, 32, 42, 52],'price-yearly':[null, 22, 32, 42]},
  '4': {'price-monthly': [null, 29, 39, 49],'price-yearly':[null, 19, 29, 39]}
}

//Input works with Chrome and Firefox, Edge cases have not been tested due to time constraints
range.addEventListener('input', function(e){
  getPrices(range.value);
})

// Declare functions before being called
function updateMonthPrice(element, price){
  // console.log('------updateMonthPrice called-----')
  element.childNodes[3].innerHTML = price;
}

function updateYearPrice(element, price){
  // console.log('------updateYearPrice called-----')
    element.childNodes[1].childNodes[3].innerHTML = price;
}

function getPrices(value){

    let month = 'price-monthly', year = 'price-yearly';

    //turn on Available in the case that price is available
    notAvailable.style.display = "none";

    //iterate through the nodes with a data set
    priceElements.forEach((item, index) =>{
      //grab the price value in the price array
      let monthPrice = prices[value][month][item.dataset.price -1],
          yearPrice = prices[value][year][item.dataset.price -1]

      //Handle not available edge cases
      if(monthPrice === null && item.classList.contains(month) || yearPrice === null && item.classList.contains(year)){
        notAvailable.style.display = "block";
        return;
      }

      //if the node contains a class of 'price-monthly' update the DOM
      if(item.classList.contains(month)){
        updateMonthPrice(item, monthPrice);
      }

      //if the node contains a class of 'price-yearly' update the DOM
      if(item.classList.contains(year)){
        updateYearPrice(item, yearPrice);
      }

    })
}

function togglePriceAnimations(){
  // console.log('------togglePriceAnimations called-----')
  tierSwitch.addEventListener('click', (e)=>{
    yearElement.forEach(el =>{
        if(el.classList.contains('fade')){
          el.classList.toggle('fade');
        }else{
          el.classList.add('fade');
        }
    })
    monthElement.forEach(el =>{
        if(el.classList.contains('enlarge')){
          el.classList.remove('enlarge');
        }else{
          el.classList.add('enlarge');
        }
    })
    smallElement.forEach(el =>{
        if(el.classList.contains('shift')){
          el.classList.remove('shift');
        }else{
          el.classList.add('shift');
        }
    })
  })
}

//init toggle function
togglePriceAnimations();
