import { useState } from 'react';

function useMutableStack(initialValue = []) {
    const [stack, setStack] = useState(initialValue);

    // Push an item onto the stack
    const push = (item) => {
        setStack((prevStack) => [...prevStack, item]);
    };

    // Pop the top item from the stack
    const pop = () => {
        setStack((prevStack) => {
            const newStack = [...prevStack];
            newStack.pop();
            return newStack;
        });
    };

    // Remove an item from the stack by its value
    const removeItem = (item) => {
        setStack((prevStack) => {
            return prevStack.filter((stackItem) => stackItem !== item);
        });
    };

    // Peek at the top item in the stack without removing it
    const peek = () => {
        return stack.length > 0 ? stack[stack.length - 1] : undefined;
    };

    // Get the top item from the stack
    const top = peek();

    // Check if the stack is empty
    const isEmpty = stack.length === 0;

    return {
        stack,
        push,
        pop,
        removeItem,
        top,
        isEmpty,
    };
}

export default useMutableStack;
