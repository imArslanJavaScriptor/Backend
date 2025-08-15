function addition(num1, num2) {
    return num1 + num2
};


function subtration(num1, num2) {
    return num1 - num2
};

// Both of these ways are working.
// module.exports = [addition, subtration]
module.exports = {addition, subtration}