

document.getElementById('mortgage-amount').addEventListener('input', function (e) {
    let value = e.target.value;

    // Remove any non-numeric characters except comma
    value = value.replace(/[^0-9]/g, '');

    // Format the number with commas
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    e.target.value = value;
});

// Clear all values
document.getElementById('clear-all-button').addEventListener('click', function (e) {
    document.getElementById('mortgage-amount').value = null
    document.getElementById('mortgage-term').value = null
    document.getElementById('interest-rate').value = null
    document.getElementById('no-results-right-side').classList.remove('hidden');
    document.getElementById('results-right-side').classList.add('hidden')
});


document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get and process the values from the form
    let mortgageAmount = parseFloat(document.getElementById('mortgage-amount').value.replace(/,/g, ''));
    let mortgageTerm = parseFloat(document.getElementById('mortgage-term').value) * 12; 
    let annualInterestRate = parseFloat(document.getElementById('interest-rate').value) / 100;
    let monthlyInterestRate = annualInterestRate / 12;

    console.log(mortgageAmount)
    console.log(mortgageTerm)
    console.log(annualInterestRate)
    console.log(monthlyInterestRate)

    if (!mortgageAmount || !mortgageTerm || !annualInterestRate || !monthlyInterestRate ||mortgageAmount.length === 0 || mortgageAmount.length === 0 || annualInterestRate.length === 0 || monthlyInterestRate === 0) {
        return
    }

    // Calculate monthly repayments using the formula
    let monthlyRepayment = (mortgageAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, mortgageTerm)) / (Math.pow(1 + monthlyInterestRate, mortgageTerm) - 1);

    // Log the result
    document.getElementById('monthly-repayment').textContent = '£' + monthlyRepayment.toFixed(2);

    // Calculate total repayment
    let totalRepayment = monthlyRepayment * mortgageTerm;

    document.getElementById('total-repayment').textContent = '£' + (totalRepayment.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    document.getElementById('results-right-side').classList.remove('hidden');
    document.getElementById('no-results-right-side').classList.add('hidden')
});