'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// フェチ属性グループマスター
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

// トレンド女優（Netflix仕様の巨大タイポグラフィ・ランキング用データ）
const TRENDING_ACTRESSES = [
  { rank: 1, name: 'AHE-NO SHIZUKU', score: '4.9', reviews: 42, badge: 'QUEEN OF THE WEEK' },
  { rank: 2, name: 'KISARAGI KAREN', score: '4.7', reviews: 28, badge: 'RISING' },
  { rank: 3, name: 'KAGURAZAKA MEGU', score: '4.5', reviews: 19, badge: 'LEGEND' },
  { rank: 4, name: 'ELZA SILVA', score: '4.6', reviews: 15, badge: 'NEW RELEASE' },
];

// 最近公認されたアーカイブ作品
const RECENT_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'THE ULTIMATE SHORTS COMPLETE SHORT CIRCUIT 2H',
    actress: 'アヘ乃しずく',
    maker: 'AHE-LABO',
    avgScore: '4.8',
    topTag: 'SHIRO-ME',
    date: 'MAY 1, 2026'
  },
  {
    id: 'prod-2',
    title: 'HYPNOTIZED PRESIDENT FALLING DOWN IN THE SILENT NIGHT',
    actress: '如月かれん',
    maker: '催眠キネマ',
    avgScore: '4.3',
    topTag: 'YODARE',
    date: 'JUN 12, 2026'
  },
  {
    id: 'prod-3',
    title: 'ABSOLUTE OBEDIENCE DARK-ELF SPEECH DESTRUCTION',
    actress: 'エルザ・シルヴァ',
    maker: 'ファンタジー・フェチ',
    avgScore: '4.6',
    topTag: 'SPEECH BREAKDOWN',
    date: 'JUN 22, 2026'
  }
];

// 最新のタイムライン
const TIMELINE_ITEMS = [
  {
    author: 'AHE-SENNIN',
    time: '00:45:12',
    comment: '脳の回路が完全にショートしていくリアルな焦燥感。従来の記号的な表現を逸脱した、映画的な深度を持つ傑作。'
  },
  {
    author: 'SITU-JUCHO',
    time: '01:12:30',
    comment: 'プライドが完全に崩壊し、懇願するような絶望の表情へのグラデーション。文字通り視線が彷徨う、マニア必見のチャプター。'
  },
  {
    author: 'NEO-FETISH',
    time: '02:04:15',
    comment: '言語崩壊のプロセスを精緻にアーカイブ。声のトーンが理性を失っていくシークエンスは、聴覚的にも圧倒的な暴力性。'
  }
];

// AHELOG仕様にローカライズしたFAQデータ
const FAQS = [
  {
    q: "AHELOGとは何ですか？",
    a: "AHELOGは、映像コンテンツ内における「特定の表情や精神状態」が発生した瞬間をタイムスタンプとして記録・解析するための、シネマティック・フェチ属性データベースです。客電の落ちた暗闇（シアター）のように、純粋にデータと没入感に向き合える環境を提供します。"
  },
  {
    q: "こだわり条件検索ではどのような掛け合わせが可能ですか？",
    a: "「身体・表情現象系」「シチュエーション・要因系」「心理・精神状態系」の3つの分類から、複数の属性を同時に選択してAND（重複）検索が可能です。例えば、[#白目] × [#催眠] × [#服従] など、あなたの求める正確なフェチズム深度を持ったアーカイブのみを瞬時にフィルタリングします。"
  },
  {
    q: "タイムスタンプの公認（VERIFIED）とは？",
    a: "コミュニティメンバーによって投稿されたタイムスタンプデータのうち、その「秒数」と「表現」の正確性が一定以上の評価、またはモデレーターによる検証をクリアしたログに対して「VERIFIED」の認証バッジが付与されます。"
  },
  {
    q: "スマートフォンやタブレットでも視聴・解析できますか？",
    a: "はい。AHELOGはレスポンシブWebデザインに対応しており、スマートフォンやタブレットからでも無限のデジタル棚を滑らかにブラウズし、タイムスタンプを快適にチェックすることが可能です。"
  }
];

