'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

export default function FormPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [editorNote, setEditorNote] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    sessionStorage.setItem('postman_draft', JSON.stringify({ name, message, editorNote }))
    router.push('/amechi_afi_2ndAnniversary/confirm')
  }

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.title}>💌 あめちゃん配信2周年記念<br />サプライズメッセージ！</h1>
        <p className={styles.subtitle}>メッセージを贈ろう</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>お名前 *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className={styles.input}
              placeholder="あなたの名前"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>メッセージ *</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              rows={5}
              className={styles.textarea}
              placeholder="ふたりへのメッセージを書いてね"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>
              編集者への希望 <span className={styles.optional}>（任意・本人には非表示）</span>
            </label>
            <textarea
              value={editorNote}
              onChange={e => setEditorNote(e.target.value)}
              rows={2}
              className={styles.textarea}
              placeholder="編集の要望があれば"
            />
          </div>
          <button type="submit" className={styles.button}>確認する →</button>
        </form>
      </div>
    </main>
  )
}