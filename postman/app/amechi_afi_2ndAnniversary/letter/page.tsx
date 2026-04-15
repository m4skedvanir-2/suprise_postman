import { supabase } from '@/lib/supabase'
import styles from './letter.module.css'

export const revalidate = 60

export default async function LetterPage() {
  const { data: messages } = await supabase
    .from('messages')
    .select('id, name, message, created_at')
    .eq('hidden', false)
    .order('created_at', { ascending: true })

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>💌 あめちゃん配信2週年おめでとう！</h1>
        <p className={styles.subtitle}>メッセージ</p>
        {!messages?.length ? (
          <p className={styles.empty}>まだメッセージがありません</p>
        ) : (
          <div className={styles.grid}>
            {messages.map(m => (
              <div key={m.id} className={styles.card}>
                <p className={styles.message}>{m.message}</p>
                <p className={styles.name}>— {m.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}