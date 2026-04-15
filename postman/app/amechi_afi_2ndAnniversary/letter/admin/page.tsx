'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import styles from './admin.module.css'

type Message = {
  id: string
  name: string
  message: string
  editor_note: string | null
  hidden: boolean
  created_at: string
}

export default function AdminPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true })
    setMessages(data ?? [])
    setLoading(false)
  }

  const toggleHidden = async (id: string, current: boolean) => {
    await supabase.from('messages').update({ hidden: !current }).eq('id', id)
    setMessages(prev => prev.map(m => m.id === id ? { ...m, hidden: !current } : m))
  }

  useEffect(() => { fetchMessages() }, [])

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>管理者ページ</h1>
        <p className={styles.subtitle}>全メッセージ・editor_note表示</p>
        {loading ? (
          <p className={styles.empty}>読み込み中...</p>
        ) : !messages.length ? (
          <p className={styles.empty}>メッセージがありません</p>
        ) : (
          <div className={styles.list}>
            {messages.map(m => (
              <div key={m.id} className={`${styles.card} ${m.hidden ? styles.hidden : ''}`}>
                <div className={styles.cardBody}>
                  <p className={styles.name}>{m.name}</p>
                  <p className={styles.message}>{m.message}</p>
                  {m.editor_note && (
                    <div className={styles.editorNote}>📝 {m.editor_note}</div>
                  )}
                  <p className={styles.date}>{new Date(m.created_at).toLocaleString('ja-JP')}</p>
                </div>
                <button
                  onClick={() => toggleHidden(m.id, m.hidden)}
                  className={m.hidden ? styles.showButton : styles.hideButton}
                >
                  {m.hidden ? '表示する' : '非表示'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}