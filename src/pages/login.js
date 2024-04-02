import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import styles from '../styles/styles.module.css';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import firebaseApp from '../lib/FirebaseConfig';

export default function Login() {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     const doLogin = () => {
          const auth = getAuth();

          signInWithEmailAndPassword(auth, email, password)
               .then(() => {
                    window.location.href = "/";
               })
               .catch(() => {
                    alert("ログインに失敗しました。");
               });
     }

     const [menuOpen, setMenuOpen] = useState(false);
     const toggleMenu = () => {
          setMenuOpen(!menuOpen);
     };

     return (
          <div className={styles.container}>
               <Head>
                    <title>Login - Pixeler</title>
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
          <div className={styles.info_board}>
          <h1>ログイン</h1>
               <Form>
                    <FormGroup>
                         <Label>メールアドレス</Label>
                         <Input
                              type="email"
                              name="email"
                              onChange={(e) => setEmail(e.target.value)}
                              className={styles.input}
                         />
                    </FormGroup>
                    <FormGroup>
                         <Label>パスワード</Label>
                         <Input
                              type="password"
                              name="password"
                              onChange={(e) => setPassword(e.target.value)}
                              className={styles.input}
                         />
                    </FormGroup>
                    <Button className={styles.button} onClick={doLogin}>ログイン</Button>
                    <a href="/register" className={styles.link_text}>新規登録する</a>
               </Form>
               </div>
          </div>
     );
}