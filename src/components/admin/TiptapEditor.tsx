'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Youtube from '@tiptap/extension-youtube'
import { useState } from 'react'
import { MediaSelector } from './MediaSelector'
import { Bold, Italic, List, ListOrdered, Quote, Minus, Image as ImageIcon, Video as YoutubeIcon, Link as LinkIcon, Heading1, Heading2, Heading3 } from 'lucide-react'

interface TiptapEditorProps {
  content: string
  onChange: (content: string) => void
}

export function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const [isMediaSelectorOpen, setIsMediaSelectorOpen] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'w-full rounded-lg my-8',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#51237F] underline underline-offset-4 font-medium',
        },
      }),
      Youtube.configure({
        HTMLAttributes: {
          class: 'w-full aspect-video rounded-lg my-8',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[400px] py-4',
      },
    },
  })

  if (!editor) return null

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL')
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
      })
    }
  }

  return (
    <div className="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-900">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-800 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-zinc-800' : ''}`}
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-800 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 dark:bg-zinc-800' : ''}`}
        >
          <Heading3 className="w-4 h-4" />
        </button>
        
        <div className="w-px h-6 bg-gray-300 dark:bg-zinc-700 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-800 ${editor.isActive('bold') ? 'bg-gray-200 dark:bg-zinc-800' : ''}`}
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-800 ${editor.isActive('italic') ? 'bg-gray-200 dark:bg-zinc-800' : ''}`}
        >
          <Italic className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 dark:bg-zinc-700 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-800 ${editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-zinc-800' : ''}`}
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-800 ${editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-zinc-800' : ''}`}
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-800 ${editor.isActive('blockquote') ? 'bg-gray-200 dark:bg-zinc-800' : ''}`}
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-800"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 dark:bg-zinc-700 mx-1" />

        <button
          type="button"
          onClick={setLink}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-800 ${editor.isActive('link') ? 'bg-gray-200 dark:bg-zinc-800' : ''}`}
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setIsMediaSelectorOpen(true)}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-800"
          title="Insert Image from Media Library"
        >
          <ImageIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={addYoutubeVideo}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-800"
          title="Embed YouTube Video"
        >
          <YoutubeIcon className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-4 bg-white dark:bg-zinc-900 cursor-text min-h-[400px]" onClick={() => editor.commands.focus()}>
        <EditorContent editor={editor} />
      </div>

      <MediaSelector
        isOpen={isMediaSelectorOpen}
        onClose={() => setIsMediaSelectorOpen(false)}
        multiple={false}
        onSelect={(assets) => {
          if (assets[0]) {
            editor.chain().focus().setImage({ src: assets[0].url }).run()
          }
        }}
      />
    </div>
  )
}
