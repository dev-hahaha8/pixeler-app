import OpenAI from 'openai';

const openai = new OpenAI();

export default async function handler(req, res) {
     if (req.method === 'POST') {
     try {
          const { prompt } = req.body;
          const imageResponse = await openai.images.generate({
          model: 'dall-e-3',
          prompt: prompt,
          n: 1,
          size: '1024x1024',
          });

          const imageUrl = imageResponse.data[0].url;
          if (!imageUrl) {
          return res.status(500).json({ error: '画像の生成に失敗しました。' });
          }

          res.status(200).json({ image: imageUrl });
     } catch (error) {
          res.status(500).json({
          error: '画像の生成に失敗しました。',
          details: error.message,
          });
     }
     } else {
     res.status(405).json({ error: 'POSTメソッドのみ許可されています。' });
     }
}
