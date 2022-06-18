// Створити форму
// Інпути: Ім'я, імейл, пароль, назва банку, баланс + сабміт.

const bankData = [
  {
    name: "privatebank",
    img: "https://varta1.com.ua/uploads/media/7f/84/7f8432de07c17be5ee2e1cd3359fe4de_w1920.webp",
  },
  {
    name: "ukrsibbank",
    img: "https://internationalwealth.info/wp-content/uploads/2019/08/UKRSIBB.jpg",
  },
  {
    name: "monobank",
    img: "https://st1.prosto.im/cache/st1/7/9/7/9/79794/79794.png",
  },
];

const form = document.querySelector(".form");
form.addEventListener("submit", submit);

//4.2
const containerBank = document.querySelector(".wrapper");
//7
const userData = [];
//14
let currentBank;
form.addEventListener("submit", submit);

function submit(event) {
  event.preventDefault();

  //1
  const { name, mail, password, bank, balance } = event.target.elements;
  //2
  const bankLogo = bankData.find((elem) => elem.name === bank.value).img;

  //3
  const user = {
    name: name.value,
    mail: mail.value,
    password: password.value,
    bank: bank.value,
    logo: bankLogo,
    balance: balance.value,
  };
  //7.1
  userData.push(user);
  //4.1
  createUserCabinet(user);
  //reset form
  event.target.reset();
}

//4
function createUserCabinet(user) {
  //4.2
  const bankBtn = `<button class id = '${user.bank}'>${user.bank}</button>`;
  containerBank.insertAdjacentHTML("beforeend", bankBtn);
  //5
  containerBank.addEventListener("click", showUserInfo);
}

function showUserInfo(event) {
  //9
  const verified = userData.find((user) => user.bank === event.target.id);
  //14.1
  currentBank = verified;
  //6 (9)
  const instance = basicLightbox.create(
    `
<div class = "modal"><h1 class='title-bank'>${verified.bank}</h1><img  src = "${verified.logo}" width = "150" heigth = "150">
<p>Name: ${verified.name}</p>
<p>Mail: ${verified.mail}</p>
<p class = "balance"><span class = "balancespan">Balance:</span> <span class='my-balance'>${verified.balance}</span> UAH</p>
<div>
<button class = "money add">Add money</button>
<button class = "money with">Withdraw money</button>
</div>
<p class = "verifyPass">Password: ${verified.password}</p>
</div>
`
  );

  instance.show();
  //10
  const addMoney = document.querySelector(".add");
  addMoney.addEventListener("click", changeBalance);
  //10.2
  const withdrawMoney = document.querySelector(".with");
  withdrawMoney.addEventListener("click", changeBalance);
}

//10.1
function changeBalance(event) {
  //11
  const button = event.target;
  //12
  const instance = basicLightbox.create(`<div>
  <h2>Enter value</h2>
  <input class = "addInput" type="text" name="value">
  <button class="money inner-button">Ok, bro</button>
  </div>`);
  //12.2
  instance.show();
  //12.3
  let sum = 0;
  //12.1
  const buttonOk = document.querySelector(".inner-button");
  buttonOk.addEventListener("click", handlerChangeSubmitSum);

  function handlerChangeSubmitSum(event) {
    const input = document.querySelector(".addInput");
    //12.3
    sum = input.value;
    //12.2
    instance.close();
    //13.1
    actionBalance();
  }
  //13
  function actionBalance() {
    //16
    const myBalance = document.querySelector(".my-balance");
    //15
    if (button.classList.contains("add")) {
      currentBank.balance = ` ${Number(currentBank.balance) + Number(sum)}`;
    } else {
      currentBank.balance = ` ${Number(currentBank.balance) - Number(sum)}`;
    }
    //16
    myBalance.innerHTML = currentBank.balance;
  }
}

//===============ОПИСАНИЕ ДЕЙСТВИЙ=====================
//1---Десктруктиризируем наши данные из объекта элементс формы.

//2---Находим в исходном массиве объект с названием банка и сравниваем с значением bank value данных которые приходят после заполнения формы (.img-достукиваемся до ключа с картинкой) и получаем нужнный лого банка.

//3---Создаем объект в которором будут собираться готовые значения value из импута и сохраняться.Cоздаем свой кастомный ключ logo, который будет ссылаться на переменную bankLogo

//4---Создаем функцию, которая будет создавать кнопку выбранного банка и принимать данные с объекта user.
//4.1--Вызываем функцию и в параметры добавляем наш объект user.
//4.2-- В файле html создаем див для нашей кнопки и вставляем в него нашу заготовленную разметку.

//5--- Добавляем слушателя событий на созданную кнопку с функцией showUserInfo.

//6---Подключаем библиотеку и создаем разметку модального окна , которое будет всплывать после нажатия на кнопку.

//7--- Создаем переменную с пустым массивом для того чтобы в нее (в глобальную область видимости) вывести значения наши из объекта user.
//7.1--Пишем , что мы хотим пушить данные из объекта user в нашу новую созданную переменную.

//8--- Дописать в нашей созданной кнопке ссылку на название фйдишника нашего банка.

//9--- Находим и выводим id банка из масиива. Пишем шаблонную строку для вывода на экран наших данных.так же в разметке создаем две кнопи для добавление денег и вычитания.

//10---добавялем кнопку, которая при нажатии будет отображать еще один поп-ап для ввода суммы пополнения.
//10.1--в глобальной области видимости создаем функцию которая будет открывать наш поп-ап инпут.
//10.2--добавялем кнопку, которая при нажатии будет отображать еще один поп-ап для вычитания суммы пополнения.

//11. создаем переменную и присваеваем ей значение расчета что должна делать кнопка: отнимать или прибавлять.

//12---Подключаем библиотеку для следующего поп-апа про сумму пополнения или вычитания.
//21.1--Навешимаем слушатель на кнопку ОК  ифункцию коллбєк
//12.2-- Пишем метод который будет открывать наш поп-ап.
//12.3--создаем переменную, которая будет віводить сумму

//13---Переносим наше сравнение которое сравнивает что за операция отнимание или вычитание в функцию.
//13.1--вызываем функцию

//14---создаем переменную, которая будет добавлять наш текущий банк
//14.1--присваиваем нашей переменной verified значение currebtBank чтобы поднять verified в глобальную область видимости.

//15---Пишем в ифе сравнение и формулу расчета. Достаем наш импут через объект currentBank.ballance. Значения приводим к числу.

//16---прописываем в шаблонной строке еще один спам для вывода балланса. И добавляем событие на него.

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
