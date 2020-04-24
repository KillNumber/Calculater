const genaretId = () =>
  `gloId ${Math.random(Math.random() + 1e8).toString(16)}`;
const totalBalance = document.querySelector(".total__balance"),
  totalIncome = document.querySelector(".total__main-income"),
  totalExpenses = document.querySelector(".total__main-expenses"),
  form = document.querySelector("#form"),
  historyList = document.querySelector(".history__list"),
  operationName = document.querySelector(".operation__name"),
  operationAmount = document.querySelector(".operation__amount");

let dbDocument = JSON.parse(localStorage.getItem("calc")) || [];

const renderOperation = (operation) => {
  const className =
    operation.amount < 0 ? "history__item-minus" : "history__item-plus";
  const listItem = document.createElement("li");

  listItem.classList.add("history__item");
  listItem.classList.add(className);

  listItem.innerHTML = `${operation.discription}
                        <span class="history__money">${operation.amount}</span>
                        <button class="history_delete" data-id = '${operation.id}'>x</button>
                    `;

  historyList.append(listItem);
};

const updateBalanse = () => {
  const resultIncome = dbDocument
    .filter((item) => item.amount > 0)
    .reduce((sum, item) => sum + item.amount, 0);

  const resultExpenses = dbDocument
    .filter((item) => item.amount < 0)
    .reduce((sum, item) => sum + item.amount, 0);

  totalIncome.textContent = resultIncome + "₽";
  totalExpenses.textContent = resultExpenses + "₽";
  totalBalance.textContent = resultIncome + resultExpenses + "₽";
};

const addOperation = (event) => {
  event.preventDefault();

  const operationNameValue = operationName.value;

  const operationAmountValue = operationAmount.value;

  operationName.style.borderColor = "";
  operationAmount.style.borderColor = "";

  if (operationNameValue && operationAmountValue) {
    const operation = {
      id: genaretId(),
      discription: operationNameValue,
      amount: +operationAmountValue,
    };
    dbDocument.push(operation);
    init();
  } else {
    if (!operationNameValue) operationName.style.borderColor = "blue";
    if (!operationAmountValue) operationAmount.style.borderColor = "blue";
  }
  operationName.value = "";
  operationAmount.value = "";
};

const addDelete = (event) => {
  const target = event.target;

  if (target.classList.contains("history_delete")) {
    dbDocument = dbDocument.filter(
      (operation) => operation.id !== target.dataset.id
    );
    console.log(addDelete);
    init();
  }
};
const init = () => {
  historyList.textContent = "";
  dbDocument.forEach(renderOperation);
  updateBalanse();
  localStorage.setItem("calc", JSON.stringify(dbDocument));
};

form.addEventListener("submit", addOperation);

historyList.addEventListener("click", addDelete);

init();
