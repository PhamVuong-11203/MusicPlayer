const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = document.getElementById('CD')
const btnPlay = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const btnNext = $('.btn-next')
const btnPrev = $('.btn-prev')
const btnRandom = $('.btn-random')
const btnRepeat = $('.btn-repeat')
const playlist = $('.playlist')
const STORE = "New-store"


const app = {
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    currentIndex :0,
    config: JSON.parse(localStorage.getItem(STORE)) || {},
    songs: [
        {
            name: 'Call of Silence',
            singer: 'AOT',
            path: './asset/music/Call of Silence.mp3',
            img: './asset/img/aot.jpg'
        },
        {
            name: 'If I Can Stop One Heart From Breaking',
            singer: 'Honkai Star Rail',
            path: './asset/music/If I Can Stop One Heart From Breaking - Honkai- Star Rail 2.0 OST.mp3',
            img: './asset/img/Firefly-Honkai-Star-Rail.jpg'
        },
        {
            name: 'Kafka Theme Music',
            singer: 'Honkai Star Rail',
            path: './asset/music/Kafka Theme Music.mp3',
            img: './asset/img/kafka.jpg'
        },
        {
            name: 'Kusuriya no Hitorigoto OST',
            singer: 'Kusuriya no Hitorigoto',
            path: './asset/music/Kusuriya no Hitorigoto Episode 9 Insert Song Full Asu wo Tazunete XAI ENG Sub.mp3',
            img: './asset/img/maomao.jpg'
        },
        {
            name: 'Tokyo Ghoul - Glassy Sky',
            singer: 'Tokyo Ghoul',
            path: './asset/music/Tokyo Ghoul - Glassy Sky [東京喰種 -トーキョーグール-].mp3',
            img: './asset/img/touka.jpg'
        },
        {
            name: 'Next to you',
            singer: 'parastye',
            path: './asset/music/NEXT TO YOU.mp3',
            img: './asset/img/parasyte.jpg'
        },
        {
            name: 'Not a Hero',
            singer: 'Tokyo Ghoul',
            path: './asset/music/not a hero.mp3',
            img: './asset/img/touka.jpg'
        },
        {
            name: 'Tell Me',
            singer: 'FATE',
            path: './asset/music/tell me.mp3',
            img: './asset/img/enkidu.jpg'
        },
        {
            name: 'Lemon',
            singer: 'Violet Evergarden',
            path: './asset/music/Lemon.mp3',
            img: './asset/img/violet.jpg'
        },
        {
            name: 'Last Ending',
            singer: 'AOT',
            path: './asset/music/AOTEnding.mp3',
            img: './asset/img/Mikasa.jpg'
        },
        {
            name: 'Sparkle Theme',
            singer: 'Honkai Star Rail',
            path: './asset/music/Sparkle Theme.mp3',
            img: './asset/img/sparkle.jpg'
        },
        {
            name: 'Vivy-Fluorite Eyes Song',
            singer: 'Vivy',
            path: './asset/music/VivyFluorite Eyes Song.mp3',
            img: './asset/img/vivy.jpg'
        },
        {
            name: 'aLIEz Aldnoah.Zero',
            singer: 'Sawano Hiroyuki',
            path: './asset/music/Sawano Hiroyuki - aLIEz Aldnoah.Zero.mp3',
            img: './asset/img/aldnoah-zero.jpg'
        },
        {
            name: 'Re-ZeroEnding',
            singer: 'reZero',
            path: './asset/music/Re-ZeroEnding.mp3',
            img: './asset/img/reZero.jpg'
        },
        {
            name: 'Kimetsu no Yaiba OST',
            singer: 'Kimetsu no Yaiba',
            path: './asset/music/Kimetsu no Yaiba.mp3',
            img: './asset/img/kimetsu.jpg'
        },
        {
            name: 'Uchige Hanabi OST',
            singer: 'DAOKO',
            path: './asset/music/DAOKO.mp3',
            img: './asset/img/DAOKO.jpg'
        },
        {
            name: '86 EIGHTY-SIX - Ending',
            singer: 'EIGHTY-SIX',
            path: './asset/music/86 EIGHTY-SIX - Endingi.mp3',
            img: './asset/img/86.jpg'
        },
        {
            name: '86 EIGHTY SIX Ending 2',
            singer: 'EIGHTY-SIX',
            path: './asset/music/86 EIGHTY SIX Ending 2.mp3',
            img: './asset/img/86.jpg'
        },
        {
            name: 'Tháng tư là lời nói dối của em',
            singer: 'Shigatsu wa kimi no uso',
            path: './asset/music/Tháng tư là lời nói dối của em.mp3',
            img: './asset/img/Shigatsu.jpg'
        },
        {
            name: 'unlasting',
            singer: 'Sword Art Online',
            path: './asset/music/Sword Art Onlineunlasting.mp3',
            img: './asset/img/SAO.jpg'
        },
    ],

    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(STORE, JSON.stringify(this.config));
      },

    render: function () {
        const htmls = this.songs.map((song,index) => {
            return `
        <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index = ${index}>
                <div class="song-thumb" style="background-image: url('${song.img}')"></div>
            <div class="song-infomation">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="song-option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
        `
        })
        $('.playlist').innerHTML = htmls.join('')
    },

    definePropertys: function(){
        Object.defineProperty(this, 'currentSong',{
            get: function(){
                return this.songs[this.currentIndex]
            },
            set: function(value){
                this.currentIndex = value
            }
        })
    },

    handleEvents: function(){
        const _this = this;
        const cdWidth = cd.offsetWidth
        const cdAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 25000,
            iterations: Infinity
        })
        cdAnimate.pause()

        document.onscroll = function(){
            const scrolltop = window.scrollY;
            const newCdWidth = cdWidth - scrolltop;
            cd.style.width = newCdWidth > 0 ?  `${newCdWidth}px` : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        btnPlay.onclick = function(){
            if(!_this.isPlaying){
                audio.play()
            }
            else{
                audio.pause();
               
            }
        }
        audio.onplay = function(){
            _this.isPlaying = true;
            player.classList.add('playing')
            cdAnimate.play()

        }
        audio.onpause = function(){
            _this.isPlaying = false;
            player.classList.remove('playing')
            cdAnimate.pause()

        }
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }
        progress.onchange = function(){
            const seekTime = audio.duration / 100 * progress.value
            audio.currentTime = seekTime
        }
        btnNext.onclick = function(){
            if(_this.isRandom){
               _this.randomSong()
            }else{
                _this.nextSong()

            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()

        }
        btnPrev.onclick = function(){
            if(_this.isRandom){
                _this.randomSong()
             }else{
                 _this.prevSong()
             }
             audio.play()
            _this.render()
            _this.scrollToActiveSong()

        }
        btnRandom.onclick = function(){
          _this.isRandom = !_this.isRandom
          _this.setConfig('isRandom',_this.isRandom)
          btnRandom.classList.toggle('active', _this.isRandom)

        }
        btnRepeat.onclick = function(){
            _this.isRepeat =!_this.isRepeat
          _this.setConfig('isRepeat',_this.isRepeat)

            btnRepeat.classList.toggle('active', _this.isRepeat)
        }
        audio.onended = function(){
            if(_this.isRepeat){
                audio.play()
            }else{
                btnNext.click()
            }
        }
        playlist.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)')

            if(songNode || e.target.closest('.song-option')){
                if(songNode){
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadingCurrentSong()
                    _this.render()
                    audio.play()
                } 
                if(e.target.closest('.song-option')){
                console.log(123)
                }
            }
           
        }

    },
    scrollToActiveSong: function(){
        // if(this.currentIndex < 3 )
        // {
        //     setTimeout(() =>{
        //         $('.song.active').scrollIntoView({
        //             behavior:'smooth',
        //             block: 'center',
        //         })
        //     }, 500)
        // }
        // else{
        //     $('.song.active').scrollIntoView({
        //         behavior:'smooth',
        //         block: 'nearest',
        //     })
        // }
        setTimeout(() =>{
                $('.song.active').scrollIntoView({
                    behavior:'smooth',
                    block: 'center',
                })
            }, 200)
    },

    loadingCurrentSong: function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.img})`
        audio.src = this.currentSong.path     
    },

    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    
    
    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadingCurrentSong()
    },
    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length-1 
        }
        this.loadingCurrentSong()
    },
    playedSongs: [],
    randomSong: function(){
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (
            newIndex === this.currentIndex ||
            this.playedSongs.includes(newIndex)
          );
        this.playedSongs.push(newIndex)
        this.currentIndex = newIndex
        this.loadingCurrentSong()
        if (this.playedSongs.length === this.songs.length) {
            this.playedSongs = []
        }
    },

    start: function () {
        this.loadConfig()
        this.handleEvents()
        this.definePropertys()
        this.loadingCurrentSong()
        this.render()
        btnRandom.classList.toggle('active', this.isRandom)
        btnRepeat.classList.toggle('active', this.isRepeat)

    },
}

app.start()
