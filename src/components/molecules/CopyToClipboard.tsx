'use client'
import { Copy } from 'lucide-react'
import { useToast } from './Toaster/use-toast'

interface CopyToClipboardProps {
  text: string
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text }) => {
  const { toast } = useToast()
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(text)
      toast({ title: `Text ${text} copied.` })
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="flex items-center bg-white justify-between px-4 py-3 rounded-md shadow-lg">
      <span className="font-mono text-gray-800">{text}</span>
      <button
        onClick={handleCopyClick}
        className="text-blue-500 hover:text-blue-700 focus:outline-none"
      >
        <Copy />
      </button>
    </div>
  )
}
