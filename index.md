# LangY

![Alt text](docs/LangY.jpg)

LangY is not just a programming language; it's an ecosystem for creative expression and powerful problem-solving. Inspired by the need for simplicity without sacrificing depth, LangY brings together the elegance of high-level abstractions with the robustness of static analysis. With LangY, coding becomes an art form, and every line of code tells a story.

Features
Static Typing: LangY offers a powerful type system that ensures code correctness and clarity from the outset.
Functional Paradigm: Embrace functional programming paradigms with first-class functions, closures, and immutability.
Expressive Syntax: Designed for readability and elegance, LangY's syntax encourages clean and concise code.
Concurrency Support: Seamlessly handle concurrent tasks with built-in constructs for parallelism and synchronization.
Metaprogramming: Explore the depths of code manipulation and introspection with powerful metaprogramming features.
Extensive Standard Library: From data structures to I/O operations, LangY comes bundled with a rich standard library for diverse needs.
Modularity and Reusability: Encapsulate logic into modules and promote code reuse with ease.
Error Handling: Robust error handling mechanisms ensure graceful recovery from unexpected situations.
Interoperability: Seamlessly integrate with existing codebases written in other languages for maximum flexibility.

# Github repo:
https://github.com/dhuang2130/LangY


```
// Hello, World in LangY
print("Hello, World");
```
```
// Fibonacci Sequence in LangY
function fibonacci(n): {
    if (n <= 1) {
        return n;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}

print(fibonacci(10));
```
```
// Factorial calculation in LangY
function factorial(n): {
    if (n <= 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

print(factorial(5)); // Output: 120

```
```
// Sum of numbers program in LangY
function sumOfNumbers(n): {
    var sum = 0;
    for (var i = 1; i <= n; i++) {
        sum = sum + i;
    }
    return sum;
}

print(sumOfNumbers(10)); // Output: 55
```
```
// Check if a number is even or odd in LangY
func isEven(n): {
    return n % 2 == 0;
}

print(isEven(7)); // Output: false
print(isEven(10)); // Output: true
```

Developer: David Huang
David is an aspiring computer scientist. His hobbies include playing piano and practicing Chinese. 
