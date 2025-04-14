'use client'

import { Editor } from '@toast-ui/react-editor'
import React from 'react'

import { cn } from '@/shared/lib/utils'

import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'

export const CustomEditor = ({ index, editorRef }) => {
    const localRef = React.useRef<Editor>(null)

    React.useEffect(() => {
        if (editorRef && localRef.current) {
            editorRef(localRef.current)
        }
    }, [editorRef])

    return (
        <div key={index} className="w-full">
            <Editor
                ref={localRef}
                initialEditType="wysiwyg"
                hideModeSwitch={true}
                placeholder="내용을 입력해 주세요."
                // initialValue={!content ? " " : content}
                initialValue=" "
                // previewStyle="vertical"
                height="500px"
                // initialEditType="markdown"
                // useCommandShortcut={true}
                toolbarItems={[
                    ['heading', 'bold', 'italic', 'strike'],
                    ['hr', 'quote'],
                    ['ul', 'ol'],
                    ['task', 'table', 'link'],
                    ['code', 'codeblock'],
                ]}
                hooks={{
                    addImageBlobHook: () => {
                        // 이미지 업로드 방지
                        return false
                    },
                }}
            />
        </div>
    )
}
