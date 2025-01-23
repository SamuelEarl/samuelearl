# Invoke APIs Concurrently with asyncio.gather()

_This article from Real Python "[Getting Started With Async Features in Python](https://realpython.com/python-async-features/)" is a great resource to learn how asynchronous programming works in Python, but also gives some good insight into how asynchronous programming works in general._

If you have a two or more asynchronous functions, whose results do NOT depend on each other, then you can call them concurrently. However, if you need to wait for the response of one function to resolve before you can call the next function, then this won't work and you will have to `await` the responses of each async function call sequentially. 

Another option is if you have a set of data that you need to run through the same API endpoint. You can call that API endpoint multiple times concurrently, as in the following example.

```py
import asyncio
import aiohttp


products = [
  {
    "id": "k3is9dj"
    "name": "t-shirt",
  },
  {
    "id": "en93mdo"
    "name": "shorts",
  },
  {
    "id": "pw2n9f3"
    "name": "sandals",
  },
]


async def get_current_inventory(product_id: str):
    try:
        url = f"/get-current-inventory/{product_id}"
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                return await response.json()
    except aiohttp.ClientError as e:
        print(f"Error fetching data from {url}: {e}")
    except asyncio.TimeoutError:
        print(f"Request to {url} timed out")
    except Exception as e:
        print(f"get_users ERROR: {e}")


async def invoke_concurrently(data: list[dict[str, str]], 
                              callback: Callable[dict[str, str], dict])
                              -> list[dict]:
    """
    This function takes a list of dictionaries and a callback function
    as inputs. This function will loop over each dictionary in the list,
    invoke the callback with the product_id, and push the callback
    response (which will be a pending future) to the `futures` 
    list. Each future in the `futures` list will resolve 
    asynchronously in the `asyncio.gather()` method.

    Parameters
    ----------
    data: list[dict[str, str]], required
    callback: Callable[dict[str, str], dict], required

    Returns
    -------
    A list of dictionaries from the resolved futures.
    """
    try:
        futures = [callback(datum["id"]) for datum in data]
        results = await asyncio.gather(*futures)
        return results
    except Exception as e:
        print(f"invoke_concurrently ERROR: {e}")


current_inventory = await invoke_concurrently(products, get_current_inventory);
 
```

Note that if you pass a list of awaitables to ayncio.gather(), then you have to unpack the list with the star operator (*). Also, note that when the callback function is passed to the `invoke_concurrently()` function and when it is called in the `futures` list, it is not `await`ed. This allows the callback to return a pending future without waiting for it to resolve before the next callback is invoked.

Pushing each pending future to the `futures` list and then letting them resolve in the `asyncio.gather()` method allows the callback invocations to occur concurrently and resolve asynchronously, which is faster than invoking each callback function and then awaiting each response sequentially. 

There are other ways to invoke asynchronous functions concurrently with `asyncio.gather()`. For example, instead of calling the same asynchronous function (e.g. an API endpoint) multiple times, you can call different asynchronous functions concurrently. For some examples, see [How to Use asyncio.gather() in Python](https://superfastpython.com/asyncio-gather/).

## Resources

* [Getting Started With Async Features in Python](https://realpython.com/python-async-features/)
* [How to Use asyncio.gather() in Python](https://superfastpython.com/asyncio-gather/)
