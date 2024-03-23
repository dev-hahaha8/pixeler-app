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
          // ユーザー登録すると自動的にログインされてuserCredential.userでユーザーの情報を取得できる
          const user = userCredential.user;
          // ユーザー登録ができたかどうかをわかりやすくするためのアラート
          window.location.href = "/login"
     })
     .catch((error) => {
          alert("登録に失敗しました。");
     });
     }

     return (
     <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1 style={{ fontSize: '24px' }}>新規登録</h1>
          <div>
          <Form style={{ maxWidth: '400px', margin: '0 auto' }}>
               <FormGroup>
               <Label>
                    メールアドレス
               </Label>
               <Input
                    type="email"
                    name="email"
                    // onChangeでユーザーが入力した値を取得し、その値をemailに入れる
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
                    // onChangeでユーザーが入力した値を取得し、その値をpasswordに入れる
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '30%', margin: "5px", color: "#000"}}
               />
               </FormGroup>
               <Button style={{ width: '100%'}}
                    // 登録ボタンがクリックされたときdoRegister関数が実行されるようにする
                    onClick={()=>{
                    doRegister();
                    }}
               >
               登録
               </Button>
          </Form>
          </div>
     </div>
     )
}
