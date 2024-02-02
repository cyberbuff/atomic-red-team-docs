import React from "react";
// @ts-ignore
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/react";
import { Logo } from "./components/logo";
import { Navigation } from "./components/navigation";
import slackLogo from "./public/slack.svg";
import Image from "next/image";

const config: DocsThemeConfig = {
  darkMode: false,
  logo: <Logo />,
  project: {
    link: "https://github.com/redcanaryco/atomic-red-team",
  },
  chat: {
    link: "https://slack.atomicredteam.io/",
    icon: (
      <Image
        src={slackLogo}
        style={{ height: 20, width: 20 }}
        alt="slack logo"
      />
    ),
  },
  toc: {
    float: true,
  },
  navbar: {
    component: Navigation,
  },
  docsRepositoryBase:
    "https://github.com/cyberbuff/atomic-red-team-docs/tree/main/",
  footer: {
    component: (
      <>
        <Analytics />
        <script
          defer
          src={"https://static.cloudflareinsights.com/beacon.min.js"}
          data-cf-beacon={'{"token": "b59027d62dea4505885f06f6338003d2"}'}
        ></script>
      </>
    ),
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
    let titleTemplate = "";
    if (asPath.includes("/atomic-red-team")) {
      titleTemplate = "- Atomic Red Team";
    } else if (asPath.includes("/invoke-atomicredteam")) {
      titleTemplate = "- Invoke-AtomicRedTeam";
    }

    return {
      titleTemplate: `%s ${titleTemplate}`,
    };
  },
  head: () => {
    const { frontMatter } = useConfig();
    const { asPath } = useRouter();
    const basePath = "https://atomics.vercel.app";
    const url = basePath + asPath;
    const ogImage = basePath + "/og.png";
    let title = frontMatter.title || "Docs";
    if (url.includes("/atomic-red-team")) {
      title += " - Atomic Red Team";
    } else if (url.includes("/invoke-atomicredteam")) {
      title += " - Invoke-AtomicRedTeam";
    }
    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="AtomicRedTeam" />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={
            frontMatter.description || "New wiki site for Atomic Red Team"
          }
        />
      </>
    );
  },
};

export default config;
