import { Editor } from '@toast-ui/react-editor'
import React from 'react'

import { cn } from '@/shared/lib/utils'

import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'

const CustomEditor = () => {
    return (
        <Editor
            initialEditType="wysiwyg"
            // initialValue="hello react editor world!"
            // previewStyle="vertical"
            // height="600px"
            // initialEditType="markdown"
            // useCommandShortcut={true}
        />
    )
}

export { CustomEditor }
