<script lang="ts">
  import { Highlight } from "/src/components";
</script>

# VSCode Shortcut Tips

These are shortcuts that you can use with VSCode. Most of these notes are taken from "Python Data Science Handbook" and converted to VSCode.

## Explore Objects, Modules, and Namespaces with `Ctrl` + `Space`

You can use the Tab key for autocompletion and exploration of the contents of objects, modules, and namespaces.

Every Python object has various attributes and methods associated with it. For example, to see a list of all available attributes of an object, you can type the name of the object followed by a period (`.`) character and press `Ctrl` + `Space`.

Example: 

<Highlight 
  language="python"
  code={`new_list = [1, 2, 3]
new_list.<press Ctrl + Space>`}
/>

You can also narrow down the list by typing the first character or several characters of the name, and VSCode will filter the matching attributes and methods.

<Highlight 
  language="python"
  code={`new_list = [1, 2, 3]
new_list.c  # VSCode will display a filtered list of matching attributes and methods in a dropdown.`}
/>

## Using `Ctrl` + `Space` with imports

`Ctrl` + `Space` is also useful when importing objects from packages. Here we’ll use it to find all possible imports in the `itertools` package that start with `co`:

<Highlight 
  language="python"
  code={`from itertools import <press Ctrl + Space>`}
/>

If that does not work, then type the first letter of an object that you want to import and then when you press `Ctrl` + `Space` it should show all the matching objects. You can then delete the first letter and you should see all the available objects that can be imported:

<Highlight 
  language="python"
  code={`from itertools import c<press Ctrl + Space>`}
/>

Similarly, you can use tab-completion to see which imports are available on your system (this will change depending on which third-party scripts and modules are visible to your Python session):

<Highlight 
  language="python"
  code={`import <press Ctrl + Space>`}
/>

Or filter by the first letter:

<Highlight 
  language="python"
  code={`import h<press Ctrl + Space>`}
/>

## Access documentation with ?

Example: Enter `len?` and run the cell.

## Access source code with ??

Enter the name of the code whose source code you want to access and run the cell.

Example: `my_function??`

## Issue command line commands with !

You may not need to use the `ls` command too often since VSCode has a built-in File Explorer, but this is how you would run the `ls` command, for example, in VSCode: Enter `!ls` and run the cell.
