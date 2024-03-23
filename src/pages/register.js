import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

// Firebaseの初期化を行うためfirebaseAppをインポート
import firebaseApp from '../lib/FirebaseConfig';

export default function Register() {
     // useStateでユーザーが入力したメールアドレスとパスワードをemailとpasswordに格納する
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     // ユーザーが登録ボタンを押したときにdoRegister関数が実行される
     const doRegister = () => {
     const auth = getAuth();

     // Firebaseで用意されているユーザー登録の関数
     createUserWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
          window.location.href = "/dashboard"
     })
     .catch((error) => {
          alert("登録に失敗しました。");
     });
     }

     return (
     <div>
          <h1>新規登録</h1>
          <div>
          <Form>
               <FormGroup>
               <Label>
                    メールアドレス
               </Label>
               <Input
                    type="email"
                    name="email"
                    // onChangeでユーザーが入力した値を取得し、その値をemailに入れる
                    onChange={(e) => setEmail(e.target.value)}
               />
               </FormGroup>
               <FormGroup>
               <Label>
                    パスワード
               </Label>
               <Input
                    type="password"
                    name="password"
                    // onChangeでユーザーが入力した値を取得し、その値をpasswordに入れる
                    onChange={(e) => setPassword(e.target.value)}
               />
               </FormGroup>
               <Button onClick={doRegister}>新規登録</Button>
          </Form>
          </div>
     </div>
     )
}
