import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import styles from '../styles/styles.module.css';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import firebaseApp from '../lib/FirebaseConfig';

export default function Register() {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const doRegister = () => {
     const auth = getAuth();

     createUserWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
          window.location.href = "/"
     })
     .catch((error) => {
          alert("登録に失敗しました。");
     });
     }

     const [menuOpen, setMenuOpen] = useState(false);
     const toggleMenu = () => {
          setMenuOpen(!menuOpen);
     };

     return (
     <div className={styles.container}>
               <Head>
                    <title>Regsiter - Pixeler</title>
               </Head>
               <div className={styles.top}>
                    <input type="checkbox" id="menu-toggle" className={styles.menuToggle} checked={menuOpen} onChange={toggleMenu} />
                    <label htmlFor="menu-toggle" className={styles.menuToggleLabel}><FontAwesomeIcon icon={faBars} /></label>
                    <div className={`${styles.menu} ${menuOpen ? styles.active : ''}`}>
                    <ul>
                         <li><a href="/">ホーム</a></li>
                         <li><a href="/generate">画像生成</a></li>
                    </ul>
                    </div>
                    <div className={styles.logo}>
                    <a href="/">
                         <img src="/logo.png"/>
                    </a>
                    </div>
               </div>
          <div className={styles.info_board}>
          <h1>新規登録</h1>
          <Form>
               <FormGroup>
               <Label>
                    メールアドレス
               </Label>
               <Input
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
               />
               </FormGroup>
               <FormGroup>
               <Label>
                    パスワード
               </Label>
               <Input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
               />
               </FormGroup>
               <Button className={styles.button} onClick={doRegister}>新規登録</Button>
               <a href="/login" className={styles.link_text}>ログインする</a>
          </Form>
          </div>
     </div>
     )
}
