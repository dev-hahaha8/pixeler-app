import { getAuth, signOut, deleteUser } from "firebase/auth";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/styles.module.css';

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

     return (
          <div className={styles.container}>
               <h1 className={styles.header}>ダッシュボード</h1>
               <div className={styles.info}>
                    <p>ログインユーザー: {user ? user.email : "未ログイン"}</p>

                    <p className={styles.generate}><a href="/generate">画像生成ページに移動</a></p>

                    <button className={styles.button} onClick={handleLogout}>ログアウト</button>
                    <button className={styles.button} onClick={handleDeleteAccount}>アカウント削除</button>
               </div>
          </div>
     );
}
