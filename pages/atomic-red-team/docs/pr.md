## Open a pull request

[Demo Video for creating and submitting Pull Requests](https://youtu.be/5MCtee8_s24)

Use pull requests to submit changes to the repository for review.

Submitting a basic PR using the Web Interface is easier for beginners and more intuitive. If you are making changes to
multiple files within the repository, you may prefer to use `Git` to make your changes. For more information on how to
get started using Git on the command line, we have provided
a [walkthrough](https://github.com/redcanaryco/atomic-red-team/wiki/Git-Command-Line).

### Edit or add atomic tests

There are two ways to create new atomic tests:

- Use the atomic GUI web interface. See
  the [atomic GUI wiki page](https://github.com/redcanaryco/invoke-atomicredteam/wiki/The-atomic-GUI).
- Write a new test by hand. Use
  the [atomic test YAML specification file](https://github.com/redcanaryco/atomic-red-team/blob/master/atomic_red_team/spec.yaml)
  as a template.

You can also make changes to existing atomic tests by editing the YAML test
file in a given technique directory. For example, you can make changes to
existing [Process Injection](https://attack.mitre.org/techniques/T1055) tests by
editing `atomic-red-team/atomics/T1055/T1055.yaml`.

👉 **Note:** Automated GitHub Actions will generate the `auto_generated_guid` for a new test (in the YAML). You don't
need to add this manually.

### Make changes to the repository

When you're ready to open a pull request, follow these steps:

1. Navigate to the `atomics` directory of the Atomic Red Team repository.
2. Select the directory named after the MITRE ATT&CK® technique you want to
   contribute to. If no such directory exists, create one.
3. Make changes to the YAML file in the technique directory.
   - Add source file dependencies to the `src` directory, if necessary.
   - Add binary dependencies to the `bin` directory, if necessary.
4. Commit your changes and open a pull request.

👉 **Note:** Automated GitHub Actions generate the Markdown test files and the
list of tests in `atomics/Indexes`. You never need to update them manually.

### Fix failed checks

You must fix any failed checks before a project maintainer can approve your
pull request:

1. Go to your pull request page on GitHub.
2. Select **Conversation > Details**.
3. Read GitHub's error messages and make the required changes.
4. Commit the changes to your existing pull request.

You'll know your test is ready for manual review when GitHub displays the
"All checks have passed" message:

![Screenshot of the Github pull request page. The message "All checks have passed" is displayed.](https://user-images.githubusercontent.com/22311332/89719092-f608c580-d981-11ea-97ed-bdddcff9c105.png)

### Claim your free t-shirt

First-time contributors get a free Red Canary t-shirt when their pull request is
merged. To claim your t-shirt, [fill out this form](https://form.asana.com/?k=6EtLaHO7FNHpw1oHrDLJ6g&d=287767067086141).
