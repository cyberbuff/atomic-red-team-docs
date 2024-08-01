import {
	EuiButton,
	EuiFlexGroup,
	EuiIcon,
	EuiPageTemplate,
	EuiProvider,
	EuiSpacer,
} from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_dark.css";
import Link from "next/link";
import React from "react";
import { AtomicTestsTable } from "../atomicTests";
import { Card } from "../card";

export function App() {
	return (
		<EuiProvider colorMode={"dark"}>
			<EuiPageTemplate
				panelled={null}
				restrictWidth="90%"
				css={{ backgroundColor: "black" }}
			>
				<EuiPageTemplate.Header
					pageTitle="Atomic Red Team"
					description="Atomic Red Team is an open-source library of tests that security teams can use to simulate adversarial activity in their environments."
					iconProps={{
						href: "https://atomicredteam.io/favicon.ico",
					}}
					rightSideItems={[
						<Link href="/atomic-red-team/atomics/T1003" key="atomics">
							<EuiButton key="atomics">View all atomics</EuiButton>
						</Link>,
						<Link href="/atomic-red-team/docs" key="atomics">
							<EuiButton key="get-started">Get Started</EuiButton>
						</Link>,
					]}
				/>

				<EuiPageTemplate.Section color="transparent">
					<EuiFlexGroup gutterSize="l">
						<Card
							icon={<EuiIcon size="xxl" type="metricbeatApp" />}
							title="Fast"
							description="Atomic tests run in five minutes or less and require minimal setup. Spend less time configuring and more time testing!"
						/>
						<Card
							icon={<EuiIcon size="xxl" type="fleetApp" />}
							title="Focused"
							description="Security teams don’t want to operate with a “hopes and prayers” attitude towards detection. Atomic tests are mapped to the MITRE ATT&CK matrix, so you always know which techniques you do and don’t detect."
						/>
						<Card
							icon={<EuiIcon size="xxl" type="usersRolesApp" />}
							title="Community-driven"
							description="Atomic Red Team is open source and community developed. By working together, we can develop a fuller picture of the security landscape."
						/>
					</EuiFlexGroup>
					<EuiSpacer size="xxl" />
					<AtomicTestsTable />
				</EuiPageTemplate.Section>
			</EuiPageTemplate>
		</EuiProvider>
	);
}
