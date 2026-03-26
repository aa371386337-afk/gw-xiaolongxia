/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  History, 
  Scissors, 
  ChevronLeft, 
  Send, 
  Sparkles, 
  Video, 
  FileText, 
  Layout, 
  Share2,
  X,
  CheckCircle2,
  Zap,
  Copy,
  Plus,
  Edit3,
  Clock,
  Search,
  UploadCloud
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type View = 'home' | 'chat' | 'new-chat' | 'polarclaw';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isPolarClaw?: boolean;
  type?: 'text' | 'editing_simulation' | 'novel_simulation' | 'auth_simulation';
}

// --- Components ---

const NOVEL_TEXT = `On our wedding night, my wife, Sarah, wouldn't let me touch her. She said she was too tired and asked me to wait a while.

But every night, in the dead of night, she'd sneak downstairs to the basement. When she returned, she'd always shower, and an eerie, unsettling smell would cling to her.

I asked her what she was doing.

She said she was doing yoga.

Yoga in the middle of the night? I couldn't take it anymore. One night, I secretly followed her down to the basement.

She spotted me, spun around, and grabbed the collar of my pajamas, yelling:

“Get up here!”

“You can’t go into the basement!”

"Otherwise, we're getting a divorce!"

I clutched the stair railing, trembling with anger. My parents bought this house for us as a wedding gift. This is my home! Why can't I go into my own basement? As my wife, who does she think she is talking to me like that?

I took a deep breath, trying to keep my cool. "Sarah, is that how you talk to me?"

Sarah still had a tight grip on my pajama collar, her slender fingers surprisingly strong. "Mark, let's go upstairs first. I'll explain everything in the bedroom."

"You can't explain it here?" I pointed to the pitch-black basement below. "Why can't I go down there? Don't I have a right to know?"

"I'm doing yoga, and that's my private space down there. It's not time to share it yet." She stepped down a few stairs, blocking my path with her body.

“Why?”

"Because it's just not the right time. When it's ready for you to see, I promise I'll show you!"

My gut twisted with frustration. I took another deep breath, forcing myself to calm down. "If that's the case, did you really have to snap at me like that?"

"I..." She bit her lip. "I was just a little worked up, you know? Besides, you know I'm direct; you're used to that."

I scoffed and turned to go upstairs. Fine, I'd wait until she left for work tomorrow, then I'd check out what was really going on down there.

Back in bed, I tossed and turned, unable to sleep. There had to be something fishy going on in that basement, something serious. Was it a secret Sarah didn't want anyone to know?

I looked at her.

She was also awake, staring at the ceiling, lost in thought. I remembered how shocked I'd been when she first asked me out. She was so beautiful, with so many guys after her, while I was just an average-looking guy. What did she even see in me?

She'd said she liked my kindness, my quiet demeanor, and the sense of calm I brought her. I believed her.

But if that was true, why did she push me away every night? I'm her husband, after all. Was this normal?

Finally, I couldn’t hold back. I reached out, wanting to gently caress her cheek.

"What are you doing?!" She pulled away like she'd been burned, glaring at me with disgust. The kind of look you give something revolting.

I suddenly got it, and angrily turned away. But I couldn't let that insult slide. If she didn't have feelings for me, why did she ask me out? Why marry me?!

Thinking that, I spun around, glaring at her. "You said you needed time, that we couldn't be too intimate yet, and I get that. But why such a strong reaction when I just touched you?"

“How many times have I explained this? It’s a psychological thing. I’m looking for a therapist, aren’t I? You need to be patient.” Sarah picked up her phone and gently tapped my shoulder with the back of it—she wouldn’t even touch me with her hand. “Mark, please, just give me six months, okay? After six months, I promise I’ll be better.”

She tapped me with her phone, not even her hand. Was I really that repulsive to her? Could I even believe her? But right then, I had no choice but to wait. I sighed and rolled over.

Truth is, I’d given her everything. From the start of our relationship, I’d done whatever she wanted. She said she liked jewelry, so I bought her expensive necklaces. She wanted to travel, so I took her everywhere. She mentioned investing, so I supported her learning about finance. I gave her everything I had, did my best to get her whatever she wanted.

But this is what I got after the wedding. It all had to connect to that basement! I had to find out what was going on!`;

