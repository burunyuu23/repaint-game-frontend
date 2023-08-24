import styles from './page.module.scss'
import MainBanner from "@/l2_widgets/main_banner/mainBanner";
import LoginPanel from "@/l2_widgets/login_panel/loginPanel";
import RegisterPanel from "@/l2_widgets/register_panel/registerPanel";

export default function Home() {
  return (
    <div className={styles.main}>

      <LoginPanel />
      <RegisterPanel />

        <MainBanner />

      <p>Hi!</p>
      <ul>
        <li>First</li>
        <li>Second</li>
          <li>First</li>
          <li>Second</li>
          <li>First</li>
          <li>Second</li>
          <li>First</li>
          <li>Second</li>
          <li>First</li>
          <li>Second</li>
          <li>First</li>
          <li>Second</li>
          <li>First</li>
          <li>Second</li>
          <li>First</li>
          <li>Second</li>
          <li>First</li>
          <li>Second</li>
          <li>First</li>
          <li>Second</li>
          <li>First</li>
          <li>Second</li>
          <li>First</li>
          <li>Second</li>
          <li>First</li>
          <li>Second</li>
          <li>First</li>
          <li>Second</li>
          <li>First</li>
          <li>Second</li>
          <li>First</li>
          <li>Second</li>
          <li>First</li>
          <li>Second</li>
          <li>First</li>
          <li>Second</li>
          <li>First</li>
          <li>Second</li>
          <li>First</li>
          <li>Second</li>
          <li>First</li>
          <li>Second</li>
      </ul>
    </div>
  )
}
