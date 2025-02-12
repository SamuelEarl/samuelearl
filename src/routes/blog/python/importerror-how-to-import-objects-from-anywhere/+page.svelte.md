<script lang="ts">
  import { Highlight } from "/src/components";

  const project_dir = 
`project_root/
├── main.py
├── shared/
│   └── constants.py
├── compute/
│   └── calculations.py
└── alter/
    └── modifications.py`;

  const example1 =
`import os
import sys

# Convert the relative path to the shared directory to an absolute path.
# (i.e. Get the parent directory for constants.py).
SHARED_DIR_PATH = os.path.abspath("../shared")
# Add the parent directory to sys.path.
sys.path.append(SHARED_DIR_PATH)

# Verify that the shared directory is in sys.path.
print("sys.path:", sys.path)

# Now you can import any values from constants.py into your module.
from constants import cdn_url, cdn_folder

# The rest of your code goes here...`;

  const example2 =
`import os
import sys

# Define the relative path to the file.
CONSTANTS_FILE_PATH = "../shared/constants.py"
# Get the absolute path to the parent directory.
CONSTANTS_PARENT_DIR = os.path.dirname(os.path.abspath(CONSTANTS_FILE_PATH))
# Add the parent directory to sys.path.
sys.path.append(CONSTANTS_PARENT_DIR)

# Verify that the shared directory is in sys.path.
print("sys.path:", sys.path)

# Now you can import any values from constants.py into your module.
from constants import cdn_url, cdn_folder

# The rest of your code goes here...`;
</script>

# ImportError: How to import objects from any file located anywhere in a Python project

If you get import errors like `ImportError: attempted relative import with no known parent package` or `ImportError: Attempted relative import in non-package`, then you are running into Python's relative import restrictions. Ugh! Python's import system can be confusing, even for people who have experience with Python.

If you are working on a web project that uses a framework like FastAPI (or something similar), then you probably won't run into import errors because the project files are usually organized to handle imports properly. However, if you are working on an analytics or data science project and your files and folders are not organized to handle Python imports properly, then you will need to find a solution to resolve relative imports.

When you import a module, Python will search for that module in the following locations:

1. `sys.modules`: This is a cache of all modules that have been previously imported.
2. Built-in modules: If the name isn't found in `sys.modules`, then Python will proceed to search through a list of built-in modules. These are modules that come pre-installed with Python and can be found in the Python Standard Library.
3. `sys.path`: If the name still isn't found in the built-in modules, Python then searches for it in a list of directories defined by `sys.path`. This list usually includes the current directory, which is the directory from which the script was run.

So how do you get imports to work from anywhere? Let's use this project directory as an example:

<Highlight 
  language="bash"
  code={project_dir}
  lineNumbers={false}
/>

Let's say that you have some constant values in the `constants.py` file that you want to import into the `calculations.py` and `modifications.py` files. You can modify `sys.path` at runtime so that it contains the parent directory for `constants.py`. For example, you can add the following code at the top of the `calculations.py` and `modifications.py` files:

<Highlight 
  language="python"
  code={example1}
/>

This is another, slightly altered, option that references the relative path to the file instead of the relative path to the file's parent directory:

<Highlight 
  language="python"
  code={example2}
/>

So you can work around Python's relative import restrictions by adding the corresponding parent directory to `sys.path`. No more relative import errors! Yay!

## P.S.

- The following package might be worth checking out or the code might provide ideas if you want to create your own package: [force-relative-import](https://pypi.org/project/force-relative-import/)
- You can also look at some other ideas that are shared in this StackOverflow post: [Relative imports in Python 3](https://stackoverflow.com/questions/16981921/relative-imports-in-python-3)

## Sources:

- [Python Modules and Packages – An Introduction](https://realpython.com/python-modules-packages/)
- [Absolute vs Relative Imports in Python](https://realpython.com/absolute-vs-relative-python-imports/)
