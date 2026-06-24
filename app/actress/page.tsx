'use client';

import React from 'react';

const ACTRESS_PROFILE = {
  name: "アヘ乃しずく",
  ruby: "あへの しずく",
  avatar: "👩‍🎤",
  score: "★ 4.9",
  totalReviews: 42,
  tags: ["白目", "舌出し", "よだれ", "言語崩壊"],
  description: "圧倒的な表現力と、完全に自我を失ったかのような完璧な白目でトップに君臨する不動のクイーン。彼女のタイムスタンプはどれも芸術点が高く、特に中盤からの怒涛の畳み掛けは全フェチ必見のクオリティを誇る。",
};

const ACTRESS_TIMESTAMPS = [
  {
    id: 1,
    productTitle: "究極のアヘ顔表現に挑んだ堕落の2時間超えスペシャル",
    maker: "AHE-LABO",
    time: "00:45:12 ~ 00:46:30",
    tags: ["白目", "よだれ", "言語崩壊"],
    comment: "脳の回路が完全にショートしていくリアルな焦燥感。徐々に視線が定まらなくなり、完全に白目を剥くまでのグラデーションが神がかっています。",
    contributor: "アヘ仙人",
    score: "★ 5.0"
  },
  {
    id: 2,
    productTitle: "放課後アヘ顔クラブ：限界突破の制服シチュエーション",
    maker: "ファンタジー・フェチ",
    time: "01:15:22 ~ 01:16:05",
    tags: ["アヘ顔", "舌出し", "ダブルピース"],
    comment: "クラシックなダブルピースでありながら、微細な手の震えと、引きつった口角の絶妙なバランスが、記号的ではないリアルな快感を演出しています。",
    contributor: "フェチ特級呪物",
    score: "★ 4.8"
  }
];

export default function ActressDetailPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-20">
      
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <a href="/" className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-600 tracking-wider hover:opacity-80 transition-opacity">
              ahelog
            </a>
          </div>
          <a href="/" className="text-xs text-slate-400 hover:text-rose-400 transition-colors">
            ← トップへ戻る
          </a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 mt-8 space-y-8">
        
        <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-rose-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start relative z-10">
            <div className="w-24 h-24 rounded-full bg-slate-900 border-2 border-rose-500/50 flex items-center justify-center text-4xl shrink-0 shadow-inner">
              {ACTRESS_PROFILE.avatar}
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-3">
              <div>
                <p className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">{ACTRESS_PROFILE.ruby}</p>
                <h2 className="text-2xl font-black text-slate-100 mt-0.5">{ACTRESS_PROFILE.name}</h2>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-xs">
                <span className="text-amber-400 font-black text-sm bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  平均スコア {ACTRESS_PROFILE.score}
                </span>
                <span className="text-slate-400 font-medium">
                  総タイムスタンプ数: <strong className="text-slate-200 font-bold">{ACTRESS_PROFILE.totalReviews}</strong>
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                {ACTRESS_PROFILE.description}
              </p>

              <div className="pt-2">
                <p className="text-[10px] text-slate-500 font-bold mb-1.5 uppercase tracking-wide">得意なフェチ属性</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-1.5">
                  {ACTRESS_PROFILE.tags.map(tag => (
                    <span key={tag} className="bg-slate-900 text-rose-400 text-[10px] font-bold px-2 py-1 rounded-xl border border-slate-800">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
            ⏱ 「{ACTRESS_PROFILE.name}」の公認タイムスタンプ一覧
          </h3>

          <div className="space-y-4">
            {ACTRESS_TIMESTAMPS.map((ts) => (
              <div key={ts.id} className="bg-slate-950 border border-slate-850 rounded-2xl p-5 shadow-xl hover:border-slate-800 transition-all space-y-4">
                
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-slate-900 pb-3">
                  <div>
                    <span className="text-[9px] text-slate-500 font-mono block">{ts.maker}</span>
                    <h4 className="text-xs font-bold text-slate-200 hover:text-rose-400 cursor-pointer mt-0.5">
                      {ts.productTitle}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-black text-amber-400">{ts.score}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                  <div className="space-y-2">
                    <div className="inline-block font-mono text-rose-400 text-xs font-bold bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20">
                      ⏱ {ts.time}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {ts.tags.map(tag => (
                        <span key={tag} className="bg-slate-900 text-slate-400 text-[9px] px-1.5 py-0.5 rounded border border-slate-800">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-3 bg-slate-900/40 border border-slate-900 rounded-xl p-3">
                    <p className="text-[11px] text-slate-300 leading-relaxed">「{ts.comment}」</p>
                    <div className="text-right mt-2">
                      <span className="text-[9px] text-slate-500 font-medium">投稿者: {ts.contributor}</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}