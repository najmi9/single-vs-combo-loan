/**
 * Fetch HTML DOM Element
 * @param {string} selector 
 * @returns {HTMLElement}
 */
function get(selector) {
    return document.querySelector(selector);
}

/**
 * Format numbers Ex: 145287.544874 --> 145 287.544
 * @param {string} number 
 * @returns {string}
 */
const format = number =>{
    let numberFormat = ''; 
    if (number < 0.001) {
        numberFormat = number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    } else {
        numberFormat = (new Intl.NumberFormat().format(number));
    }

    return numberFormat.replace(',', ' ');
}

/**
 * Format a percentage value
 * @param {string} percent 
 */
function percentFormat(percent) {
    return `${percent.replace('.', ',')} %`;
}

/**
 * Convert a string value to a number
 * @param {string} number 
 * @returns {number}
 */
function float(number) {
    number = new String(number);
    return parseFloat(number.replaceAll(',', '').replaceAll(' ', ''));
}

/**
 * 2,54% ---> 0.254
 * @param {string} percent 
 */
function fromPercentToValue(percent) {
    return float(percent.replace('%', '').replace(',', '.')) / 100;
}

/**
 * Copy of Excel's PMT function.
 * Credit: http://stackoverflow.com/questions/2094967/excel-pmt-function-in-js
 *
 * @param rate_per_period       The interest rate for the loan.
 * @param number_of_payments    The total number of payments for the loan in months.
 * @param present_value         The present value, or the total amount that a series of future payments is worth now;
 *                              Also known as the principal.
 * @param future_value          The future value, or a cash balance you want to attain after the last payment is made.
 *                              If fv is omitted, it is assumed to be 0 (zero), that is, the future value of a loan is 0.
 * @param type                  Optional, defaults to 0. The number 0 (zero) or 1 and indicates when payments are due.
 *                              0 = At the end of period
 *                              1 = At the beginning of the period
 * @returns {number}
 */
 function pmt(rate_per_period, number_of_payments, present_value, future_value, type) {
    future_value = typeof future_value !== 'undefined' ? future_value : 0;
    type = typeof type !== 'undefined' ? type : 0;

	if(rate_per_period != 0.0){
		// Interest rate exists
		var q = Math.pow(1 + rate_per_period, number_of_payments);
		return -(rate_per_period * (future_value + (q * present_value))) / ((-1 + q) * (1 + rate_per_period * (type)));

	} else if(number_of_payments != 0.0){
		// No interest rate, but number of payments exists
		return -(future_value + present_value) / number_of_payments;
	}

	return 0;
}