import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import styles from '../styles/styles.module.css';

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

     return (
     <div className={styles.container}>
          <h1 className={styles.header}>新規登録</h1>
          <div className={styles.info}>
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
