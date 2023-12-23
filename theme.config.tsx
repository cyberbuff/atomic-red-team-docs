import React from 'react'
import {DocsThemeConfig} from 'nextra-theme-docs'

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
  }
}

export default config
