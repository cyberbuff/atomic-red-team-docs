import {
	EuiButton,
	EuiFlexGroup,
	EuiMarkdownFormat,
	EuiPageTemplate,
	EuiProvider,
	EuiSpacer,
} from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_dark.css";
import { Card } from "../card";
import Link from "next/link";

export function App() {
	const markdownContent = `

### Before you get started
- Executing atomic tests may leave your system in an undesirable state. You are responsible for understanding what a test does before executing.
- Ensure you have permission to test before you begin.
- It is recommended to set up a test machine for atomic test execution that is similar to the build in your environment. Be sure you have your collection/EDR solution in place, and that the endpoint is checking in and active.

Invoke-AtomicRedTeam installation and usage instructions can be found on the docs on the top menu.

There are a series of short instructional videos on [this YouTube channel](https://www.youtube.com/playlist?list=PL92eUXSF717W9TCfZzLca6DmlFXFIu8p6).

You can also find an in-depth 1 hour webcast [here](https://www.youtube.com/watch?v=O6w0oFcCAnI), with hands-on lab documents [here](https://1drv.ms/w/s!AvDXyd4cgfxesEclTt8tScoatJn2?e=pb0tsR).

Also a good general overview of the value of attack emulation is found [here](https://vimeo.com/819912016/c76af1ca39?share=copy).`;
	return (
		<EuiProvider colorMode={"dark"}>
			<EuiPageTemplate
				panelled={null}
				restrictWidth="90%"
				css={{ backgroundColor: "black" }}
			>
				<EuiPageTemplate.Header
					pageTitle={"Invoke-Atomic"}
					description="Invoke-Atomic is a PowerShell framework for developing and executing Atomic Red Team tests."
					iconProps={{
						href: "https://atomicredteam.io/favicon.ico",
					}}
					rightSideItems={[
						<Link href="/invoke-atomicredteam/docs" key="docs">
							<EuiButton key="docs">Get Started</EuiButton>
						</Link>,
					]}
				/>

				<EuiPageTemplate.Section color="transparent">
					<EuiFlexGroup gutterSize="l">
						<Card
							title="Cross-Platform"
							description="Invoke-Atomic runs anywhere PowerShell Core runs. Test on Windows, macOS, and Linux with minimal configuration!"
						/>
						<Card
							title="Testing at a distance"
							description="With Invoke-Atomic, you can execute tests remotely across a network."
						/>
						<Card
							title="New tests made easily"
							description="Invoke-Atomic’s atomic GUI makes developing new tests as easy as filling out a form."
						/>
					</EuiFlexGroup>
					<EuiSpacer size="xxl" />
					<EuiMarkdownFormat>{markdownContent}</EuiMarkdownFormat>
				</EuiPageTemplate.Section>
			</EuiPageTemplate>
		</EuiProvider>
	);
}
