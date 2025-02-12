<script lang="ts">
  import { Highlight } from "/src/components";

  const example1 =
``;
</script>

# What are packages and the `__init__.py` file?

A Python package usually consists of several code files. Physically, a package is a folder containing files and maybe other folders that themselves may contain more folders and files. Conceptually, it's a namespace. This simply means that a package's modules are bound together by a package name, by which they may be referenced.

Since a Python module is simply reusable, importable code, we can consider every package to be a module — but not every module is a package. A package folder usually contains one file named `__init__.py` that basically tells Python that the directory is a package. The `__init__.py` file may be empty, or it may contain code to be executed upon package initialization. In other words, if an `__init__.py` file is present in a package directory, it will be invoked when the package or a module within the package is imported into another file. So any code that is inside an `__init__.py` file can be used to execute package initialization code, such as initialization of package-level data.

Note that if you run a file as a standalone script, then any `__init__.py` files that are in the same package will NOT be executed. The `__init__.py` files are only executed when the package or a module within the package is imported into another file.

_**Note:**_
_Much of the Python documentation states that an `__init__.py` file must be present in the package directory when creating a package. This was once true. It used to be that the very presence of `__init__.py` signified to Python that a package was being defined. The file could contain initialization code or even be empty, but it had to be present._

_Starting with Python 3.3, Implicit Namespace Packages were introduced. These allow for the creation of a package without any `__init__.py` file. Of course, it can still be present if package initialization is needed. But it is no longer required. Check out [What's a Python Namespace Package, and What's It For?](https://realpython.com/python-namespace-package/) to learn more._

## Sources:

- [Python Modules and Packages – An Introduction](https://realpython.com/python-modules-packages/)
- [What Is a Python Package?](https://www.udacity.com/blog/2021/01/what-is-a-python-package.html)
