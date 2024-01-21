Maintainers Check List

**Note**: Please remember to thank our first-time contributors. I like to include a link to the contributors page where
they can get their free t-shirt like this...

Thanks for your first-time contribution. Keep it up! Don't forget
to [claim your free t-shirt](https://github.com/redcanaryco/atomic-red-team/wiki/Contributing#claim-your-free-t-shirt)

1. Is the atomic in the right Technique #
2. Is it a duplicate of an atomic that already exists (you can use GitHub search to search for key words, like the
   script being used, and see where else they appear in the repo)
3. Make sure Github links within commands that are executed use
   the [permanent link](https://docs.github.com/en/github/managing-files-in-a-repository/managing-files-on-github/getting-permanent-links-to-files)
   if not in the `redcanaryco` repo
4. Input arguments used in the prereqs, commands, and cleanup commands (not hardcoded if defined in input args).
5. Supported files included in /bin (for binary) or /src (for human readable)
6. Are supported files included in the PR? Source code should be provided where custom binaries are provided (if
   possible)
7. Cleanup commands are intended to remove temporary files, and reset system enough to run the test again but shouldn't
   remove prerequisites. Code should allow the cleanup commands to be run multiple times in a row without generating
   errors/warnings.
8. Test names are descriptive. Descriptions explain what the atomic does and what success looks like. It should include
   links to relevant blogs and tools where applicable.
9. Input arg defaults allow atomic to function on most systems without modification.
10. Atomic test changes/additions are made to yaml file (and not **md** file since **md** file gets rewritten from the
    yaml by the Circle CI process at merge time)

Lead Reviewer Assignments:

- Linux/macOS - Jose Hernandez (**josehelps** on GitHub,**@Jose Hernandez** on Slack) and Hare Sudhan (**cyberbuff** on
  GitHub, **@Hare Sudhan** on Slack)
- Cloud - Bhavin Patel (**patel-bhavin** on Github, **@Bhavin Patel** on Slack)
- Windows - Carrie Roberts (**clr2of8** on GitHub, **@OrOneEqualsOne** on Slack)
