const transactionsArr = [];
const form = document.querySelector('#finance-form');
const descriptionInput = document.querySelector('#description');
const amountInput = document.querySelector('#amount');
const typeInput = document.querySelector('#type');
const categoryInput = document.querySelector('#category');
const balanceDisplay = document.querySelector('#balance-amount');
const listDisplay = document.querySelector('#transaction-list');
function CalculateNum() {
    let num = 0;
    for (const t of transactionsArr) {
        if (t.type === "income") {
            num += t.T_amount;
        }
        else {
            num -= t.T_amount;
        }
    }
    return num;
}
function AddTransaction(T_description, T_amount, T_category, type) {
    const newTransaction = {
        T_id: crypto.randomUUID(),
        T_description,
        T_amount,
        type,
        T_category
    };
    transactionsArr.push(newTransaction);
    renderApp();
}
function TransactionFilter(filterType) {
    if (filterType === 'all') {
        return transactionsArr;
    }
    return transactionsArr.filter(t => t.type === filterType);
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const desc = descriptionInput.value.trim();
    const amt = parseFloat(amountInput.value);
    const type = typeInput.value;
    const cat = categoryInput.value.trim();
    if (desc === "" || isNaN(amt) || amt <= 0 || cat === "") {
        alert("Error: Saari details sahi se bharna zaroori hai!");
        return;
    }
    const currentBalance = CalculateNum();
    if (type === 'expense' && amt > currentBalance) {
        alert(`Error: Your Current Balance $${currentBalance.toFixed(2)} . You Can't Pay Expense of $${amt}!`);
        return;
    }
    AddTransaction(desc, amt, cat, type);
    form.reset();
});
function renderApp() {
    if (balanceDisplay) {
        balanceDisplay.textContent = `$${CalculateNum().toFixed(2)}`;
    }
    if (listDisplay) {
        listDisplay.innerHTML = '';
        for (const t of transactionsArr) {
            const li = document.createElement('li');
            li.textContent = `${t.T_description} (${t.T_category}) - ${t.type === 'income' ? '+' : '-'}$${t.T_amount}`;
            li.classList.add(t.type);
            listDisplay.appendChild(li);
        }
    }
}
export {};
