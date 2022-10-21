import fs from 'node:fs'
import { createUnplugin } from 'unplugin'
import fg from 'fast-glob'
import type { Options } from './types'

const unplugin = createUnplugin<Options>(() => {
  const virtualModuleId = 'virtual:router-type'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  return {
    name: 'unplugin-router-type',
    resolveId(id) {
      if (id === virtualModuleId) {
        console.log(id, 'id')
        return resolvedVirtualModuleId
      }
    },
    // loadInclude(id) {
    //   return id.endsWith('page.config.ts')
    // },
    async load(id) {
      console.log('id', id)
      if (id === resolvedVirtualModuleId) {
        const entries = await fg([`${process.cwd()}/**/page.config.ts`], { dot: true })
        const context = fs.readFileSync(entries[0]).toString()
        console.log({ entries, context }, 'entries')
        return context
      }
    },
  }
})

export * from './types'

export default unplugin
