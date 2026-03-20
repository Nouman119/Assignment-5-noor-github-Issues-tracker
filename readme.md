## Question 1️⃣ What is the difference between var, let, and const?

In JavaScript, `var`, `let`, and `const` are used to declare variables, but they differ mainly in scope and re‑assignment rules.

### `var`
- Function‑scoped (or global), not block‑scoped.  
- Can be re‑declared and re‑assigned in the same scope.  
- Hoisted and initialized as `undefined`.

### `let`
- Block‑scoped (inside `{}` like `if`, `for`, `function`).  
- Can be re‑assigned but not re‑declared in the same block.  
- Hoisted but not initialized (you get an error if you use it before declaration). 

### `const`
- Also block‑scoped.  
- Must be assigned at declaration and cannot be re‑assigned.  
- However, object/array contents can still change; only the binding is “constant.”

## 2️⃣ What is the spread operator (...)?
The spread operator (...) is a syntax in JavaScript that expands / spreads elements of an iterable (like array, string, or object) into individual elements.
Main uses are...
- Copy an array / object
- Merge arrays / objects
- Spread array elements as function arguments

## 3️⃣ What is the difference between map(), filter(), and forEach()?
The difference between map(), filter(), and forEach() is that... 

map() creates a new array by applying a function to every element of the original. Use it when you need to change the format or value of your data without touching the original list. Its Best for:** Converting a list of prices to strings or extracting names from a list of objects.**

filter() creates a new array containing only the elements that pass a specific conditional test. It “filters out” anything that doesn’t meet your criteria. It’s good for **Finding all numbers greater than 10 or selecting “Active” users from a database.

forEach() simply iterates over the array, performing an action for each item. Unlike the others, it does not return anything (it returns undefined). It's best to log data to the console, save items to a database, or update the UI.

## 4️⃣ What is an arrow function?
An arrow function is a concise syntax for writing JavaScript functions, introduced in ES6. It provides a shorter syntax for function expressions, making code more readable and less verbose, especially for simple, single-expression functions. Key characteristics include:

* Concise Syntax: It omits the function keyword and uses => to separate the function parameters from the body.
* Implicit Return: For single-expression bodies, the return keyword can be omitted, and the expression's result is implicitly returned.
* Lexical this Binding: Unlike traditional functions, arrow functions do not have their own this context. Instead, they inherit this from the enclosing lexical scope. This solves common binding issues in callbacks and event handlers.

## 5️⃣ What are template literals?
Backticks (`) are used in place of traditional quotes to define template literals, a contemporary and adaptable method of working with strings in JavaScript. Their main strength is string interpolation, which enables you to use the ${expression} syntax to directly embed variables or expressions into text.

In contrast to conventional strings, template literals inherently enable multi-line formatting, maintaining line breaks without the requirement for escape characters like \n. They are therefore the best option for producing dynamic HTML templates or comprehensible, intricate communications. They create clear, declarative code from clumsy string concatenation.


