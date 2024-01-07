# Use Git Command Line

Submitting a basic PR using the Web Interface is easier for beginners and more intuitive, but it is not ideal for making
large or complicated changes affecting multiple files within the repository. In this case, you can use the `git` command
line tool for [Windows](https://git-scm.com/download/win), [Linux](https://git-scm.com/download/linux)
and [macOS](https://www.atlassian.com/git/tutorials/install-git).

The following summary of git commands will help you know how to clone and setup your repository in preparation for
submitting a PR.

```bash
# Clone your fork of the Red Canary Atomic Red Team™ Repository
git clone https://github.com/<your-github-username>/atomic-red-team.git

# Change directories into your cloned repository
cd atomic-red-team

# Set your origin (your fork) and your upstream (Red Canary's repo)
# You have to do this every time you re-clone your repo, which likely is not often
git remote set-url origin https://github.com/<your-github-username>/atomic-red-team.git
git remote add upstream https://github.com/redcanaryco/atomic-red-team.git

# Update your forked master branch to match Red Canary's repo
# Do this right before creating a feature branch and working on it
git checkout master
git fetch --all
git rebase upstream/master
git push origin master

# Create a new branch from master to work on your new feature and switch to it (replace <branch-name> with whatever name you would like to use for your branch)
git checkout -b <branch-name>

# Add and commit your new/modified files to your local branch (not on the web), use "git status" to see what is new/changed
git add /path/to/new/changed/file.yaml    # repeat for multiple files as needed
git commit -m "This should be a short message describing what changed."

# Push the changes out to your repository residing in GitHub on the web
# The output from this command will tell you where to go on the web to submit the PR
git push origin <branch-name>
```

Remember that the goal is to synchronize your master branch with Red Canary's master branch immediately before creating
a feature branch. It is best to always make your changes to a branch other than master branch. Therefore, you should
expect to repeat the steps from "Update your forked master branch to match Red Canary's repo" and below often (
immediately before working on each new feature or addition).
