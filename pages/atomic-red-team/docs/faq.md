Answers to some common questions about Atomic Red Team™.

## What is Atomic Red Team?

Atomic Red Team is a library of simple tests that every security team can
execute to test their controls. Tests are focused, have few dependencies, and
are defined in a structured format that can be used by automation frameworks.

## How can Atomic Red Team help me?

Atomic Red Team serves many needs: validating visibility, testing detection
coverage, and emulating adversary behaviors. However, it’s increasingly clear
that while the platform was designed with the intention of helping security
teams execute simple red team exercises (as the name implies), it may be just as
useful as an educational resource. Check
out [this blog post](https://redcanary.com/blog/breaking-into-infosec-atomic-red-team/)
to see how it can help you gain development experience, become familiar with
tools and tech, hone your analytical skill set, and even network with other
security professionals.

## What use cases does Atomic Red Team cover?

This list gives a few noteworthy use cases:

- **Testing production security controls.** You might have one or more
  security controls in production today, but do you know how they perform in the
  face of specific adversary techniques? You can use Atomic Red Team to
  introduce known adversary techniques in a specific order. Keep these questions
  in mind:
  - Are we receiving signals for all observable events?
  - Are we receiving alerts for events that should occur with low frequency or
    that have a high impact?
- **Testing proof-of-concept product coverage.** You can use Atomic Red Team to
  validate vendor claims, or measure the presence and quality of signals across
  multiple products. Keep these questions in mind:
  - Are we receiving signals for all observable events?
  - Are we receiving alerts for events that should occur with low frequency or
    that have a high impact?
- **Testing your analysis team and processes.** It's critical that information
  security leaders understand how their operational capacity—a combination of
  technical controls, expertise, and response processes—perform in the face of a
  determined adversary. Keep these questions in mind:
  - Do one or more of our technical controls identify the test?
  - Does detection depend on automated correlation? On human analysis?
  - In any event, how quickly do we detect the activity?
  - How long does it take us to contain, remediate, and recover?
  - What is the signal-to-noise ratio for the detection criteria used to
    identify the activity? Is it sustainable in conjunction with the criteria
    required to cover a greater percentage of the ATT&CK matrix?

## How well does Atomic Red Team cover the MITRE ATT&CK® techniques?

We can visualize how well Atomic Red Team covers the MITRE ATT&CK tactics,
techniques, and procedures by viewing the available atomic tests on the MITRE
ATT&CK Navigator. The colored items on the matrix indicate that at least one
atomic test exists for the given technique.

- [All Operating Systems](https://mitre-attack.github.io/attack-navigator/#layerURL=https://raw.githubusercontent.com/redcanaryco/atomic-red-team/master/atomics/Indexes/Attack-Navigator-Layers/art-navigator-layer.json)
- [Windows](https://mitre-attack.github.io/attack-navigator/#layerURL=https://raw.githubusercontent.com/redcanaryco/atomic-red-team/master/atomics/Indexes/Attack-Navigator-Layers/art-navigator-layer-windows.json)
- [Linux](https://mitre-attack.github.io/attack-navigator/#layerURL=https://raw.githubusercontent.com/redcanaryco/atomic-red-team/master/atomics/Indexes/Attack-Navigator-Layers/art-navigator-layer-linux.json)
- [macOS](https://mitre-attack.github.io/attack-navigator/#layerURL=https://raw.githubusercontent.com/redcanaryco/atomic-red-team/master/atomics/Indexes/Attack-Navigator-Layers/art-navigator-layer-macos.json)

## How can I get started?

Check out the [getting started](https://github.com/redcanaryco/atomic-red-team/wiki/Getting-started)
page of the Wiki.

## Are there Atomic Tests for Linux and macOS?

Yes.

You can find a listing of Linux
tests [here](https://github.com/redcanaryco/atomic-red-team/blob/master/atomics/Indexes/Indexes-CSV/linux-index.csv)
and macOS
tests [here](https://github.com/redcanaryco/atomic-red-team/blob/master/atomics/Indexes/Indexes-CSV/macos-index.csv).

## How did the Atomic Red Team project get started?

For some history on how this project began, see
the ["Looking Back"](https://redcanary.com/blog/atomic-red-team-1-year-lookback/)
blog post.

## What does Red Canary do?

[Red Canary](https://redcanary.com/) provides managed detection and response,
open-source tools, and education for the information security community.

## Couldn't antivirus vendors use this tool and render it useless?

No.

It is possible, if not probable, that antivirus vendors could use the Atomic Red
Team project to build weak detections, giving an impression of better attack
coverage than they really have. An example of a weak detection is alerting
on any file executed out of the default installation directory of
`C:\AtomicRedTeam` or downloaded from the Atomic Red Team repository. The
primary suggestion for dealing with this is to
use [input arguments](https://github.com/redcanaryco/invoke-atomicredteam/wiki/Specify-Custom-Input-Arguments)
when defining atomic tests. This allows the user to specify a custom URL to
download files from or otherwise change up the known Atomic Red team signature
at runtime in an unpredictable way.

## Does Atomic Red Team negate the need for a traditional red team?

No.

There will always be things that red teams can do that can't be scripted.
For example, realistic phishing emails from a believable source, vishing,
credential stuffing, zero-day exploitation, and so on.

## Can I chain multiple atomic tests together to emulate specific attack groups?

Yes.

You can manually chain tests together by running individual atomic tests back to
back but there is no automated solution for emulating a specific attack group as
a whole. But stayed tuned, this feature has been requested and is in the works.

## Can I run an Atomic Red Team test on a remote machine where Atomic Red Team is not installed?

Yes.

Take a look at
the [Remote test execution](<https://github.com/redcanaryco/invoke-atomicredteam/wiki/Execute-Atomic-Tests-(Remote)>)
section of the [Invoke-AtomicRedTeam Wiki](https://github.com/redcanaryco/invoke-atomicredteam/wiki).

## Is there a notification when new atomic tests are added?

Yes.

The [Atomic Red Team Slack Workspace](https://slack.atomicredteam.io/) has a
public channel called "#atomic-git" where notifications for all contributions
are posted.

## Does Atomic Red Team cover cloud infrastructure attacks?

Yes!

Look for tests which have a `iaas` as a supported platform.

## How can I use the Atomic Red Team™ name?

You can freely use the Atomic Red Team™ software per its open-source license. But as you can see from the little “™” Red
Canary has an unregistered trademark in the Atomic Red Team name because it’s something we are proud of, and we wouldn’t
want someone else creating something else under the same name and confusing everyone.

You are always free to refer to the Atomic Red Team project without our permission--please do! But don’t use the Atomic
Red Team name with your own independent project or offering in a way that could suggest Red Canary is the source or
sponsor, or somehow approves of it. If you have a good idea on how we can collaborate in using the Atomic Red Team name,
then please reach out to [opensource@redcanary.com](mailto:opensource@redcanary.com).

## How can I use the Atomic Red Team™ logo?

Red Canary is also very proud of our unique Atomic Red Team™ logo:

<img src="https://redcanary.com/wp-content/uploads/Atomic-Red-Team-Logo.png" alt="Atomic Red Team™ Logo" width="250"/>

It’s an unregistered trademark of Red Canary's, and as an original work of art it’s also copyrighted. Given that, please
don’t use it without our permission--but as always, please reach out
to [opensource@redcanary.com](mailto:opensource@redcanary.com) if you have ideas on how we can collaborate and maybe
agree on a way to use that logo.
