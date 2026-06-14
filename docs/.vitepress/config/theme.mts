import fs from 'node:fs'
import path from 'node:path'
import { nav, sidebar } from './navigation.mts'
import { docsRoot } from './paths.mts'
import { renderSearchHtml } from './search.mts'

const uestcIcon = fs.readFileSync(
  path.resolve(docsRoot, 'Index-assets/logos/UESTC.svg'),
  'utf-8',
)

export function createThemeConfig(isDevCommand: boolean) {
  return {
    // https://vitepress.dev/reference/default-theme-config

    logo: '/IMG_4825_transparent.png',

    siteTitle: 'Ayaskt Workspace',


    nav,


    footer: {
      message: 'Released under the MIT License.\nBuilt with VitePress.',
      copyright: 'Copyright © 2025-present Ayaskt'
    },





    sidebar,



    socialLinks: [
      { icon: 'github', link: 'https://github.com/ayaskt' },
      {
        icon: { svg: uestcIcon },
        link: 'https://www.uestc.edu.cn/'
      }
    ],

    search: isDevCommand
      ? undefined
      : {
          provider: 'local',
          options: {
            detailedView: false,
            _render: (src) => renderSearchHtml(src),
          },
        }
  
  }
}
