
document.getElementById("wallet-btn").addEventListener("click", () => {
   
    document.getElementById("wallet-section").classList.remove("hidden");
    document.getElementById("profile-section").classList.add("hidden");
});

document.getElementById("profile-btn").addEventListener("click", () => {
    
    document.getElementById("profile-section").classList.remove("hidden");
    document.getElementById("wallet-section").classList.add("hidden");
});


document.getElementById("pay-ride-btn").addEventListener("click", () => {
    document.getElementById("transaction-modal").classList.remove("hidden");
});


document.getElementById("cancel-payment-btn").addEventListener("click", () => {
    document.getElementById("transaction-modal").classList.add("hidden");
});

document.getElementById("confirm-payment-btn").addEventListener("click", () => {
    const amount = parseFloat(document.getElementById("transaction-amount").value);
    const walletBalanceElement = document.getElementById("wallet-balance");
    let currentBalance = parseFloat(walletBalanceElement.textContent.replace("₱", "").replace(",", ""));

    if (isNaN(amount) || amount <= 0) {
        alert("Invalid amount! Please enter a positive value.");
        return;
    }
 

    if (amount > currentBalance) {
        alert("Insufficient balance! Please add more funds.");
        return;
    }


    currentBalance -= amount;
    walletBalanceElement.textContent = `₱${currentBalance.toFixed(2)}`;


    document.getElementById("transaction-modal").classList.add("hidden");


    displayReceipt(amount);
});


function displayReceipt(amount) {
    const receiptModal = document.createElement("div");
    receiptModal.classList.add("modal", "hidden");
    receiptModal.id = "receipt-modal";

    receiptModal.innerHTML = `
        <div class="modal-content">
            <h2>Receipt</h2>
            <p>Thank you for your payment!</p>
            <p>Amount Paid: ₱${amount.toFixed(2)}</p>
            <p>Date: ${new Date().toLocaleString()}</p>
            <div class="modal-actions">
                <button class="primary-btn" id="print-receipt-btn">Print Receipt</button>
                <button class="secondary-btn" id="close-receipt-btn">Close</button>
            </div>
        </div>
    `;


    document.body.appendChild(receiptModal);


    receiptModal.classList.remove("hidden");


    document.getElementById("close-receipt-btn").addEventListener("click", () => {
        document.body.removeChild(receiptModal);
    });


    document.getElementById("print-receipt-btn").addEventListener("click", () => {
        window.print(); 
    });
}


document.getElementById("add-funds-btn").addEventListener("click", function() {

    document.getElementById("add-funds-modal").classList.remove("hidden");
});


document.getElementById("cancel-add-funds-btn").addEventListener("click", function() {

    document.getElementById("add-funds-modal").classList.add("hidden");
});


const paymentMethods = document.querySelectorAll(".payment-methods li");
paymentMethods.forEach(function(paymentMethod) {
    paymentMethod.addEventListener("click", function() {

        alert("You have selected " + paymentMethod.textContent.trim() + " to add funds.");
        

        document.getElementById("add-funds-modal").classList.add("hidden");


        const addAmount = parseFloat(document.getElementById("add-amount").value);
        

        if (isNaN(addAmount) || addAmount <= 0) {
            alert("Invalid amount! Please enter a positive value.");
            return;
        }
        

        const balanceElement = document.getElementById("wallet-balance");
        let currentBalance = parseFloat(balanceElement.textContent.replace("₱", "").replace(",", ""));
        balanceElement.textContent = "₱" + (currentBalance + addAmount).toFixed(2); 
    });
});