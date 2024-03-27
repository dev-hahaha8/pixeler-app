import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import styles from '../styles/styles.module.css';

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

     return (
          <div className={styles.container}>
          <h1 className={styles.header}>ログイン</h1>
          <div className={styles.info}>
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