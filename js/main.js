const incomeSection = document.querySelector(".income-area");
const expensesSection = document.querySelector(".expenses-area");
const availableMoney = document.querySelector(".available-money");
const addTransactionPanel = document.querySelector(".add-transaction-panel");

const nameInput = document.querySelector("#name");
const amountInput = document.querySelector("#amount");
const categorySelect = document.querySelector("#category");

const addTransactionBtn = document.querySelector(".add-transaction");
const saveBtn = document.querySelector(".save");
const cancelBtn = document.querySelector(".cancel");
const deleteAllBtn = document.querySelector(".delete-all");

const lightStyleBtn = document.querySelector(".light");
const darkStyleBtn = document.querySelector(".dark");

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];

const openPanel = () => {
	addTransactionPanel.style.display = "flex";
};
const closePanel = () => {
	addTransactionPanel.style.display = "none";
	clearInputs();
};

const checkForm = () => {
	if (nameInput.value !== "" && amountInput.value !== "" && categorySelect.value !== "none") {
		createNewTransaction();
	} else {
		alert("Wypełnij wszystkie pola!");
	}
};

const clearInputs = () => {
	nameInput.value = "";
	amountInput.value = "";
	categorySelect.selectedIndex = 0;
};

const createNewTransaction = () => {
	const newTransaction = document.createElement("div");
	newTransaction.classList.add("transaction");
	newTransaction.setAttribute("id", ID);

	checkCategory(selectedCategory);

	newTransaction.innerHTML = `
	<p class="transaction-name">
	${categoryIcon} ${nameInput.value}
	</p>
	<p class="transaction-amount">
	${amountInput.value}zł
	<button class="delete" onclick='deleteTransaction(${ID})'>
	<ion-icon name="close-circle"></ion-icon>
	</button>
	</p>
`;

	if (amountInput.value > 0) {
		incomeSection.appendChild(newTransaction) && newTransaction.classList.add("income");
	} else {
		expensesSection.appendChild(newTransaction) && newTransaction.classList.add("expense");
	}

	moneyArr.push(parseFloat(amountInput.value));
	countMoney(moneyArr);
	closePanel();
	ID++;
	clearInputs();
};

const selectCategory = () => {
	selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
};

const checkCategory = (transaction) => {
	switch (transaction) {
		case "[ + ] Przychód":
			categoryIcon = '<ion-icon name="cash"></ion-icon>';
			break;
		case "[ - ] Zakupy":
			categoryIcon = '<ion-icon name="card"></ion-icon>';
			break;
		case "[ - ] Jedzenie":
			categoryIcon = '<ion-icon name="pizza"></ion-icon>';
			break;
		case "[ - ] Kino":
			categoryIcon = '<ion-icon name="videocam"></ion-icon>';
			break;
	}
};

const countMoney = (money) => {
	const newMoney = money.reduce((a, b) => a + b);
	availableMoney.textContent = `${newMoney}zł`;
};

const deleteTransaction = (ID) => {
	const transactionToDelete = document.getElementById(ID);
	const transactionAmount = parseFloat(transactionToDelete.childNodes[3].innerText);
	const indexOfTransaction = moneyArr.indexOf(transactionAmount);
	moneyArr.splice(indexOfTransaction, 1);

	if (transactionToDelete.classList.contains("income")) {
		incomeSection.removeChild(transactionToDelete);
	} else {
		expensesSection.removeChild(transactionToDelete);
	}

	countMoney(moneyArr);
};

const deleteAllTransactions = () => {
	incomeSection.innerHTML = `<h3>Przychód:</h3>`;
	expensesSection.innerHTML = `<h3>Wydatki:</h3>`;
	availableMoney.textContent = "0zł";
	moneyArr = [0];
};

const changeToLight = () => {
	root.style.setProperty("--first-color", "#f9f9f9");
	root.style.setProperty("--second-color", "#14161f");
	root.style.setProperty("--border-color", "rgba(0, 0, 0, 0.2)");
};
const changeToDark = () => {
	root.style.setProperty("--first-color", "#14161f");
	root.style.setProperty("--second-color", "#f9f9f9");
	root.style.setProperty("--border-color", "rgba(255, 255, 255, 0.4)");
};

addTransactionBtn.addEventListener("click", openPanel);
cancelBtn.addEventListener("click", closePanel);
saveBtn.addEventListener("click", checkForm);
deleteAllBtn.addEventListener("click", deleteAllTransactions);
lightStyleBtn.addEventListener("click", changeToLight);
darkStyleBtn.addEventListener("click", changeToDark);
