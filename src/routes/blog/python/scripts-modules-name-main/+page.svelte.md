<script lang="ts">
  import { Highlight } from "/src/components";

  const example1 =
`message = "We are in the middle of a bear market. Woo wee!"

prices = {
    "Monday": 100,
    "Tuesday": 200,
    "Wednesday": 300,
    "Thursday": 400,
    "Friday": 500,
}

def get_stock_price(day):
    print(f"The stock price for {day} is {prices[day]}.")`;

  const example2 =
`message = "We are in the middle of a bear market. Woo wee!"

prices = {
    "Monday": 100,
    "Tuesday": 200,
    "Wednesday": 300,
    "Thursday": 400,
    "Friday": 500,
}

def get_stock_price(day):
    print(f"The stock price for {day} is {prices[day]}.")

print(message)
get_stock_price("Monday")`;

  const example3 =
`message = "We are in the middle of a bear market. Woo wee!"

prices = {
    "Monday": 100,
    "Tuesday": 200,
    "Wednesday": 300,
    "Thursday": 400,
    "Friday": 500,
}

def get_stock_price(day):
    print(f"The stock price for {day} is {prices[day]}.")

print(f'__name__ == "{__name__}"')

if (__name__ == "__main__"):
    print(message)
    get_stock_price("Monday")`;

  const example4 =
`message = "We are in the middle of a bear market. Woo wee!"

prices = {
    "Monday": 100,
    "Tuesday": 200,
    "Wednesday": 300,
    "Thursday": 400,
    "Friday": 500,
}

def get_stock_price(day):
    print(f"The stock price for {day} is {prices[day]}.")

if (__name__ == "__main__"):
    import sys
    args = sys.argv
    # args[0] = current file
    # args[1] = function name
    # args[2:] = function args : (*unpacked)
    globals()[args[1]](*args[2:])`;
</script>

# Scripts, Modules, and<br>`__name__ == "__main__"`

In Python, a script is simply a file with Python code inside and a `.py` file extension. You can execute scripts as standalone files from the command line with the `python3` command.

In Python, a module is a code file, like a script, that you import into another code file. You can import files into other files in your project or you can import files into a Python interactive shell session. The term "module" is used to describe reusable code.

Let's take the following code as an example:

_**stocks.py**_

<Highlight 
  language="python"
  code={example1}
/>

We can run this as a script:

<Highlight 
  language="bash"
  code="python3 stocks.py"
  lineNumbers={false}
/>

But nothing happens. It doesn't throw any errors, so it seems to have worked. But it also doesn't produce any output. It only defines objects. Let's modify the code so it produces some output so we can see if our code actually works:

<Highlight 
  language="python"
  code={example2}
/>

When we run this as a script again we should see some output:

<Highlight 
  language="bash"
  code="We are in the middle of a bear market. Woo wee!
The stock price for Monday is $100."
  lineNumbers={false}
/>

The problem is that if we want to use this code as an imported module, then we will also see the output:

_**Start an interactive Python shell:**_

<Highlight 
  language="bash"
  code="python3"
  lineNumbers={false}
/>

_**And import the module:**_

<Highlight 
  language="bash"
  code=">>> import stocks
We are in the middle of a bear market. Woo wee!
The stock price for Monday is $100."
  lineNumbers={false}
/>

That is not typically the desired behavior. When you import a module, you probably don't want to see output from the imported module.

Often when we are developing code, we want to run a file as a script that produces output so we can test the code as we are developing it. But once the code has been developed and tested, it would be nice to keep our test code around and turn off the output so the file can be imported and used in our project. We just don't want the output from our tests showing up once the module has been imported. Well, Python let's you do exactly that with the special dunder (double underscore) variable `__name__`.

Every Python file has a `__name__` variable. When a Python file is run as a script, then the `__name__` variable will be set to `"__main__"` because the standalone script is the "main" program that is running. On the other hand, if the file is imported as a module, then `__name__` will be assigned the name of the file itself (which is typically the file name without the `.py` extension). For example, if our `script.py` file were imported as a module, then the `__name__` variable for `script.py` would be `"script"`.

This mechanism enables Python code to discern whether it's being run as the main program (i.e. executed directly as a script) or imported as a module. What this means in practice is that you can conditionally run blocks of code based on the value of the `__name__` variable. For example, update the code in `stocks.py` to match this:

<Highlight 
  language="python"
  code={example3}
/>

Now run the file as a script:

<Highlight 
  language="bash"
  code="python3 stocks.py"
  lineNumbers={false}
/>

<Highlight 
  language="bash"
  code='__name__ == "__main__"
We are in the middle of a bear market. Woo wee!
The stock price for Monday is $100.'
  lineNumbers={false}
/>

And run it as an imported module:

<Highlight 
  language="bash"
  code="python3"
  lineNumbers={false}
/>

<Highlight 
  language="bash"
  code='>>> import stocks
__name__ == "stocks"'
  lineNumbers={false}
/>

Notice how the output under the `if` statement only runs when `__name__ == "__main__"`. How cool is that!

You can even pass arguments to the function test various scenarios. Update the code as in the following example. Notice that the `print()` function above the `if` statement has been removed and the code block under the `if` statement now captures arguments that are passed through the command line.

<Highlight 
  language="python"
  code={example4}
/>

Run the file as a script, referencing the function name and passing an argument to the function:

<Highlight 
  language="bash"
  code='python3 stocks.py get_stock_price "Friday"'
  lineNumbers={false}
/>

<Highlight 
  language="bash"
  code='The stock price for Friday is $500.'
  lineNumbers={false}
/>

Run it as an imported module, calling the function and passing the function an argument:

<Highlight 
  language="bash"
  code='python3'
  lineNumbers={false}
/>

<Highlight 
  language="bash"
  code='>>> from stocks import get_stock_price
>>> get_stock_price("Friday")
The stock price for Friday is $500.'
  lineNumbers={false}
/>

Now you can use the `__name__` variable to your advantage while developing Python code.

## Sources:

- [Python Modules and Packages – An Introduction](https://realpython.com/python-modules-packages/)
- [What Is a Python Package?](https://www.udacity.com/blog/2021/01/what-is-a-python-package.html)
