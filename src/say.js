;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.say = factory()
}(this, function () { 
    'use strict';

    const
        min = 0,
        max = 999999999,
        ones = [
            'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
            'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
            'eighteen', 'nineteen'
        ],
        // empty strings added for more readable array iteration at Say.inWords()
        tens = [
            '', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty',
            'ninety'
        ],
        // empty strings added for more readable array iteration at Say.inWords()
        thousands = [
            '', '', 'thousand', 'million', 'billion'
        ];

    /**
     * UTLITY AND HELPER FUNCTIONS
     */

    function reverseString(str){
        return str.split('').reverse().join('');
    }

    /**
     * Returns an array containing 3 character strings created from left to right
     *
     * Example input: 18754965
     * Example output: ["187", "549", "65"] // notice the last element has 2 characters
     */
    function chunkStringFromLeftToRight(str, length) {
        return str.match(new RegExp('.{1,' + length + '}', 'g'));
    }

    /**
     * Returns an array containing 3 character strings created from right to left
     *
     * Example input: 56945781
     * Example output: ["56", "945", "781"] // notice the first element has 2 characters
     */
    function chunkStringFromRightToLeft(str) {
        var maxCharactersInItem = 3;
        var arrayInReverse = chunkStringFromLeftToRight(reverseString(str), maxCharactersInItem);
        return arrayInReverse.map(reverseString).reverse();
    }

    /**
     * Create a ThreeDigitNumber array for a given number
     *
     * Input: a number
     * Output: an array of ThreeDigitNumber objects
     */
    function getThreeDigitNumbers(number) {
        const numberStr = number.toString(10);
        const thousandsArray = chunkStringFromRightToLeft(numberStr);
        return thousandsArray.map(function(obj) {
            return new ThreeDigitNumber(obj)
        });   
    }

    /**
     * DOMAIN OBJECTS
     */

    function ThreeDigitNumber(numberStr) {
        this.numberStr = numberStr;
        this.number = parseInt(this.numberStr);
        
        this.constructWording();
    }

    ThreeDigitNumber.prototype = {

        constructWording: function() {
            var text = '';

            // if the number is a bunch of zeros, ignore
            if (this.numberStr.length > 1 && this.number === 0) {
                return
            } 

            // if hundreds digit is 0, 'and' will always be appended
            if (this.numberStr.length > 1 && this.getHundreds() === 0) {
                text += 'and ';
            }

            if (this.number < 20) {
                text += ones[this.number];
            } else {
                const digitArray = this.numberStr.split('').map(Number);

                for (var i = 0; i < digitArray.length; i++) {
                    const digit = digitArray[i];
                    const remainingDigitCount = digitArray.length - i;

                    const onesDigit         = remainingDigitCount === 1,
                            tensDigit       = remainingDigitCount === 2,
                            hundredsDigit   = remainingDigitCount === 3;

                    // digits without any value are always ignored
                    if (!digit) continue;

                    if (onesDigit) {
                        text += ones[digit];
                    } else if (tensDigit) {
                        text += tens[digit] + ' ';
                    } else if (hundredsDigit) {
                        text += ones[digit] + ' hundred';
                        
                        const appendAnd = this.getTens() || this.getOnes();
                        if (appendAnd) {
                            text += ' and ';
                        }
                    }
                }
            }

            this.text = text;
        },

        getHundreds: function() {
            return Number(this.numberStr[0]);
        },

        getTens: function() {
            return Number(this.numberStr[1]);
        },

        getOnes: function() {
            return Number(this.numberStr[2]);
        }
    }

    function Say(number) {
        if (isNaN(number) || number < min|| number > max) {
            throw new Error("Not a valid number: " + number);
        }

        this.number = number;
        this.threeDigitNumbers = getThreeDigitNumbers(this.number);
    }

    Say.prototype = {

        inWords: function() {
            var text = '';

            // divide the number into three digit numbers and concat them
            for (var i = 0; i < this.threeDigitNumbers.length; i++) {
                const threeDigitNumber = this.threeDigitNumbers[i];
                const remainingDigitCount = this.threeDigitNumbers.length - i;

                if (threeDigitNumber.text) {
                    text += threeDigitNumber.text + ' ' + thousands[remainingDigitCount] + ' ';
                }
            }

            return text.trim();
        },
    };

    return function(number) {
        return new Say(number).inWords();
    };

}));