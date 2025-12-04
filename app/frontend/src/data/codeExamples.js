export const codeExamples = {
    javascript: `// JavaScript Example - Calculate Fibonacci
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,

    python: `# Python Example - Quick Sort
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

numbers = [3, 6, 8, 10, 1, 2, 1]
print(quick_sort(numbers))`,

    java: `// Java Example - Binary Search
public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) {
                return mid;
            }

            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return -1;
    }
}`,

    c: `// C Example - Bubble Sort
#include <stdio.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);

    bubbleSort(arr, n);

    printf("Sorted array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    return 0;
}`,

    cpp: `// C++ Example - Reverse String
#include <iostream>
#include <string>
using namespace std;

string reverseString(string str) {
    int n = str.length();
    for (int i = 0; i < n / 2; i++) {
        swap(str[i], str[n - i - 1]);
    }
    return str;
}

int main() {
    string text = "Hello World";
    cout << reverseString(text) << endl;
    return 0;
}`,

    csharp: `// C# Example - Check Prime Number
using System;

class Program {
    static bool IsPrime(int n) {
        if (n <= 1) return false;
        if (n <= 3) return true;

        if (n % 2 == 0 || n % 3 == 0) return false;

        for (int i = 5; i * i <= n; i += 6) {
            if (n % i == 0 || n % (i + 2) == 0)
                return false;
        }

        return true;
    }

    static void Main() {
        Console.WriteLine(IsPrime(17));
    }
}`,

    typescript: `// TypeScript Example - Generic Stack
class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
console.log(stack.pop());`,

    go: `// Go Example - Concurrent Hello World
package main

import (
    "fmt"
    "sync"
)

func printMessage(message string, wg *sync.WaitGroup) {
    defer wg.Done()
    fmt.Println(message)
}

func main() {
    var wg sync.WaitGroup
    messages := []string{"Hello", "from", "Go", "concurrency"}

    for _, msg := range messages {
        wg.Add(1)
        go printMessage(msg, &wg)
    }

    wg.Wait()
}`,

    rust: `// Rust Example - Vector Operations
fn main() {
    let mut numbers = vec![1, 2, 3, 4, 5];

    // Map
    let squared: Vec<i32> = numbers.iter()
        .map(|x| x * x)
        .collect();

    // Filter
    let evens: Vec<i32> = numbers.iter()
        .filter(|x| *x % 2 == 0)
        .cloned()
        .collect();

    println!("Squared: {:?}", squared);
    println!("Evens: {:?}", evens);
}`,

    html: `<!-- HTML Example - Contact Form -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form</title>
</head>
<body>
    <form id="contactForm">
        <label for="name">Name:</label>
        <input type="text" id="name" required>

        <label for="email">Email:</label>
        <input type="email" id="email" required>

        <label for="message">Message:</label>
        <textarea id="message" required></textarea>

        <button type="submit">Send</button>
    </form>
</body>
</html>`,

    css: `/* CSS Example - Flexbox Layout */
.container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    gap: 16px;
}

.card {
    flex: 1;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    padding: 24px;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-4px);
}`
};
