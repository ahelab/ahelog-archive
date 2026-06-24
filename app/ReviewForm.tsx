'use client';

import React, { useState } from 'react';

// 定義した確定版タグリスト（シチュエーション・要因系に3つのタグを追加しました）
const TAG_CATEGORIES = {
  body: {
    title: '身体・表情現象系',
    tags: ['アヘ顔', '白目', '寄り目', 'レイプ目', '舌出し', 'よだれ', 'ダブルピース', '涙', '汗', '火照り', '言語崩壊']
  },
  situation: {
    title: 'シチュエーション・要因系',
    tags: ['催眠', 'ドラッグ', 'キメセク', 'ぴえん', 'レイプ', '乱交', '近親相姦', '複数']
  },
  psychology: {
    title: '心理・精神状態系',
    tags: ['快感', '恍惚', '愉悦', '忠誠', '支配', '抵抗', '服従', '恐怖', '絶望', '懇願']
  }
};

export default function ReviewForm() {
  const [scoreAhe, setScoreAhe] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>(['アヘ顔']); 
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [comment, setComment] = useState('');

  const handleTagChange = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-800 text-slate-100 p-6 rounded-xl border border-slate-700 shadow-xl">
      <h2 className="text-xl font-bold border-l-4 border-rose-500 pl-3 mb-6">アヘ顔タイムスタンプ 投稿</h2>

      {/* 1. アヘ指数 */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-slate-400 mb-2">アヘ指数（総合評価）</label>
        <div className="flex gap-1 text-2xl text-amber-400">
          {[1, 2, 3, 4, 5].map((star) => (
            <button 
              key={star} 
              type="button"
              onClick={() => setScoreAhe(star)}
              className={star <= scoreAhe ? 'text-amber-400' : 'text-slate-600'}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* 2. タイムスタンプ */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-slate-400 mb-2">至高のタイムスタンプ</label>
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            placeholder="01:23:45 (開始)" 
            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-center focus:border-rose-500 outline-none text-slate-100"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <span className="text-slate-500">～</span>
          <input 
            type="text" 
            placeholder="01:24:15 (終了)" 
            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-center focus:border-rose-500 outline-none text-slate-100"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>

      {/* 3. カテゴライズされたフェチタグ */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-slate-400 mb-1">フェチタグ選択（複数選択可）</label>
        
        {Object.entries(TAG_CATEGORIES).map(([key, category]) => (
          <div key={key} className="mt-3">
            <div className="text-xs font-bold text-rose-400 border-b border-slate-700 pb-1 mb-2">
              【 {category.title} 】
            </div>
            <div className="flex flex-wrap gap-1.5">
              {category.tags.map(tag => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagChange(tag)}
                    className={`text-xs px-2.5 py-1.5 rounded border transition-colors ${
                      isSelected 
                        ? 'bg-rose-500 border-rose-500 text-white font-bold' 
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
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

      {/* 4. レビュー本文 */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-400 mb-2">レビューコメント</label>
        <textarea 
          rows={4} 
          placeholder="タイムスタンプ部分の見どころ、フェチポイントを熱く語ってください。"
          className="w-full bg-slate-900 border border-slate-700 rounded p-2 focus:border-rose-500 outline-none resize-none text-slate-100"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {/* 5. 送信ボタン */}
      <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded transition-colors shadow-lg">
        レビューを投稿する
      </button>
    </div>
  );
}