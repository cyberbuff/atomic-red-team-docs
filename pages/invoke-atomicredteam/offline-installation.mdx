To prepare for **offline** installation you should install Atomic Red Team on an **online** system of the same OS version where the **offline** install is to be done. This allows you to easily grab all of the needed files from the **online** system and move them to the **offline** system. The instructions below are specific to Windows but you can adjust to make it work on Linux/macOS as well.

## Steps to take from the **online** system:

1) Install Atomic Red Team on the **online** system as shown [here](https://github.com/redcanaryco/invoke-atomicredteam/wiki/Installing-Invoke-AtomicRedTeam#install-execution-framework-and-atomics-folder).
2) Get the prereqs for all tests so you can copy as many as possible to the **offline** system. Use `Invoke-AtomicTest All -GetPrereqs` (preferably with AV disabled). You can skip\cancel any of the application installs because those won't copy over to the **offline** system.
3) Copy the following directories from the **online** system to the **offline** system:
  * `C:\AtomicRedTeam` folder
  * PowerShell `powershell-yaml` folder (from `$HOME\Documents\PowerShell\Modules` or `$env:ProgramFiles\PowerShell\Modules`)
  * If you are using the non-default [Syslog Execution logger](https://github.com/redcanaryco/invoke-atomicredteam/wiki/Execution-Logging#syslog-logger) you will need to grab a copy of the `Posh-SYSLOG` module in the same way you grabbed the `powershell-yaml` module.

Note: We are in the process of standardizing atomics that have external dependencies to download them into the `AtomicRedTeam\ExternalPayloads` folder. This has be completed for the Windows atomics but not the Linux\macOS atomics. In the latter case, you may need to grab several of the prereqs from the `temp` directory.

Note: It is recommended that you add an AV exclusion for the `C:\AtomicRedTeam` folder so that no files from the project are quarantined or deleted.

## Steps to take from the **offline** system:

1.  After copying the `C:\AtomicRedTeam` folder and the PowerShell module folder(s) from the **online** system to the **offline** system, dmke sure the file paths of the folders are the same on the **offline** system as the **online**. You should have a `C:\AtomicRedTeam` folder with three folders in it (`atomics`,`ExternalPayloads`, and `invoke-atomicredteam`). You should have a `powershell-yaml` folder at `$HOME\Documents\PowerShell\Modules` or `$env:ProgramFiles\PowerShell\Modules`
2) Import the Invoke-AtomicRedTeam module as described [here](https://github.com/redcanaryco/invoke-atomicredteam/wiki/Import-the-Module).
3) From an administrative PowerShell prompt run `Invoke-AtomicTest All -GetPrereqs` which will set any configurations or install prerequisite software onto your **offline** system. For example, the Wireshark executable will have been downloaded as a prereq that you copied to the **offline** system but you still need to install it on the **offline** system.