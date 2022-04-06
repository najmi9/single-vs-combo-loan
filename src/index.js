// Input Fields
const loanValueInp = get('#js-value');
const equityInp = get('#js-equity');
const ficoInp = get('#js-fico');

const totalFinancingSpan = get('#js-total-financing');
const totalFinancingPercentSpan = get('#js-financing-percent');

const singleInterestInp = get('#js-single-interest');
const singleTermInp = get('#js-single-term');

const comboInterestInp = get('#js-combo-interest');
const helocIORateInp = get('#js-heloc-io-rate');
const firstMtgLTVInp = get('#js-1mtg-ltv');

const helocLTVInp = get('#js-heloc-ltv');
const equityPercentInp = get('#js-equity-percent');

// SINGLE vs. COMBO COMPARISON Fields
const loanValueSpan = get('#js-loan-value');
const financeTotalEle = get('#js-finance-total');

// LOAN STRUCTURE	
// first TR
const single1MtgLTVTd = get('#js-single-1mtg-ltv');
const combo1MtgLTVTd = get('#js-combo-1mtg-ltv');
// Second TR
const comboHelocLTVTd = get('#js-combo-heloc-ltv');
// 3th TR
const singleEquityTd = get('#js-single-equity');
const comboEquityTd = get('#js-combo-equity');

// 4th TR
const single1MtgInterestTd = get('#js-single-1mtg-interest');
const combo1MtgInterestTd = get('#js-combo-1mtg-interest');

// 5th TR
const comboHelocIOTd = get('#js-combo-heloc-io');

// 6th TR
const singleTermTd = get('#js-single-terms');
const comboTermTd = get('#js-combo-terms');

// 7th TR
const singleBPMITd = get('#js-single-bpmi');
const comboBPMITd = get('#js-combo-bpmi');

// LOAN DETAILS
// 1th TR
const singleValueTd = get('#js-single-value');
const comboValueTd = get('#js-combo-value');

// 2th TR
const single1MTGTd = get('#js-single-1mtg');
const combo1MTGTd = get('#js-combo-1mtg');

// 3th TR
const comboHELOCLineTd = get('#js-combo-heloc-line');

// 4th TR
const singleEquity2Td = get('#js-single-equity2');
const comboEquity2Td = get('#js-combo-equity2');

// Monthly Payment
// 1th TR
const single1MtgPaymentTd = get('#js-single-1mtg-payment');
const combo1MtgPaymentTd = get('#js-combo-1mtg-payment');

// 2th TR
const comboHeloc2endTd= get('#js-combo-heloc-2nd');

// 3th TR
const mtgInsuranceTd = get('#js-single-mtg-insurance');

// 4th TR
const singleTotalTh = get('#js-single-total');
const comboTotalTh = get('#js-combo-total');

// COMBO LOAN MONTHLY PAYMENT SAVINGS 
const loanSavingTh = get('#js-loan-saving');

// Watch fields and update result when key is pressed
loanValueInp.addEventListener('keyup', updateResultHandler);
equityInp.addEventListener('keyup', (e) => {
    validateDownPayment(e.target.value);
    updateResultHandler();
});
ficoInp.addEventListener('keyup', updateResultHandler);
singleInterestInp.addEventListener('keyup', updateResultHandler);
singleTermInp.addEventListener('keyup', updateResultHandler);
comboInterestInp.addEventListener('keyup', updateResultHandler);
helocIORateInp.addEventListener('keyup', updateResultHandler);
firstMtgLTVInp.addEventListener('keyup', helocLTVValueHandler);

/**
 * Calculate and show the result
 */
