import { run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import type { MDXComponents } from 'mdx/types'

const components: MDXComponents = {
    // Custom element overrides go here later
}

export async function renderMDX(code:string) {
    const { default: MDXContent } = await run(code, {...runtime, baseUrl: import.meta.url })
    return <MDXContent components={components} />
}