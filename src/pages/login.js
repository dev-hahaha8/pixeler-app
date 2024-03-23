import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import Link from 'next/link';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

// Firebaseの初期化を行うためfirebaseAppをインポート
import firebaseApp from '../lib/FirebaseConfig';

export default function Login() {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     const doLogin = () => {
     const auth = getAuth();

     // Firebaseで用意されているメールアドレスとパスワードでログインするための関数
     signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
          const user = userCredential.user;
               window.location.href = "/dashboard"
          })
          .catch((error) => {
               alert("ログインに失敗しました。");
          });
     }

     return (
     <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1 style={{ fontSize: '24px' }}>ログイン</h1>
          <div>
          <Form style={{ maxWidth: '400px', margin: '0 auto' }}>
               <FormGroup>
               <Label>
                    メールアドレス
               </Label>
               <Input
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "30%", margin: "5px", color: "#000"}}
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
                    style={{ width: "30%", margin: "5px", color: "#000"}}
               />
               </FormGroup>
               <Button style={{ width: '100%'}}
                    // ログインボタンがクリックされたときdoRegister関数が実行されるようにする
                    onClick={()=>{
                    doLogin();
                    }}
               >
               ログイン
               </Button>
          </Form>
          </div>
     </div>
     )
}
