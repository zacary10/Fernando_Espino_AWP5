const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error-msg');

function caculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  if (amountEl_one.value < 0) amountEl_one.value = 0;
  if (amountEl_two.value < 0) amountEl_two.value = 0;


  loadingEl.style.display = 'block';

fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
  .then(res => res.json())
  .then(data => {
    const rate = data.rates[currency_two];
    rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
    amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    loadingEl.style.display = 'none';
  })
  .catch(error => {
    loadingEl.style.display = 'none';
    errorEl.style.display = 'block';
    errorEl.innerText = 'Error al conectar con la API. Comprobar la connexion.';
  });

}

currencyEl_one.addEventListener('change', caculate);
amountEl_one.addEventListener('input', caculate);
currencyEl_two.addEventListener('change', caculate);
amountEl_two.addEventListener('input', caculate);
swap.addEventListener('click', caculate);

swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  caculate();
});


caculate();