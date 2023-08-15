import Image from 'next/image'
import styles from './page.module.scss'
import MainBanner from "@/l2_widgets/main_banner/mainBanner";

export default function Home() {
  return (
    <div className={styles.main}>
        <MainBanner />
      <p>Hi!</p>
      <ul>
        <li>First</li>
        <li>Second</li>
      </ul>
    </div>
  )
}
