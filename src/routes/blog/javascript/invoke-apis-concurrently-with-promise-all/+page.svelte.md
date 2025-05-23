<script lang="ts">
  import { Highlight } from "/src/components";

  const example1 =
`async function fetchUsers() {
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

await invokeConcurrently([fetchUsers, fetchProducts, fetchPrices]);`;

  const example2 =
`const usersPromise = fetchUsers();
const productsPromise = fetchProducts();
const pricesPromise = fetchPrices();

const results = await Promise.all([usersPromise, productsPromise, pricesPromise])
  .catch((error) => {
    throw new Error(error.message);
  });

console.log(results);`;

  const example3 =
`async function invokeConcurrently(iterable, callback) {
  const promises = iterable.map(element => {
    const callbackResponse = callback(element);
    return callbackResponse;
  });

  const results = await Promise.all(promises)
    .catch(error => {
      throw new Error(error.message);
    });

  return results;
}

await invokeConcurrently(arrayWithUserData, mlPipelineFunction);`;

  const example4 =
`async function invokeConcurrently(iterable, callback) {
  const promises = [];
  for await (const element of iterable) {
    const callbackResponse = callback(element);
    promises.push(callbackResponse);
  }

  const results = await Promise.all(promises)
    .catch(error => {
      throw new Error(error.message);
    });

  return results;
}

await invokeConcurrently(cursorWithProductData, mlPipelineFunction);`;
</script>

# Invoke APIs Concurrently with Promise.all()

If you have a two or more asynchronous functions, whose results do NOT depend on each other, then you can call them concurrently, as in the following example. However, if you need to wait for the response of one function to resolve before you can call the next function, then this won't work and you will have to `await` the responses of each async function call sequentially.

<Highlight 
  language="typescript"
  code={example1}
/>

The `invokeConcurrently()` function takes an array of asynchronous callback functions as input. This function will map over the array of callback functions, invoke each callback, and push the callback response (which will be a pending promise) to the `promises` array. Each promise in the `promises` array will resolve asynchronously in the `Promise.all()` method. Note that when the callback functions are called they are not `await`ed. This allows the callback to return a pending promise without waiting for it to resolve before the next callback is invoked.

Pushing each pending promise to the `promises` array and then letting those promises resolve in the `Promise.all()` method allows the callback invocations to occur concurrently and resolve asynchronously, which is faster than invoking each callback function and then awaiting each response sequentially.

There are a few different ways you can write concurrently executing code like this. This is another way:

<Highlight 
  language="typescript"
  code={example2}
/>

Notice again that the calls to the async functions are not `await`ed, so the responses of those calls are pending promises.

Here are a couple of other examples. 

These `invokeConcurrently()` functions take an iterable (e.g. an array) and a callback function as inputs. These functions will loop over each element in the iterable, invoke the callback, and push the callback response (which will be a pending promise) to the `promises` array. Each promise in the `promises` array will resolve asynchronously in the `Promise.all()` method.

<Highlight 
  language="typescript"
  code={example3}
/>

The difference with this last example is that it can also handle iterables like database cursors, where each element in the iterable (i.e. each result in the cursor) needs to be awaited before it can be processed. (This example was used to process a MongoDB cursor.)

<Highlight 
  language="typescript"
  code={example4}
/>

## Resources

* [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
* [Effective Promise Concurrency in JavaScript](https://www.builder.io/blog/promises)
