import { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import styles from '../styles/styles.module.css';

export default function Generate() {
     const [prompt, setPrompt] = useState('');
     const [images, setImages] = useState([]);
     
     const handleSubmit = async (event) => {
          event.preventDefault();
          try {
          const response = await fetch('/api/generate', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ prompt: prompt })
          });
          if (!response.ok) {
               throw new Error('画像の生成に失敗しました。');
          }
          const data = await response.json();
          if (data.image) {
               setImages([...images, data.image]);
          } else {
               throw new Error('画像URLがレスポンスに含まれていません。');
          }
          setPrompt('');
          } catch (error) {
          console.error('画像の生成に失敗しました。', error);
          }
     }

     return (
     <div className={styles.container}>
          <h1 className={styles.header}>画像生成</h1>
          <div className={styles.info}>
               <p className={styles.generate}><a href="/">ダッシュボードページに移動</a></p>

               <form className={styles.form} onSubmit={handleSubmit}>
               <input
               type="text"
               placeholder="Enter a prompt"
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               className={styles.input}
               />
               <button type="submit" className={styles.button}>生成する</button>
          </form>

          <div className={styles.imageContainer}>
               {images.map((image, index) => (
               <img key={index} src={image} alt={`Generated image ${index}`} className={styles.image} />
               ))}
          </div>
          </div>
     </div>
     )
}