const form = document.querySelector(".form");

const containerBank = document.querySelector(".wrapper");

const userData = [];

let currentBank;
form.addEventListener("submit", submit);

function submit(event) {
  event.preventDefault();

  const { name, mail, password, bank, balance } = event.target.elements;

  const bankLogo = bankData.find((elem) => elem.name === bank.value).img;

  const user = {
    name: name.value,
    mail: mail.value,
    password: password.value,
    bank: bank.value,
    logo: bankLogo,
    balance: balance.value,
  };
  createUserCabinet(user);
  userData.push(user);
  event.target.reset();

  const submitBtn = document.querySelector(".btn");
}

function createUserCabinet(user) {
  const bankBtn = `<button class  id="${user.bank}">${user.bank}</button>`;

  containerBank.insertAdjacentHTML("beforeend", bankBtn);
  containerBank.addEventListener("click", showUserInfo);
}

function showUserInfo(event) {
  const verified = userData.find((user) => user.bank === event.target.id);
  currentBank = verified;
  const instance = basicLightbox.create(`
<div class = "modal"><h1>${verified.bank}</h1><img  src = "${verified.logo}" width = "150" heigth = "150">
<p>Name: ${verified.name}</p>
<p>Mail: ${verified.mail}</p>
<p class = "balance"><span class = "balancespan">Balance:</span> <span class='my-balance'>${verified.balance}</span> UAH</p>
<div>
<button class = "money add">Add money</button>
<button class = "money with">Withdraw money</button>
</div>
<p class = "verifyPass">Password: ${verified.password}</p>
</div>
`);

  instance.show();

  const addMoney = document.querySelector(".add");
  addMoney.addEventListener("click", changeBalance);

  const withdrawMoney = document.querySelector(".with");
  withdrawMoney.addEventListener("click", changeBalance);
}

function changeBalance(event) {
  const button = event.target;
  const instance = basicLightbox.create(`<div>
  <h2>Enter value</h2>
  <input class = "addInput" type="text" name="value">
  <button class="money inner-button">Ok, bro</button>
  </div>`);

  instance.show();

  let sum = 0;

  const buttonOk = document.querySelector(".inner-button");
  buttonOk.addEventListener("click", handlerChangeSum);

  function handlerChangeSum(event) {
    const input = document.querySelector(".addInput");
    sum = input.value;
    instance.close();
    actionBalance();
  }

  function actionBalance() {
    const myBalance = document.querySelector(".my-balance");
    if (button.classList.contains("add")) {
      currentBank.balance = ` ${Number(currentBank.balance) + Number(sum)}`;
    } else {
      currentBank.balance = ` ${Number(currentBank.balance) - Number(sum)}`;
    }
    myBalance.innerHTML = currentBank.balance;
  }
}
