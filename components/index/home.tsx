import {
	EuiCard,
	EuiFlexGroup,
	EuiFlexItem,
	EuiIcon,
	EuiPageTemplate,
	EuiProvider,
	EuiSpacer,
	EuiTitle,
} from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_dark.css";

function Contents() {
	return (
		<>
			<EuiTitle size="m">
				<h4>Projects</h4>
			</EuiTitle>
			<EuiSpacer size="xxl" />
			<EuiFlexGroup gutterSize="l">
				<EuiFlexItem>
					<EuiCard
						href="/atomic-red-team"
						icon={<EuiIcon size="xxl" type="/logo.png" />}
						title=""
						description="A library of simple, focused tests mapped to the MITRE ATT&CK® matrix. Each test runs in five minutes or less, and many tests come with easy-to-use configuration and cleanup commands."
						betaBadgeProps={{
							label: "Atomic Red Team",
						}}
					/>
				</EuiFlexItem>
				<EuiFlexItem>
					<EuiCard
						href="/invoke-atomicredteam"
						image={
							<img src="/Invoke-AtomicLogo.png" alt="Invoke Atomic logo" />
						}
						title=""
						description="A PowerShell-based framework for developing and executing atomic tests. With PowerShell Core, security teams can execute tests across multiple platforms and over a network."
						betaBadgeProps={{
							label: "Invoke-AtomicRedTeam",
						}}
					/>
				</EuiFlexItem>
				<EuiFlexItem>
					<EuiCard
						icon={<EuiIcon size="xxl" type="/chain-reactor.png" />}
						title={""}
						description={
							"Chain Reactor is an open-source tool for testing detection and response coverage on Linux machines."
						}
						href={"https://github.com/redcanaryco/chain-reactor"}
						betaBadgeProps={{
							label: "Chain Reactor ↗",
						}}
					/>
				</EuiFlexItem>

				<EuiFlexItem>
					<EuiCard
						icon={<EuiIcon size="xxl" type="/harness.png" />}
						title={""}
						description="AtomicTestHarnesses is a library that simulates and validates attack technique execution"
						betaBadgeProps={{
							label: "Atomic Test Harnesses ↗",
						}}
						href={"https://github.com/redcanaryco/AtomicTestHarnesses"}
					/>
				</EuiFlexItem>
			</EuiFlexGroup>
			<EuiSpacer size="xxl" />
			<EuiTitle size="m">
				<h4>Resources</h4>
			</EuiTitle>
			<EuiSpacer size="xxl" />
			<EuiFlexGroup>
				<EuiFlexItem>
					<iframe
						width="560"
						height="315"
						src="https://www.youtube.com/embed/videoseries?si=DfnKuV9zfA_EFkW_&amp;list=PL92eUXSF717W9TCfZzLca6DmlFXFIu8p6"
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowFullScreen
					/>
				</EuiFlexItem>
				<EuiFlexItem>
					<iframe
						width="560"
						height="315"
						src="https://www.youtube.com/embed/O6w0oFcCAnI?si=pAqXoLVi30NEsKvQ"
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowFullScreen
					/>
				</EuiFlexItem>
			</EuiFlexGroup>
		</>
	);
}

export function App() {
	return (
		<EuiProvider colorMode={"dark"}>
			<EuiPageTemplate
				panelled={null}
				restrictWidth="90%"
				css={{ backgroundColor: "black" }}
			>
				<EuiPageTemplate.Header
					pageTitle="Welcome to the new Atomic Hub"
					description="You can find all of the projects and resources related to Atomic Red Team here. Feel free to contribute to the projects or the website. We are always looking for new contributors."
					iconProps={{
						href: "https://atomicredteam.io/favicon.ico",
					}}
				/>

				<EuiPageTemplate.Section color="transparent">
					<Contents />
				</EuiPageTemplate.Section>
			</EuiPageTemplate>
		</EuiProvider>
	);
}
