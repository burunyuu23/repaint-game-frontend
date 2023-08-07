import Image from 'next/image'
import styles from './page.module.scss'

export default function Home() {
  return (
    <div className={styles.main}>
      <p>Hi!</p>
      <ul>
        <li>First</li>
        <li>Second</li>
      </ul>
    </div>
  )
}
