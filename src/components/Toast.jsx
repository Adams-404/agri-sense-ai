import { useApp } from '../context/AppContext'

export default function Toast() {
  const { toast } = useApp()
  if (!toast) return null
  return (
    <div className={`toast ${toast.type} show`}>
      {toast.msg}
    </div>
  )
}
