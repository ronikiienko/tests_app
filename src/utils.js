const array = [];
for (let i = 0; i < 1000; i++) {
    array.push(Number(Math.random().toFixed(3)) * 1000);
}
const largestNumbersFromArray = [null];
array.forEach((number, index) => {
    if (largestNumbersFromArray.length >= 10) {
        let smallestNumberInfo = {
            index: null,
            number: null,
        };
        for (let i = 0; i < largestNumbersFromArray.length; i++) {
            if (
                largestNumbersFromArray[i] < number &&
                number > smallestNumberInfo.number
            ) {
                smallestNumberInfo.index = i;
                smallestNumberInfo.number = number;
            }
        }
        if (smallestNumberInfo.number)
            largestNumbersFromArray[smallestNumberInfo.index] =
                smallestNumberInfo.number;
    } else {
        for (const number1 of largestNumbersFromArray) {
            console.log('he');
            if (number > number1) {
                largestNumbersFromArray.push(number);
                break;
            }
        }
    }
});