const VideoPlayerModal = ({ isOpen, onClose, title }: { isOpen: boolean, onClose: () => void, title: string }) => {
  const [progress, setProgress] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);

  React.useEffect(() => {
    let interval: any;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      <div className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-lg">{title || '预览视频'}</div>
              <div className="text-gray-400 text-xs">1080P • 24fps • H.264</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all flex items-center gap-2 text-sm font-medium">
              <UploadCloud className="w-5 h-5" />
              下载视频
            </button>
            <button onClick={onClose} className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Video Content Placeholder */}
        <div className="flex-1 flex items-center justify-center relative group">
          <img 
            src={`https://picsum.photos/seed/${title}/1280/720`} 
            alt="video preview" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <button onClick={() => setIsPlaying(!isPlaying)} className="w-20 h-20 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 transition-all scale-100 hover:scale-110 active:scale-95">
                {isPlaying ? <div className="w-10 h-10 bg-white rounded-sm" /> : <div className="w-0 h-0 border-y-[15px] border-y-transparent border-l-[25px] border-l-white ml-2" />}
             </button>
          </div>
        </div>

        {/* Controls */}
        <div className="p-8 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex flex-col gap-4">
            {/* Progress Bar */}
            <div className="relative h-1.5 w-full bg-white/10 rounded-full cursor-pointer group">
              <div 
                className="absolute h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                style={{ width: `${progress}%` }}
              />
              <div 
                className="absolute w-4 h-4 bg-white rounded-full shadow-lg -top-1.5 -ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `${progress}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between text-xs font-mono text-gray-400">
              <span>00:{Math.floor(progress * 0.3).toString().padStart(2, '0')}</span>
              <span>00:30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NovelSimulation = ({ onViewVideo }: { onViewVideo?: (title: string) => void }) => {
  const [progress, setProgress] = React.useState(0);
  const [tasks, setTasks] = React.useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isComplete, setIsComplete] = React.useState(false);
  const [publishState, setPublishState] = React.useState<'idle' | 'check_auth' | 'selecting_accounts' | 'publishing' | 'configuring' | 'success'>('idle');
  const [incompleteBtnText, setIncompleteBtnText] = React.useState('未完成');
  const [selectedAccounts, setSelectedAccounts] = React.useState<string[]>([]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          return 100;
        }
        return prev + 1;
      });
      setTasks(prev => {
        if (prev >= 1) return 1;
        return prev + 1;
      });
    }, 50);

    const stepTimer = setInterval(() => {
      setActiveStep(prev => {
        if (prev >= 4) {
          clearInterval(stepTimer);
          return 4;
        }
        return prev + 1;
      });
    }, 1200);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, []);

  const handlePublish = () => {
    setPublishState('check_auth');
    setIncompleteBtnText('未完成');
  };

  const handleGoAuthorize = () => {
    setPublishState('selecting_page');
  };

  const handleSelectPage = () => {
    setPublishState('authorized_pending');
  };

  const handleAuthorized = () => {
    setPublishState('selecting_accounts');
  };

  const handleConfirmAccounts = () => {
    if (selectedAccounts.length === 0) return;
    setPublishState('publishing');
  };

  const toggleAccount = (acc: string) => {
    setSelectedAccounts(prev => 
      prev.includes(acc) ? prev.filter(a => a !== acc) : [...prev, acc]
    );
  };

  React.useEffect(() => {
    let timeoutId: any;
    if (publishState === 'publishing') {
      timeoutId = setTimeout(() => {
        setPublishState('configuring');
      }, 2000);
    } else if (publishState === 'configuring') {
      timeoutId = setTimeout(() => {
        setPublishState('success');
      }, 2000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [publishState]);

  const steps = [
    { label: '剧情拆解', icon: '📖' },
    { label: '角色建模', icon: '👤' },
    { label: '场景生成', icon: '🖼️' },
    { label: '语音合成', icon: '🎙️' },
    { label: '视频合成', icon: '🎞️' },
  ];

  return (
    <div className="w-full bg-[#0f172a] border border-blue-500/20 rounded-3xl p-6 shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-lg">📖</span>
          </div>
          <div className="text-xl font-bold text-white tracking-tight">小说智能生成</div>
        </div>
        <div className="flex items-center gap-2">
          {isComplete ? (
            <div className="flex items-center gap-1.5 text-xs font-medium text-cyan-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              生成完毕
            </div>
          ) : (
            <>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-blue-400">正在创作中</span>
            </>
          )}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <div className="text-sm text-gray-400">
            进度<span className="text-white font-bold mx-1">{isComplete ? 1 : tasks}</span> / 1个作品
          </div>
          <div className="text-xl font-black text-cyan-400 italic">{progress} %</div>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
            className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 mb-6">
        {steps.map((step, i) => (
          <div 
            key={i} 
            className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-3 ${
              i === activeStep && !isComplete
                ? 'bg-blue-500/10 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                : i <= activeStep || isComplete
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-white/5 border-transparent opacity-40'
            }`}
          >
            <div className="text-2xl mb-1">{step.icon}</div>
            <div className={`text-[10px] font-bold whitespace-nowrap ${i === activeStep && !isComplete ? 'text-blue-300' : i < activeStep || isComplete ? 'text-cyan-400' : 'text-gray-500'}`}>
              {step.label}
            </div>
            <div className="mt-auto">
              {i < activeStep || isComplete ? (
                <div className="w-5 h-5 bg-cyan-500 rounded flex items-center justify-center">
                  <span className="text-[10px] text-white">✓</span>
                </div>
              ) : i === activeStep ? (
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="w-5 h-5 bg-white/5 rounded" />
              )}
            </div>
          </div>
        ))}
      </div>

      {isComplete && (
        <div className="space-y-4">
          {publishState === 'idle' && (
            <div className="flex gap-3">
              <button 
                onClick={() => onViewVideo?.('小说智能生成 - 预览')}
                className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold transition-colors"
              >
                查看视频
              </button>
              <button 
                onClick={handlePublish}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors"
              >
                一键发布
              </button>
            </div>
          )}

          {publishState === 'check_auth' && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="text-sm font-bold text-white mb-4 text-center">发布授权确认</div>
              {incompleteBtnText === '未完成' ? (
                <div className="flex gap-2">
                  <button 
                    onClick={handleAuthorized}
                    className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold transition-colors"
                  >
                    已授权
                  </button>
                  <button 
                    onClick={() => setIncompleteBtnText('去授权')}
                    className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold transition-colors"
                  >
                    未完成
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIncompleteBtnText('未完成')}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors"
                >
                  去授权
                </button>
              )}
            </div>
          )}

          {publishState === 'selecting_accounts' && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="text-sm font-bold text-white mb-4 text-center">请选择发布账号</div>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {['TikTok_Account_1', 'YouTube_Shorts_Main', 'Instagram_Reels_01', 'Facebook_Page_A'].map(acc => (
                  <button 
                    key={acc}
                    onClick={() => toggleAccount(acc)}
                    className={`p-3 rounded-xl border text-xs font-medium transition-all text-left flex items-center justify-between ${
                      selectedAccounts.includes(acc)
                        ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <span className="truncate mr-2">{acc}</span>
                    {selectedAccounts.includes(acc) && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                ))}
              </div>
              <button 
                onClick={handleConfirmAccounts}
                disabled={selectedAccounts.length === 0}
                className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${
                  selectedAccounts.length > 0
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-white/5 text-gray-500 cursor-not-allowed'
                }`}
              >
                确认发布 ({selectedAccounts.length})
              </button>
            </div>
          )}

          {publishState === 'publishing' && (
            <div className="flex flex-col items-center py-4 gap-3">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <div className="text-sm font-bold text-blue-400 animate-pulse">正在发布中...</div>
            </div>
          )}

          {publishState === 'configuring' && (
            <div className="flex flex-col items-center py-4 gap-3">
              <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              <div className="text-sm font-bold text-cyan-400 animate-pulse">正在配置文案中...</div>
            </div>
          )}

          {publishState === 'success' && (
            <div className="flex flex-col items-center py-4 gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/50">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-lg font-bold text-green-500">已发布成功</div>
              <div className="text-xs text-gray-400">请去智能发布查看发布记录</div>
              <button 
                className="mt-2 px-8 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full text-sm font-bold shadow-lg shadow-green-600/20 transition-all"
              >
                去查看
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const AuthSimulation = () => {
  const [state, setState] = React.useState<'initial' | 'authorizing' | 'authorized'>('initial');
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    let timeoutId: any;
    if (state === 'authorizing') {
      timeoutId = setTimeout(() => {
        setState('authorized');
      }, 2000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [state]);

  const handleAuthorizeClick = () => {
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    setState('authorizing');
  };

  if (state === 'authorized') {
    return (
      <div className="flex flex-col gap-4">
        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-500 mb-1">授权成功</div>
            <div className="text-sm text-gray-400">北斗智影系统已就绪，PolarClaw 已获得必要权限</div>
          </div>
        </div>
        <div className="text-gray-500 text-xs text-center italic">
          正在为您同步创作环境，预计需要 3-5 秒...
        </div>
      </div>
    );
  }

  if (state === 'authorizing') {
    return (
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 flex flex-col items-center gap-6 shadow-2xl">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-orange-500/20 rounded-full" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap className="w-6 h-6 text-orange-500 animate-pulse" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <div className="text-lg font-bold text-white">正在进行安全授权</div>
          <div className="text-sm text-gray-400">请在弹出的北斗系统授权页面完成操作</div>
        </div>
        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
          <div 
            style={{ width: '100%', transition: 'width 2s linear' }}
            className="h-full bg-orange-500"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">北斗系统安全授权</span>
          </div>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-white/30" />
            <div className="w-2 h-2 rounded-full bg-white/30" />
            <div className="w-2 h-2 rounded-full bg-white/30" />
          </div>
        </div>
        
        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="text-gray-300 text-sm leading-relaxed">
            北斗智影 (PolarClaw) 需要授权 <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded mx-1">75</span> 个用户权限（共 75 个，已授权 0 个）。
          </div>
          
          <div className="space-y-3">
            <div className="text-gray-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <div className="w-1 h-3 bg-blue-500 rounded-full" />
              将要授权的权限：
            </div>
            <div className="bg-black/40 rounded-xl p-4 font-mono text-xs text-gray-500 space-y-2 border border-white/5">
              <div className="flex items-center gap-2">
                <span className="text-blue-500">●</span>
                <span>video:editing:render:high_priority</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">●</span>
                <span>novel:content:analyze:semantic_v2</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">●</span>
                <span>social:media:publish:one_click</span>
              </div>
              <div className="text-gray-600 italic pl-4">... 以及其他 72 项核心权限</div>
            </div>
          </div>
          
          <div className="flex justify-end pt-2">
            <button 
              onClick={handleAuthorizeClick}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              前往授权
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-xs text-green-500 px-2 font-medium bg-green-500/5 py-2 rounded-full border border-green-500/10 w-fit">
        <CheckCircle2 className="w-4 h-4" />
        <span>已发送授权请求</span>
      </div>

      {/* Full-screen Auth Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          />
          <div 
            className="relative w-full max-w-lg bg-[#1a1a1a] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
          >
            <div className="p-8">
              {/* Icons Section */}
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <span className="text-3xl">🦞</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-4 h-0.5 bg-gray-700" />
                  <div className="w-4 h-0.5 bg-gray-700" />
                </div>
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
                  <Zap className="w-8 h-8 text-blue-500 fill-blue-500" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-center text-white mb-8">PolarClaw (北斗智影) 请求你的授权</h3>

              {/* Identity Section */}
              <div className="space-y-4 mb-8">
                <div className="text-sm text-gray-500">当前登录身份：</div>
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    b
                  </div>
                  <div>
                    <div className="font-bold text-white">智影文化传媒</div>
                    <div className="text-sm text-gray-500">唐欢</div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-white/5 mb-8" />

              {/* Permissions Section */}
              <div className="space-y-4 mb-10">
                <div className="text-sm text-gray-300 font-medium">授权后，应用将获得以下权限（共 76 项）：</div>
                <ul className="space-y-3">
                  {['短剧剧本深度解析', '爆款素材库访问权限', '多平台一键分发授权', 'AI 视频渲染引擎调用', '创作数据实时同步'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-blue-500 hover:underline cursor-pointer">你可以在应用授权管理中查看或撤销已授权权限</div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl font-bold transition-all border border-white/10"
                >
                  拒绝
                </button>
                <button 
                  onClick={handleModalConfirm}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20"
                >
                  授权
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EditingSimulation = ({ onViewVideo }: { onViewVideo?: (title: string) => void }) => {
  const [progress, setProgress] = React.useState(0);
  const [tasks, setTasks] = React.useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isComplete, setIsComplete] = React.useState(false);
  const [publishState, setPublishState] = React.useState<'idle' | 'check_auth' | 'selecting_accounts' | 'publishing' | 'configuring' | 'success'>('idle');
  const [incompleteBtnText, setIncompleteBtnText] = React.useState('未完成');
  const [selectedAccounts, setSelectedAccounts] = React.useState<string[]>([]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          return 100;
        }
        return prev + 1;
      });
      setTasks(prev => {
        if (prev >= 1) return 1;
        return prev + 1;
      });
    }, 40);

    const stepTimer = setInterval(() => {
      setActiveStep(prev => {
        if (prev >= 4) {
          clearInterval(stepTimer);
          return 4;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, []);

  const handlePublish = () => {
    setPublishState('check_auth');
    setIncompleteBtnText('未完成');
  };

  const handleGoAuthorize = () => {
    setPublishState('selecting_page');
  };

  const handleSelectPage = () => {
    setPublishState('authorized_pending');
  };

  const handleAuthorized = () => {
    setPublishState('selecting_accounts');
  };

  const handleConfirmAccounts = () => {
    if (selectedAccounts.length === 0) return;
    setPublishState('publishing');
  };

  const toggleAccount = (acc: string) => {
    setSelectedAccounts(prev => 
      prev.includes(acc) ? prev.filter(a => a !== acc) : [...prev, acc]
    );
  };

  React.useEffect(() => {
    let timeoutId: any;
    if (publishState === 'publishing') {
      timeoutId = setTimeout(() => {
        setPublishState('configuring');
      }, 2000);
    } else if (publishState === 'configuring') {
      timeoutId = setTimeout(() => {
        setPublishState('success');
      }, 2000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [publishState]);

  const steps = [
    { label: '创意生成', icon: '🎬' },
    { label: '素材匹配', icon: '📦' },
    { label: '云渲染', icon: '☁️' },
    { label: '二次剪辑', icon: '✂️' },
    { label: '矩阵分发', icon: '📡' },
  ];

  return (
    <div className="w-full bg-[#121218] border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-lg">🦞</span>
          </div>
          <div className="text-xl font-bold text-white tracking-tight">PolarClaw</div>
        </div>
        <div className="flex items-center gap-2">
          {isComplete ? (
            <div className="flex items-center gap-1.5 text-xs font-medium text-green-500">
              <CheckCircle2 className="w-3.5 h-3.5" />
              已完成
            </div>
          ) : (
            <>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-green-500">运行中</span>
            </>
          )}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <div className="text-sm text-gray-400">
            处理<span className="text-white font-bold mx-1">{isComplete ? 1 : tasks}</span> / 1个任务
          </div>
          <div className="text-xl font-black text-purple-400 italic">{progress} %</div>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 mb-6">
        {steps.map((step, i) => (
          <div 
            key={i} 
            className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-3 ${
              i === activeStep && !isComplete
                ? 'bg-purple-500/10 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
                : i <= activeStep || isComplete
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-white/5 border-transparent opacity-40'
            }`}
          >
            <div className="text-2xl mb-1">{step.icon}</div>
            <div className={`text-[10px] font-bold whitespace-nowrap ${i === activeStep && !isComplete ? 'text-purple-300' : i < activeStep || isComplete ? 'text-green-400' : 'text-gray-500'}`}>
              {step.label}
            </div>
            <div className="mt-auto">
              {i < activeStep || isComplete ? (
                <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-[10px] text-white">✓</span>
                </div>
              ) : i === activeStep ? (
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="w-5 h-5 flex items-center justify-center text-gray-600">
                  <span className="text-xs">⌛</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {isComplete && (
        <div className="space-y-4 pt-4 border-t border-white/5">
          {publishState === 'idle' && (
            <div className="flex gap-3">
              <button 
                onClick={() => onViewVideo?.('PolarClaw - 预览')}
                className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-white transition-all flex items-center justify-center gap-2"
              >
                <Video className="w-4 h-4" />
                查看视频
              </button>
              <button 
                onClick={handlePublish}
                className="flex-1 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-sm font-bold text-white shadow-lg shadow-red-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                一键发布
              </button>
            </div>
          )}

          {publishState === 'check_auth' && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="text-sm font-bold text-white mb-4 text-center">发布授权确认</div>
              {incompleteBtnText === '未完成' ? (
                <div className="flex gap-2">
                  <button 
                    onClick={handleAuthorized}
                    className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold transition-colors"
                  >
                    已授权
                  </button>
                  <button 
                    onClick={() => setIncompleteBtnText('去授权')}
                    className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold transition-colors"
                  >
                    未完成
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIncompleteBtnText('未完成')}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors"
                >
                  去授权
                </button>
              )}
            </div>
          )}

          {publishState === 'selecting_accounts' && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="text-sm font-bold text-white mb-4 text-center">请选择发布账号</div>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {['TikTok_Drama_01', 'YouTube_Drama_Main', 'Kwai_Shorts_Pro', 'Douyin_Drama_A'].map(acc => (
                  <button 
                    key={acc}
                    onClick={() => toggleAccount(acc)}
                    className={`p-3 rounded-xl border text-xs font-medium transition-all text-left flex items-center justify-between ${
                      selectedAccounts.includes(acc)
                        ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <span className="truncate mr-2">{acc}</span>
                    {selectedAccounts.includes(acc) && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                ))}
              </div>
              <button 
                onClick={handleConfirmAccounts}
                disabled={selectedAccounts.length === 0}
                className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${
                  selectedAccounts.length > 0
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-red-600/20'
                    : 'bg-white/5 text-gray-500 cursor-not-allowed'
                }`}
              >
                确认发布 ({selectedAccounts.length})
              </button>
            </div>
          )}

          {publishState === 'publishing' && (
            <div className="flex flex-col items-center py-4 gap-3">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <div className="text-sm font-bold text-purple-400 animate-pulse">正在发布中...</div>
            </div>
          )}

          {publishState === 'configuring' && (
            <div className="flex flex-col items-center py-4 gap-3">
              <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              <div className="text-sm font-bold text-cyan-400 animate-pulse">正在配置文案中...</div>
            </div>
          )}

          {publishState === 'success' && (
            <div className="flex flex-col items-center py-4 gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/50">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-lg font-bold text-green-500">已发布成功</div>
              <div className="text-xs text-gray-400">请去智能发布查看发布记录</div>
              <button 
                className="mt-2 px-8 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full text-sm font-bold shadow-lg shadow-green-600/20 transition-all"
              >
                去查看
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ currentView, setView, dramaCredits, novelGenerations }: { currentView: View, setView: (v: View) => void, dramaCredits: number, novelGenerations: number }) => {
  const isExpanded = currentView !== 'home';

  return (
    <div className={`${isExpanded ? 'w-64' : 'w-16'} h-full bg-[#0a0a0a] border-r border-white/5 flex flex-col py-6 z-50 transition-all duration-300 ease-in-out`}>
      {/* Back Button */}
      <div className={`${isExpanded ? 'px-6' : 'flex flex-col items-center'} mb-8`}>
        <button onClick={() => setView('home')} className="p-2 hover:bg-white/5 rounded-lg transition-colors group relative">
          <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-white" />
          {!isExpanded && (
            <span className="absolute left-16 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60]">返回首页</span>
          )}
        </button>
      </div>

      <div className={`flex flex-col gap-2 ${isExpanded ? 'px-4' : 'items-center'}`}>
        {/* 新建对话 */}
        <div 
          className={`flex items-center gap-3 p-3 rounded-xl transition-all relative group ${isExpanded ? 'w-full' : ''} text-gray-600 cursor-default`}
        >
          <Plus className="w-6 h-6 shrink-0 opacity-50" />
          {isExpanded && <span className="text-sm font-medium">新建对话</span>}
          {!isExpanded && (
            <span className="absolute left-16 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60]">新建对话 (暂不支持)</span>
          )}
        </div>

        {/* AI创作工具 */}
        <div 
          className={`flex items-center gap-3 p-3 rounded-xl transition-all relative group ${isExpanded ? 'w-full' : ''} text-gray-600 cursor-default`}
        >
          <Sparkles className="w-6 h-6 shrink-0 opacity-50" />
          {isExpanded && <span className="text-sm font-medium">AI创作工具</span>}
          {!isExpanded && (
            <span className="absolute left-16 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60]">AI创作工具 (暂不支持)</span>
          )}
        </div>
        
        {/* PolarClaw */}
        <button 
          onClick={() => setView('polarclaw')}
          className={`flex items-center gap-3 p-3 rounded-xl transition-all relative group ${isExpanded ? 'w-full bg-orange-500/10 text-orange-500 border border-orange-500/20' : 'border border-orange-500/20 bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.1)]'}`}
        >
          <span className="text-2xl shrink-0">🦞</span>
          {isExpanded && <span className="text-sm font-bold">PolarClaw</span>}
          <div className="absolute -top-1 -right-1 px-1 bg-orange-500 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center animate-pulse">
            <span className="text-[7px] text-white font-black">NEW</span>
          </div>
          {!isExpanded && (
            <span className="absolute left-16 bg-orange-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60]">PolarClaw</span>
          )}
        </button>

        {/* 历史对话列表 */}
        {isExpanded ? (
          <div className="mt-6 flex flex-col gap-1">
            <div className="px-3 mb-2 text-[11px] font-medium text-gray-500 uppercase tracking-wider">你的聊天</div>
            {['短剧热度日榜', '短剧热度日榜', '短剧热度日榜', '短剧热度日榜'].map((item, idx) => (
              <button 
                key={idx}
                className="flex items-center gap-3 p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all text-left group"
              >
                <MessageSquare className="w-4 h-4 shrink-0 opacity-50 group-hover:opacity-100" />
                <span className="text-sm truncate">{item}</span>
              </button>
            ))}
          </div>
        ) : (
          <button className="p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all relative group">
            <History className="w-6 h-6 shrink-0" />
            <span className="absolute left-16 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60]">历史对话</span>
          </button>
        )}

        {/* Usage Limits */}
        {isExpanded && (
          <div className="mt-auto px-4 py-6 border-t border-white/5">
            <div className="bg-white/5 rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400">短剧已消耗积分</span>
                <span className="text-[10px] font-bold text-orange-500">{30 - dramaCredits} / 30</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)] transition-all duration-500" 
                  style={{ width: `${((30 - dramaCredits) / 30) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400">小说已生成次数</span>
                <span className="text-[10px] font-bold text-blue-500">{5 - novelGenerations} / 5</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)] transition-all duration-500" 
                  style={{ width: `${((5 - novelGenerations) / 5) * 100}%` }}
                />
              </div>
              <div className="text-[9px] text-gray-500 mt-1">每日 00:00 自动重置</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<View>('home');
  const [isPolarClawClaimed, setIsPolarClawClaimed] = useState(false);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [currentVideoTitle, setCurrentVideoTitle] = useState('');
  const [isPersonalityModalOpen, setIsPersonalityModalOpen] = useState(false);
  const [personalityText, setPersonalityText] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [activeMediaTab, setActiveMediaTab] = useState<'local' | 'library' | 'novel'>('local');
  const [isWaitingForUpload, setIsWaitingForUpload] = useState(false);
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
  const [dramaCredits, setDramaCredits] = useState(30);
  const [novelGenerations, setNovelGenerations] = useState(5);
  const [attachedFile, setAttachedFile] = useState<{ name: string, type: 'video' | 'novel' } | null>(null);

  const handleSelectNovel = (title?: string) => {
    setIsMediaModalOpen(false);
    
    if (novelGenerations <= 0) {
      const aiMsg: Message = {
        role: 'assistant',
        content: '抱歉，您的今日小说生成次数已用完。次数将在每日 00:00 自动重置，请明天再试。',
        isPolarClaw: true
      };
      setMessages(prev => [...prev, aiMsg]);
      return;
    }

    const novelContent = title ? `《${title}》\n\n${NOVEL_TEXT.slice(0, 300)}...` : NOVEL_TEXT;
    setInputText(novelContent);
  };

  const handleSelectDrama = (title?: string) => {
    setIsMediaModalOpen(false);

    if (dramaCredits < 10) {
      const aiMsg: Message = {
        role: 'assistant',
        content: '抱歉，您的今日短剧剪辑积分不足。积分将在每日 00:00 自动重置，请明天再试。',
        isPolarClaw: true
      };
      setMessages(prev => [...prev, aiMsg]);
      return;
    }

    setAttachedFile({ name: title ? `${title}.mp4` : '选定短剧.mp4', type: 'video' });
  };

  const handleConfirmPersonality = () => {
    if (!personalityText.trim()) {
      setIsPersonalityModalOpen(false);
      return;
    }
    
    // Simulate sending a message
    const newUserMsg: Message = { role: 'user', content: `[系统指令] 配置人格：${personalityText.substring(0, 50)}...` };
    setMessages(prev => [...prev, newUserMsg]);
    setIsPersonalityModalOpen(false);

    // Simulate AI Response acknowledging the personality
    setTimeout(() => {
      const aiMsg: Message = { 
        role: 'assistant', 
        content: `收到！我已经成功加载了“${selectedPersonality || '自定义'}”人格。现在我将以这个身份为您提供最专业的创作支持。您想先聊聊哪个剧本或创意？`,
        isPolarClaw: true
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 800);
  };

  const handleSend = () => {
    if (!inputText.trim() && !attachedFile) return;
    
    const content = attachedFile ? `[视频文件: ${attachedFile.name}]` : inputText;
    const newUserMsg: Message = { role: 'user', content };
    setMessages([...messages, newUserMsg]);
    
    // Deduct credits
    if (attachedFile) {
      setDramaCredits(prev => prev - 10);
    } else if (inputText.startsWith('《') || inputText === NOVEL_TEXT) {
      setNovelGenerations(prev => prev - 1);
    }

    setInputText('');
    setAttachedFile(null);
    if (view !== 'polarclaw') setView('chat');

    // Simulate AI Response
    setTimeout(() => {
      let aiMsg: Message;
      
      if (content.startsWith('[视频文件:')) {
        aiMsg = {
          role: 'assistant',
          content: '正在为您生成短剧视频...',
          isPolarClaw: true,
          type: 'editing_simulation'
        };
      } else if (content.startsWith('《') || content === NOVEL_TEXT) {
        aiMsg = {
          role: 'assistant',
          content: '收到小说内容！正在为您深度解析剧情并生成视频...',
          isPolarClaw: true,
          type: 'novel_simulation'
        };
      } else if (content.includes('小说')) {
        aiMsg = {
          role: 'assistant',
          content: "好的，请点击左下角的 '+' 按钮点击小说素材库，我将立即为您生成小说视频。",
          isPolarClaw: true
        };
      } else if (content.includes('剪辑') || content.includes('短剧')) {
        aiMsg = {
          role: 'assistant',
          content: "好的，请点击左下角的 '+' 按钮点击上传视频或点击短剧素材库，我将立即为您开启剪辑流程。",
          isPolarClaw: true
        };
        setIsWaitingForUpload(true);
      } else {
        aiMsg = { 
          role: 'assistant', 
          content: view === 'polarclaw' || isPolarClawClaimed 
            ? "嘻嘻~ PolarClaw 小龙虾来啦！我是您的全能创作搭档。检测到您正在构思短剧，我可以为您提供：\n✅ 创意生成：基于当前热点生成3个反转剧本\n✅ 剧情解析：分析该题材的受众心理\n✅ 素材配置：推荐最适合的背景音乐与转场特效\n\n您想先从哪一步开始？"
            : "嘻嘻~ 小智来啦！作为北斗智影研发的音视频内容多模态理解分析智能体，我随时准备帮您：\n✅ 深度解析短剧/影视剧剧情与人物关系\n✅ 诊断剪辑效果、优化节奏/钩子/转场方案\n✅ 分析小说IP潜力，定制高转化推广视频策略\n\n您最近在剪辑哪部短剧？或者手头有想推广的小说、待分析的视频片段？——告诉我，咱们立刻进入专业分析模式！🎬✨",
          isPolarClaw: view === 'polarclaw' || isPolarClawClaimed
        };
      }
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  const handleSetView = (v: View) => {
    if (v === 'new-chat') {
      setMessages([]);
    }
    setView(v);
  };

  return (
    <div className={`flex h-screen bg-[#050505] text-white font-sans overflow-hidden`}>
      {/* Sidebar only on secondary pages */}
      {view !== 'home' && <Sidebar currentView={view} setView={handleSetView} dramaCredits={dramaCredits} novelGenerations={novelGenerations} />}

      <main className="flex-1 relative flex flex-col">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
        </div>

        {/* Header Nav */}
        {view !== 'polarclaw' && (
          <header className={`flex items-center justify-between px-8 py-4 z-20`}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-bold text-xl text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]">b</div>
              <span className="text-lg font-semibold tracking-tight text-white">北斗智影AI创作中心</span>
            </div>
            
            <nav className="flex items-center gap-8 text-sm font-medium text-gray-400">
              <button onClick={() => setView('home')} className={`transition-colors ${view === 'home' ? 'text-white' : 'hover:text-gray-300'}`}>首页</button>
              <button className="hover:text-gray-300 transition-colors">任务中心</button>
              <button 
                onClick={() => setView('chat')}
                className={`transition-colors ${(view === 'chat' || view === 'new-chat') ? 'text-white border-b-2 border-red-600 pb-1' : 'hover:text-gray-300'}`}
              >
                AI智能助手
              </button>
              
              {isPolarClawClaimed && view !== 'home' && (
                <button 
                  onClick={() => setView('polarclaw')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all font-bold bg-orange-500/10 text-orange-500 border-orange-500/20 hover:bg-orange-500/20`}
                >
                  <Zap className={`w-3.5 h-3.5 fill-orange-500`} />
                  PolarClaw
                </button>
              )}

              <button className="hover:text-gray-300 transition-colors">我的收益</button>
              <button className="hover:text-gray-300 transition-colors">我的钱包</button>
            </nav>

            <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden border border-white/10">
              <img src="https://picsum.photos/seed/avatar/100/100" alt="avatar" referrerPolicy="no-referrer" />
            </div>
          </header>
        )}

        {/* Content Area */}
        <div className={`flex-1 flex overflow-hidden ${view === 'polarclaw' ? 'bg-[#0a0a0a]' : ''}`}>
          <div className={`flex-1 overflow-y-auto relative ${view === 'polarclaw' ? 'p-0' : 'px-8 py-12 flex flex-col items-center z-10'}`}>
            <AnimatePresence mode="wait">
              {view === 'home' || view === 'new-chat' ? (
                <div 
                  key={view}
                  className="w-full max-w-4xl flex flex-col items-center text-center mt-10"
                >
                  <h1 className="text-5xl font-bold mb-4 tracking-tight">
                    Hi, 我是你的全能AI助手小智
                  </h1>
                  <button className="text-cyan-400 text-sm mb-8 flex items-center gap-1 hover:underline">
                    怎么把中文短剧改成海外版? <span className="text-lg">→</span>
                  </button>
                  
                  {/* Large Chat Box - Image 1 Style */}
                  <div className="w-full max-w-3xl mb-12">
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-8 shadow-2xl text-left relative">
                      <div className="text-gray-400 mb-6 text-lg">可以问我任何问题，你想聊点什么？</div>
                      
                      <div className="flex flex-wrap gap-3 items-center">
                        <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-sm font-medium">AI创作工具</button>
                        <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm font-medium text-gray-300 transition-colors">短剧热度日榜</button>
                        <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm font-medium text-gray-300 transition-colors">短剧趋势周榜</button>
                        <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm font-medium text-gray-300 transition-colors">短剧价值月榜</button>
                        
                        {/* Lobster Button */}
                        <button 
                          onClick={() => setView('polarclaw')}
                          className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 rounded-full text-sm font-bold text-orange-500 flex items-center gap-1.5 transition-all relative"
                        >
                          🦞 PolarClaw
                          <div className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-red-600 text-[8px] text-white rounded-full animate-pulse border border-white/20">
                            NEW
                          </div>
                        </button>
                      </div>

                      <button 
                        onClick={handleSend}
                        className="absolute bottom-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
                      >
                        <Send className="w-6 h-6 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Drama Cards Grid - Image 1 Style */}
                  <div className="w-full text-left">
                    <div className="flex items-center gap-12 mb-8 border-b border-white/5">
                      <button className="text-white font-bold border-b-2 border-white pb-4 px-2">上新 TOP100</button>
                      <button className="text-gray-500 hover:text-gray-300 transition-colors pb-4 px-2">收益 TOP100</button>
                      <button className="text-gray-500 hover:text-gray-300 transition-colors pb-4 px-2">爆款 TOP100</button>
                    </div>
                    <div className="grid grid-cols-5 gap-6">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="aspect-[3/4.2] bg-white/5 rounded-2xl border border-white/5 overflow-hidden relative group cursor-pointer">
                          <img 
                            src={`https://picsum.photos/seed/drama_v2_${i}/400/600`} 
                            alt="drama" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3 left-3 px-2 py-1 bg-red-600/90 text-[10px] rounded-md font-bold backdrop-blur-sm flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> 爆款
                          </div>
                          <div className="absolute top-3 right-3 px-2 py-1 bg-black/40 backdrop-blur-md rounded-md text-[10px] font-medium border border-white/10">
                            佣金比例: {60 + i}%
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                            <div className="text-sm font-bold text-white mb-1 truncate">短剧名称示例 {i}</div>
                            <div className="text-[10px] text-gray-400">12.5万人在看</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : view === 'polarclaw' ? (
                <div 
                  key="polarclaw"
                  className="w-full h-full flex flex-col items-center text-white overflow-y-auto z-10"
                >
                  {isPolarClawClaimed ? (
                    <div className="w-full max-w-4xl px-8 py-12 flex flex-col items-center">
                      {messages.length > 0 && (
                        <div className="w-full max-w-3xl flex flex-col gap-6 mt-8 mb-32">
                          {messages.map((msg, i) => (
                            <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                              {msg.role === 'assistant' && (
                                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-orange-500 border border-orange-400/50">
                                  <span className="text-xl">🦞</span>
                                </div>
                              )}
                              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                                msg.role === 'user' 
                                  ? 'bg-white/10 text-white' 
                                  : 'bg-white/5 border border-white/5 text-gray-200'
                              }`}>
                                  {msg.type === 'editing_simulation' ? (
                                    <EditingSimulation onViewVideo={(title) => {
                                      setCurrentVideoTitle(title);
                                      setIsVideoPlayerOpen(true);
                                    }} />
                                  ) : msg.type === 'novel_simulation' ? (
                                    <NovelSimulation onViewVideo={(title) => {
                                      setCurrentVideoTitle(title);
                                      setIsVideoPlayerOpen(true);
                                    }} />
                                  ) : msg.type === 'auth_simulation' ? (
                                    <AuthSimulation />
                                  ) : (
                                    <div className="whitespace-pre-wrap">
                                      {msg.content.startsWith('[视频文件:') ? (
                                        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 min-w-[200px]">
                                          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0">
                                            <Video className="w-6 h-6 text-blue-400" />
                                          </div>
                                          <div className="flex flex-col overflow-hidden">
                                            <span className="text-sm font-medium text-gray-200 truncate">{msg.content.replace('[视频文件: ', '').replace(']', '')}</span>
                                            <span className="text-xs text-gray-500">视频文件</span>
                                          </div>
                                        </div>
                                      ) : (
                                        msg.content
                                      )}
                                    </div>
                                  )}
                              </div>
                              {msg.role === 'user' && (
                                <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden shrink-0">
                                  <img src="https://picsum.photos/seed/avatar/100/100" alt="avatar" referrerPolicy="no-referrer" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full max-w-6xl px-12 py-16 flex flex-col items-center">
                      <div className="flex flex-col items-center mb-12">
                        <div className="text-6xl font-black tracking-tighter mb-2 flex items-center gap-2">
                          Polar<span className="text-orange-500">Claw</span>
                        </div>
                        <div className="text-4xl font-bold text-white">7*24小时在线的专属智能伙伴</div>
                      </div>

                      {/* Banner Section - Dark Theme with Beidou Accents */}
                      <div className="w-full bg-white/5 backdrop-blur-md rounded-[40px] p-12 flex items-center justify-between mb-16 relative overflow-hidden border border-white/10">
                        <div className="relative z-10 max-w-lg">
                          <div className="flex items-center gap-2 mb-4">
                            <h2 className="text-3xl font-bold">创建 PolarClaw</h2>
                          </div>
                          <p className="text-gray-400 mb-8 leading-relaxed">
                            一键部署 PolarClaw，零门槛即刻唤醒个人助手，随时随地对话
                          </p>
                          <button 
                            onClick={() => {
                              setIsPolarClawClaimed(true);
                              const welcomeMsg: Message = {
                                role: 'assistant',
                                content: 'PolarClaw来了！ 🦞在下方输入消息，增加复杂配置，即可快速开启对话。',
                                isPolarClaw: true
                              };
                              const authMsg: Message = {
                                role: 'assistant',
                                content: '需要授权才能继续',
                                isPolarClaw: true,
                                type: 'auth_simulation'
                              };
                              setMessages([welcomeMsg, authMsg]);
                            }}
                            className="px-8 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
                          >
                            立即领取
                          </button>
                        </div>
                        
                        <div className="relative z-10 w-64 h-64 flex items-center justify-center">
                          <div className="w-48 h-48 bg-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/40 animate-bounce border-4 border-orange-400/50">
                            <span className="text-8xl">🦞</span>
                          </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[80px] rounded-full" />
                      </div>

                      {/* Feature Cards - Dark Theme */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
                        {[
                          { icon: <Sparkles className="w-6 h-6 text-orange-500" />, title: "创意生成", desc: "基于海量爆款短剧数据，一键生成极具反转与钩子的剧本创意。" },
                          { icon: <Layout className="w-6 h-6 text-blue-500" />, title: "素材配置", desc: "智能匹配最契合剧情的背景音乐、转场特效及视觉素材。" },
                          { icon: <FileText className="w-6 h-6 text-green-500" />, title: "剧情解析", desc: "深度拆解爆款短剧逻辑，分析人物关系与冲突点。" },
                          { icon: <Scissors className="w-6 h-6 text-purple-500" />, title: "二次剪辑", desc: "AI辅助高燃剪辑，自动识别精彩片段，优化完播率。" },
                          { icon: <Share2 className="w-6 h-6 text-pink-500" />, title: "智能发布", desc: "多平台一键分发，智能匹配发布时间与标签。" }
                        ].map((f, i) => (
                          <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-[24px] hover:bg-white/10 transition-all group cursor-pointer flex flex-col items-center text-center">
                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                              {f.icon}
                            </div>
                            <h3 className="text-base font-bold mb-2 text-white">{f.title}</h3>
                            <p className="text-gray-500 text-[11px] leading-relaxed">{f.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full max-w-3xl flex flex-col gap-6 pb-32">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'assistant' && (
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.isPolarClaw ? 'bg-orange-500' : 'bg-red-600'}`}>
                          {msg.isPolarClaw ? <Zap className="w-6 h-6 text-white fill-white" /> : <span className="font-bold">AI</span>}
                        </div>
                      )}
                      <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-white/10 text-white' 
                          : msg.isPolarClaw 
                            ? 'bg-orange-950/30 border border-orange-500/20 text-gray-200' 
                            : 'bg-white/5 border border-white/5 text-gray-200'
                      }`}>
                        {msg.type === 'editing_simulation' ? (
                          <EditingSimulation />
                        ) : msg.type === 'novel_simulation' ? (
                          <NovelSimulation />
                        ) : msg.type === 'auth_simulation' ? (
                          <AuthSimulation />
                        ) : (
                          <div className="whitespace-pre-wrap">{msg.content}</div>
                        )}
                      </div>
                      {msg.role === 'user' && (
                        <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden shrink-0">
                          <img src="https://picsum.photos/seed/avatar/100/100" alt="avatar" referrerPolicy="no-referrer" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Floating Sidebar - Home Only */}
        {view === 'home' && (
          <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 flex flex-col items-center gap-6 shadow-xl">
              <button className="flex flex-col items-center gap-1 group">
                <div className="p-2 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                  <Share2 className="w-5 h-5 text-gray-400" />
                </div>
                <span className="text-[10px] text-gray-500">小程序</span>
              </button>
              <button className="flex flex-col items-center gap-1 group">
                <div className="p-2 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                </div>
                <span className="text-[10px] text-gray-500">教程&客服</span>
              </button>
            </div>
            
            <motion.button 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg shadow-red-600/20 flex items-center justify-center overflow-hidden">
                <span className="text-3xl">🎁</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-white/20">抽奖</div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2 py-1 rounded-full border border-orange-500/20">
                春季倍增 最高+9%
              </div>
            </motion.button>
          </div>
        )}

        {/* Floating Input Bar (for chat and polarclaw views) */}
        {((view === 'chat') || (view === 'polarclaw' && isPolarClawClaimed)) && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-50">
            {view === 'polarclaw' ? (
              <div className="bg-[#1a1a1a] border border-white/10 rounded-[28px] p-6 shadow-2xl flex flex-col gap-6">
                {attachedFile && (
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 self-start relative group">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0">
                      <Video className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex flex-col overflow-hidden pr-6">
                      <span className="text-sm font-medium text-gray-200 truncate max-w-[150px]">{attachedFile.name}</span>
                      <span className="text-xs text-gray-500">已选择视频</span>
                    </div>
                    <button 
                      onClick={() => setAttachedFile(null)}
                      className="absolute top-1 right-1 p-1 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
                    >
                      <X className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <input 
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={attachedFile ? "添加描述或直接发送..." : "可以问我任何问题，你想聊点什么？"}
                    className="w-full bg-transparent border-none focus:ring-0 text-gray-400 text-lg p-0 placeholder:text-gray-500"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setIsPersonalityModalOpen(true)}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-orange-500" />
                      人格
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setIsMediaModalOpen(true)}
                      className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-gray-400"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={handleSend}
                      className={`p-3 rounded-full transition-all ${
                        inputText.trim() 
                          ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                          : 'bg-white/10 text-gray-400'
                      }`}
                    >
                      <Send className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`relative flex flex-col gap-2 p-2 rounded-[24px] border shadow-2xl transition-all bg-[#1a1a1a]/80 backdrop-blur-xl border-white/10 text-white`}>
                {attachedFile && (
                  <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/10 self-start ml-2 mt-1 relative group">
                    <Video className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-medium text-gray-200 truncate max-w-[120px]">{attachedFile.name}</span>
                    <button 
                      onClick={() => setAttachedFile(null)}
                      className="p-0.5 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <X className="w-3 h-3 text-gray-500" />
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <input 
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={attachedFile ? "添加描述或直接发送..." : "问我任何问题..."}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 pl-4"
                  />
                  
                  <div className="flex items-center gap-2 pr-2">
                    <button 
                      onClick={() => setView('polarclaw')}
                      className="px-3 py-1.5 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 rounded-full text-xs font-bold text-orange-500 flex items-center gap-1 transition-all"
                    >
                      🦞 PolarClaw
                    </button>
                    
                    <button 
                      onClick={() => setIsMediaModalOpen(true)}
                      className="p-2 rounded-full transition-colors hover:bg-white/5 text-gray-400"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                    
                    <button 
                      onClick={handleSend}
                      className={`p-2 rounded-full transition-all ${
                        inputText.trim() || attachedFile
                          ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                          : 'bg-white/10 text-gray-400'
                      }`}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {/* Media Selection Modal */}
        <AnimatePresence>
          {isMediaModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMediaModalOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-5xl bg-[#1a1a1a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-8">
                      <button 
                        onClick={() => setActiveMediaTab('local')}
                        className={`text-xl font-bold transition-colors ${activeMediaTab === 'local' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                      >
                        本地视频
                      </button>
                      <button 
                        onClick={() => setActiveMediaTab('library')}
                        className={`text-xl font-bold transition-colors ${activeMediaTab === 'library' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                      >
                        短剧素材库
                      </button>
                      <button 
                        onClick={() => setActiveMediaTab('novel')}
                        className={`text-xl font-bold transition-colors ${activeMediaTab === 'novel' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                      >
                        小说素材库
                      </button>
                    </div>
                    <button 
                      onClick={() => setIsMediaModalOpen(false)}
                      className="p-2 hover:bg-white/5 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-400" />
                    </button>
                  </div>

                  {activeMediaTab === 'local' ? (
                    <div 
                      onClick={() => {
                        if (isWaitingForUpload) {
                          if (dramaCredits < 10) {
                            setIsMediaModalOpen(false);
                            const aiMsg: Message = {
                              role: 'assistant',
                              content: '抱歉，您的今日短剧剪辑积分不足。积分将在每日 00:00 自动重置，请明天再试。',
                              isPolarClaw: true
                            };
                            setMessages(prev => [...prev, aiMsg]);
                            return;
                          }

                          setIsMediaModalOpen(false);
                          setIsWaitingForUpload(false);
                          setAttachedFile({ name: '本地视频素材.mp4', type: 'video' });
                        }
                      }}
                      className="bg-[#242424] border-2 border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 group hover:border-orange-500/50 transition-colors cursor-pointer"
                    >
                      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-orange-500/10 transition-colors">
                        <UploadCloud className="w-8 h-8 text-gray-400 group-hover:text-orange-500" />
                      </div>
                      <div className="text-xl font-medium text-gray-200">添加视频</div>
                      <div className="text-sm text-gray-500 text-center">
                        支持 mp4 视频格式，视频大小不超过400MB，30s≤时长≤900s
                      </div>
                      <div className="text-xs font-bold text-orange-500 bg-orange-500/10 px-2 py-1 rounded-lg">
                        今日已消耗积分：{30 - dramaCredits} / 30
                      </div>
                    </div>
                  ) : activeMediaTab === 'library' ? (
                    <div className="flex flex-col gap-6">
                      {/* Search Bar */}
                      <div className="relative flex gap-3">
                        <div className="relative flex-1">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input 
                            type="text"
                            placeholder="请输入短剧名称"
                            className="w-full bg-[#242424] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-gray-200 focus:outline-none focus:border-orange-500/50 transition-colors"
                          />
                        </div>
                        <button className="px-10 py-4 bg-gradient-to-r from-orange-500 to-pink-600 rounded-2xl text-lg font-bold text-white shadow-lg shadow-orange-500/20">
                          搜索
                        </button>
                      </div>

                      {/* Filters */}
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500 shrink-0">剧场</span>
                          <div className="flex flex-wrap gap-2">
                            {['KalosTV', 'SnackShort', 'GoodShort', 'MoboReels', 'TouchShort', 'FlickReels'].map((t, i) => (
                              <button key={t} className={`px-4 py-1.5 rounded-full text-sm transition-all ${i === 0 ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-transparent'}`}>
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500 shrink-0">语种</span>
                          <div className="flex flex-wrap gap-2">
                            {['全部', '英文', '印尼', '西班牙语', '法语', '泰语', '葡萄牙语', '韩语', '日语', '阿拉伯语', '德语', '俄语', '意大利语', '菲律宾语', '越南语', '印地语', '马来语', '土耳其语', '繁体中文', '罗马尼亚语', '波兰语', '捷克语'].map((l, i) => (
                              <button key={l} className={`px-4 py-1.5 rounded-full text-sm transition-all ${i === 0 ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-transparent'}`}>
                                {l}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Grid */}
                      <div className="grid grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {[
                          { title: "حب العم اللامتناهي", theater: "KalosTV" },
                          { title: "حبيبته تعود", theater: "KalosTV" },
                          { title: "(Dubbed)Married to the...", theater: "KalosTV" },
                          { title: "The Single Mom and H...", theater: "KalosTV" },
                          { title: "The Thorn In His Rose", theater: "KalosTV" },
                          { title: "Back to the '80s", theater: "KalosTV" },
                          { title: "Stand Aside, Impostor", theater: "KalosTV" },
                          { title: "Her Comeback", theater: "KalosTV" },
                          { title: "The Billionaire I Dumpe...", theater: "KalosTV" }
                        ].map((item, i) => (
                          <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-all group">
                            <div className="flex gap-4">
                              <div className="w-20 h-28 rounded-xl overflow-hidden shrink-0">
                                <img src={`https://picsum.photos/seed/drama${i}/200/280`} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                              <div className="flex flex-col justify-between py-1">
                                <div>
                                  <div className="text-sm font-bold text-gray-200 line-clamp-2 mb-1">{item.title}</div>
                                  <div className="text-xs text-gray-500">{item.theater}</div>
                                </div>
                                <button 
                                  onClick={() => handleSelectDrama(item.title)}
                                  className="px-4 py-1.5 bg-gradient-to-r from-orange-500 to-pink-600 rounded-lg text-xs font-bold text-white shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all"
                                >
                                  选择
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex gap-4">
                          <button className="px-6 py-2 bg-white/5 rounded-full text-sm text-gray-500 hover:text-white transition-colors">上一页</button>
                          <div className="flex items-center text-sm text-gray-400">1 / 764</div>
                          <button className="px-6 py-2 bg-white/5 rounded-full text-sm text-gray-500 hover:text-white transition-colors">下一页</button>
                        </div>
                        <div className="text-xs font-bold text-orange-500 bg-orange-500/10 px-3 py-1.5 rounded-lg">
                          今日已消耗积分：{30 - dramaCredits} / 30
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-6">
                      {/* Search Bar */}
                      <div className="relative flex gap-3">
                        <div className="relative flex-1">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input 
                            type="text"
                            placeholder="请输入小说名称"
                            className="w-full bg-[#242424] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-gray-200 focus:outline-none focus:border-blue-500/50 transition-colors"
                          />
                        </div>
                        <button className="px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl text-lg font-bold text-white shadow-lg shadow-blue-500/20">
                          搜索
                        </button>
                      </div>

                      {/* Filters */}
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500 shrink-0">剧场</span>
                          <div className="flex flex-wrap gap-2">
                            {['所有小说剧场', 'NovelShort', 'Novelgo', 'WebNovel', 'PlotNovel', 'NovelMaster', 'GoodNovel', 'MyFiction', 'MotoNovel', 'NovelLia', 'SnackShort'].map((t, i) => (
                              <button key={t} className={`px-4 py-1.5 rounded-full text-sm transition-all ${i === 0 ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-transparent'}`}>
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500 shrink-0">语种</span>
                          <div className="flex flex-wrap gap-2">
                            {['英语'].map((l, i) => (
                              <button key={l} className={`px-4 py-1.5 rounded-full text-sm transition-all ${i === 0 ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-transparent'}`}>
                                {l}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Grid */}
                      <div className="grid grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {[
                          "Never Coming Back",
                          "Restore My Hearing an...",
                          "Humiliated by My Wife'...",
                          "Fake Rich, Real Ruin Af...",
                          "He Faked Amnesia to ...",
                          "His First Love Was My ...",
                          "Her Baby Between Us",
                          "The Proposal That Was...",
                          "Love fades away, we n..."
                        ].map((title, i) => (
                          <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-all group">
                            <div className="flex gap-4">
                              <div className="w-20 h-28 rounded-xl overflow-hidden shrink-0">
                                <img src={`https://picsum.photos/seed/novel${i}/200/280`} alt={title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                              <div className="flex flex-col justify-between py-1">
                                <div>
                                  <div className="text-sm font-bold text-gray-200 line-clamp-2 mb-1">{title}</div>
                                  <div className="text-xs text-gray-500">Novel Library</div>
                                </div>
                                <button 
                                  onClick={() => handleSelectNovel(title)}
                                  className="px-4 py-1.5 bg-gradient-to-r from-orange-500 to-pink-600 rounded-lg text-xs font-bold text-white shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all"
                                >
                                  选择
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex gap-4">
                          <button className="px-6 py-2 bg-white/5 rounded-full text-sm text-gray-500 hover:text-white transition-colors">上一页</button>
                          <div className="flex items-center text-sm text-gray-400">1 / 3819</div>
                          <button className="px-6 py-2 bg-white/5 rounded-full text-sm text-gray-500 hover:text-white transition-colors">下一页</button>
                        </div>
                        <div className="text-xs font-bold text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-lg">
                          今日已生成次数：{5 - novelGenerations} / 5
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Personality Modal */}
        <AnimatePresence>
          {isPersonalityModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsPersonalityModalOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl text-gray-900"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <h3 className="text-xl font-bold">配置人格</h3>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setIsPersonalityModalOpen(false)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-0">
                  <div className="bg-blue-50/50 px-6 py-3 flex items-center gap-2 text-sm text-gray-600">
                    <span>💡</span>
                    <span>预设 PolarClaw 的人格，将其塑造为一个“有灵魂”的AI助手。</span>
                  </div>

                  <div className="p-6 space-y-6">
                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-3">人格 示例</div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: '爆款推手', desc: '身份：短剧界的“点金手”，深谙流量密码的资深运营专家。\n风格：言简意赅，直击要害，充满商业洞察力。\n能力：爆款选题预测、黄金3秒钩子设计、全平台算法对齐。\n边界：拒绝低俗擦边，坚持内容为王，维护账号长效权重。\n记忆：实时追踪全网热榜，精准记住您的创作风格并持续迭代。' },
                          { label: '视觉大师', desc: '身份：对光影与节奏有极致追求的先锋剪辑导演。\n风格：极简主义，审美高级，富有电影感。\n能力：情绪化调色、节奏卡点、电影级转场方案设计。\n边界：不堆砌无意义特效，尊重素材原生美感。\n记忆：深度学习您的审美偏好，打造独一无二的视觉标签。' },
                          { label: '剧情架构师', desc: '身份：擅长解构人性、重塑冲突的顶级编剧顾问。\n风格：逻辑严密，表达犀利，擅长制造反转。\n能力：人物弧线深度解析、剧情冲突点强化、长线钩子布局。\n边界：不触碰敏感话题，坚持正向价值观输出。\n记忆：记住每一个角色的前世今生，确保剧情逻辑无懈可击。' },
                          { label: '二创逻辑师', desc: '身份：擅长在碎片中寻找叙事新可能的解构主义者。\n风格：视角独特，表达幽默，极具个人辨识度。\n能力：混剪思路重构、解说词深度创作、素材跨界组合。\n边界：严格遵守版权规则，拒绝无脑搬运。\n记忆：记住您的粉丝互动偏好，定制高转化的二创方案。' },
                          { label: '全能创作官', desc: '身份：灵感永不枯竭的数字生命，您的全链路创作合伙人。\n风格：全能且贴心，既有专业高度又不失创作温度。\n能力：从文字脚本到画图建模，再到视频成片的闭环支持。\n边界：严守创作底线，确保每一件作品都经得起市场检验。\n记忆：您的每一次创作尝试都是我的进化养料，实现真正的“人机合一”。' }
                        ].map((item) => (
                          <button 
                            key={item.label}
                            onClick={() => {
                              setPersonalityText(item.desc);
                              setSelectedPersonality(item.label);
                            }}
                            className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${selectedPersonality === item.label ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20' : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'}`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-3">人格</div>
                      <div className="relative">
                        <textarea 
                          value={personalityText}
                          onChange={(e) => setPersonalityText(e.target.value)}
                          placeholder="可以通过简单描述定义人格，也可以使用上方示例快速配置"
                          className="w-full h-48 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-sm"
                          maxLength={1000}
                        />
                        <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                          {personalityText.length}/1000
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <button 
                    onClick={() => setIsPersonalityModalOpen(false)}
                    className="px-6 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    onClick={handleConfirmPersonality}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                  >
                    确定
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
      <VideoPlayerModal 
        isOpen={isVideoPlayerOpen} 
        onClose={() => setIsVideoPlayerOpen(false)} 
        title={currentVideoTitle} 
      />
    </div>
  );
}
