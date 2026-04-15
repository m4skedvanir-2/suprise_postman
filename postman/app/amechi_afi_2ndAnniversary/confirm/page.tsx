'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import styles from './confirm.module.css'

export default function ConfirmPage() {
  const router = useRouter()
  const [draft, setDraft] = useState<{ name: string; message: string; editorNote: string } | null>(null)
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem('postman_draft')
    if (!raw) { router.push('/amechi_afi_2ndAnniversary'); return }
    setDraft(JSON.parse(raw))
  }, [router])

  const handleSend = async () => {
    if (!draft) return
    setSending(true)
    const { error } = await supabase.from('messages').insert({
      name: draft.name,
      message: draft.message,
      editor_note: draft.editorNote || null,
    })
    if (!error) {
      sessionStorage.removeItem('postman_draft')
      setDone(true)
    } else {
      alert('送信に失敗しました。もう一度試してください。')
      setSending(false)
    }
  }

  if (done) return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={styles.doneIcon}>💌</div>
        <h2 className={styles.doneTitle}>送信しました！</h2>
        <p className={styles.doneText}>メッセージが届きました。ありがとう！</p>
      </div>
    </main>
  )

  if (!draft) return null

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.title}>内容を確認してね</h1>
        <div className={styles.fields}>
          <div className={styles.field}>
            <p className={styles.fieldLabel}>お名前</p>
            <p className={styles.fieldValue}>{draft.name}</p>
          </div>
          <div className={styles.field}>
            <p className={styles.fieldLabel}>メッセージ</p>
            <p className={styles.fieldValue}>{draft.message}</p>
          </div>
          {draft.editorNote && (
            <div className={styles.field}>
              <p className={styles.fieldLabel}>編集者への希望</p>
              <p className={styles.fieldValue}>{draft.editorNote}</p>
            </div>
          )}
        </div>
        <div className={styles.actions}>
          <button onClick={() => router.push('/amechi_afi_2ndAnniversary')} className={styles.backButton}>
            ← 戻る
          </button>
          <button onClick={handleSend} disabled={sending} className={styles.sendButton}>
            {sending ? '送信中...' : '送信する 💌'}
          </button>
        </div>
      </div>
    </main>
  )
}