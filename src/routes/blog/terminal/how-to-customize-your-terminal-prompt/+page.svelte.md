<script lang="ts">
  import { Highlight } from "/src/components";

  const cloneTheme = "git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k";
</script>

# How To Customize Your Terminal Prompt

The Bourne-Again shell (bash) is the default shell in Ubuntu. Z shell (Zsh) is an extended bash shell with many improvements.

## Install Z shell

<Highlight 
  language="bash"
  code="sudo apt install zsh"
/>

## Change default shell

Check your shell:

<Highlight 
  language="bash"
  code="echo $0"
/>

This should return `bash`.

Change shell:

<Highlight 
  language="bash"
  code="chsh"
/>

Enter your password, then at the prompt that says `Login Shell [/bin/bash]:` enter `/bin/zsh`

Then restart you computer to enable Zsh.

After your computer restarts, open your terminal and you will see a message from Zsh to create a startup file (e.g. `.zshrc`). Type `2` to create a `.zshrc` file.

Confirm that you are in Zsh:

<Highlight 
  language="bash"
  code="echo $0"
/>

You should see `zsh`.


## Install Oh My Zsh

Go to https://ohmyz.sh/, click the **Install oh-my-zsh** button, and run the `curl` command to install Oh My Zsh.

## Clone the powerlevel10 theme for Oh My Zsh

Go to https://github.com/romkatv/powerlevel10k?tab=readme-ov-file#oh-my-zsh where you can find this command:

<Highlight 
  language="bash"
  code={cloneTheme}
/>

Copy/paste that `git clone` command into your terminal's Home directory.

## Install fonts for powerlevel10 theme

Clone this repo to your Home directory: 

<Highlight 
  language="bash"
  code="git clone https://github.com/SamuelEarl/my-linux-setup"
/>

Create a `.fonts` directory in your Home directory and copy/paste the fonts from the `my-linux-setup/powerline-fonts` directory into the `.fonts` directory.

## Configure fonts for powerlevel10 theme

1. Open your terminal settings by clicking the menu icon >> **Preferences**.
2. Select your profile.
3. Check the box next to **Custom font**
4. Click the font name button and search for **MesloLGS NF**.
5. Click **Select**.
6. Close the terminal **Preferences** window.

If the font in your terminal window looks weird, close your terminal and open it again. The font should look normal now.

## Update theme setting

Open your `.zshrc` file and change `ZSH_THEME="robbyrussell"` to `ZSH_THEME="powerlevel10k/powerlevel10k"`.

Close all terminal windows and open a new terminal window. You should now see the `Powerlevel10k configuration wizard` in your terminal. Follow the prompts to configure your terminal.

## Change Powerlevel10k configs

You can run `p10k configure` to start the `Powerlevel10k configuration wizard` again or edit the `~/.p10k.zsh` file.

## Add Anaconda and conda to Zsh

Run this command to initialize conda:

<Highlight 
  language="bash"
  code="~/anaconda3/bin/conda init zsh"
/>

NOTE: If your `anaconda3` directory is located somewhere else, then use that file path.

Restart your zsh shell to enable conda. The init command will change your `~/.zshrc` file accordingly, setting your `PATH` correctly and changing the PS1 to include the current conda environment.

## How to get Zsh configs to appear in VS Code terminal

Go to https://github.com/ryanoasis/nerd-fonts/releases/latest, scroll down to **Assets**, and find the **Meslo.zip** file. Click the **Meslo.zip** link to download the fonts.

Unzip/extract the contents of the **Meslo.zip** file.

Move the unzipped folder to `/usr/share/fonts/truetype/`:

<Highlight 
  language="bash"
  code="sudo mv ~/Downloads/Meslo /usr/share/fonts/truetype"
/>

Run this command to scan the font directories and configure fonts for use:

<Highlight 
  language="bash"
  code="sudo fc-cache -vf /usr/share/fonts/"
/>

In VS Code, open **File** >> **Preferences** >> **Settings** and search for `terminal.integrated.fontFamily`. Set the font name you copied (from the previous step) into the `Terminal › Integrated: Font Family` field: `MesloLGS NF`

You can verify this setting in the `settings.json` file (**Preferences** >> **Profiles** >> **Settings**). You should see a line like this:

<Highlight 
  language="json"
  code='"terminal.integrated.fontFamily": "MesloLGS NF"'
/>

Make sure that your `settings.json` file is saved. You will probably have to restart your computer to see the changes in your VS Code terminal.

_Source: https://stackoverflow.com/questions/62710890/font-issues-while-integrating-zsh-on-visual-studio-code_

## What do the characters at the end of my prompt mean?

[What do characters like !1 at the end of my Powerlevel10k prompt mean?](https://stackoverflow.com/questions/62072056/what-do-characters-like-1-at-the-end-of-my-powerlevel10k-prompt-mean)

## Sources

* [How to spice up your Linux (Ubuntu) terminal prompt (using powerlevel10k and oh-my-zsh) in 2021](https://www.youtube.com/watch?v=PZTLIVQxxEY)
* [Make Your Terminal Look Cooler (OMZ + P10k + Starship)](https://www.youtube.com/watch?v=WXiNkZVmkD4)

<br>
