import React from 'react'
import {DocsThemeConfig, useConfig} from 'nextra-theme-docs'
import {useRouter} from 'next/router'
import {Analytics} from '@vercel/analytics/react';

const config: DocsThemeConfig = {
  logo: <>
    <img src={"https://atomics.vercel.app/logo.png"} alt={"logo"} width={30} height={30} style={{
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
    component: <>
      <Analytics/>
      <script defer src={'https://static.cloudflareinsights.com/beacon.min.js'}
              data-cf-beacon='{"token": "b59027d62dea4505885f06f6338003d2"}'></script>
    </>
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Atomic Red Team",
    };
  },
  head: () => {
    const {frontMatter} = useConfig()
    const {asPath} = useRouter()
    const basePath = 'https://atomics.vercel.app'
    const url = basePath + asPath
    const ogImage = basePath + '/og.png'
    return <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta property="og:url" content={url}/>
      <meta property="og:image" content={ogImage}/>
      <meta property="og:image:alt" content="AtomicRedTeam"/>
      <meta property="og:title" content={frontMatter.title || "Atomic Red Team docs"}/>
      <meta property="og:description" content={frontMatter.description || "New wiki site for Atomic Red Team"}/>
    </>
  }
}

export default config