function updateResultHandler() {
    loanValueSpan.innerHTML = loanValueInp.value + '$';
    
    const {total, percent, equityPercentValue} = Loan.totalFinancing(loanValueInp.value, equityInp.value);
    
    totalFinancingSpan.innerHTML = total;
    financeTotalEle.innerHTML = total + '$';
    
    totalFinancingPercentSpan.innerHTML = percentFormat(percent);

    helocLTVValueHandler();

    // Loan structure
    // First TR
    single1MtgLTVTd.innerHTML = percentFormat(percent);
    combo1MtgLTVTd.innerHTML = firstMtgLTVInp.value;

    // Second TR
    comboHelocLTVTd.innerHTML = helocLTVInp.value;
    equityPercentInp.value = percentFormat(equityPercentValue);

    // 3th TR
    singleEquityTd.innerHTML = percentFormat(equityPercentValue);
    comboEquityTd.innerHTML = percentFormat(equityPercentValue);

    // 4th TR
    single1MtgInterestTd.innerHTML = singleInterestInp.value;
    combo1MtgInterestTd.innerHTML = comboInterestInp.value;

    // 5th TR
    comboHelocIOTd.innerHTML = helocIORateInp.value;

    // 6th TR
    singleTermTd.innerHTML = singleTermInp.value;
    comboTermTd.innerHTML = singleTermInp.value;

    // 7th TR
    singleBPMITd.innerHTML = BPMI();
    comboBPMITd.innerHTML = 0;

    // Loan Details
    // 1 th TR
    singleValueTd.innerHTML = loanValueInp.value;
    comboValueTd.innerHTML = loanValueInp.value;

    // 2th TR
    single1MTGTd.innerHTML = total;
    const firstMtgAmountValue = Loan.firstMtgAmount(loanValueInp.value, firstMtgLTVInp.value);
    combo1MTGTd.innerHTML = firstMtgAmountValue;

    // 3th TR
    comboHELOCLineTd.innerHTML = Loan.helocLine(loanValueInp.value, helocLTVInp.value);

    // 4th TR
    singleEquity2Td.innerHTML = equityInp.value;
    comboEquity2Td.innerHTML = equityInp.value;

    // Monthly Payment
    // 1th TR
    const single1MtgPaymentValue = Loan.firstMtgPayment(singleInterestInp.value, singleTermInp.value, total);
    const combo1MtgPaymentValue = Loan.firstMtgPayment(comboInterestInp.value, singleTermInp.value, firstMtgAmountValue);

    single1MtgPaymentTd.innerHTML = single1MtgPaymentValue;
    combo1MtgPaymentTd.innerHTML = combo1MtgPaymentValue;

    // 2th TR
    const heloc2ndValue = Loan.heloc2nd(Loan.helocLine(loanValueInp.value, helocLTVInp.value), helocIORateInp.value);;
    comboHeloc2endTd.innerHTML = heloc2ndValue;

    // 3th TR
    const mtgIns = Loan.mortgageInsurance(total, BPMI());;
    mtgInsuranceTd.innerHTML = mtgIns;

    // 4th Tr
    const singleTotalValue = float(single1MtgPaymentValue) + float(mtgIns);
    const comboTotalValue = float(combo1MtgPaymentValue) + float(heloc2ndValue);
    singleTotalTh.innerHTML = format(singleTotalValue);
    comboTotalTh.innerHTML = format(comboTotalValue)

    // COMBO LOAN MONTHLY PAYMENT SAVINGS 
    loanSavingTh.innerHTML = format(float(singleTotalValue) - float(comboTotalValue));
}

function helocLTVValueHandler() {
    const {equityPercentValue} = Loan.totalFinancing(loanValueInp.value, equityInp.value);

    helocLTVInp.value = percentFormat(Loan.helocLTV(firstMtgLTVInp.value, equityPercentValue));
}

function BPMI() {
    return '0,31%';
}

/**
 * Minimum 10% down payment
 */
function validateDownPayment(value) {
    const salePrice = float(loanValueInp.value);
    get('.equity-error')?.remove();
    if (float(value) < 0.1 * salePrice) {
        equityInp.parentElement.insertAdjacentHTML('beforeend', '<div class="equity-error"><small class="text-danger">Minimum 10% down payment.</small></div>');
        return;
    }
}


