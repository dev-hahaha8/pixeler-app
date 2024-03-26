import { getAuth, signOut, deleteUser } from "firebase/auth";
import { useEffect, useState } from 'react';
import Link from 'next/link';

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

     const styles = {
          container: {
               maxWidth: '800px',
               margin: '20px auto',
               padding: '20px',
               border: '1px solid #ccc',
               borderRadius: '5px',
               backgroundColor: '#f9f9f9',
               color: "#111"
               },
               header: {
               fontSize: '24px',
               marginBottom: '20px',
               color: "#111"
               },
               button: {
               padding: '10px 20px',
               backgroundColor: '#007bff',
               color: '#fff',
               border: 'none',
               borderRadius: '5px',
               cursor: 'pointer',
               marginRight: '10px',
               marginTop: "15px"
               }
     };

     return (
     <div style={styles.container}>
          <h1 style={styles.header}>ダッシュボード</h1>
          <p>ログインユーザー: {user ? user.email : "未ログイン"}</p>
          <button style={styles.button} onClick={handleLogout}>ログアウト</button>
          <button style={styles.button} onClick={handleDeleteAccount}>アカウント削除</button>
     </div>
     );
}
