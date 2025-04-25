<script lang="ts">
  import { Highlight } from "/src/components";
</script>

# How To Install TensorFlow in a Virtual Environment with Anaconda

NOTE: Refer to the [How To Setup Data Science Projects](/blog/data-science-ml-ai/how-to-setup-data-science-projects) instructions for information on installing Anaconda, creating a virtual environment, and working with Python inside of VSCode (with or without Python Notebooks).

You can add TensorFlow to an `environment.yml` file and create a virtual environment that includes TensorFlow by following the instructions on [How To Setup Data Science Projects](/blog/data-science-ml-ai/how-to-setup-data-science-projects).

<Highlight 
  language="yaml"
  code={`name: name-of-virtual-environment
channels:
  - conda
  - conda-forge
dependencies:
  - python==3.12
  - pip==24.2
  - tensorflow==2.19.0
  # Other packages go here...`}
/>

Or you can create a new virtual environment using conda and install the packages you want in that environment:

<Highlight 
  language="bash"
  code={`conda create --name tf tensorflow
conda activate tf`}
/>

NOTE: It will take several minutes to install TensorFlow along with all of the necessary packages.

Sources: 
* [TensorFlow (Anaconda docs)](https://docs.anaconda.com/free/working-with-conda/applications/tensorflow/)
* [Managing environments](https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#activating-an-environment)
