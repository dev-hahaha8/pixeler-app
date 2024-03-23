import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

// Firebaseを初期化 このコードがないとエラーが起きます
import firebaseApp from '../lib/FirebaseConfig';

export default function Login() {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     const doLogin = () => {
          const auth = getAuth();

          signInWithEmailAndPassword(auth, email, password)
               .then(() => {
                    window.location.href = "/dashboard";
               })
               .catch(() => {
                    alert("ログインに失敗しました。");
               });
     }

     return (
          <div>
          <h1>ログイン</h1>
          <div>
               <Form>
                    <FormGroup>
                         <Label>メールアドレス</Label>
                         <Input
                              type="email"
                              name="email"
                              onChange={(e) => setEmail(e.target.value)}
                         />
                    </FormGroup>
                    <FormGroup>
                         <Label>パスワード</Label>
                         <Input
                              type="password"
                              name="password"
                              onChange={(e) => setPassword(e.target.value)}
                         />
                    </FormGroup>
                    <Button onClick={doLogin}>ログイン</Button>
               </Form>
               </div>
          </div>
     );
}