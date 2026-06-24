'use client';

import React, { useState } from 'react';

// 審査待ちのダミーデータ（ユーザーから送られてきたばかりの剥き出しの投稿）
const INITIAL_PENDING_REVIEWS = [
  {
    id: 101,
    productTitle: '究極のアヘ顔表現に挑んだ堕落の2時間超えスペシャル',
    actress: 'アヘ乃しずく',
    reviewer: '新進気鋭のマニア',
    score: 5,
    timestamp: '01:55:20 ～ 01:56:05',
    tags: ['アヘ顔', '白目', '涙', 'よだれ', '絶望'],
    comment: '本編ラストの5分。これまでの快感のグラデーションの総決算として、完全に視線が定まらなくなり、生理的な涙とよだれが完全にシンクロしている。単なるポーズではない、女優の演技の「魂」を感じるアヘ顔。これは公式Verifiedに登録されるべき。',
    submittedAt: '10分前'
  },
  {
    id: 102,
    productTitle: '清楚な生徒会長が催眠で堕ちる狂気の一夜',
    actress: '如月かれん',
    reviewer: '通りすがりのフェチスト',
    score: 3,
    timestamp: '00:22:15 ～ 00:22:40',
    tags: ['寄り目', '催眠', '恐怖'],
    comment: '白目ではなく、あえての「寄り目」でトビ具合を表現しているのがマニアックで良い。ただ、カメラワークが少し遠いのが惜しい。',
    submittedAt: '25分前'
  }
];

export default function AdminDashboard() {
  const [reviews, setReviews] = useState(INITIAL_PENDING_REVIEWS);

  // 承認・却下のアクション（モック動作）
  const handleAction = (id: number, type: 'approve' | 'reject') => {
    alert(`${id}番のレビューを${type === 'approve' ? '承認（Verifiedとして公開）' : '却下'}しました。`);
    setReviews(reviews.filter(r => r.id !== id));
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* 管理者ヘッダー（サイバーグリーン仕様） */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-emerald-500/30 pb-5 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <h1 className="text-2xl font-black tracking-wider text-emerald-400 font-mono">
                ahelog ADMIN PANEL
              </h1>
            </div>
            <p className="text-slate-400 text-xs mt-1">
              タイムスタンプ・検閲＆公認（Verified）承認コントロールセンター
            </p>
          </div>
          <a href="/product" className="text-xs bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-rose-400 px-3 py-1.5 rounded-lg border border-slate-800 transition-colors">
            ← 一般公開サイトを見る
          </a>
        </div>

        {/* 1. カウンターメーター */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-500 block font-medium">要審査（保留中）</span>
            <span className="text-3xl font-mono font-bold text-amber-400">{reviews.length} <span className="text-sm font-sans text-slate-400">件</span></span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-500 block font-medium">本日承認（Verified化）</span>
            <span className="text-3xl font-mono font-bold text-emerald-400">14 <span className="text-sm font-sans text-slate-400">件</span></span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-500 block font-medium">累計アーカイブ総数</span>
            <span className="text-3xl font-mono font-bold text-rose-500">1,248 <span className="text-sm font-sans text-slate-400">件</span></span>
          </div>
        </div>

        {/* 2. 審査待ちリスト */}
        <div>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            📥 未承認のタイムスタンプ投稿
          </h2>

          {reviews.length === 0 ? (
            <div className="bg-slate-900/50 border border-slate-800 border-dashed rounded-2xl p-12 text-center text-slate-500">
              🎵 現在、審査待ちの熱いレビューはすべて処理済みです。平和な夜です。
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all shadow-xl">
                  
                  {/* 対象作品情報 */}
                  <div className="border-b border-slate-800 pb-3 mb-4 flex flex-col md:flex-row justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                        対象作品
                      </span>
                      <h3 className="text-base font-bold text-white mt-1">
                        {review.productTitle}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        女優: <span className="text-pink-400 font-medium">{review.actress}</span>
                      </p>
                    </div>
                    <div className="text-right text-xs text-slate-500 min-w-[80px]">
                      投稿者: <span className="text-slate-300 font-medium block">{review.reviewer}</span>
                      <span>{review.submittedAt}</span>
                    </div>
                  </div>

                  {/* 投稿データ核心（タイムスタンプ・タグ・点数） */}
                  <div className="bg-slate-950 rounded-xl p-4 mb-4 border border-slate-850">
                    <div className="flex flex-wrap items-center gap-4 justify-between mb-3">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">申請タイムスタンプ</span>
                        <span className="font-mono text-amber-400 font-bold text-base bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                          ⏱ {review.timestamp}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-slate-500 block mr-1 font-bold">アヘ指数:</span>
                        <span className="text-amber-400 text-sm font-mono">{'★'.repeat(review.score)}</span>
                      </div>
                    </div>

                    {/* タグリスト */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {review.tags.map(tag => (
                        <span key={tag} className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded border border-slate-700">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* コメント */}
                    <p className="text-slate-300 text-sm leading-relaxed border-t border-slate-900 pt-3 whitespace-pre-line">
                      {review.comment}
                    </p>
                  </div>

                  {/* 運営の神の手：アクションボタン */}
                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => handleAction(review.id, 'reject')}
                      className="px-4 py-2 text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                    >
                      🛑 却下 / 規約違反
                    </button>
                    <button 
                      onClick={() => handleAction(review.id, 'approve')}
                      className="px-5 py-2 text-xs font-bold bg-emerald-500 text-slate-950 rounded-xl hover:bg-emerald-400 transition-all shadow-lg flex items-center gap-1"
                    >
                      ⚡ 承認（Verifiedとして公開）
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}