window.onload = () => {
    const nodeContainer = document.getElementById('scene_game_container');
    const titleNode = document.querySelector('.game-title');
    const SGContainer = new SGController
    SGContainer.setTitleNode(titleNode)
    SGContainer.setContainer(nodeContainer)
    SGContainer.setData(modelData)
    SGContainer.creatModel(1);
    SGContainer.init();
    //document.querySelector('[page-title]').innerText = `第${toChinesNum(course_no)}課 ${page_title}`
    window.addEventListener('resize', () => { SGContainer.checkScreen() })
}

class SGController {
    container
    titleNode
    gameList
    data
    models
    header
    focusModel = 0
    loadPage
    loadbar
    audio
    device
    maxWidth
    nodes = {}
    modelName = {
        1: '情境介紹',
        2: '情境教學',
        3: '任務遊戲1',
        4: '任務遊戲2',
        5: '任務遊戲3'
    }

    setContainer(container) {
        this.container = container
        const THIS = this
        this.container.addEventListener('next', () => THIS.nextStage())
        this.container.addEventListener('volume-change', (e) => THIS.volumeChange(e))
        this.container.addEventListener('language-change', (e) => THIS.handleChangeLanguage(e))

        const html = this.getPreloadHTML();
        this.container.insertAdjacentHTML('beforeend', html)

        this.loadPage = this.container.lastChild
        this.loadPage.loadbar = this.loadPage.querySelector('#loadbar')

        this.container.insertAdjacentHTML('beforebegin', this.getHeadButtonHTML())
        this.header = this.container.parentNode.querySelector('.game_header_button')
        this.header.selectors = this.header.querySelectorAll('[name="game_selecter"]')

        this.container.insertAdjacentHTML('beforeend', this.getBGMHTML())
        this.audio = this.container.querySelectorAll('[name="BGM"]')
    }

    setData(data) {
        this.data = data
    }

    setTitleNode(node) {
        this.titleNode = node
    }

    bindEvent() {
        Object.values(this.header.selectors).map(s => s.onclick = (e) => { this.handleChangeModel(e) })
    }

    init() {
        this.checkScreen()
        this.changeModel()
        this.preload()
        Object.values(this.models).map(model => {
            this.setBgmVolume(20)
            model.setVolume(20, 'bgm')
            model.setVolume(40, 'se')
            model.setVolume(80, 'sound')
        })
    }

    creatModel(language) {
        this.models = {
            1: new SG_1(),
            2: new SG_2(),
            3: new SG_3(),
            4: new SG_4(),
            5: new SG_5()
        }
        Object.values(this.models).map(model => {
            model.setContainer(this.container)
            model.setData(this.data)
            model.getLanguage(language? language: 1)
            model.init()
        })
    }

