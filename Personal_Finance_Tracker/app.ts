type TransactionType = "income" | "expense";

interface Transaction {
    T_id: string;
    T_description: string;
    T_amount: number;
    type: TransactionType;
    T_category: string;
}

const transactionsArr: Transaction[] = [];

const form = document.querySelector('#finance-form') as HTMLFormElement;
const descriptionInput = document.querySelector('#description') as HTMLInputElement;
const amountInput = document.querySelector('#amount') as HTMLInputElement;
const typeInput = document.querySelector('#type') as HTMLSelectElement;
const categoryInput = document.querySelector('#category') as HTMLInputElement;
const balanceDisplay = document.querySelector('#balance-amount') as HTMLElement | null;
const listDisplay = document.querySelector('#transaction-list') as HTMLElement | null;

function CalculateNum(): number {
    let num = 0;
    for (const t of transactionsArr) {
        if (t.type === "income") {
            num += t.T_amount;
        } else {
            num -= t.T_amount;
        }
    }
    return num;
}

function AddTransaction(
    T_description: string,
    T_amount: number,
    T_category: string,
    type: TransactionType
): void {
    const newTransaction: Transaction = {
        T_id: crypto.randomUUID(),
        T_description,
        T_amount,
        type,
        T_category
    };
    transactionsArr.push(newTransaction);
    renderApp();
}

function TransactionFilter(filterType: TransactionType | 'all'): Transaction[] {
    if (filterType === 'all') {
        return transactionsArr;
    }
    return transactionsArr.filter(t => t.type === filterType);
}

form.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();

    const desc = descriptionInput.value.trim();
    const amt = parseFloat(amountInput.value);
    const type = typeInput.value as TransactionType;
    const cat = categoryInput.value.trim();

    if (desc === "" || isNaN(amt) || amt <= 0 || cat === "") {
        alert("Error: Saari details sahi se bharna zaroori hai!");
        return;
    }

    const currentBalance = CalculateNum();
    if (type === 'expense' && amt > currentBalance) {
        alert(`Error: Aapka current balance $${currentBalance.toFixed(2)} hai. Aap $${amt} ka expense nahi daal sakte!`);
        return;
    }

    AddTransaction(desc, amt, cat, type);
    form.reset();
});

function renderApp(): void {
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