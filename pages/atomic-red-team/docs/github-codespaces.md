### Github Codespaces

From GitHub docs, A codespace is a development environment that's hosted in the cloud. GitHub Codespaces run on a
variety of VM-based compute options hosted by GitHub.com, which you can configure from 2 core machines up to 32 core
machines. You can connect to your codespaces from the browser or locally using an IDE like Visual Studio Code or
IntelliJ.

Right now, GitHub Codespaces support only Linux containers as development environments. This codespace environment
installs powershell, invoke-atomicredteam and powershell-yaml modules and sets up user profiles to quickly run atomic
tests. You can add new atomic tests from your browser(codespaces), test them and then create PRs from your browser
without creating a VM.

### Pricing

GitHub Codespaces are free upto 60 hours per month if you are using a 2 core machine. More pricing information can be
found below.

<img src="https://github.com/redcanaryco/atomic-red-team/assets/27735081/6bd942b5-df11-4009-9988-11fcc4b15172" width=1000/>

### Usage

You can find the `Open in GitHub Codespaces` button at the bottom
of [README.md](https://github.com/redcanaryco/atomic-red-team/tree/devcontainer?tab=readme-ov-file#contribute-to-atomic-red-team).
This will open a new page to create your codespace environment.

- **Repository**: Choose your forked repository instead of `redcanaryco/atomic-red-team`
- **Branch**: Choose the branch that you want to test
- **Region**: Optional, choose the region closest to your location to avoid any latency issues.
- **Machine type**: 2-core(8GB RAM) or 4-core(16GB RAM). Note that, choosing 4-core would reduce your number of free
  hours to 30 hours per month instead of 60.

<img src="https://github.com/redcanaryco/atomic-red-team/assets/27735081/f7b7bb21-6a2c-45c0-aedf-8b52f3a0999f" width=1000>

### How it works ?

After you click, Open in Codespace, GitHub pulls down the image specified on `.devcontainer/devcontainer.json` and
installs all the modules specified. It also installs VSCode extensions and create home profiles.

<img src="https://github.com/redcanaryco/atomic-red-team/assets/27735081/972c2d24-aeb3-4db1-bffd-76ea93c34618" width=1000>

After the container is built, it displays a VSCode IDE within the browser window. Here you can run any commands like you
run on a VM.

<img src="https://github.com/redcanaryco/atomic-red-team/assets/27735081/97aaea0c-ee34-426f-b1e2-04ee1e6eefa8" width=1000>

**Note:** Terminate your codespace instance once you finish your tests. Doing so will conserve your Codespace hours. To
stop your instance, visit the provided [link](https://github.com/codespaces), select the running instance, and click "
Stop your Codespace." This action will temporarily halt the instance while preserving any changes made within the
container. You can resume this instance at a later time if necessary.

<img width="1000" alt="Screenshot 2023-12-22 at 11 56 51 PM" src="https://github.com/redcanaryco/atomic-red-team/assets/27735081/f80682e9-2283-4b07-a222-4517e50e401b">
