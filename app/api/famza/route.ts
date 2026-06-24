import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // URLからクエリパラメータ（検索キーワード）を取得
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword') || 'アヘ顔';

  // 🔴 ご自身のFANZA（DMM）アフィリエイト情報をここに設定してください
  // ※環境変数が未設定の間、動作確認用に直接文字列を貼っても動きます
  const API_ID = process.env.FANZA_API_ID || 'YOUR_API_ID_HERE';
  const AFFILIATE_ID = process.env.FANZA_AFFILIATE_ID || 'YOUR_AFFILIATE_ID_HERE';

  // もし初期値のままであれば、プレースホルダーとして動作、またはエラーを回避
  if (API_ID === 'YOUR_API_ID_HERE') {
    return NextResponse.json({
      success: true,
      message: 'APIテストモード（認証キー未設定）',
      works: [
        {
          id: 'mock001',
          title: '【サンプルデータ】至高の表情コレクション Vol.1',
          url: 'https://www.dmm.co.jp/',
          image: 'https://pics.dmm.co.jp/mono/movie/adult/1apns00216/1apns00216pl.jpg', // ダミーのサンプルジャケット
          maker: 'アヘラボ出版'
        }
      ]
    });
  }

  // FANZA 商品検索API v3 エンドポイント
  const fanzaUrl = `https://api.dmm.com/affiliate/v3/ItemList?api_id=${API_ID}&affiliate_id=${AFFILIATE_ID}&site=FANZA&output=json&keyword=${encodeURIComponent(keyword)}&hits=20`;

  try {
    const response = await fetch(fanzaUrl, { method: 'GET' });
    
    if (!response.ok) {
      throw new Error(`FANZA API returned status ${response.status}`);
    }

    const data = await response.json();

    // データの整形（フロントエンドでそのまま使いやすいようにマッピング）
    const works = data.result?.items?.map((item: any) => ({
      id: item.content_id,
      title: item.title,
      url: item.affiliateURL, // アフィリエイトリンク
      image: item.imageURL?.large || item.imageURL?.list, // ジャケット画像優先
      maker: item.iteminfo?.maker?.[0]?.name || '単体作品',
    })) || [];

    return NextResponse.json({ success: true, works });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || '内部エラーが発生しました' },
      { status: 500 }
    );
  }
}