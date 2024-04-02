import { getAuth, signOut, deleteUser } from "firebase/auth";
import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/styles.module.css';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import firebaseApp from '../lib/FirebaseConfig';

export default function Dashboard() {
     const [user, setUser] = useState(null);

     useEffect(() => {
     const auth = getAuth();
     const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
          setUser(user);
          } else {
          window.location.href = "/login";
          }
     });

     return () => unsubscribe();
     }, []);

     const handleLogout = () => {
     const auth = getAuth();
     signOut(auth)
          .then(() => {
          window.location.href = "/login";
          })
          .catch(error => {
          console.error("ログアウト時にエラーが発生しました: ", error);
          });
     };

     const handleDeleteAccount = () => {
          const isConfirmed = confirm("アカウントを削除してもよろしいですか？");
          if (isConfirmed) {
               const auth = getAuth();
               deleteUser(auth.currentUser)
               .then(() => {
                    window.location.href = "/register";
               })
               .catch(error => {
                    console.error("アカウント削除時にエラーが発生しました: ", error);
               });
          } else {}
     };

     const [menuOpen, setMenuOpen] = useState(false);
     const toggleMenu = () => {
          setMenuOpen(!menuOpen);
     };

     return (
          <div className={styles.container}>
               <Head>
                    <title>Pixeler</title>
               </Head>
               <div className={styles.header}>
                    <input type="checkbox" id="menu-toggle" className={styles.menuToggle} checked={menuOpen} onChange={toggleMenu} />
                    <label htmlFor="menu-toggle" className={styles.menuToggleLabel}><FontAwesomeIcon icon={faBars} /></label>
                    <div className={`${styles.menu} ${menuOpen ? styles.active : ''}`}>
                    <ul>
                         <li><a href="/">ホーム</a></li>
                         <li><a href="/generate">画像生成</a></li>
                         <li><a href="/setting">設定</a></li>
                    </ul>
                    </div>
                    <div className={styles.logo}>
                    <a href="/">
                         <img src="/logo.png"/>
                    </a>
                    </div>
               </div>
               <div className={styles.info}>
                    <h1>アカウント情報</h1>
                    <p>登録しているメールアドレス: {user ? user.email : "未ログイン"}</p>

                    <button className={styles.button} onClick={handleLogout}>ログアウト</button>
                    <button className={styles.button} onClick={handleDeleteAccount}>アカウント削除</button>
               </div>
          </div>
     );
}
