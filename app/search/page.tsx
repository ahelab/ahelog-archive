'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

// 左側サイドバー用のフェチ属性マスター
const FETISH_GROUPS = [
  {
    title: "身体・表情現象系",
    tags: ["アヘ顔", "白目", "寄り目", "レイプ目", "舌出し", "よだれ", "ダブルピース", "涙", "汗", "火照り", "言語崩壊"]
  },
  {
    title: "シチュエーション・要因系",
    tags: ["催眠", "ドラッグ", "キメセク", "びえん", "レイプ", "乱交", "近親相姦", "複数"]
  },
  {
    title: "心理・精神状態系",
    tags: ["快感", "恍惚", "愉悦", "忠誠", "支配", "抵抗", "服従", "恐怖", "絶望", "懇願", "感謝", "白痴化"]
  }
];

// 食べログ風のリッチな作品検索結果モックデータ
const MOCK_PRODUCTS = [
  {
    id: 'prod-1',
    title: '究極のアヘ顔表現に挑んだ堕落の2時間超えスペシャル',
    actress: 'アヘ乃しずく',
    maker: 'AHE-LABO',
    avgScore: 4.8,
    reviewsCount: 42,
    tags: ['アヘ顔', '白目', 'レイプ', '恍惚', 'よだれ'],
    description: '45分過ぎの主観アングルからの展開がまさに「芯を食ってる」表現。従来の記号的な白目ではなく、脳の回路が完全にショートしていくリアルな焦燥感が表情の歪みだけで見事に演技されている。',
    releaseDate: '2026/06/15'
  },
  {
    id: 'prod-2',
    title: '清楚な生徒会長が催眠で堕ちる狂気の一夜',
    actress: '如月かれん',
    maker: '催眠キネマ',
    avgScore: 4.3,
    reviewsCount: 28,
    tags: ['催眠', '服従', 'よだれ', '白痴化'],
    description: 'プライドが完全に崩壊し、懇願するような絶望の表情へのグラデーションが秀逸。中盤のデスクシーンでの虚ろな寄り目はマニア必見の最重要チャプター。',
    releaseDate: '2026/06/10'
  },
  {
    id: 'prod-3',
    title: '絶対服従ダークエルフ：言語崩壊の限界調教',
    actress: 'エルザ・シルヴァ',
    maker: 'ファンタジー・フェチ',
    avgScore: 4.6,
    reviewsCount: 15,
    tags: ['言語崩壊', '服従', 'レイプ', '屈服', '涙'],
    description: '強気なキャラクターが完全に屈服し、言語が崩壊していくプロセスを精緻にアーカイブ。声のトーンが完全に理性を失っており、聴覚的にも脳が溶ける傑作。',
    releaseDate: '2026/06/02'
  }
];

function SearchResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URLの ?tag=xxx からパラメータを取得
  const initialTag = searchParams.get('tag');

  // 食べログの左側サイドバーのように、チェックボックスで複数条件を選べる状態を管理
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'standard' | 'score' | 'reviews'>('standard');

  // 初期読み込み時にURLのタグをチェック状態にする
  useEffect(() => {
    if (initialTag) {
      setSelectedTags([initialTag]);
    }
  }, [initialTag]);

  // チェックボックスの切り替え処理
  const handleCheckboxChange = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // 条件バッジの「✕」を押して個別に外す処理
  const removeTag = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  // 選択されたすべての条件を満たす作品をフィルタリング
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    if (selectedTags.length === 0) return true; // 条件なしなら全件表示
    return selectedTags.every(tag => product.tags.includes(tag));
  });

  // 並び替えロジック
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'score') return b.avgScore - a.avgScore;
    if (sortOrder === 'reviews') return b.reviewsCount - a.reviewsCount;
    return 0; // 標準（日付順など）
  });

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-20">
      
      {/* ヘッダーエリア */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => router.push('/')}>
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-600 tracking-wider">
              ahelog
            </h1>
            <p className="text-[10px] text-slate-500 font-mono hidden sm:block">AHEGAO TIMESTAMP & FETISH DATABASE</p>
          </div>
          <button 
            onClick={() => router.push('/')}
            className="text-xs text-slate-400 hover:text-white bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 transition-all"
          >
            ← トップに戻る
          </button>
        </div>
      </header>

      {/* パンくずリスト（食べログリスペクト） */}
      <div className="bg-slate-950/30 border-b border-slate-850 py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[11px] text-slate-500">
          <span className="hover:text-rose-400 cursor-pointer" onClick={() => router.push('/')}>ahelog TOP</span>
          <span>&gt;</span>
          <span className="hover:text-rose-400 cursor-pointer">全国の公認アーカイブ</span>
          <span>&gt;</span>
          <span className="text-slate-300 font-medium">条件検索結果</span>
        </div>
      </div>

      {/* メインレイアウト：2カラム構成（左：サイドバー、右：検索結果） */}
      <div className="max-w-7xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* ==================== 左側：絞り込みサイドバー ==================== */}
        <aside className="bg-slate-950 border border-slate-850 rounded-2xl p-5 shadow-xl sticky top-24">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              🔍 条件から探す
            </h3>
            {selectedTags.length > 0 && (
              <button 
                onClick={() => setSelectedTags([])} 
                className="text-[11px] text-rose-400 hover:underline"
              >
                全てクリア
              </button>
            )}
          </div>

          {/* フェチグループごとのチェックボックスリスト */}
          <div className="space-y-5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 custom-scrollbar">
            {FETISH_GROUPS.map((group) => (
              <div key={group.title} className="space-y-2">
                <h4 className="text-[11px] font-bold text-slate-400 bg-slate-900/60 px-2 py-1 rounded border border-slate-850">
                  {group.title}
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5 pl-1">
                  {group.tags.map((tag) => {
                    const isChecked = selectedTags.includes(tag);
                    return (
                      <label 
                        key={tag} 
                        className="flex items-center gap-2 text-xs text-slate-300 hover:text-white cursor-pointer py-0.5"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCheckboxChange(tag)}
                          className="rounded border-slate-800 bg-slate-900 text-rose-500 focus:ring-rose-500/35 focus:ring-offset-0 w-3.5 h-3.5 transition-colors"
                        />
                        <span className={isChecked ? "text-rose-400 font-bold" : ""}>#{tag}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800">
            <button 
              onClick={() => alert('この条件で固定して再検索します（現在のチェック状態で同期中）')}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-lg transition-all text-center"
            >
              この条件で検索する
            </button>
          </div>
        </aside>


        {/* ==================== 右側：メイン検索結果 ==================== */}
        <section className="lg:col-span-3 space-y-4">
          
          {/* タイトルと現在の選択タグバッジ */}
          <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5 shadow-xl">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                全国の公認作品、アーカイブ
                <span className="text-xs text-slate-500 font-normal">（{sortedProducts.length}件ヒット）</span>
              </h2>
            </div>

            {/* 選択中のフェチタグバッジリスト（食べログの「カップルシートあり✕」を完全再現） */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[11px] text-slate-500 mr-1">現在の選択条件:</span>
              {selectedTags.length > 0 ? (
                selectedTags.map(tag => (
                  <span 
                    key={tag}
                    className="inline-flex items-center gap-1 text-[11px] bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2.5 py-0.5 rounded-lg font-medium"
                  >
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-rose-200 ml-0.5 font-bold">✕</button>
                  </span>
                ))
              ) : (
                <span className="text-[11px] text-slate-400 italic">すべてのフェチ属性</span>
              )}
            </div>
          </div>

          {/* 並び替えタブ（標準、ランキング、投稿数順） */}
          <div className="flex border-b border-slate-800 bg-slate-950/40 rounded-xl p-1 gap-1">
            <button
              onClick={() => setSortOrder('standard')}
              className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
                sortOrder === 'standard' ? 'bg-slate-800 text-rose-400 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              標準順
            </button>
            <button
              onClick={() => setSortOrder('score')}
              className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
                sortOrder === 'score' ? 'bg-slate-800 text-rose-400 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ★アヘ指数 高い順
            </button>
            <button
              onClick={() => setSortOrder('reviews')}
              className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
                sortOrder === 'reviews' ? 'bg-slate-800 text-rose-400 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              タイムスタンプ投稿数順
            </button>
          </div>

          {/* 作品リスト（食べログの一覧カードをリスペクトしたリッチなレイアウト） */}
          <div className="space-y-4">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((prod) => (
                <div 
                  key={prod.id}
                  onClick={() => router.push('/product')}
                  className="bg-slate-950 border border-slate-850 rounded-2xl p-5 hover:border-slate-700 transition-all shadow-xl flex flex-col md:flex-row gap-5 cursor-pointer group"
                >
                  {/* サムネイル画像枠 */}
                  <div className="w-full md:w-32 h-44 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-2xl text-slate-600 shrink-0 group-hover:border-rose-500/30 transition-colors">
                    🎬
                    <span className="text-[9px] mt-2 text-slate-500 font-mono tracking-widest">AHELOG IMAGE</span>
                  </div>

                  {/* メインコンテンツ */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* メーカー・登録日メタ */}
                      <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                        <span>{prod.maker}</span>
                        <span>登録: {prod.releaseDate}</span>
                      </div>

                      {/* 作品名（食べログの店名部分） */}
                      <h3 className="text-base font-bold text-slate-100 group-hover:text-rose-400 transition-colors mt-1 leading-snug line-clamp-1">
                        {prod.title}
                      </h3>

                      {/* スコア・レビュー数（食べログの点数表示部分） */}
                      <div className="flex items-center gap-3 mt-2 text-xs bg-slate-900/50 border border-slate-850 rounded-xl px-3 py-1.5 w-fit">
                        <span className="font-black text-amber-400 flex items-center gap-1">
                          ★ {prod.avgScore.toFixed(1)}
                        </span>
                        <span className="text-slate-500 text-[11px]">
                          タイムスタンプ投稿: <span className="text-slate-300 font-bold font-mono">{prod.reviewsCount}件</span>
                        </span>
                        <span className="text-slate-600">|</span>
                        <span className="text-[11px] text-pink-400 font-medium">
                          出演: {prod.actress}
                        </span>
                      </div>

                      {/* レビュー抜粋（食べログの口コミ抜粋部分） */}
                      <p className="text-xs text-slate-400 mt-3 line-clamp-2 bg-slate-900/20 p-2.5 rounded-xl border border-slate-900 leading-relaxed">
                        <span className="text-emerald-400 font-bold mr-1">💬 公認レビュー抜粋:</span>
                        {prod.description}
                      </p>
                    </div>

                    {/* タグ情報（下部にきれいに並べる） */}
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-900">
                      {prod.tags.map(t => {
                        const isMatchingFilter = selectedTags.includes(t);
                        return (
                          <span 
                            key={t} 
                            className={`text-[10px] px-2 py-0.5 rounded-md border font-mono ${
                              isMatchingFilter 
                                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold' 
                                : 'bg-slate-900 text-slate-500 border-slate-850'
                            }`}
                          >
                            #{t}
                          </span>
                        );
                      })}
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-slate-950 border border-slate-850 rounded-2xl text-slate-500 text-sm">
                選択されたすべてのフェチ属性を満たすアーカイブ作品がありません。<br />
                <span className="text-xs text-slate-600 mt-2 block">絞り込み条件をいくつか外すとヒットしやすくなります。</span>
              </div>
            )}
          </div>

        </section>

      </div>
    </main>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
          <p className="text-sm text-slate-400">検索条件を読み込んでいます...</p>
        </main>
      }
    >
      <SearchResultsContent />
    </Suspense>
  );
}
