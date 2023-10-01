const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiple = (a, b) => a * b;
const divide = (a, b) => a / b;

module.exports = {add, subtract, multiple, divide};

module.exports.add = function(a, b) {
     console.log("add", a, b);
     console.log("subtract", a, b);
     console.log("divide", a, b);
     console.log("multiply", a, b);
}
