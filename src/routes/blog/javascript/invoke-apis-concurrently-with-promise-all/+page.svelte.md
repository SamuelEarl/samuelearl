# Invoke APIs Concurrently with Promise.all()

If you have a two or more asynchronous functions, whose results do NOT depend on each other, then you can call them concurrently, as in the following example. However, if you need to wait for the response of one function to resolve before you can call the next function, then this won't work and you will have to `await` the responses of each async function call sequentially.

```js
async function fetchUsers() {
  const response = await fetch("/users");
  return await response.json();
}

async function fetchProducts() {
  const response = await fetch("/products");
  return await response.json();
}

async function fetchPrices() {
  const response = await fetch("/prices");
  return await response.json();
}

async function invokeConcurrently(callbacks) {
  const promises = callbacks.map((callback) => {
    const callbackResponse = callback();
    return callbackResponse;
  });

  const results = await Promise.all(promises)
    .catch((error) => {
      throw new Error(error.message);
    });

  return results;
}

await invokeConcurrently([fetchUsers, fetchProducts, fetchPrices]);
 
```

The `invokeConcurrently()` function takes an array of asynchronous callback functions as input. This function will map over the array of callback functions, invoke each callback, and push the callback response (which will be a pending promise) to the `promises` array. Each promise in the `promises` array will resolve asynchronously in the `Promise.all()` method. Note that when the callback functions are called they are not `await`ed. This allows the callback to return a pending promise without waiting for it to resolve before the next callback is invoked.

Pushing each pending promise to the `promises` array and then letting those promises resolve in the `Promise.all()` method allows the callback invocations to occur concurrently and resolve asynchronously, which is faster than invoking each callback function and then awaiting each response sequentially.

There are a few different ways you can write concurrently executing code like this. This is another way:

```js
const usersPromise = fetchUsers();
const productsPromise = fetchProducts();
const pricesPromise = fetchPrices();

const results = await Promise.all([usersPromise, productsPromise, pricesPromise])
  .catch((error) => {
    throw new Error(error.message);
  });

console.log(results);
```

Notice again that the calls to the async functions are not `await`ed, so the responses of those calls are pending promises.

## Resources

* [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
* [Effective Promise Concurrency in JavaScript](https://www.builder.io/blog/promises)