export default function NetflixStyleCinemaPortalPage() {
  const router = useRouter();
  
  // 各種State
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // タグのトグル選択ハンドラー
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // 複数条件での検索実行
  const handleSearchExecute = () => {
    if (selectedTags.length === 0) return;
    const queryString = selectedTags.map(t => `tag=${encodeURIComponent(t)}`).join('&');
    router.push(`/search?${queryString}`);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#ffffff] antialiased pb-32 selection:bg-[#e50914]/30 font-sans">
      
      {/* 🟥 Minimal Header */}
      <header className="w-full h-16 bg-gradient-to-b from-black/90 to-transparent px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 select-none">
        <h1 
          onClick={() => router.push('/')}
          className="text-xl md:text-2xl font-black text-[#e50914] tracking-tighter uppercase cursor-pointer"
        >
          ahelog
        </h1>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/product')}
            className="bg-black/40 border border-[#808080] text-[#ffffff] text-xs font-medium px-4 py-1.5 rounded-[4px] hover:bg-black/60 transition-colors"
          >
            [SAMPLE ARCHIVE]
          </button>
          <button 
            onClick={() => router.push('/submit')}
            className="bg-[#e50914] text-[#ffffff] text-xs font-bold px-4 py-1.5 rounded-[4px] hover:bg-[#e50914]/90 transition-all active:scale-95"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* 🎬 Full-Bleed Cinematic Hero Section */}
      <section className="w-full h-[75vh] relative overflow-hidden flex flex-col justify-center px-6 md:px-12 select-none border-b-8 border-[#2d2d2d]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/50 to-[#000000] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,34,71,0.25)_0%,rgba(0,0,0,1)_100%)]" />
        
        <div className="relative z-20 w-full max-w-[1280px] mx-auto space-y-4">
          <span className="inline-block text-xs font-black text-[#e50914] tracking-widest uppercase">
            ● PUBLIC VERIFIED ARCHIVES INDEX
          </span>
          
          <h2 className="text-4xl sm:text-6xl lg:text-[80px] font-black text-[#ffffff] leading-[0.95] tracking-tighter uppercase">
            THE INFINITE DIGITAL SHELF OF ECSTASY.
          </h2>
          
          <p className="text-sm md:text-base text-[#b3b3b3] max-w-2xl leading-relaxed">
            映像内の快感・恍惚・服従が交錯する瞬間を正確にタイムスライス。客電の落ちた暗闇の中で、全アーカイブの核心データが今、解き放たれる。
          </p>
          
          <div className="pt-4 flex flex-wrap gap-4">
            <button 
              onClick={() => router.push('/submit')}
              className="bg-[#e50914] text-[#ffffff] text-sm font-bold tracking-wide px-8 py-3.5 rounded-[4px] hover:bg-[#e50914]/90 transition-all flex items-center gap-2 group shadow-none"
            >
              GET STARTED WITH ARCHIVES
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* 🍿 メインシネマコンテナ */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mt-16 space-y-16">

        {/* 👑 Section 1: TRENDING QUEENS */}
        <section className="space-y-4">
          <div className="flex justify-between items-end pb-2 border-b border-[#2d2d2d]">
            <h3 className="text-lg md:text-xl font-black tracking-tight text-[#ffffff] uppercase">
              👑 Trending Queens of the Week
            </h3>
            <span className="text-xs font-bold text-[#808080] font-mono">VOL. 26</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {TRENDING_ACTRESSES.map((act) => (
              <div 
                key={act.rank}
                className="relative bg-[#2d2d2d] aspect-[4/3] rounded-[16px] overflow-hidden group cursor-pointer border border-transparent hover:border-white/20 transition-all duration-200"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#192247] to-[#210e17] opacity-80 group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

                <span className="absolute bottom-[-14px] left-[-6px] text-[100px] font-black leading-none text-transparent select-none z-20 text-stroke">
                  {act.rank}
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-4 pl-16 z-30 flex flex-col justify-end">
                  <span className="text-[9px] font-bold text-[#e50914] tracking-wider uppercase mb-0.5">{act.badge}</span>
                  <h4 className="text-sm font-black text-[#ffffff] tracking-tight group-hover:text-[#e50914] transition-colors">{act.name}</h4>
                  <div className="flex justify-between items-center mt-1 pt-1 border-t border-white/10 text-[11px] font-mono text-[#b3b3b3]">
                    <span>{act.reviews} CODES</span>
                    <span className="font-bold text-[#ffffff]">★ {act.score}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* 🎯 Section 2: こだわり条件から探す */}
        <section className="bg-gradient-to-br from-[#192247] to-[#210e17] p-6 md:p-8 rounded-[16px] border border-white/[0.04] space-y-6">
          <div className="text-center md:text-left space-y-1">
            <h3 className="text-lg md:text-xl font-black tracking-tight text-[#ffffff]">
              🔍 こだわり条件から探す
            </h3>
            <p className="text-xs text-[#b3b3b3]">
              複数のフェチ属性をマトリクス選択し、一撃で理想のアーカイブを重複抽出（AND検索）します。
            </p>
          </div>

          <div className="space-y-4">
            {FETISH_GROUPS.map((group) => (
              <div 
                key={group.title} 
                className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6 pb-4 border-b border-white/[0.06] last:border-b-0 last:pb-0"
              >
                <span className="text-xs font-bold text-[#b3b3b3] md:w-44 shrink-0 pt-2 tracking-wide">
                  {group.title}
                </span>
                
                <div className="flex flex-wrap gap-1.5">
                  {group.tags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`text-xs px-3 py-1.5 rounded-[4px] font-medium transition-all duration-150 ${
                          isSelected 
                            ? 'bg-[#e50914] text-[#ffffff] font-bold scale-105 shadow-[0_0_12px_rgba(229,9,20,0.5)]' 
                            : 'bg-[#2d2d2d] text-[#ffffff] border border-transparent hover:border-[#808080] hover:bg-[#414141]'
                        }`}
                      >
                        #{tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-col items-center justify-center gap-3">
            <button
              onClick={handleSearchExecute}
              disabled={selectedTags.length === 0}
              className={`w-full max-w-sm text-sm font-bold py-3.5 rounded-[4px] transition-all flex items-center justify-center gap-2 group ${
                selectedTags.length > 0 
                  ? 'bg-[#e50914] text-[#ffffff] hover:bg-[#e50914]/90 active:scale-98 cursor-pointer' 
                  : 'bg-[#414141] text-[#808080] cursor-not-allowed'
              }`}
            >
              {selectedTags.length > 0 ? `選択した ${selectedTags.length} 件の属性で検索を開始` : '属性条件を選択してください'}
              {selectedTags.length > 0 && <span className="transform group-hover:translate-x-1 transition-transform">→</span>}
            </button>

            {selectedTags.length > 0 && (
              <button 
                onClick={() => setSelectedTags([])}
                className="text-xs text-[#b3b3b3] hover:text-white underline transition-colors"
              >
                選択をすべてリセット
              </button>
            )}
          </div>
        </section>


        {/* 🔥 Section 3: RECENT VERIFIED ARCHIVES */}
        <section className="space-y-4">
          <div className="flex justify-between items-baseline">
            <h3 className="text-lg md:text-xl font-black tracking-tight text-[#ffffff] uppercase">
              🔥 Recent Verified Archives
            </h3>
            <span className="text-xs font-bold text-[#b3b3b3] underline cursor-pointer hover:text-[#e50914]">SEE ALL</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RECENT_PRODUCTS.map((prod) => (
              <div 
                key={prod.id}
                onClick={() => router.push('/product')}
                className="group cursor-pointer space-y-2.5"
              >
                <div className="aspect-video bg-[#2d2d2d] rounded-[4px] border border-[#414141] relative overflow-hidden flex items-center justify-center transition-all group-hover:border-[#b3b3b3]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#210e17] to-[#192247] opacity-40" />
                  <span className="text-3xl z-10 opacity-60 group-hover:opacity-100 transition-opacity">🎬</span>
                  <span className="absolute top-2 left-2 text-[9px] font-black text-[#ffffff] bg-[#e50914] px-2 py-0.5 rounded-[2px] tracking-wider uppercase">
                    {prod.date}
                  </span>
                </div>
                
                <div className="space-y-1 px-0.5">
                  <div className="flex justify-between text-[11px] font-mono text-[#b3b3b3] uppercase">
                    <span>{prod.maker}</span>
                    <span className="text-[#e50914] font-bold">// {prod.topTag}</span>
                  </div>
                  <h4 className="text-sm font-bold tracking-tight text-[#ffffff] line-clamp-1 group-hover:text-[#e50914] transition-colors">
                    {prod.title}
                  </h4>
                  <div className="flex justify-between items-center text-[12px] text-[#b3b3b3]">
                    <span>CAST: {prod.actress}</span>
                    <span className="font-bold text-[#ffffff]">★ {prod.avgScore}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ⚡ Section 4: LIVE TIMESTAMP TIMELINE */}
        <section className="space-y-4">
          <h3 className="text-lg md:text-xl font-black tracking-tight text-[#ffffff] uppercase">
            ⚡ Live Timestamp Timeline
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TIMELINE_ITEMS.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[#2d2d2d] p-5 rounded-[16px] border border-white/[0.02] flex flex-col justify-between h-44 hover:border-[#414141] transition-all"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#ffffff]">{item.author}</span>
                    <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 px-1.5 py-0.5 rounded">VERIFIED</span>
                  </div>
                  <p className="text-xs text-[#b3b3b3] leading-relaxed line-clamp-3">
                    {item.comment}
                  </p>
                </div>
                <div className="pt-2 border-t border-white/[0.06] flex justify-between items-center">
                  <span className="text-[10px] font-mono font-bold text-white bg-[#e50914] px-2 py-0.5 rounded-[2px]">
                    ⏱ {item.time}
                  </span>
                  <span className="text-[10px] text-[#808080] font-mono">LIVE FEED</span>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ❓ 新設 Section 5: FREQUENTLY ASKED QUESTIONS (画像イメージのトレース＆最適化) */}
        <section className="space-y-7 max-w-4xl mx-auto pt-8 border-t border-[#2d2d2d]">
          <h3 className="text-2xl md:text-4xl font-black tracking-tight text-center text-[#ffffff]">
            Frequently Asked Questions
          </h3>
          
          <div className="space-y-2">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className="w-full">
                  {/* トリガーボタン（本家の重厚なGraphiteブロック、ホバーでわずかにハイライト） */}
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full bg-[#2d2d2d] hover:bg-[#414141] text-[#ffffff] px-6 py-[22px] flex justify-between items-center transition-colors duration-150 text-left select-none"
                  >
                    <span className="text-base md:text-xl font-normal tracking-wide">
                      {faq.q}
                    </span>
                    {/* プラスマーク：オープン時に45度回転して「×」になる本家ギミック */}
                    <span className={`text-2xl md:text-4xl font-light transform transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>
                      ＋
                    </span>
                  </button>
                  
                  {/* アコーディオンコンテンツ本体 */}
                  <div 
                    className={`overflow-hidden transition-all duration-250 ease-in-out bg-[#2d2d2d] mt-[2px] ${
                      isOpen ? 'max-h-[400px] opacity-100 p-6' : 'max-h-0 opacity-0 p-0'
                    }`}
                  >
                    <p className="text-sm md:text-lg text-[#ffffff] leading-relaxed whitespace-pre-line border-t border-white/[0.04] pt-5">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA メールサブスクリプションフォーム */}
          <div className="text-center pt-10 space-y-4">
            <p className="text-sm md:text-lg text-[#ffffff] tracking-normal">
              Ready to watch? Enter your email to create or restart your membership.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-2 max-w-2xl mx-auto px-4">
              <input 
                type="email"
                placeholder="Email address"
                className="bg-black/60 border border-[#5a5a5a] text-[#ffffff] text-sm px-4 py-4 rounded-[4px] focus:outline-none focus:border-[#ffffff] flex-grow placeholder-[#808080]"
              />
              <button 
                onClick={() => router.push('/submit')}
                className="bg-[#e50914] text-[#ffffff] text-lg font-bold px-8 py-4 rounded-[4px] hover:bg-[#e50914]/90 transition-all active:scale-98 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Get Started
                <span className="text-xl font-light">&gt;</span>
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* ⬛ シアトリカル・フッター */}
      <footer className="w-full bg-[#000000] text-[#b3b3b3] mt-32 py-12 px-6 md:px-12 border-t border-[#2d2d2d]">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs">
          <div className="space-y-1">
            <span className="text-sm font-black uppercase text-[#ffffff] tracking-wider">AHELOG GLOBAL SPAIN</span>
            <p className="text-[#808080] font-mono">© 2026 AHELOG SYSTEM. ALL RIGHTS THEATRICAL RESERVED.</p>
          </div>
          <div className="flex gap-6 font-medium">
            <span className="hover:underline cursor-pointer">FAQ</span>
            <span className="hover:underline cursor-pointer">TERMS OF USE</span>
            <span className="hover:underline cursor-pointer">PRIVACY STATEMENT</span>
          </div>
        </div>
      </footer>

      {/* 🔲 巨大数字アウトライン表現用インラインCSS */}
      <style jsx global>{`
        .text-stroke {
          -webkit-text-stroke: 2px #414141;
        }
        .group:hover .text-stroke {
          -webkit-text-stroke: 2px #b3b3b3;
        }
      `}</style>

    </div>
  );
}