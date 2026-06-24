'use client';

import React, { useState } from 'react';

const PRODUCT_DATA = {
  title: '究極のアヘ顔表現に挑んだ堕落の2時間超えスペシャル',
  actress: 'アヘ乃しずく',
  maker: 'AHE-LABO',
  releaseDate: '2026-06-21',
  avgScore: 4.8,
  reviewCount: 3,
};

// 【スレッド型データ構造】
// タイムスタンプ（秒数）を親にして、そこに複数のマニアのレビューをぶら下げる
const NESTED_TIMESTAMPS = [
  {
    id: "ts-1",
    time: "⏱ 00:45:12 ～ 00:45:45",
    description: "本編中盤、限界を迎えるブレイクポイント。マニア必見の最重要チャプター。",
    reviews: [
      {
        id: 1,
        reviewer: 'アヘ仙人',
        score: 5,
        tags: ['白目', 'よだれ', '言語崩壊', '恍惚'],
        comment: '45分過ぎの主観アングルからの展開がまさに「芯を食ってる」表現。従来の記号的な白目ではなく、脳の回路が完全にショートしていくリアルな焦燥感が表情の歪みだけで見事に演技されている。これぞ2020年代後半のネオ・アヘ顔表現の金字塔。',
        date: '2時間前'
      },
      {
        id: 2,
        reviewer: '声フェチの極み',
        score: 4,
        tags: ['言語崩壊', '懇願'],
        comment: 'アヘ仙人さんの意見に完全に同意。さらに付け加えるなら、このシーンでかすかに発せられる「あ、うあ…」という声のトーンが完全に理性を失っており、聴覚的にも脳が溶ける。',
        date: '1時間前'
      }
    ]
  },
  {
    id: "ts-2",
    time: "⏱ 01:12:30 ～ 01:13:10",
    description: "終盤のシチュエーション。精神的な変化に着目。",
    reviews: [
      {
        id: 3,
        reviewer: 'シチュ派の重鎮',
        score: 5,
        tags: ['寄り目', '服従', '絶望'],
        comment: '清楚系の女優さんがこの時間帯だけ見せるギャップが凄まじい。プライドが完全に崩壊し、懇願するような絶望の表情へのグラデーションは、ahelogユーザーなら全員失神モノの歴史的名シーン。',
        date: '1日前'
      }
    ]
  }
];

export default function ProductDetailPage() {
  // アコーディオンの開閉状態を管理する（デフォルトは開いておく）
  const [openThreads, setOpenThreads] = useState<{[key: string]: boolean}>({ "ts-1": true, "ts-2": true });

  const toggleThread = (id: string) => {
    setOpenThreads(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-6">
          <a href="/" className="text-xs text-rose-400 hover:underline">← 投稿画面へ戻る</a>
        </div>

        {/* 作品基本情報エリア */}
        <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl bg-gradient-to-b from-slate-800 to-slate-900">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-48 h-64 bg-slate-950 rounded-xl border border-slate-700 flex flex-col items-center justify-center text-center p-4 text-slate-500 shadow-inner">
              <span className="text-xs font-bold text-rose-500 mb-2">ahelog ARCHIVE IMAGE</span>
              <span className="text-2xl">📸</span>
              <span className="text-[10px] mt-2">FANZA JACKET</span>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="bg-rose-500/10 text-rose-400 text-xs font-bold px-2.5 py-1 rounded border border-rose-500/20">
                  メーカー：{PRODUCT_DATA.maker}
                </span>
                <h1 className="text-2xl font-extrabold mt-3 tracking-tight text-white leading-snug">
                  {PRODUCT_DATA.title}
                </h1>
                <p className="text-slate-400 text-sm mt-2">
                  出演女優:{' '}
                  <span 
                    onClick={() => window.location.href = '/actress'}
                    className="text-pink-400 hover:text-pink-300 font-bold text-base cursor-pointer hover:underline underline-offset-4 decoration-pink-500/40 transition-colors"
                  >
                    {PRODUCT_DATA.actress}
                  </span>
                </p>

                {/* 👇 ここに「タイムスタンプを投稿する」ボタンを追加しました */}
                <div className="mt-4">
                  <button 
                    onClick={() => window.location.href = '/submit'} 
                    className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-1.5 transition-colors"
                  >
                    <span>+</span> タイムスタンプを投稿する
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-6">
                <div>
                  <div className="text-xs text-slate-400 font-medium">総合アヘ指数</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-3xl font-black text-amber-400">★ {PRODUCT_DATA.avgScore.toFixed(1)}</span>
                    <span className="text-slate-500 text-xs">/ 5.0 ({PRODUCT_DATA.reviewCount}件のレビュー)</span>
                  </div>
                </div>
                <button className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-lg ml-auto">
                  🛒 FANZAで確認
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 運営公認レビュー：スレッドネスト型（核心） */}
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span>📊 タイムスタンプ別・公認スレッド</span>
              <span className="text-xs font-normal text-slate-400">（同一シーンの複数視点を格納）</span>
            </h2>
          </div>

          <div className="space-y-6">
            {NESTED_TIMESTAMPS.map((thread) => {
              const isOpen = openThreads[thread.id];
              return (
                <div key={thread.id} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                  
                  {/* タイムスタンプの「親ヘッダー」 */}
                  <div 
                    onClick={() => toggleThread(thread.id)}
                    className="bg-slate-900 border-b border-slate-800 p-4 flex flex-wrap items-center justify-between gap-3 cursor-pointer hover:bg-slate-850 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-rose-400 font-black text-lg bg-rose-500/10 px-3 py-1 rounded-xl border border-rose-500/20 shadow-inner">
                        {thread.time}
                      </span>
                      <span className="text-xs text-slate-400 hidden sm:inline">{thread.description}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-500/15 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-500/20">
                        公認レビュー {thread.reviews.length} 件
                      </span>
                      <span className="text-slate-500 text-sm">{isOpen ? '🔼' : '🔽'}</span>
                    </div>
                  </div>

                  {/* ぶら下がっている「ユーザーレビュー（子）」たち */}
                  {isOpen && (
                    <div className="p-4 space-y-4 bg-slate-950 divide-y divide-slate-905">
                      {thread.reviews.map((review, idx) => (
                        <div key={review.id} className={`pt-4 first:pt-0`}>
                          {/* レビューヘッダー */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-300 text-sm">{review.reviewer}</span>
                              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-emerald-500/20">
                                ✓ Verified
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-amber-400 font-bold text-xs">{'★'.repeat(review.score)}</span>
                              <span className="text-slate-500 text-[11px]">{review.date}</span>
                            </div>
                          </div>

                          {/* タグリスト */}
                          <div className="flex flex-wrap gap-1 mb-2">
                            {review.tags.map(tag => (
                              <span key={tag} className="bg-slate-900 border border-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded-md">
                                #{tag}
                              </span>
                            ))}
                          </div>

                          {/* レビューコメント */}
                          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line pl-1 border-l-2 border-slate-800">
                            {review.comment}
                          </p>

                          <div className="mt-3 flex justify-end">
                            <button className="text-[11px] text-slate-500 hover:text-rose-400 transition-colors bg-slate-900/40 px-2.5 py-1 rounded border border-slate-850">
                              👍 なるほど (12)
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </main>
  );
}