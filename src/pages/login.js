import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

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
               input: {
               backgroundColor: "#E8F0FE",
               color: "#111",
               margin: "5px",
               padding: "5px 20px",
               borderRadius: "5px"
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
          <h1 style={styles.header}>ログイン</h1>
          <div>
               <Form>
                    <FormGroup>
                         <Label>メールアドレス</Label>
                         <Input
                              type="email"
                              name="email"
                              onChange={(e) => setEmail(e.target.value)}
                              style={styles.input}
                         />
                    </FormGroup>
                    <FormGroup>
                         <Label>パスワード</Label>
                         <Input
                              type="password"
                              name="password"
                              onChange={(e) => setPassword(e.target.value)}
                              style={styles.input}
                         />
                    </FormGroup>
                    <Button style={styles.button} onClick={doLogin}>ログイン</Button>
                    <a href="/register">新規登録する</a>
               </Form>
               </div>
          </div>
     );
}