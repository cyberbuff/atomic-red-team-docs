import React from 'react'
import {DocsThemeConfig, useConfig} from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <>
    <img src={"./logo.png"} alt={"logo"} width={30} height={30} style={{
      marginRight: 4,
    }}/>

    <span className="mx-2 font-extrabold hidden md:inline select-none">
         Atomic Red Team
        </span>
  </>,
  project: {
    link: 'https://github.com/redcanaryco/atomic-red-team',
  },
  docsRepositoryBase: 'https://github.com/cyberbuff/atomic-red-team-docs/tree/main/',
  footer: {
    component: null
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Atomic Red Team",
    };
  },
  head: () => {
    const {frontMatter} = useConfig()
    return <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta property="og:image" content="og.png"/>
      <meta property="og:image:alt" content="AtomicRedTeam"/>
      <meta property="og:title" content={frontMatter.title || "Atomic Red Team docs"}/>
      <meta property="og:description" content={frontMatter.description || "New wiki site for Atomic Red Team"}/>
    </>
  }
}

export default config
