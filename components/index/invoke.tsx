import {EuiButton, EuiFlexGroup, EuiPageTemplate, EuiProvider, EuiSpacer,} from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_dark.css";
import {Card} from "../card";
import Link from "next/link";
import invokeLogo from "../../public/Invoke-AtomicLogo.png";
import Image from "next/image";

export function App() {
    return (
        <EuiProvider colorMode={"dark"}>
            <EuiPageTemplate
                restrictWidth="90%"
                panelled={null}
                css={{ backgroundColor: "black" }}
            >
                <EuiPageTemplate.Header
                    pageTitle={"Invoke-Atomic"}
                    description="Invoke-Atomic is a PowerShell-based framework for developing and executing Atomic Red Team tests."
                    iconProps={{
                        href: "https://atomicredteam.io/favicon.ico",
                    }}
                    rightSideItems={[
                        <Link href="/invoke-atomicredteam/docs" key="docs">
                            <EuiButton key="docs">
                                Get Started
                            </EuiButton>
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
                </EuiPageTemplate.Section>
            </EuiPageTemplate>
        </EuiProvider>
    );
}
