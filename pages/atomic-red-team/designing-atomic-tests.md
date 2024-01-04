## Designing atomic tests

Adhere to these guidelines when designing new atomic tests.

### Cleanup commands

- Users should be able to execute cleanup commands repeatedly without generating
  errors. You can accomplish this by piping error outputs to `null` in most
  command lines, or by using the `-ErrorAction Ignore` argument in PowerShell.
- Don't write cleanup commands that delete dependencies.

### Dependencies

- Provide the source code of any custom binaries.
- Don't commit dependencies that have their own external GitHub repositories into this project. Instead, use the
  `prereq_commands` YAML key to download any dependencies from their original
  sources into the **ExternalPayloads** directory which is in the same folder as the **atomics** folder.
- Refer to external repositories
  with [permanent GitHub links](https://docs.github.com/en/github/managing-files-in-a-repository/getting-permanent-links-to-files)
  to prevent unexpected changes.
- If a dependency is built into an operating system by default, don't write
  any commands to check for or install it.

### Directory structure

Each technique directory contains the following:

- A YAML test file
- A human-readable, Markdown test file (automatically generated from the YAML file)
- An optional `src` directory for source file dependencies
- An optional `bin` directory for binary dependencies

### Input and output

- Use input arguments for items that the user might want to customize.
- Include the technique number in any output file names.

### Test descriptions

- Include a description of what the test does and a description of the expected
  output.
- Include links to web pages that describe the attack in detail, if possible.

### Test names

- Include enough information in the test name to give the user a general idea of
  what the test does.

### Test portability

- Make tests as portable as possible. For example, use environment variables
  instead of hard-coded paths.
- Prefer `sh` to `bash` for Linux tests.
