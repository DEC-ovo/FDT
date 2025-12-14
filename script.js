// 给玉铃的“爱的频率” - 核心交互脚本
// 开发者：庞佳君 ｜ 使用者：马玉铃

document.addEventListener('DOMContentLoaded', function() {
    // ==================== 全局变量与配置 ====================
    const CORRECT_PASSWORD = '1';
    const TOTAL_SONGS = 13;
    const STORAGE_KEY = 'yuling_music_universe';
    const AUTO_PLAY_SONG_ID = 1; // 《特别的人》的索引
    
    let stars = [];
    let currentStar = null;
    let backgroundMusic = null;
    let starfield = document.getElementById('starfield');
    let isInitialPlay = true;
    
    // ==================== 密码验证 ====================
    const passwordOverlay = document.getElementById('passwordOverlay');
    const passwordInput = document.getElementById('passwordInput');
    const submitPassword = document.getElementById('submitPassword');
    
    submitPassword.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') checkPassword();
    });
    
    function checkPassword() {
        if (passwordInput.value === CORRECT_PASSWORD) {
            // 密码正确，优雅退场
            passwordOverlay.style.opacity = '0';
            setTimeout(() => {
                passwordOverlay.style.display = 'none';
                initApplication();
            }, 800);
        } else {
            // 密码错误效果
            passwordInput.style.borderColor = '#ff3333';
            passwordInput.style.animation = 'shake 0.5s';
            setTimeout(() => {
                passwordInput.style.animation = '';
                passwordInput.value = '';
                passwordInput.placeholder = '密码不对哦，再试试';
            }, 500);
        }
    }
    
    // ==================== 应用程序初始化 ====================
    function initApplication() {
        createStarfield();
        createStars();
        loadProgress();
        createControls();
        
        // 初始化背景音乐
        backgroundMusic = new Audio('music/特别的人.mp3');
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.3;
        // 不自动播放背景音乐，避免浏览器阻止导致页面卡住
        
        // 显示欢迎信息
        setTimeout(() => {
            showUnlockToast('欢迎你，玉铃。点击星星开始探索音乐宇宙吧～');
        }, 1000);
    }
    
    // ==================== 星空粒子系统 ====================
    function createStarfield() {
        const starCount = 200;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star-particle';
            
            // 随机属性
            const size = Math.random() * 3;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = 10 + Math.random() * 20;
            const delay = Math.random() * 5;
            
            // 应用样式
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${x}vw`;
            star.style.top = `${y}vh`;
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `${delay}s`;
            star.style.backgroundColor = i % 3 === 0 ? '#FFD54F' : 
                                       i % 3 === 1 ? '#FFA726' : '#FFFFFF';
            
            starfield.appendChild(star);
        }
    }
    
    // ==================== 歌曲数据 ====================
    const songs = [
        {
            id: 0,
            title: "Love Song",
            artist: "方大同",
            lyrics: "我写了这首歌，是一首简单，不复杂也不难唱的那一种歌。",
            embedCode: '<audio controls style="width: 100%; height: 86px;"><source src="music/Love Song.mp3" type="audio/mpeg">您的浏览器不支持音频播放</think_never_used_51bce0c785ca2f68081bfa7d91973934>',
            reason: "一切的开始。我记得你哼过这首歌。简单，不复杂，却如此正确。",
            unlocked: true,
            position: { x: 30, y: 40 }
        },
        {
            id: 1,
            title: "特别的人",
            artist: "方大同",
            lyrics: "爱一个人或许要慷慨，若只想要被爱，最后没有了对白。",
            embedCode: '<audio controls style="width: 100%; height: 86px;"><source src="music/特别的人.mp3" type="audio/mpeg">您的浏览器不支持音频播放</think_never_used_51bce0c785ca2f68081bfa7d91973934>',
            reason: "我们一生中，错过、相遇，成为某个特别的人。而你是我的这个算式里，最珍贵的解。",
            unlocked: true,
            position: { x: 70, y: 60 }
        },
        {
            id: 2,
            title: "麦恩莉",
            artist: "方大同",
            lyrics: "我终于遇到了你，我麦恩莉，多么甜蜜，我属于你。",
            embedCode: '<audio controls style="width: 100%; height: 86px;"><source src="music/麦恩莉.mp3" type="audio/mpeg">您的浏览器不支持音频播放</think_never_used_51bce0c785ca2f68081bfa7d91973934>',
            reason: "听完《特别的人》，再来听听这首'幸运版'的故事。'我终于遇到了你，我麦恩莉'，这是方大同写下的，最直白的幸运。",
            unlocked: false,
            position: { x: 20, y: 70 }
        },
        {
            id: 3,
            title: "因为你",
            artist: "方大同",
            lyrics: "因为你，我多么幸运，多么幸运，多么幸运，因为你。",
            embedCode: '<audio controls style="width: 100%; height: 86px;"><source src="music/因为你(Live).mp3" type="audio/mpeg">您的浏览器不支持音频播放</think_never_used_51bce0c785ca2f68081bfa7d91973934>',
            reason: "从'幸运'到'原因'。爱常常没有理由，但大同在这首歌里，把'因为你'这个理由，唱成了最甜美的因果律。",
            unlocked: false,
            position: { x: 80, y: 30 }
        },
        {
            id: 4,
            title: "为你写的歌",
            artist: "方大同",
            lyrics: "我们的故事未完待续，让我为你写一首歌，纪念这美丽的爱情。",
            embedCode: '<audio controls style="width: 100%; height: 86px;"><source src="music/为你写的歌.mp3" type="audio/mpeg">您的浏览器不支持音频播放</think_never_used_51bce0c785ca2f68081bfa7d91973934>',
            reason: "看歌名就知道，它应该出现在这里。这不是情书，却比情书更温柔。'我们的故事未完待续'，像极了我们。",
            unlocked: false,
            position: { x: 40, y: 20 }
        },
        {
            id: 5,
            title: "三人游",
            artist: "方大同",
            lyrics: "有些话你选择不对他说，你说某种脆弱，我才感同身受。",
            embedCode: '<audio controls style="width: 100%; height: 86px;"><source src="music/三人游.mp3" type="audio/mpeg">您的浏览器不支持音频播放</think_never_used_51bce0c785ca2f68081bfa7d91973934>',
            reason: "爱不只是甜蜜，也有犹豫和退让。这首经典的'备胎之歌'，藏着一种安静的慷慨。或许，我们都曾如此。",
            unlocked: false,
            position: { x: 60, y: 80 }
        },
        {
            id: 6,
            title: "听",
            artist: "方大同",
            lyrics: "听我唱，一首歌，一首简单的歌，一首不复杂的歌。",
            embedCode: '<audio controls style="width: 100%; height: 86px;"><source src="music/听.mp3" type="audio/mpeg">您的浏览器不支持音频播放</audio>',
            reason: "在复杂的情绪之后，让我们'听'回最简单的需求。'听我唱，一首歌'，让我陪着你，无论以何种形式。",
            unlocked: false,
            position: { x: 25, y: 50 }
        },
        {
            id: 7,
            title: "爱爱爱",
            artist: "方大同",
            lyrics: "爱爱爱，爱爱爱，爱爱爱爱爱爱爱，到底什么是爱？",
            embedCode: '<audio controls style="width: 100%; height: 86px;"><source src="music/爱爱爱.mp3" type="audio/mpeg">您的浏览器不支持音频播放</think_never_used_51bce0c785ca2f68081bfa7d91973934>',
            reason: "从具体回到抽象。究竟什么是爱？这首歌里有繁华世界的千万种答案，而我的答案，与你有关。",
            unlocked: false,
            position: { x: 75, y: 45 }
        },
        {
            id: 8,
            title: "关于爱的定义",
            artist: "方大同",
            lyrics: "关于爱的定义，关于你的意义，关于我们之间的默契。",
            embedCode: '<audio controls style="width: 100%; height: 86px;"><source src="music/关于爱的定义.mp3" type="audio/mpeg">您的浏览器不支持音频播放</think_never_used_51bce0c785ca2f68081bfa7d91973934>',
            reason: "承接上一首的思考。如果非要给爱一个定义，那么'和你在一起'就是我最满意的词典解释。",
            unlocked: false,
            position: { x: 50, y: 65 }
        },
        {
            id: 9,
            title: "春风吹",
            artist: "方大同",
            lyrics: "春风吹，春风吹，吹红了桃花，吹绿了柳树。",
            embedCode: '<audio controls style="width: 100%; height: 86px;"><source src="music/春风吹.mp3" type="audio/mpeg">您的浏览器不支持音频播放</think_never_used_51bce0c785ca2f68081bfa7d91973934>',
            reason: "吹走所有沉重。这是方大同音乐里最清新的一阵风，带着复古的律动。希望它也能吹过你，带来好心情。",
            unlocked: false,
            position: { x: 35, y: 75 }
        },
        {
            id: 10,
            title: "天气先生",
            artist: "方大同",
            lyrics: "你的心情，是我的天气预报，晴天雨天，我都知道。",
            embedCode: '<audio controls style="width: 100%; height: 86px;"><source src="music/天气先生.mp3" type="audio/mpeg">您的浏览器不支持音频播放</think_never_used_51bce0c785ca2f68081bfa7d91973934>',
            reason: "你的心情，是我的天气预报。这首歌像一份俏皮的关心，提醒我，要永远做那个为你预报晴天的'先生'。",
            unlocked: false,
            position: { x: 65, y: 25 }
        },
        {
            id: 11,
            title: "红豆",
            artist: "方大同",
            lyrics: "还没好好地感受，醒着亲吻的温柔，可能从此以后，学会珍惜天长和地久。",
            embedCode: '<audio controls style="width: 100%; height: 86px;"><source src="music/红豆.mp3" type="audio/mpeg">您的浏览器不支持音频播放</think_never_used_51bce0c785ca2f68081bfa7d91973934>',
            reason: "压轴曲。他把别人的经典，唱成了自己的告白。'还没好好地感受，醒着亲吻的温柔'——有些遗憾的美，让我们更珍惜此刻。",
            unlocked: false,
            position: { x: 45, y: 55 }
        },
        {
            id: 12,
            title: "才二十三",
            artist: "方大同",
            lyrics: "未来还有什么疑问？才二十三，人生的乐章，才刚刚开始。",
            embedCode: '<audio controls style="width: 100%; height: 86px;"><source src="music/才二十三.mp3" type="audio/mpeg">您的浏览器不支持音频播放</think_never_used_51bce0c785ca2f68081bfa7d91973934>',
            reason: "最后一颗星。'未来还有什么疑问？'，二十三岁有无限可能，而你的未来，无论乐章如何谱写，我永远是你的头号听众。",
            unlocked: false,
            position: { x: 50, y: 50 }
        }
    ];
    
    // ==================== 星星创建与管理 ====================
    function createStars() {
        songs.forEach((song, index) => {
            const star = document.createElement('div');
            star.className = `star ${song.unlocked ? 'unlocked' : 'locked'}`;
            star.dataset.id = song.id;
            
            // 星星大小根据解锁状态变化
            const size = song.unlocked ? 20 : 12;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${song.position.x}%`;
            star.style.top = `${song.position.y}%`;
            
            // 星星标签
            const label = document.createElement('div');
            label.className = 'star-label';
            label.textContent = song.unlocked ? song.title : '???';
            star.appendChild(label);
            
            // 点击事件
            star.addEventListener('click', function() {
                if (song.unlocked) {
                    playSong(song.id);
                    currentStar = star;
                }
            });
            
            // 悬停效果
            star.addEventListener('mouseenter', function() {
                if (song.unlocked) {
                    label.style.opacity = '1';
                }
            });
            
            star.addEventListener('mouseleave', function() {
                label.style.opacity = '0';
            });
            
            starfield.appendChild(star);
            stars.push(star);
            
            // 初始两颗星有呼吸效果
            if (index < 2) {
                star.style.animation = 'pulse 2s infinite';
            }
        });
    }
    
    // ==================== 歌曲播放系统 ====================
    function playSong(songId, isWelcome = false) {
        const song = songs[songId];
        const player = document.getElementById('player');
        const playerWidget = document.getElementById('playerWidget');
        const nowPlaying = document.getElementById('nowPlaying');
        const currentLyrics = document.getElementById('currentLyrics');
        const userNote = document.getElementById('userNote');
        
        // 更新界面
        nowPlaying.textContent = `《${song.title}》 - ${song.artist}`;
        currentLyrics.textContent = song.lyrics;
        
        // 如果是欢迎曲，显示特别信息
        if (isWelcome) {
            nowPlaying.textContent += ' (欢迎序曲)';
        }
        
        // 加载播放器
        playerWidget.innerHTML = song.embedCode;
        
        // 加载保存的笔记
        const savedNote = getNote(songId);
        userNote.value = savedNote || '';
        
        // 显示播放器
        player.classList.remove('hidden');
        
        // 如果不是欢迎曲，则记录播放并检查解锁
        if (!isWelcome) {
            recordPlay(songId);
            checkUnlock();
        }
    }
    
    // 关闭播放器
    document.getElementById('closePlayer').addEventListener('click', function() {
        document.getElementById('player').classList.add('hidden');
    });
    
    // 保存笔记
    document.getElementById('saveNote').addEventListener('click', function() {
        if (currentStar && currentStar.dataset.id !== undefined) {
            const songId = parseInt(currentStar.dataset.id);
            const note = document.getElementById('userNote').value;
            saveNote(songId, note);
            
            const noteStatus = document.getElementById('noteStatus');
            noteStatus.textContent = '笔记已保存（仅在此设备）';
            noteStatus.style.color = '#4CAF50';
            
            setTimeout(() => {
                noteStatus.textContent = '';
            }, 2000);
            
            // 检查是否因为记录笔记而解锁新歌
            checkUnlock();
        }
    });
    
    // ==================== 解锁系统 ====================
    function checkUnlock() {
        const progress = loadProgress();
        const playedCount = progress.playedSongs.length;
        const notedCount = progress.notedSongs.length;
        
        // 检查是否有新歌可以解锁
        songs.forEach((song, index) => {
            if (!song.unlocked && index > 1) { // 前两首初始已解锁
                const shouldUnlock = (index === 2 && playedCount >= 1) || // 听完第一首解锁第三首
                                   (index === 3 && notedCount >= 1) ||   // 记过一次笔记解锁第四首
                                   (index > 3 && playedCount >= index - 1); // 之后每听一首解锁下一首
                
                if (shouldUnlock && !song.unlocked) {
                    unlockSong(index);
                    showUnlockToast(`✨ 新星点亮：《${song.title}》<br>${song.reason}`);
                    
                    // 如果是最后一首解锁，显示信封
                    if (index === TOTAL_SONGS - 1) {
                        setTimeout(() => {
                            document.getElementById('envelopeBtn').classList.remove('hidden');
                            showUnlockToast('🎉 所有星星已点亮！信件已送达。');
                        }, 1000);
                    }
                }
            }
        });
        
        saveProgress(progress);
    }
    
    function unlockSong(songId) {
        songs[songId].unlocked = true;
        
        // 更新星星状态
        const star = stars[songId];
        if (star) {
            star.classList.remove('locked');
            star.classList.add('unlocked');
            star.style.width = '20px';
            star.style.height = '20px';
            star.querySelector('.star-label').textContent = songs[songId].title;
            
            // 解锁动画
            star.style.animation = 'unlockPop 0.8s forwards';
            setTimeout(() => {
                star.style.animation = '';
            }, 800);
        }
        
        // 保存进度
        const progress = loadProgress();
        if (!progress.unlockedSongs.includes(songId)) {
            progress.unlockedSongs.push(songId);
            saveProgress(progress);
        }
    }
    
    // ==================== 信件系统 ====================
    const letterContent = `
        <p>玉铃：</p>
        <p>当你解锁到这里，想必已经在这个小星空里游荡了一会儿吧。</p>
        <p>我无法时常用我的歌单包围你，也无法在你想起某段旋律时，立刻为你按下播放键。距离让我们之间，偶尔会安静下来。</p>
        <p>于是，我建造了这个小空间。</p>
        <p>这里面的每一首歌，都是我精心挑选的，想要与你分享的"方大同宇宙"。从你熟悉的《Love Song》开始，到你可能还没发现的《才二十三》，每一首，都像是一段我想对你说，却又借大同之口说出的旁白。</p>
        <p>《特别的人》里唱着我们相遇的珍贵，《因为你》则解释了这份珍贵的来由。《三人游》的苦涩和《春风吹》的清爽，都是爱情真实的模样。而《红豆》的缠绵，是我说不出口的牵挂。</p>
        <p>希望这个网站，能在我不在你边时，代替我做这些小事：</p>
        <p>当你需要背景音时，这里有风吹过的旋律；</p>
        <p>当你想被歌词触动时，这里有整片星空可以探索；</p>
        <p>当你只是无聊时，这里有一个关于"爱"的谜题等你慢慢解开。</p>
        <p>这个网站只属于你。你的笔记，你的点亮记录，都会安静地躺在你的浏览器里，就像你心里的感受，只属于你自己。</p>
        <p>最后，用大同的歌词收尾吧，这也是我想说的：</p>
        <p><strong>"我写了这首歌，是一首简单，不复杂也不难唱的那一种歌。"</strong></p>
        <p>我对你的心意，是如此。简单，不复杂，希望不难接受。</p>
        <p>希望你喜欢这份礼物。</p>
    `;
    
    // 信封按钮
    const envelopeBtn = document.getElementById('envelopeBtn');
    const letterModal = document.getElementById('letterModal');
    const closeModal = document.querySelector('.close-modal');
    
    envelopeBtn.addEventListener('click', function() {
        document.getElementById('letterContent').innerHTML = letterContent;
        letterModal.classList.remove('hidden');
    });
    
    closeModal.addEventListener('click', function() {
        letterModal.classList.add('hidden');
    });
    
    letterModal.addEventListener('click', function(e) {
        if (e.target === letterModal) {
            letterModal.classList.add('hidden');
        }
    });
    
    // ==================== 进度存储 ====================
    function loadProgress() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            unlockedSongs: [0, 1], // 初始解锁前两首
            playedSongs: [],
            notedSongs: [],
            lastPlayed: null
        };
    }
    
    function saveProgress(progress) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
    
    function recordPlay(songId) {
        const progress = loadProgress();
        if (!progress.playedSongs.includes(songId)) {
            progress.playedSongs.push(songId);
            progress.lastPlayed = songId;
            saveProgress(progress);
        }
    }
    
    function saveNote(songId, note) {
        const progress = loadProgress();
        
        // 保存笔记内容
        const noteKey = `note_${songId}`;
        localStorage.setItem(noteKey, note);
        
        // 记录已做笔记的歌曲
        if (note && note.trim() !== '' && !progress.notedSongs.includes(songId)) {
            progress.notedSongs.push(songId);
            saveProgress(progress);
        }
    }
    
    function getNote(songId) {
        return localStorage.getItem(`note_${songId}`) || '';
    }
    
    // ==================== 控制面板 ====================
    function createControls() {
        
        // 背景音乐控制
        const toggleMusic = document.getElementById('toggleMusic');
        toggleMusic.addEventListener('click', function() {
            const span = this.querySelector('span');
            if (backgroundMusic) {
                if (backgroundMusic.paused) {
                    backgroundMusic.play().catch(error => {
                        console.log('背景音乐播放失败:', error);
                    });
                    span.textContent = '暂停背景音';
                } else {
                    backgroundMusic.pause();
                    span.textContent = '播放背景音';
                }
            }
        });
        
        // 隐藏星星控制
        const toggleStars = document.getElementById('toggleStars');
        toggleStars.addEventListener('click', function() {
            const span = this.querySelector('span');
            stars.forEach(star => {
                if (span.textContent.includes('隐藏')) {
                    star.style.opacity = '0.2';
                    span.textContent = '显示星星';
                } else {
                    star.style.opacity = '1';
                    span.textContent = '隐藏星星';
                }
            });
        });
        
        // 重置进度
        const resetBtn = document.getElementById('resetBtn');
        resetBtn.addEventListener('click', function() {
            if (confirm('确定要重置所有进度和笔记吗？此操作不可撤销。')) {
                localStorage.removeItem(STORAGE_KEY);
                
                // 清除所有笔记
                for (let i = 0; i < TOTAL_SONGS; i++) {
                    localStorage.removeItem(`note_${i}`);
                }
                
                location.reload();
            }
        });
    }
    
    // ==================== 工具函数 ====================
    function showUnlockToast(message) {
        const toast = document.getElementById('unlockToast');
        const messageSpan = document.getElementById('unlockMessage');
        const closeToast = document.querySelector('.close-toast');
        
        messageSpan.innerHTML = message;
        toast.classList.remove('hidden');
        
        // 添加关闭按钮事件监听
        closeToast.addEventListener('click', function() {
            toast.classList.add('hidden');
        });
        
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 4000);
    }
    
    // ==================== 添加CSS动画 ====================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 10px #FFD54F; }
            50% { transform: scale(1.2); box-shadow: 0 0 20px #FFA726; }
            100% { transform: scale(1); box-shadow: 0 0 10px #FFD54F; }
        }
        
        @keyframes unlockPop {
            0% { transform: scale(1); }
            50% { transform: scale(1.8); }
            100% { transform: scale(1.2); }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .star-particle {
            position: absolute;
            border-radius: 50%;
            animation: float linear infinite;
        }
        
        @keyframes float {
            0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
            25% { transform: translateY(-20px) rotate(90deg); opacity: 1; }
            50% { transform: translateY(-40px) rotate(180deg); opacity: 0.7; }
            75% { transform: translateY(-20px) rotate(270deg); opacity: 0.4; }
            100% { transform: translateY(0) rotate(360deg); opacity: 0.7; }
        }
        
        .modal {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .modal-content {
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        }
        
        .close-modal {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 28px;
            cursor: pointer;
            color: #333;
        }
    `;
    document.head.appendChild(style);
});