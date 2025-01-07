# Asyncronous Programming

This article from Real Python "[Getting Started With Async Features in Python](https://realpython.com/python-async-features/)" is a great resource to learn how asyncronous programming works in Python, but also gives some good insight into how asyncronous programming works in general. In particular, I really like the following section, which refers to the code sample below it:

_The event loop is at the heart of the Python async system. It runs all the code, including `main()`. When task code is executing, the CPU is busy doing work. When the `await` keyword is reached, a context switch occurs, and control passes back to the event loop. The event loop looks at all the tasks waiting for an event (in this case, an `asyncio.sleep(delay)` timeout) and passes control to a task with an event that’s ready._

_`await asyncio.sleep(delay)` is non-blocking in regards to the CPU. Instead of waiting for the delay to timeout, the CPU registers a sleep event on the event loop task queue and performs a context switch by passing control to the event loop. The event loop continuously looks for completed events and passes control back to the task waiting for that event. In this way, the CPU can stay busy if work is available, while the event loop monitors the events that will happen in the future._

_Note: An asynchronous program runs in a single thread of execution. The context switch from one section of code to another that would affect data is completely in your control. This means you can atomize and complete all shared memory data access before making a context switch. This simplifies the shared memory problem inherent in threaded code._

<br>

```py
import asyncio
from codetiming import Timer

async def task(name, work_queue):
    timer = Timer(text=f"Task {name} elapsed time: {{:.1f}}")
    while not work_queue.empty():
        delay = await work_queue.get()
        print(f"Task {name} running")
        timer.start()
        await asyncio.sleep(delay)
        timer.stop()

async def main():
    """
    This is the main entry point for the program
    """
    # Create the queue of work
    work_queue = asyncio.Queue()

    # Put some work in the queue
    for work in [15, 10, 5, 2]:
        await work_queue.put(work)

    # Run the tasks
    with Timer(text="\nTotal elapsed time: {:.1f}"):
        await asyncio.gather(
            asyncio.create_task(task("One", work_queue)),
            asyncio.create_task(task("Two", work_queue)),
        )

if __name__ == "__main__":
    asyncio.run(main())
```

<br>

Those paragraphs about the event loop reminded me of an analogy that I read a while back about single-threaded, async code. (By the way, that is the type of code that you find in JavaScript. I wish I could remember where I read that analogy.) I remember the analogy going something like this:

You can think of the event loop like a waiter in a restaurant, the tasks are like the waiter taking an order from a table, and the events are sort of like the orders that the customers place with the waiter. Let's say that the waiter has a dozen tables with customers that he is waiting on. When the waiter makes his rounds to take orders, some customers are ready to place their orders immediately, but others need a little more time to decide. When the waiter goes to a table that is ready with a response, the waiter stays there until the order is finished being placed. When the waiter goes to a table that needs more time, the waiter says that he will come back when the response is ready, but let's say that he gives the table an order sheet where they can write down their order themselves and the waiter will simply come back later to pick it up instead of waiting for the table to place their order. At that point (when the table asks for more time) the decision for waiting tables returns back to the waiter, who determines where to go next (i.e. which table is next in the loop and ready with an order, or response). 

* The customers who are ready to place their orders immediately are like syncronous code (the waiter asks for an order and the customers are ready with a response immediately) and the customers that need more time to decide are like asyncronous code (the waiter asks for an order, but the customers are not ready with a response yet). 
* The waiter staying at the table until the order is finished being placed is like how syncronous, or blocking, code processes a function call or an HTTP request.
* A table of customers asking the waiter for more time is like how asyncronous, or non-blocking, code processes a function call or an HTTP request. When the event loop reaches an `await` keyword the `await` keyword essentially tells the event loop that it is not ready with a response yet, but come back later when the response is ready. Control is then passed back to the event loop, whick looks for the next completed event (e.g. the next response that has completed) and passes control back to the task that is waiting for that event (e.g. the piece of code that is waiting for the results of that completed response). When the response from the `await`ed task is ready, then the event loop can simply come back and "pick it up" and move on without stopping to wait for the response to finish processing.

<br>

Analogies can be helpful to understand other concepts, but they can't often be used to explain everything about another concept. Asyncronous programming can be complex and I hope this analogy explains some of these async programming concepts accurately.

<br>

NOTES:

* In Python, any function that returns a `Future` can/should be `await`ed. 
* In JavaScript, any function that returns a `Promise` can/should be `await`ed.
