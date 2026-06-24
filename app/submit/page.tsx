'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SubmitPage() {
  const router = useRouter();

  // 雛形のステート群
  const [rating, setRating] = useState<number>(4.5);
  const [username, setUsername] = useState('');
  const [startTime, setStartTime] = useState('01:23:45');
  const [endTime, setEndTime] = useState('01:24:15');
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['アヘ顔']);

  // タグマトリクスデータ
  const tagCategories = [
    {
      title: '【 身体・表情現象系 】',
      tags: ['アヘ顔', '白目', '寄り目', 'レイプ目', '舌出し', 'よだれ', 'ダブルピース', '涙', '汗', '火照り', '言語崩壊']
    },
    {
      title: '【 シチュエーション・要因系 】',
      tags: ['催眠', 'ドラッグ', 'キメセク', 'びえん', 'レイプ', '乱交', '近親相姦', '複数']
    },
    {
      title: '【 心理・精神状態系 】',
      tags: ['恍惚', '悦楽', '愉悦', '忠誠', '支配', '抵抗', '服従', '恐怖', '絶望', '屈服', '懇願', '感謝', '白痴化']
    }
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // 🎛️ スライダーの感度・追従性を100%直すためのロジック
  const starsRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateRatingFromEvent = (clientX: number) => {
    if (!starsRef.current) return;
    
    const { left, width } = starsRef.current.getBoundingClientRect();
    // 要素内の相対的なX座標（0 〜 width）
    const x = clientX - left;
    
    // 割合（0.0 〜 1.0）を算出し、5点満点換算の数値にする
    const rawRating = (x / width) * 5;
    
    // 【感度不良の原因を修正】
    // Math.ceil（切り上げ）だとドラッグ中に値が急に飛びやすいため、
    // 0.5刻みの最も近い値に正しく四捨五入（丸め処理）します。
    let calculatedRating = Math.round(rawRating * 2) / 2;
    
    // 最小0.5 〜 最大5.0の範囲に収める
    calculatedRating = Math.max(0.5, Math.min(5.0, calculatedRating));
    setRating(calculatedRating);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    updateRatingFromEvent(e.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      // ドラッグ中も常に最新のマウス座標を滑らかに反映
      updateRatingFromEvent(e.clientX);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-[#ffffff] antialiased pb-24 font-sans select-none selection:bg-[#e50914] selection:text-white">
      
      {/* 🟥 Minimal Header */}
      <header className="w-full h-16 bg-gradient-to-b from-black/90 to-transparent px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 select-none">
        <h1 
          onClick={() => router.push('/')}
          className="text-xl md:text-2xl font-black text-[#e50914] tracking-tighter uppercase cursor-pointer"
        >
          ahelog
        </h1>
        <button 
          onClick={() => router.push('/')}
          className="text-[#b3b3b3] hover:text-white text-xs font-medium transition-colors"
        >
          ← トップへ戻る
        </button>
      </header>

      {/* 🍿 メイン投稿フォーム */}
      <main className="max-w-[760px] mx-auto px-4 md:px-8 mt-4 select-text">
        <div className="bg-[#141414] border border-[#2d2d2d] rounded-lg p-6 md:p-10 space-y-8 shadow-2xl relative overflow-hidden">
          
          <div className="flex items-center gap-3 select-none">
            <div className="w-1.5 h-6 bg-[#e50914] rounded-full" />
            <h2 className="text-xl font-bold tracking-tight text-white">アヘ顔タイムスタンプ 投稿</h2>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* ⭐ アヘ指数（長押しスライド評価システム） */}
            <div className="space-y-2 select-none">
              <label className="block text-xs font-bold text-[#b3b3b3] tracking-wider">
                アヘ指数（総合評価：長押しスライドで変更可）
              </label>
              <div className="w-full bg-[#2d2d2d] border border-[#414141] rounded-[4px] px-6 py-5 flex items-center justify-start gap-4">
                
                {/* スライド用エリア */}
                <div 
                  ref={starsRef}
                  onMouseDown={handleMouseDown}
                  className="flex relative text-3xl cursor-ew-resize tracking-tight py-1"
                >
                  {/* 背景（未選択状態の暗い星） */}
                  <div className="flex text-[#414141]">
                    {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                  </div>
                  {/* 前景（評価値に応じて横幅がクリップされる赤い星） */}
                  <div 
                    className="flex text-[#e50914] absolute top-1 left-0 overflow-hidden whitespace-nowrap transition-all duration-75 pointer-events-none"
                    style={{ width: `${(rating / 5) * 100}%` }}
                  >
                    {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                  </div>
                </div>

                {/* ⚪ 要望通りの配置・色・バックシート無しのシンプルインジケーター */}
                <div className="text-sm font-mono font-bold text-white select-none ml-1">
                  {rating.toFixed(1)} <span className="text-[#808080] font-normal mx-0.5">/</span> 5
                </div>

              </div>
            </div>

            {/* 👤 投稿者名 */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#b3b3b3] tracking-wider">
                投稿者名（ハンドルネーム）
              </label>
              <input 
                type="text" 
                placeholder="例：アヘ仙人、シチュ派の重鎮"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#2d2d2d] text-white text-sm px-4 py-3 rounded-[4px] border border-[#414141] focus:outline-none focus:border-[#e50914] placeholder-[#808080]"
              />
            </div>

            {/* ⏱ 至高のタイムスタンプ */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#b3b3b3] tracking-wider">
                至高のタイムスタンプ
              </label>
              <div className="flex items-center gap-4">
                <input 
                  type="text" 
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-[#2d2d2d] text-white text-sm font-mono text-center py-3 rounded-[4px] border border-[#414141] focus:outline-none focus:border-[#e50914]"
                />
                <span className="text-[#808080] font-mono text-xs">〜</span>
                <input 
                  type="text" 
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-[#2d2d2d] text-white text-sm font-mono text-center py-3 rounded-[4px] border border-[#414141] focus:outline-none focus:border-[#e50914]"
                />
              </div>
            </div>

            {/* 🏷 フェチタグ選択 */}
            <div className="space-y-4 pt-2 select-none">
              <label className="block text-xs font-bold text-[#b3b3b3] tracking-wider">
                フェチタグ選択（複数選択可）
              </label>
              
              <div className="space-y-5">
                {tagCategories.map((category, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="text-[11px] font-bold text-[#e50914] tracking-wide">
                      {category.title}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.tags.map((tag) => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                          <button
                            type="button"
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`text-xs px-3 py-1.5 rounded-[4px] border transition-all font-medium ${
                              isSelected 
                                ? 'bg-[#e50914] border-[#e50914] text-white shadow-lg shadow-[#e50914]/20' 
                                : 'bg-[#2d2d2d] border-[#414141] text-[#b3b3b3] hover:text-white'
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 💬 レビューコメント */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-[#b3b3b3] tracking-wider">
                レビューコメント
              </label>
              <textarea 
                rows={4}
                placeholder="タイムスタンプ部分の見どころ、フェチポイントを熱く語ってください。"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-[#2d2d2d] text-white text-sm px-4 py-3 rounded-[4px] border border-[#414141] focus:outline-none focus:border-[#e50914] resize-none leading-relaxed"
              />
            </div>

            {/* 🚀 送信ボタン */}
            <div className="pt-4 select-none">
              <button 
                type="submit"
                onClick={() => router.push('/')}
                className="w-full bg-[#e50914] hover:bg-[#e50914]/90 text-white font-bold py-4 rounded-[4px] transition-colors text-sm tracking-widest shadow-lg shadow-[#e50914]/20"
              >
                レビューを投稿する
              </button>
            </div>

          </form>
        </div>
      </main>

    </div>
  );
}