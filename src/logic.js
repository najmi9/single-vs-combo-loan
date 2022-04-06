const Loan = {};

/**
 * @param {string} value 
 * @param {string} equity 
 * @returns {{total: string, percent: string, equityPercentValue: string}}
 */
Loan.totalFinancing = function (value, equity) {
    return {
        total: format(float(value) - float(equity)), // SalePrice - Down Payment
        percent: format((1 - (float(equity) / float(value))) * 100), // if the down payment is 10% then the percent will be 90%
        equityPercentValue: format(100 * float(equity) / float(value)) // percentage of the down payment
    }
};

/**
 * Calculate HELOC (LTV %)
 * @param {string} firstMtgLTVValue
 * @param {number} epv Equity Percent Value
 * @returns {string}
 */
Loan.helocLTV = function (firstMtgLTVValue, epv) {
    return format((1 - (fromPercentToValue(firstMtgLTVValue) + float(epv)/100)) * 100);
}

/**
 * Return the sale price x the 1st Mtg (LTV %)
 * @param {string} value the sale price
 * @param {string} firstMtgLTVValue EX: 70%
 * @returns {string}
 */
Loan.firstMtgAmount = function (value, firstMtgLTVValue) {
    return format(float(value) * fromPercentToValue(firstMtgLTVValue))
}

/**
 * @param {string} value 
 * @param {string} helocLTV
 *  @returns {string}
 */
Loan.helocLine = function (value, helocLTV) {
    return format(Math.floor(float(value) * fromPercentToValue(helocLTV)));
}

/**
 * @param {string} rate Ex: 4%
 * @param {string} number_of_payments number of years
 * @param {string} present_value equal - Loan.firstMtgAmount
 * @returns 
 */
Loan.firstMtgPayment = function (rate, number_of_payments, present_value) {
    rate = fromPercentToValue(rate) / 12;

    number_of_payments = float(number_of_payments) * 12;

    present_value = float(present_value) * -1;

    const pmtValue = pmt(rate, number_of_payments, present_value);

    return format(Math.floor(pmtValue));
}

/**
 * calculate HELOC 2nd.
 * @param {number} helocLine HELOC Line	
 * @param {string} interest HELOC I/O Rate
 * @returns {string}
 */
Loan.heloc2nd = function(helocLine, interest) {
    return format(Math.floor((((float(helocLine) * fromPercentToValue(interest)) / 360) * 30)))
}

/**
 * Return total * bpmi / 12.
 * @param {number} total 
 * @param {string} bpmi 
 */
Loan.mortgageInsurance = function (total, bpmi) {
    return format(Math.floor((float(total) * fromPercentToValue(bpmi) / 12)));
}