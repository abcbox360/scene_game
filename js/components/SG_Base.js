class SG_Base {
    nodes = {
        container: null,
        image: {},
    }
    data
    language = 1
    maxStep
    nowModel
    soundKey
    selectedCmd = ''
    selectedCharacter = ''
    selectedName = ''
    nowPlaying = null
    isYes = false
    animateTimer
    no
    device
    maxWidth = 0
    wrongAnswer = 0
    number = []
    numberMaxLength = 10 //輸入號碼時可輸入幾位數
    languageName = {
        1: '四縣腔',
        2: '海陸腔',
        3: '大埔腔',
        4: '饒平腔',
        5: '詔安腔',
        6: '南四縣腔'
    }

    setContainer(container) {
        this.nodes.container = container;
    }

    setData(data) {
        this.data = data;
    }

    setNowModel(no) {
        this.nowModel = no
    }

    getLanguage(language) {
        this.language = language
    }

    init() {
        this.buildElement()
        this.updateNode()
        this.bindEvent()
        this.refresh()
    }

    /**
     * 建立元素
     */
    buildElement() {
        const html = this.getHTML();
        this.nodes.container.insertAdjacentHTML('beforeend', html)
    }

    /**
     * 更新節點
     */
    updateNode() {
        const node = this.nodes.container.lastChild;
        this.nodes.template = node;
        this.nodes.reloadPage = this.nodes.template.querySelector('[name="reload"]')
        this.nodes.option_container = this.nodes.template.querySelector('div[name="option"]')
        this.nodes.btn_option_open = this.nodes.template.querySelector('button[name="option"]')
        this.nodes.btn_option_close = this.nodes.option_container.querySelector('.option_close')
        this.nodes.bgm_volume = this.nodes.option_container.querySelector('.bgm_volume')
        this.nodes.se_volume = this.nodes.option_container.querySelector('.se_volume')
        this.nodes.sound_volume = this.nodes.option_container.querySelector('.sound_volume')
        this.nodes.btn_language = this.nodes.option_container.querySelectorAll('[name="select_language"]')

        if (this.nodes.container.querySelector('[name="game_info"]')) {
            this.nodes.btn_info_open = this.nodes.template.querySelector('[name="info_open"]')
            this.nodes.info_container = this.nodes.template.querySelector('[name="game_info"]')
            this.nodes.btn_info_close = this.nodes.info_container.querySelector('[name="info_close"]')
        }


        if (this.nodes.template.querySelector('.sentence_container')) {
            this.nodes.sentence_container = this.nodes.template.querySelector('.sentence_container')
            this.nodes.sentence_box = this.nodes.sentence_container.querySelector('.sentence_box')
            this.nodes.sentence_btn_close = this.nodes.sentence_container.querySelector('.sentence_container_close')
            this.nodes.sentence_btn_hidden = this.nodes.sentence_container.querySelector('.sentence_container_hidden')
            this.nodes.sentence_btn_player_1 = this.nodes.sentence_container.querySelector('.game_sound_player_1')
            this.nodes.sentence_btn_player_2 = this.nodes.sentence_container.querySelector('.game_sound_player_2')
            this.nodes.sentence_btn_clear = this.nodes.sentence_container.querySelector('.sentence_clear')
            this.nodes.sentence_btn_submit = this.nodes.sentence_container.querySelector('.sentence_submit')
            this.nodes.vocabulary_container = this.nodes.sentence_container.querySelector('.vocabulary_container_1')
            this.nodes.vocabulary_container_2 = this.nodes.sentence_container.querySelector('.vocabulary_container_2')
            this.nodes.sentence_yes_sounds = this.nodes.template.querySelectorAll('audio[answer="yes"]')
            this.nodes.sentence_no_sounds = this.nodes.template.querySelectorAll('audio[answer="no"]')
            this.nodes.image.heads = this.nodes.template.querySelectorAll('[name="head"]')
            this.nodes.sentence_animete = this.nodes.sentence_container.querySelectorAll('i[name="OX_animate"]')
            this.nodes.sentence_btn_tip = this.nodes.sentence_container.querySelector('.sentence_tip')
            this.nodes.sentence_btn_auto = this.nodes.sentence_container.querySelector('.sentence_auto')
        }
        if (this.nodes.template.querySelector('.game_start_container')) {
            this.nodes.start_container = this.nodes.template.querySelector('.game_start_container')
            this.nodes.btn_game_start = this.nodes.start_container.querySelector('.game_start')
        }
        if (this.nodes.se = this.nodes.template.querySelector('[name="SE"]')) {
            this.nodes.se = this.nodes.template.querySelectorAll('[name="SE"]')
        }

        if (this.nodes.template.querySelector('[name="selectMenu"]')) {
            this.nodes.select_menu = this.nodes.template.querySelector('[name="selectMenu"]')
            this.nodes.meun_btn_container = this.nodes.select_menu.querySelector('.vocabulary_container_1')
            this.nodes.meun_submit = this.nodes.select_menu.querySelector('.sentence_submit')
            this.nodes.meun_clear = this.nodes.select_menu.querySelector('.sentence_clear')
            this.nodes.meun_sound_play = this.nodes.select_menu.querySelector('.game_sound_player_2')
            this.nodes.menu_inputbox = this.nodes.select_menu.querySelector('[name="input"]')
            this.nodes.menu_close = this.nodes.select_menu.querySelector('.sentence_container_close')
            this.nodes.menu_X = this.nodes.select_menu.querySelectorAll('i[name="OX_animate"]')
            this.nodes.menu_pleacehold = this.nodes.select_menu.querySelector('[name="pleacehold"]')
        }
    }

    bindEvent() {
        this.nodes.btn_option_open.onclick = () => this.handleOpenOption()
        this.nodes.btn_option_close.onclick = () => this.handleCloseOption()
        this.nodes.bgm_volume.onchange = (e) => this.volumeChange(e)
        this.nodes.se_volume.onchange = (e) => this.volumeChange(e)
        this.nodes.sound_volume.onchange = (e) => this.volumeChange(e)
        Object.values(this.nodes.btn_language).map(btn => btn.onclick = (e) => this.languageChange(e))

        if (this.nodes.btn_info_open) {
            this.nodes.btn_info_open.onclick = () => this.handleOpenInfo()
            this.nodes.btn_info_close.onclick = () => this.handleCloseInfo()
        }

        if (this.nodes.sentence_container) {
            this.nodes.sentence_btn_submit.onclick = () => { this.handleSentenceSubmit() }
            this.nodes.sentence_btn_clear.onclick = () => { this.OpenSentence(); this.sePlay(11) }
            this.nodes.sentence_btn_close.onclick = () => { this.handleCloseSentence() }
            this.nodes.sentence_btn_hidden.onclick = () => { this.handleHiddenSentence() }
            this.nodes.sentence_btn_player_1.onclick = (e) => { this.sentenceSoundPlay(e) }
            this.nodes.sentence_btn_player_2.onclick = (e) => { this.sentenceSoundPlay(e) }
            this.nodes.sentence_btn_tip.onclick = () => { this.handleShowTip() }
            this.nodes.sentence_btn_auto.onclick = () => { this.handleAuto() }
        }

        if (this.nodes.complate_container) {
            this.nodes.complate_refresh.onclick = () => { this.refresh() }
            this.nodes.complate_next.onclick = () => { this.nextStage() }
        }

        if (this.nodes.btn_game_start) {
            this.nodes.btn_game_start.onclick = () => { this.handleGameStart() }
        }

        if (this.nodes.menu_close) {
            this.nodes.menu_close.onclick = () => this.closeNumberMenu()
            this.nodes.meun_submit.onclick = () => this.submitNumberMenu()
            this.nodes.meun_clear.onclick = () => this.clearNumberMenu()
            this.nodes.meun_sound_play.onclick = (e) => { this.sentenceSoundPlay(e) }
        }
    }

    setVisible(visible) {
        this.nodes.template.classList.toggle('d-none', !visible)
    }

    /**
     * 切換腔調
     */
    setLanguage(language) {
        this.language = language
        this.nodes.reloadPage.classList.toggle('d-none', false)
        Object.values(this.nodes.btn_language).map(btn => {
            if (btn.getAttribute('value') === language) {
                btn.classList.toggle('language-selected', true)
            } else {
                btn.classList.toggle('language-selected', false)
            }
        })
        if (this.nodes.audios) {
            Object.values(this.nodes.audios).map(audio => {
                audio.src = './src/media/' + this.data[2][this.language][audio.getAttribute('game-sound')].sound
            })
        }
        if (this.nodes.sentence_yes_sounds) {
            Object.values(this.nodes.sentence_yes_sounds).map(audio => {
                audio.src = './src/media/' + Object.values(this.data[this.no][this.language].sound.yes).find(s => s.name === audio.getAttribute('name')).src[audio.getAttribute('no')]
            })
        }
        if (this.nodes.sentence_no_sounds) {
            Object.values(this.nodes.sentence_no_sounds).map(audio => {
                audio.src = './src/media/' + Object.values(this.data[this.no][this.language].sound.no).find(s => s.name === audio.getAttribute('name')).src[audio.getAttribute('no')]
            })
        }
        this.refresh()
    }



    // 切換手機or電腦
    setDevice(device, maxWidth) {
        this.device = device
        this.maxWidth = maxWidth
        if (device === "mobile" || this.nodes.container.clientWidth < 850) {
            this.nodes.option_container.querySelector('div').style.transform = 'scale(0.7)'
            this.nodes.option_container.querySelector('div').style.width = '100%'
            this.nodes.option_container.querySelector('div').classList.toggle('w-75', false)
            if (this.nodes.text_container) {
                this.nodes.text_container.classList.toggle('mobile', true)
            }
            if (this.no === 3 || this.no === 4 || this.no === 5) {
                this.nodes.sentence_container.querySelector('div').classList.toggle('mobile', true)
                this.nodes.btn_info_open.classList.toggle('top-0', false)
                this.nodes.btn_info_open.style.transform = 'scale(0.7)'
                this.nodes.btn_info_open.style.left = '80px'
                this.nodes.btn_info_open.style.top = '-18px'
                this.nodes.command_container.style.transform = 'scale(0.7)'
                this.nodes.command_container.classList.toggle('m-3', false)
                this.nodes.command_container.style.marginLeft = '-13.75px'
                this.nodes.command_container.style.marginTop = '-30px'
                this.nodes.hint.style.transform = 'scale(0.8)'
                if (this.nodes.name_container) {
                    this.nodes.name_container.style.transform = 'scale(0.7)'
                    this.nodes.name_container.style.right = '-15px'
                    this.nodes.name_container.style.top = '-30px'
                }
            }
        } else {
            this.nodes.option_container.querySelector('div').style.transform = ''
            this.nodes.option_container.querySelector('div').style.width = ''
            this.nodes.option_container.querySelector('div').classList.toggle('w-75', true)
            if (this.nodes.game_1_container) {
                this.nodes.game_1_container.style.transform = ''
            }
            if (this.nodes.text_container) {
                this.nodes.text_container.classList.toggle('mobile', false)
            }
            if (this.no === 3 || this.no === 4 || this.no === 5) {
                this.nodes.sentence_container.querySelector('div').classList.toggle('mobile', false)
                this.nodes.start_container.style.transform = ''
                this.nodes.btn_info_open.classList.toggle('top-0', true)
                this.nodes.btn_info_open.style.transform = ''
                this.nodes.btn_info_open.style.left = ''
                this.nodes.btn_info_open.style.top = ''
                this.nodes.command_container.style.transform = ''
                this.nodes.command_container.classList.toggle('m-3', true)
                this.nodes.command_container.style.marginLeft = ''
                this.nodes.command_container.style.marginTop = ''
                this.nodes.hint.style.transform = ''
                if (this.nodes.name_container) {
                    this.nodes.name_container.style.transform = ''
                    this.nodes.name_container.style.right = ''
                    this.nodes.name_container.style.top = ''
                }
            }
        }
        if (this.nodes.sentence_container) {
            this.enableDragList([this.nodes.vocabulary_container, this.nodes.vocabulary_container_2], this.nodes.template)
        }
    }

    /**
    * 取得 HTML
    * @return {string}
    */
    getHTML() {
        return `<div
            class="ar-16by9 mw-1250px w-100 h-100 m-auto position-relative text-center"
            style="overflow: hidden;"
            model="SGMODEL"
        >   
            ${this.getOptionHTML()}
            ${this.getImageHTML()}
            ${this.getBodyHTML()}
            ${this.getAudioHTML()}
            ${this.getSeHTML()}
            ${this.getOptionButtonHTML()}
            ${this.getReloadPageHTML()}
        </div>`
    }

    getStartBoxHTML(data, highLight) {
        let html = ''
        for (const [key, item] of Object.entries(data)) {
            if (Number(key) === Number(highLight)) {
                html += `<p class="text-start game-text-color-1 h4 m-0 fw-600">${item}</p>`
            } else {
                html += `<p class="text-start h4 m-0 fw-600">${item}</p>`
            }
        }
        return `<div class="game_1_stage_1_container game_start_container shadow-sm z-2" >
        <div class="w-80">
            ${html}
        </div>
        <div class="w-20 h-100 d-flex justify-content-end align-items-center;">
            <button class="game_1_stage_1_button game_start">開始</button>
        </div>
    </div>`
    }

    getCommandHTML(command) {
        return `<div id="command_container" class="command_container shadow-sm z-2 h4 fw-600 m-3 text-white rounded w-125px flex-column justify-content-center align-items-center game-bg-1 position-absolute">
            <div class="h-45px position-absolute rounded bottom-triangle w-100 d-flex justify-content-center align-items-center">
                    指令積木
            </div>
            ${command.map(c =>
            `<button name="cmd" class="rounded-circle w-60px m-2 ar-1 h4 fw-600 text-white" value="${c}">${c}</button>`
        ).join('')}
        </div>`
    }

    getHintHTML() {
        return `<div id="hint_container" class="hint_container hint_shining position-absolute p-2 di-flex justify-content-center align-items-center"></div>`
    }

    getComplateHTML(next) {
        return `<div class="complete_container w-360px h-180px position-absolute z-2">
                <div class="shadow-sm bg-color-12 rounded w-100 h-100">
                    <div class="complate_head bg-color-2 rounded p-2 d-flex justify-content-center align-items-center h-50">
                        <p id="end_text" class="complate_text m-0 text-white"></p>
                    </div>
                    <div class="d-flex justify-content-center align-items-center w-100 h-50">
                        <div class="complate_refresh cursor-pointer h5 d-flex justify-content-between align-items-center rounded-pill w-150px h-37px bt-color-2 m-2">
                            <div class="ml-45 d-flex justify-content-right align-items-center">再玩一次</div>
                            <div class="d-flex justify-content-center align-items-center h5 rounded-circle bg-white w-31px ar-1 m-3px">
                                <i class="fa-solid fa-arrow-rotate-right"></i>
                            </div>
                        </div>
                        <div class="complate_next cursor-pointer h5 d-flex justify-content-between align-items-center rounded-pill w-150px h-37px bt-color-3 m-2">
                            <div class="ml-45 di-flex justify-content-right align-items-center">${next}</div>
                            <div class="d-flex justify-content-center align-items-center h5 rounded-circle bg-white w-31px ar-1 m-3px">
                                <i class="fa-solid fa-chevron-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
    }

    getSentenceHTML() {
        return `<div class="sentence_container ar-16by9 mw-1250px w-100 m-auto position-absolute bottom-0 z-2 text-end di-flex flex-column justify-content-end">
                <div class="sentence_box w-100 position-absolute bottom-0 bg-color-4">
                <button class="sentence_container_hidden pointer-events-auto bg-color-3 text-white border-0 position-absolute fs-2"><i class="fa-solid fa-angle-down"></i><div class="btn-text-1">縮小</div><div class="btn-text-2">展開</div></button>
                <button class="sentence_container_close pointer-events-auto bg-color-3 text-white border-0 position-absolute fs-2"><i class="fa-solid fa-xmark"></i><div class="close-btn-text">關閉</div></button>
                    <div class="mw-1000px mx-auto">
                        <div class="rounded h4 game-bg-1 d-flex align-items-center min-h-84px mx-2 mt-3 position-relative">
                            ${this.getAnimateHTML()}
                            <div lock class="vocabulary_container_2 mx-3 d-flex align-items-center border-bottom-black min-h-70px fw-600"></div>
                            <div class="d-flex">
                                <button class="sentence_submit sentence_button border-0 bg-transparent shadow-hako rounded-pill m-1">
                                    <img src="./src/img/game-btn-2.png" />
                                </button>
                                <button class="sentence_clear sentence_button border-0 bg-transparent shadow-hako rounded-pill m-1">
                                    <img src="./src/img/game-btn-1.png" />
                                </button>
                            </div>
                        </div>
                        <div class="rounded game-bg-1 min-h-84px d-flex align-items-center mx-2">
                            <img class="head_2"/>
                            <button class="game_sound_player_2 game_1_stage_2_audio_button" value="2">
                                <img src="./src/img/game_1_08.png" class="pointer-events-none"/>
                            </button>
                            <div space-box></div>
                            <button class="sentence_tip sentence_button border-0 bg-transparent shadow-hako rounded-pill m-1">
                                <img src="./src/img/game-btn-3.png" />
                            </button>
                            <button class="d-none sentence_auto sentence_button border-0 bg-transparent shadow-hako rounded-pill m-1">
                                <img src="./src/img/game-btn-4.png" />
                            </button>
                        </div>
                        <div class="rounded my-3 d-flex align-items-center mx-2">
                            <div class="vocabulary_container_1 w-100 m-auto d-flex my-auto"></div>
                        </div>
                    </div>
                </div>
                <button class="game_sound_player_1 game_1_stage_2_audio_button" value="1">
                    <img src="./src/img/game_1_08.png" class="pointer-events-none"/>
                </button>
            </div>`
    }

    getOptionHTML() {
        let language_btns = ''
        for (const [key, name] of Object.entries(this.languageName)) {
            language_btns += `<div class="col-4 p-1"><div class="fs-4 w-100 game-button-style-1 text-white rounded ${Number(key) === Number(this.language) ? 'language-selected' : ''}" name="select_language" value="${key}">${name}</div></div>`
        }
        return `<div name="option" class="d-none game-bg-2 ar-16by9 w-100 m-auto position-absolute z-index-max d-flex align-items-center">
            <div class="m-auto w-75 rounded-xl bg-white shadow-hako position-relative">
                <button class="option_close rounded-circle w-30px ar-1 bg-transparent text-red border-0 position-absolute right-0 text-danger fs-3 me-2"><i class="fa-solid fa-xmark"></i></button>
                <p class="mx-auto fs-2">遊戲設定</p>
                <div class="w-75 d-flex align-items-start justify-content-center mt-2 mx-auto">
                    <p class="m-0 fs-3 pt-1 text-nowrap">語音腔調選擇：</p>
                    <div class="row w-380px">
                        ${language_btns}
                    </div>
                </div>
                <div class="w-100 d-flex mt-2">
                    <div class="w-50 d-flex flex-column align-items-end justify-content-center pe-4">
                        <p class="m-0 fs-3 py-1">遊戲音樂：</p>
                        <p class="m-0 fs-3 py-1">遊戲音效：</p>
                        <p class="m-0 fs-3 py-1">人物語音：</p>
                    </div>
                    <div class="w-50 d-flex flex-column align-items-start justify-content-center">
                        <input type="range" name="bgm" class="bgm_volume w-200px my-3" min="0" max="30"/>
                        <input type="range" name="se" class="se_volume w-200px my-3" min="0" max="100"/>
                        <input type="range" name="sound" class="sound_volume w-200px my-3" min="0" max="100"/>
                    </div>
                </div>
            </div>
        </div>`
    }

    getOptionButtonHTML() {
        return `<div class="position-absolute bottom-0 left-0 z-3 bg-transparent">
            <button name="option" class="option-open position-absolute bottom-0 left-0 bg-transparent border-0">
                <i class="fa-solid fa-gear fs-3 text-light m-2"></i>
            </button>
            <div class="option-info game-bg-2 rounded-xl p-2 text-white" style="bottom: 40px;">語音和音量設定</div>
        </div>`
    }

    getReloadPageHTML() {
        return `<div name="reload" class="d-none top-0 game-bg-2 ar-16by9 w-100 m-auto position-absolute z-index-max">
            <div class="position-absolute bottom-0 right-0 d-flex align-items-center">
                <p class="text-light my-2 m-0 fs-3">重新讀取語音檔案中...</p>
                <div class="spinner-border text-light m-2" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>`
    }

    getSeHTML() {
        const se = [
            'BGM/003.mp3', // 0 點擊指令積木"問"
            'BGM/004.mp3', // 1 點擊指令積木
            'BGM/005.mp3', // 2 滑過人物
            'BGM/006.mp3', // 3 滑過名牌、座位、路隊
            'BGM/007.mp3', // 4 點擊人物、名牌、座位、路隊
            'BGM/008.mp3', // 5 重組句子點擊單詞
            'BGM/009.mp3', // 6 重組句子拖曳單詞
            'BGM/010.mp3', // 7 重組句子錯誤
            'BGM/011.mp3', // 8 重組句子正確
            'BGM/012.mp3', // 9 組合正確
            'BGM/013.mp3', // 10 任務完成
            'BGM/014.mp3', // 11 重組句子點選按鈕
        ]

        return se.map(s => `<audio name="SE" src="./src/media/${s}" preload="auto"></audio>`).join('')
    }

    getAnimateHTML() {
        return `<div class="position-absolute fs-48 top-0 z-1" style="left: 50%;">
            <i name="OX_animate" class="fa-regular fa-circle position-absolute d-none text-success"></i>
            <i name="OX_animate" class="fa-solid fa-xmark position-absolute d-none text-danger"></i>
        </div>`
    }

    getGameInfoButtonHTML() {
        return `<div name="info_open" class="game-button-style-1 shadow-sm z-1 position-absolute text-white rounded h-45px w-110px d-flex align-items-center justify-content-center left-157px top-0 mt-3">
            遊戲說明
        </div>`
    }

    getGameInfoHTML(title, highLight) {
        let html = ''
        for (const [key, item] of Object.entries(this.data[this.no][1].question)) {
            if (Number(key) === Number(highLight)) {
                html += `<p class="d-inline m-0 lh-sm game-text-color-1">${item}</p>`
            } else {
                html += `<p class="d-inline m-0 lh-sm">${item}</p>`
            }
        }
        return `<div name="game_info" class="d-none top-0 game-bg-2 ar-16by9 w-100 m-auto position-absolute z-index-max">
            <div class="bg-white w-75 rounded-xl shadow-hako mx-auto mt-3 d-flex pb-2 position-relative">
                <div name="info_close" class="position-absolute bottom-0 right-0 game-text-color-2 me-2 cursor-pointer"><i class="fa-solid fa-caret-up"></i>收起</div>
                <div class="right-triangle w-110px h-45px position-relative rounded border-0 text-white m-3 h4 fw-600 d-flex align-items-center justify-content-center">
                    ${title}
                </div>
                <div class="h4 m-3 w-75 text-start">
                    ${html}
                </div>
            </div>
        </div>`
    }

    getImageHTML() {
        return ``
    }

    getBodyHTML() {
        return ``
    }

    getAudioHTML() {
        return ``
    }

    createVocabulary() {
        let html = ''
        let a = []
        let b = Object.values(this.data[this.no][this.language].vocabulary)
        let complateSentence = []
        const checkVocabulary = (s) => {
            const v = b
            v.map(item => {
                if (s.search(item) > -1 && a.indexOf(item) === -1) {
                    a.push(item)
                    b = b.filter(bb => bb !== item)
                }
            })
        }
        Object.values(this.data[this.no][this.language].sentence).map(sentence => {
            if (typeof sentence === 'object') {
                if (this.complateName.length === 0 || this.complateName.indexOf(sentence.name) === -1) {
                    checkVocabulary(sentence.text)
                } else {
                    complateSentence.push(sentence.text)
                }
            } else {
                checkVocabulary(sentence)
            }
        })
        if (complateSentence) {
            complateSentence.map(se => {
                const v = b
                v.map(item => {
                    if (se.search(item) > -1) {
                        b = b.filter(bb => bb !== item)
                    }
                })
            })
        }
        while (a.length < 10 && b.length > 0) {
            const random = Math.floor(Math.random() * b.length)
            a.push(b[random])
            b.splice(random, 1)
        }
        const arr = this.randomArray(a.length, a.length, 0)
        for (const i of arr) {
            html += `<div class="cursor-pointer shadow-hako w-120px h-50px border-0 rounded h4 m-2px fw-600 bg-white di-flex justify-content-center align-items-center" 
                value="${a[i]}"
                >${a[i]}</div>`
        }
        return html
    }

    closeReloadPage() {
        this.nodes.reloadPage.classList.toggle('d-none', true)
    }

    refresh() {
        if (this.nodes.select_menu) {
            this.nodes.select_menu.classList.toggle('d-none', true)
        }
    }

    sePlay(n, item) {
        this.nodes.se[n].onended = ''
        this.nodes.se[n].pause()
        this.nodes.se[n].currentTime = 0
        this.nodes.se[n].play()
        if (item) {
            this.nowPlaying = this.nodes.se[n]
            this.nodes.se[n].onended = () => {
                item.currentTime = 0
                item.play()
                this.nowPlaying = item
            }
        }
    }

    handleGameStart() {
        this.sePlay(4)
    }

    handleSelectCmd() {
        if (this.selectedCmd === '問') {
            this.sePlay(0)
        } else if (this.selectedCmd === '給' || this.selectedCmd === '坐' || this.selectedCmd === '排') {
            this.sePlay(1)
        }
    }

    // 遊戲說明
    handleOpenInfo() {
        this.sePlay(4)
        this.nodes.info_container.classList.toggle('d-none', false)
    }

    handleCloseInfo() {
        this.nodes.info_container.classList.toggle('d-none', true)
    }

    // 遊戲設定
    handleOpenOption() {
        this.sePlay(4)
        this.nodes.option_container.classList.toggle('d-none', false)
    }

    handleCloseOption() {
        this.sePlay(4)
        this.nodes.option_container.classList.toggle('d-none', true)
    }

    setVolume(volume, name) {
        if (name === 'se') {
            Object.values(this.nodes.se).map(s => s.volume = volume / 100)
            this.nodes.se_volume.value = volume
        } else if (name === 'sound') {
            if (this.nodes.sentence_yes_sounds) {
                Object.values(this.nodes.sentence_yes_sounds).map(s => s.volume = volume / 100)
                Object.values(this.nodes.sentence_no_sounds).map(s => s.volume = volume / 100)
            }
            if (this.nodes.audios) {
                Object.values(this.nodes.audios).map(s => s.volume = volume / 100)
            }
            this.nodes.sound_volume.value = volume
        } else if (name === 'bgm') {
            this.nodes.bgm_volume.value = volume
        }
    }

 
    // 重組句子送出
    handleSentenceSubmit() {
        this.sePlay(11)
        const sentence = Object.values(this.nodes.vocabulary_container_2.querySelectorAll('[item]')).map(item => item.getAttribute('value')).join('')
        this.sentenceSoundPause()
        if (this.isYes) {
            this.sentenceRecombinationOK()
        } else {
            for (const [key, text] of Object.entries(this.data[this.nowModel][this.language].sentence)) {
                let answer = text
                if (typeof answer === 'object' && this.isYes === false) {
                    answer = text.text
                }
                if (sentence === answer.replace(/[\，\?\。\？]/g, '')) {
                    if (typeof text === 'object') {
                        this.selectedCharacter = text.name
                    }
                    this.isYes = true
                    this.playAnimate(this.nodes.sentence_animete[0])
                    this.nodes.vocabulary_container.setAttribute('lock', true)
                    this.nodes.vocabulary_container_2.setAttribute('lock', true)
                    this.nodes.vocabulary_container_2.innerHTML = `<div class="shadow-hako h-50px border-0 rounded h4 m-2px fw-600 bg-white di-flex justify-content-center align-items-center px-2">${answer}</div>`
                    this.nodes.sentence_btn_player_1.classList.toggle('d-none', false)
                    this.nodes.vocabulary_container_2.appendChild(this.nodes.sentence_btn_player_1)
                    Object.values(this.nodes.sentence_yes_sounds).map(sound => {
                        if (sound.getAttribute('name') === this.data[this.no][1].sound.yes[1].name && sound.getAttribute('no') === key) {
                            this.nodes.sentence_btn_player_1.insertBefore(sound, this.nodes.sentence_btn_player_1.firstChild)
                            this.sentenceRecombinationOK()
                        } else if (sound.getAttribute('name') === this.selectedCharacter) {
                            this.nodes.sentence_btn_player_2.insertBefore(sound, this.nodes.sentence_btn_player_2.firstChild)
                        }
                    })
                }
            }
            if (!this.isYes) {
                this.wrongAnswer++
                if (this.wrongAnswer > 3) {
                    this.nodes.sentence_btn_auto.classList.toggle('d-none', false)
                }
                this.playAnimate(this.nodes.sentence_animete[1])
                let key = Math.floor(Math.random() * 3 + 1)
                Object.values(this.nodes.sentence_no_sounds).map(sound => {
                    if (sound.getAttribute('name') === this.selectedCharacter && Number(sound.getAttribute('no')) === key) {
                        this.nodes.sentence_btn_player_2.insertBefore(sound, this.nodes.sentence_btn_player_2.firstChild)
                        this.sePlay(7, sound)
                        sound.currentTime = 0
                        this.nowPlaying = sound
                    }
                })
            }
        }
    }

    // 重組正確時
    sentenceRecombinationOK() {
        Object.values(this.nodes.se).map(s => {
            s.onended = ''
            s.pause()
        })
        if (this.nowPlaying) this.nowPlaying.pause()
        const player = this.nodes.sentence_btn_player_1.firstChild
        this.playAnimate(this.nodes.sentence_animete[0])
        this.sentenceSoundPause()
        this.sePlay(8, player)
        this.nodes.sentence_btn_hidden.classList.toggle('close_shining', true)
        player.onended = () => { this.nodes.sentence_btn_player_2.click() }
        player.currentTime = 0
        this.selectedCmd = ''
    }

    // 關閉重組句子視窗
    handleCloseSentence() {
        this.sePlay(4)
        this.isYes = false
        this.nodes.sentence_btn_close.classList.toggle('close_shining', false)
        this.nodes.sentence_container.classList.toggle('d-none', true)
        this.sentenceSoundPause()
        this.selectedCmd = ''
        this.createHintText()
    }
    
    // 隱藏重組句子視窗
    handleHiddenSentence() {
        this.sePlay(4)
        this.nodes.sentence_box.classList.toggle('hid')
        if(this.isYes) {
            this.nodes.sentence_btn_hidden.classList.toggle('close_shining', false)
            this.nodes.sentence_container.classList.toggle('pointer-events-none', this.nodes.sentence_box.classList.contains('hid'))
            this.createHintText()
        }
    }

    handleShowTip() {
        this.sePlay(11)
        Object.values(this.data[this.no][this.language].sentence).map(sentence => {
            let text = sentence
            if (typeof sentence === 'object' && (this.complateName.length === 0 || this.complateName.indexOf(sentence.name) === -1)) {
                text = sentence.text
            }
            Object.values(this.nodes.vocabulary_container.querySelectorAll('div')).map(item => {
                if (text.search(item.getAttribute('value')) > -1) {
                    item.classList.toggle('shining_animation_4', true)
                }
            })
            Object.values(this.nodes.vocabulary_container_2.querySelectorAll('div')).map(item => {
                if (text.search(item.getAttribute('value')) > -1) {
                    item.classList.toggle('shining_animation_4', true)
                }
            })
        })
    }

    handleAuto() {
        this.sePlay(11)
        if (this.isYes) {
            this.sentenceRecombinationOK()
        }
        const text = this.data[this.no][this.language].sentence[1]
        let key = '1'
        if (typeof text === 'object') {
            let end = 0
            Object.entries(this.data[this.no][this.language].sentence).map(([k,s]) => {
                if (this.complateName.indexOf(s.name) === -1 && end === 0) {
                    end = 1
                    key = k
                    this.selectedCharacter = s.name
                    this.nodes.vocabulary_container_2.innerHTML = `<div class="shadow-hako h-50px border-0 rounded h4 m-2px fw-600 bg-white di-flex justify-content-center align-items-center px-2">${s.text}</div>`
                }
            })
        } else {
            this.nodes.vocabulary_container_2.innerHTML = `<div class="shadow-hako h-50px border-0 rounded h4 m-2px fw-600 bg-white di-flex justify-content-center align-items-center px-2">${text}</div>`
        }
        this.isYes = true
        this.playAnimate(this.nodes.sentence_animete[0])
        this.nodes.vocabulary_container.setAttribute('lock', true)
        this.nodes.vocabulary_container_2.setAttribute('lock', true)
        this.nodes.sentence_btn_player_1.classList.toggle('d-none', false)
        this.nodes.vocabulary_container_2.appendChild(this.nodes.sentence_btn_player_1)
        Object.values(this.nodes.sentence_yes_sounds).map(sound => {
            if (sound.getAttribute('name') === this.data[this.no][1].sound.yes[1].name && sound.getAttribute('no') === key) {
                this.nodes.sentence_btn_player_1.insertBefore(sound, this.nodes.sentence_btn_player_1.firstChild)
                this.sentenceRecombinationOK()
            } else if (sound.getAttribute('name') === this.selectedCharacter) {
                this.nodes.sentence_btn_player_2.insertBefore(sound, this.nodes.sentence_btn_player_2.firstChild)
            }
        })
    }

    //播放圈叉動畫
    playAnimate(item) {
        if (this.animateTimer) {
            clearTimeout(this.animateTimer)
            Object.values(this.nodes.sentence_animete).map(it => {
                it.classList.toggle('hidden_animate', false)
                it.classList.toggle('d-none', true)
            })
        }
        item.classList.toggle('hidden_animate', true)
        item.classList.toggle('d-none', false)
        this.animateTimer = setTimeout(() => {
            item.classList.toggle('hidden_animate', false)
            item.classList.toggle('d-none', true)

        }, 1000)
    }

    OpenSentence() {
        this.nodes.sentence_box.classList.toggle('hid', false)
        this.nodes.sentence_container.classList.toggle('pointer-events-none', false)
        if (this.nodes.sentence_btn_player_2.parentNode.querySelector('img')) {
            const img = this.nodes.sentence_btn_player_2.parentNode.querySelector('img')
            const head = Object.values(this.nodes.image.heads).find(h => h.getAttribute('value') === this.selectedCharacter)
            img.parentNode.insertBefore(head, img)
            img.classList.toggle('d-none', true)
            head.classList.toggle('d-none', false)
        }
        const mainCh = this.data[this.no][1].sound.yes[1].name
        const mainHead = Object.values(this.nodes.image.heads).find(h => h.getAttribute('value') === mainCh)
        this.nodes.vocabulary_container_2.parentNode.insertBefore(mainHead, this.nodes.vocabulary_container_2)
        this.wrongAnswer = 0
        this.nodes.sentence_btn_auto.classList.toggle('d-none', true)
        this.isYes = false
        this.nodes.sentence_container.classList.toggle('d-none', false)
        this.nodes.sentence_container.classList.toggle('d-none', false)
        this.nodes.sentence_btn_player_1.classList.toggle('d-none', true)
        this.nodes.sentence_container.appendChild(this.nodes.sentence_btn_player_1)
        this.nodes.vocabulary_container.removeAttribute('lock')
        this.nodes.vocabulary_container_2.removeAttribute('lock')
        this.nodes.sentence_btn_player_2.insertBefore(this.nodes.sentence_btn_player_2.querySelector('img'), this.nodes.sentence_btn_player_2.firstChild)
        this.nodes.vocabulary_container.innerHTML = this.createVocabulary()
        this.nodes.vocabulary_container_2.innerHTML = ''
        this.sentenceSoundPause()
    }

    sentenceSoundPlay(e) {
        this.sentenceSoundPause()
        if (e.target.firstChild.tagName === 'IMG') {
            return
        }
        e.target.firstChild.onended = ''
        e.target.firstChild.currentTime = 0
        e.target.firstChild.play()
        this.nowPlaying = e.target.firstChild
    }

    sentenceSoundPause() {
        if (this.nowPlaying) {
            this.nowPlaying.pause()
            this.nowPlaying = null
        }
    }

    /**
     * 事件綁定
     */
    prevStage() {
        this.nodes.container.dispatchEvent(new Event('prev'), { bubbles: true })
    }

    nextStage() {
        this.sePlay(4)
        this.nodes.container.dispatchEvent(new Event('next'), { bubbles: true })
    }

    volumeChange(e) {
        const newEvent = new Event('volume-change', { bubbles: true });
        Object.defineProperty(newEvent, 'target', { value: e.target });
        this.nodes.container.dispatchEvent(newEvent)
    }

    languageChange(e) {
        this.sePlay(4)
        const newEvent = new Event('language-change', { bubbles: true });
        Object.defineProperty(newEvent, 'target', { value: e.target });
        this.nodes.container.dispatchEvent(newEvent)
    }

    /**
     * 單字卡拖移點擊
     */
    enableDragList(list, mouseContainer) {
        if (list.length === 1) {
            this.enableDragItem(list, mouseContainer)
        } else {
            this.enableDragItem(list[0], list[1], mouseContainer)
            this.enableDragItem(list[1], list[0], mouseContainer)
        }
    }

    enableDragItem(item_1, item_2, mouseContainer) {
        const handleTouch = (e) => {
            const target = e.target
            if (target.tagName === 'DIV' && target.parentNode === item_1 && !target.parentNode.getAttribute('lock')) {
                e.preventDefault();
                this.handleMouseDown(e, item_2, mouseContainer)
            } else if (target.tagName === 'BUTTON') {
                e.preventDefault();
                target.click()
            }
        }
        const handleMouse = (e) => {
            const target = e.target
            if (target.tagName === 'DIV' && target.parentNode === item_1 && !target.parentNode.getAttribute('lock')) {
                this.handleMouseDown(e, item_2, mouseContainer)
            }
        }
        item_1.setAttribute('sortable-container', true)
        if (this.device === 'mobile') {
            item_1.ontouchstart = handleTouch
        } else {
            item_1.onmousedown = handleMouse
            item_1.ondragstart = () => { return false }
        }
    }


    handleMouseDown(event, target, mouseContainer) {
        const item = event.target
        let mounseX
        let mounseY
        let shiftX
        let shiftY
        const placeholdItem = item.cloneNode(true)
        if (this.device === 'pc') {
            mounseX = event.clientX
            mounseY = event.clientY
            shiftX = event.clientX - item.getBoundingClientRect().left
            shiftY = event.clientY - item.getBoundingClientRect().top
        } else {
            mounseX = event.touches[0].clientX
            mounseY = event.touches[0].clientY
            if (window.matchMedia("(orientation: portrait)").matches) {
                item.style.transform = 'rotate(90deg) scale(0.7)'
                shiftX = event.touches[0].clientX - item.getBoundingClientRect().left + 30
                shiftY = event.touches[0].clientY - item.getBoundingClientRect().top - 15
            } else {
                item.style.transform = 'scale(0.7)'
                shiftX = event.touches[0].clientX - item.getBoundingClientRect().left + 15
                shiftY = event.touches[0].clientY - item.getBoundingClientRect().top + 15
            }
        }
        placeholdItem.style.opacity = 0
        item.style.position = 'absolute'
        item.style.zIndex = 1000
        item.parentNode.insertBefore(placeholdItem, item)
        document.body.append(item)
        // 更新item位置
        const moveAt = (pageX, pageY) => {
            item.style.left = pageX - shiftX + 'px'
            item.style.top = pageY - shiftY + 'px'
        }
        if (this.device === 'mobile') {
            moveAt(event.touches[0].pageX, event.touches[0].pageY)
        } else {
            moveAt(event.pageX, event.pageY)
        }
        // 滑鼠移動
        const onMouseMove = (event) => {
            const container = mouseContainer.getBoundingClientRect()
            let x
            let y
            const divLeft = container.left
            const divTop = container.top
            const divRight = container.right
            const divBottom = container.bottom
            if (this.device === 'pc') {
                x = event.pageX
                y = event.pageY
            } else {
                x = event.touches[0].pageX
                y = event.touches[0].pageY
            }
            // 不得超過此node範圍
            if (x < divLeft || x > divRight || y < divTop || y > divBottom) {
                item.parentNode.removeChild(item)
                placeholdItem.style.opacity = 1
                document.removeEventListener('mousemove', onMouseMove)
                document.removeEventListener('touchmove', onMouseMove)
            }
            moveAt(x, y);
            item.hidden = true
            let swapItem = document.elementFromPoint(x, y) === null ? placeholdItem : document.elementFromPoint(x, y)
            if (swapItem.parentNode.getAttribute('sortable-container')) {
                swapItem = swapItem !== placeholdItem.nextSibling ? swapItem : swapItem.nextSibling
                swapItem.parentNode.insertBefore(placeholdItem, swapItem)
            } else if (swapItem.getAttribute('sortable-container')) {
                swapItem.appendChild(placeholdItem)
            }
            item.hidden = false
        }

        // 放下
        const handledrop = (e) => {
            //判斷為點擊
            let x, y
            if (this.device === 'pc') {
                x = e.clientX === 'undefined' ? mounseX : e.clientX
                y = e.clientY === 'undefined' ? mounseY : e.clientY
            } else {
                x = e.changedTouches[0].pageX === 'undefined' ? mounseX : e.changedTouches[0].pageX
                y = e.changedTouches[0].pageY === 'undefined' ? mounseY : e.changedTouches[0].pageY
            }
            if (((mounseX + 5) > x) && ((mounseX - 5) < x)) {
                if (((mounseY + 5) > y) && ((mounseY - 5) < y))
                    target.appendChild(placeholdItem)
                this.sePlay(5)
            } else {
                this.sePlay(6)
            }
            item.parentNode.removeChild(item)
            placeholdItem.style.opacity = 1
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('touchmove', onMouseMove)
        }
        if (this.device === 'pc') {
            document.addEventListener('mousemove', onMouseMove)
            item.onmouseup = handledrop
        } else {
            document.addEventListener('touchmove', onMouseMove)
            item.ontouchend = handledrop
        }
    };

    /**
    * 生成範圍內數列
    */
    randomArray(length, max, start) {
        let x = 0
        let arr = Array()
        for (let i = 0; i < length; i++) {
            do {
                x = Math.floor(Math.random() * max + start)
            }
            while (arr.find(a => a === x) === 0 ? true : arr.find(a => a === x))
            arr[i] = x
        }
        return arr
    }

    /**
     * 輸入數字介面
     */

    openSelectNumberMenu() {
        this.wrongAnswer = 0
        this.nodes.menu_inputbox.innerText = ''
        this.nodes.menu_pleacehold.innerText = ''
        this.nodes.menu_inputbox.style.cursor = 'text'
        this.nodes.menu_inputbox.insertAdjacentHTML('beforeend', '<div class="h-50px w-2px game-1-3-flash"></div>')
        if (this.nodes.sentence_btn_player_2.querySelector('audio')) {
            const sound = this.nodes.sentence_btn_player_2.querySelector('audio')
            const n = sound.getAttribute('name')
            const an = sound.getAttribute('answer')
            if (n === this.selectedCharacter && an === 'yes') {
                this.nodes.meun_sound_play.insertBefore(sound, this.nodes.meun_sound_play.firstChild)
            }else if (!this.nodes.meun_sound_play.querySelector('audio') || this.nodes.meun_sound_play.querySelector('audio').getAttribute('name') !== this.selectedCharacter) {
                let key = Math.floor(Math.random() * 3 + 1)
                Object.values(this.nodes.sentence_no_sounds).map(s => {
                    if (s.getAttribute('name') === this.selectedCharacter && Number(s.getAttribute('no')) === key) {
                        this.nodes.meun_sound_play.insertBefore(s, this.nodes.meun_sound_play.firstChild)
                    }
                })
            }
        }else {
            let key = Math.floor(Math.random() * 3 + 1)
            Object.values(this.nodes.sentence_no_sounds).map(s => {
                if (s.getAttribute('name') === this.selectedCharacter && Number(s.getAttribute('no')) === key) {
                    this.nodes.meun_sound_play.insertBefore(s, this.nodes.meun_sound_play.firstChild)
                }
            })
        }
        document.body.onkeydown = (e) => this.keyEnter(e)
        let html = ''
        for (let i = 0; i < 10; i++) {
            html += `<div class="cursor-pointer shadow-hako w-120px h-50px border-0 rounded h4 m-2px fw-600 bg-white di-flex justify-content-center align-items-center" 
            value="${i}"
            >${i}</div>`
        }
        this.nodes.meun_btn_container.innerHTML = html
        Object.values(this.nodes.meun_btn_container.querySelectorAll('div')).map(btn => {
            btn.onclick = (e) => this.keyEnter({ 'key': e.target.getAttribute('value') })
        })
        this.nodes.select_menu.classList.toggle('d-none', false)
        if (this.nodes.meun_sound_play.parentNode.querySelector('img')) {
            const img = this.nodes.meun_sound_play.parentNode.querySelector('img')
            const head = Object.values(this.nodes.image.heads).find(h => h.getAttribute('value') === this.selectedCharacter)
            img.parentNode.insertBefore(head, img)
            img.classList.toggle('d-none', true)
            head.classList.toggle('d-none', false)
        }
    }

    closeNumberMenu() {
        this.sentenceSoundPause()
        document.body.onkeydown = ''
        this.nodes.select_menu.classList.toggle('d-none', true)
        this.selectedCmd = ''
        this.selectedCharacter = ''
        this.number = []
        Object.values(this.nodes.characters).map(character => {
            character.classList.toggle(`game-1-3-ch-3`, false)
        })
        this.createHintText()
    }

    clearNumberMenu() {
        this.sePlay(6)
        this.number = []
        this.nodes.menu_inputbox.innerText = ''
        this.nodes.menu_inputbox.insertAdjacentHTML('beforeend', '<div class="h-50px w-2px mx-1 game-1-3-flash"></div>')
    }

    submitNumberMenu() {
        const answer = Object.values(this.data[this.no][1].connect).find(c => c.name === this.selectedCharacter).number
        const inputNumber = this.number.join('')
        if (Number(inputNumber) === Number(answer)) {
            this.sePlay(9)
            Object.values(this.nodes.number_inputs).map(input => {
                if (input.getAttribute('value') === this.selectedCharacter) {
                    input.innerHTML = this.nodes.menu_inputbox.innerHTML
                    input.removeChild(input.querySelector('div'))
                    Object.values(input.querySelectorAll('p')).map(p => p.classList.toggle('bg-white', false))
                }
            })
            Object.values(this.nodes.characters).map(character => {
                character.classList.toggle(`game-1-3-ch-3`, false)
            })
            this.complateName.push(this.selectedCharacter)
            this.closeNumberMenu()
        } else {
            this.wrongAnswer ++
            this.sePlay(7)
            this.playAnimate(this.nodes.menu_X[1])
            if (this.wrongAnswer > 3) {
                this.number = []
                this.nodes.menu_inputbox.innerText = ''
                this.nodes.menu_inputbox.insertAdjacentHTML('beforeend', '<div class="h-50px w-2px mx-1 game-1-3-flash"></div>')
                let text = answer
                if (answer.length > 2) {
                    text = `${answer.slice(0,4)}-${answer.slice(4,7)}-${answer.slice(7,10)}`
                }
                this.nodes.menu_pleacehold.innerHTML = `<p style="color: #00000030">${text}</p>`
            }
        }
    }

    keyEnter(e) {
        const reg = /[0-9]/
        const key = e.key
        if (key === 'Backspace') {
            this.sePlay(5)
            this.number.pop()
            const eles = this.nodes.menu_inputbox.querySelectorAll('p')
            if (eles.length > 0) {
                this.nodes.menu_inputbox.removeChild(eles[eles.length - 1])
                if (eles.length === 6 || eles.length === 10) {
                    this.nodes.menu_inputbox.removeChild(eles[eles.length - 2])
                }
            }
        } else if (reg.test(key) && this.number.length < this.numberMaxLength) {
            this.sePlay(5)
            this.number.push(key)
            if (this.number.length === 5 || this.number.length === 8) {
                const p = document.createElement('p')
                p.classList.toggle('bg-white', true)
                p.innerText = '-'
                this.nodes.menu_inputbox.insertBefore(p, this.nodes.menu_inputbox.querySelector('div'))
            }
            const p = document.createElement('p')
            p.classList.toggle('bg-white', true)
            p.innerText = key
            this.nodes.menu_inputbox.insertBefore(p, this.nodes.menu_inputbox.querySelector('div'))
        } else if (key === 'Enter') {
            this.submitNumberMenu()
        }
    }
}