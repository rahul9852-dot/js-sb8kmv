

const currencies = {
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  INR: "Indian Rupee",
  JPN: "Japanese Yen",
  USD: "United States Dollar",
  ZAR: "South African Rand",
};


const primaryCurrencies = document.getElementById("primary");
const secondaryCurrencies = document.getElementById("secondary");
primaryCurrencies.innerHTML= getOptions(currencies);
secondaryCurrencies.innerHTML= getOptions(currencies);

function getOptions(data){
  return Object.entries(data).map(([country, currency])=> `<option value="${country}"> ${country} | ${currency}</option>`)
}


document.getElementById("btn-convert").addEventListener('click', fetchCurrencies)


function fetchCurrencies(){

  const primary = primaryCurrencies.value;
  const secondary = secondaryCurrencies.value;
  const amount = document.getElementById("amount").value;
  fetch("https://v6.exchangerate-api.com/v6/e3004448d734b49cea56c7ef/latest/" + primary)
  .then((response)=>{
    if(response.ok){
      return response.json()
    }else{
      throw new Error("Network response error")
    }
  }).then((data)=>{
    console.log(data);
    displayCurrency(data, primary, secondary, amount);
  })
}


function displayCurrency(data, primary, secondary, amount) {
  const calculated = amount * data.conversion_rates[secondary];
  document.getElementById("result").setAttribute("style", "display:block");
  document.getElementById("txt-primary").innerText = amount + " " + primary + " = ";
  document.getElementById("txt-secondary").innerText = calculated + " " + secondary;
}