    checkScreen() {
        const screenWidth = window.innerWidth
        const screenHeight = window.innerHeight
        if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
            document.body.style.minHeight = screenHeight + 'px'
            let h, w, top, right
            if (screenHeight > screenWidth) {
                h = screenHeight / screenWidth > 16 / 9 ? screenWidth : screenHeight / 16 * 9
                w = screenHeight / screenWidth > 16 / 9 ? screenWidth / 9 * 16 : screenHeight
                top = screenHeight / screenWidth > 16 / 9 ? 0 : (screenWidth - h) / 2
                right = screenHeight / screenWidth > 16 / 9 ? (screenHeight - w) / 2 : 0
            } else {
                h = screenWidth / screenHeight > 16 / 9 ? screenHeight : screenWidth / 16 * 9
                w = screenWidth / screenHeight > 16 / 9 ? screenHeight / 9 * 16 : screenWidth
                top = screenWidth / screenHeight > 16 / 9 ? 0 : (screenHeight - h) / 2
                right = screenWidth / screenHeight > 16 / 9 ? (screenWidth - w) / 2 : 0
            }
            if (window.matchMedia("(orientation: portrait)").matches) {
                this.container.style.transform = `rotate(90deg)`
                this.container.style.top = (w - h) / 2 + right + 'px'
                this.container.style.right = (h - w) / 2 + 'px'
            } else {
                this.container.style.transform = `rotate(0deg)`
                this.container.style.top = top + 'px'
                this.container.style.right = right + 'px'
            }
            this.container.classList.toggle('w-100', false)
            this.container.classList.toggle('h-100', false)
            this.container.classList.toggle('position-relative', false)
            this.container.classList.toggle('border-style-1', false)
            //this.titleNode.classList.toggle('d-none', true)
            this.header.classList.toggle('d-none', true)
            this.container.style.width = w + 'px'
            this.container.style.height = h + 'px'
            this.container.style.position = 'absolute'
            this.container.appendChild(this.gameList)
            /*this.gameList.style.transform = 'scale(0.8)'
            this.gameList.style.bottom = '0'
            this.gameList.classList.toggle('top-2rem', false)
            this.gameList_language.classList.toggle('d-none', true)*/
            this.device = 'mobile'
            this.maxWidth = w
        } else {
            this.container.style.transform = `rotate(0deg)`
            this.container.classList.toggle('w-100', true)
            this.container.classList.toggle('h-100', true)
            this.container.classList.toggle('position-relative', true)
            this.container.classList.toggle('border-style-1', true)
            //this.titleNode.classList.toggle('d-none', false)
            this.header.classList.toggle('d-none', false)
            this.container.style.top = 0
            this.container.style.right = 0
            //this.titleNode.appendChild(this.gameList)
            //this.gameList.style.transform = ''
            //this.gameList.style.bottom = ''
            //this.gameList.classList.toggle('top-2rem', true)
            //this.gameList_language.classList.toggle('d-none', false)
            this.device = 'pc'
        }
        Object.values(this.models).map(model => model.setDevice(this.device, this.maxWidth))
    }

    nextStage() {
        if (this.focusModel === 5) {
            this.focusModel = 1
        } else {
            this.focusModel++
        }
        this.changeModel()
    }

    setBgmVolume(volume) {
        this.audio[0].volume = volume / 100
        this.audio[1].volume = volume / 100
    }

    volumeChange(e) {
        const name = e.target.getAttribute('name')
        const volume = e.target.value
        if (name === 'bgm') {
            this.audio[0].volume = volume / 100
            this.audio[1].volume = volume / 100
        }
        Object.values(this.models).map(model => {
            model.setVolume(volume, name)
        })
    }

    changeModel() {
        for (const [key, model] of Object.entries(this.models)) {
            if (Number(key) === this.focusModel) {
                model.setVisible(true)
                model.setNowModel(this.focusModel)
            } else {
                model.setVisible(false)
                model.refresh()
            }
        }
        if (this.focusModel === 0) {
            this.loadPage.classList.toggle('d-none', false)
            Object.values(this.header.selectors).map(s => {
                s.classList.toggle('disabled', true)
            })
        } else {
            this.loadPage.classList.toggle('d-none', true)
            Object.values(this.header.selectors).map(s => {
                s.classList.toggle('disabled', false)
                if (Number(s.getAttribute('value')) === this.focusModel) {
                    s.classList.toggle('selected', true)
                } else {
                    s.classList.toggle('selected', false)
                }
            })
            this.bgmPlay()
        }
    }

    bgmPlay() {
        if (this.focusModel < 3 && this.audio[0].paused) {
            this.audio[1].pause()
            this.audio[0].play()
        } else if (this.focusModel > 2 && this.audio[1].paused) {
            this.audio[0].pause()
            this.audio[1].play()
        }
    }

    preload() {
        const audios = this.container.querySelectorAll('audio[name]')
        const audios_length = audios.length
        let audio_complete_count = 0
        const audioCount = () => {
            audio_complete_count++
        }
        if (/iPhone/i.test(navigator.userAgent)) {
            Object.values(audios).map(a => a.addEventListener('loadedmetadata', audioCount))
        } else {
            Object.values(audios).map(a => a.addEventListener('canplaythrough', audioCount))
        }
        let timer = setInterval(() => {
            const images = this.container.querySelectorAll('img')
            const images_length = images.length
            let img_complete_count = 0
            images.forEach(img => { if (img.complete) img_complete_count++ })
            if ((img_complete_count + audio_complete_count) === (images_length + audios_length)) {
                this.focusModel = 1
                this.changeModel()
                this.bindEvent()
                if (/iPhone/i.test(navigator.userAgent)) {
                    Object.values(audios).map(a => a.removeEventListener('loadedmetadata', audioCount))
                } else {
                    Object.values(audios).map(a => a.removeEventListener('canplaythrough', audioCount))
                }
                clearInterval(timer)
            } else {
                let innertext = ''
                if (img_complete_count !== images_length) {
                    innertext = '讀取圖片中...'
                } else {
                    innertext = '讀取音訊中...'
                }
                this.loadPage.querySelector('h4').innerText = innertext + Math.round((img_complete_count + audio_complete_count) / (images_length + audios_length) * 100) + '%'
                this.loadPage.loadbar.style.width = `${(img_complete_count + audio_complete_count) / (images_length + audios_length) * 100}%`
            }
        }, 50)
    }

    getPreloadHTML() {
        return `<div class="game_loadpage ar-16by9 mw-1250px w-100 m-auto">
        <div class="bg-white h-100 mx-auto di-flex flex-column justify-content-center align-items-center">
            <div class="w-75 text-end">
                <h4>下載中...</h4>
            </div>
            <div class="progress h-8px w-75">
                <div
                    id="loadbar"
                    class="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                ></div>
            </div>
        </div>
    </div>`
    }

    getHeadButtonHTML() {
        let html = '<div class="game_header_button w-100 wm-1000px m-auto bg-white"><div class="d-flex justify-content-center align-items-center">'
        for (const [key, name] of Object.entries(this.modelName)) {
            html += `<div name="game_selecter" class="bt-style-1" value="${key}">${name}</div>`
        }
        html += '</div></div>'
        return html
    }

    getBGMHTML() {
        return `<audio type="audio/mpeg" preload="auto" name="BGM" src="./src/media/BGM/001.mp3" loop="loop"></audio>
        <audio type="audio/mpeg" preload="auto" name="BGM" src="./src/media/BGM/002.mp3" loop="loop"></audio>`
    }

    handleChangeLanguage(e) {
        const audios = this.container.querySelectorAll('audio:not([name="BGM"]):not([name="SE"])')
        const language = e.target.getAttribute('value') || e.target.value
        Object.values(this.models).map(model => {
            model.setLanguage(language)
        })
        let audio_complete_count = 0
        const audioCount = () => {
            audio_complete_count++
        }
        if (/iPhone/i.test(navigator.userAgent)) {
            Object.values(audios).map(a => a.addEventListener('loadedmetadata', audioCount))
        } else {
            Object.values(audios).map(a => a.addEventListener('canplaythrough', audioCount))
        }
        const timer_2 = setInterval(() => {
            if (audio_complete_count === audios.length) {
                Object.values(this.models).map(model => {
                    model.closeReloadPage()
                })
                if (/iPhone/i.test(navigator.userAgent)) {
                    Object.values(audios).map(a => a.removeEventListener('loadedmetadata', audioCount))
                } else {
                    Object.values(audios).map(a => a.removeEventListener('canplaythrough', audioCount))
                }
                clearInterval(timer_2)
            }
        }, 500)
        //切換原本頁面語言
    }

    handleChangeModel(e) {
        const model_number = Number(e.target.getAttribute('value'))
        this.focusModel = model_number
        this.changeModel()
    }
}

