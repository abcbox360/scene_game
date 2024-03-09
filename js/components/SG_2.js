//情境教學
class SG_2 extends SG_Base {
    step = 1


    setData(data) {
        super.setData(data)
        this.maxStep = Object.keys(data[2][this.language]).length
    }

    updateNode() {
        super.updateNode()
        this.nodes.image.bk_1 = this.nodes.template.querySelector('[img="bk_1"]')
        this.nodes.image.bk_2 = this.nodes.template.querySelector('[img="bk_2"]')
        this.nodes.image.heads = this.nodes.template.querySelectorAll('[img="head"]')

        this.nodes.audios = this.nodes.template.querySelectorAll('audio[game-sound]')

        this.nodes.text_container = this.nodes.template.querySelector('.game_1_stage_2_container')
        this.nodes.text_tw = this.nodes.template.querySelector('.game_1_stage_2_tw')
        this.nodes.text_hakka = this.nodes.template.querySelector('.game_1_stage_2_hakka')

        this.nodes.btn_next = this.nodes.template.querySelector('.game_1_stage_2_next_button')
        this.nodes.btn_textOpen = this.nodes.template.querySelector('.game_1_stage_2_button_3')
        this.nodes.btn_textClose = this.nodes.template.querySelector('.game_1_stage_2_button_4')
        this.nodes.btn_chineseOpen = this.nodes.template.querySelector('.game_1_stage_2_button_2')
        this.nodes.btn_chineseClose = this.nodes.template.querySelector('.game_1_stage_2_tw')
        this.nodes.btn_audioPlay = this.nodes.template.querySelector('.game_1_stage_2_audio_button')

        this.nodes.collsape_h1 = this.nodes.template.querySelector('.game_1_stage_2_height_container')
        this.nodes.collsape_p1 = this.nodes.template.querySelector('.game_1_stage_2_panel')
        this.nodes.collsape_p2 = this.nodes.template.querySelector('#penel-2')

        //把頭像圖案塞到最前面
        Object.values(this.nodes.image.heads).map(h => {
            this.nodes.text_container.insertBefore(h, this.nodes.text_container.firstChild)
        })
    }

    getImageHTML() {
        return `<img class="w-100 position-absolute left-0" img="bk_1"
                src="./src/img/1-2/001.jpg"
            />
            <img class="w-100 position-absolute left-0" img="bk_2"
                src="./src/img/1-2/002.jpg"
            />
            <img class="game_1_stage_2_head" value="劉宗翰" img="head"
                src="./src/img/game_head_2.png"
            />
            <img class="game_1_stage_2_head" value="鍾瑞容" img="head"
                src="./src/img/game_head_1.png"
            />
            <img class="game_1_stage_2_head" value="彭秀伶" img="head"
                src="./src/img/game_head_4.png"
            />`
    }

    bindEvent() {
        super.bindEvent()
        this.nodes.btn_next.onclick = () => this.nextStep()
        this.nodes.btn_textOpen.onclick = () => this.textOpen()
        this.nodes.btn_textClose.onclick = () => this.textClose()
        this.nodes.btn_chineseOpen.onclick = () => this.chineseOpen()
        this.nodes.btn_chineseClose.onclick = () => this.chineseClose()
        this.nodes.btn_audioPlay.onclick = () => this.soundPlay()
    }

    setVisible(visible) {
        super.setVisible(visible)
        if (visible) { this.soundPlay() }
    }

    getBodyHTML() {
        return `<div class="position-absolute top-0 w-100 h-100 d-flex justify-content-center flex-cloumn align-items-end">
        <div class="game_1_stage_2_container">
                <button class="game_1_stage_2_audio_button">
                    <img src="./src/img/game_1_08.png"/>
                </button>
                <div class="game_1_stage_2_text">
                    <div class="game_1_stage_2_collapse">
                        <div class="game_1_stage_2_panel">
                            <div class="game_1_stage_2_height_container">
                                <p class="game_1_stage_2_hakka text-start"></p>
                                <div class="w-100 overflow-hidden game_1_stage_2_collapse_2">
                                    <div
                                        class="d-flex justify-content-start"
                                        style="width: 1000px"
                                    >
                                        <div
                                            id="penel-2"
                                            class="w-100 overflow-hidden mw-0 panel"
                                        >
                                            <p class="game_1_stage_2_tw"></p>
                                        </div>
                                        <button class="game_1_stage_2_button_2">中文</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="game_1_stage_2_button_4">X關閉</button>
                <button class="game_1_stage_2_button_3">文字</button>
                <div>
                    <button class="game_1_stage_2_next_button">
                        <img src="./src/img/game_1_07.png"/>
                    </button>
                </div>
            </div>
        </div>`
    }

    getAudioHTML() {
        return Object.values(this.data[2][this.language]).map((d, i) => `<audio game-sound="${i + 1}" src="./src/media/${d.sound}"></audio>`).join('')
    }

    refresh() {
        this.step = 1
        this.maxStep = Object.keys(this.data[2][this.language]).length
        Object.values(this.nodes.image).map(img => {
            if (Object.keys(img).length < 2) {
                img.classList.toggle('d-none', true)
            } else {
                Object.values(img).map(i => {
                    i.classList.toggle('d-none', true)
                })
            }
        })
        Object.values(this.nodes.image.heads).map(h => {
            if (h.getAttribute('value') === this.data[2][this.language][this.step].name) {
                h.classList.toggle('d-none', false)
            }
        })
        this.nodes.image.bk_1.classList.toggle('d-none', false)
        this.nodes.text_tw.innerText = this.data[2][1][this.step].chinese
        this.nodes.text_hakka.innerText = this.data[2][this.language][this.step].text
        this.nodes.collsape_h1.style.width = (this.maxWidth || this.nodes.template.offsetWidth) * 0.93 * 0.7 - 140 + "px"
        this.nodes.text_tw.style.width = (this.maxWidth || this.nodes.template.offsetWidth) * 0.93 * 0.7 - 140 + "px"
        Object.values(this.nodes.audios).map(a => a.pause())
    }

    nextStep() {
        this.sePlay(4)
        this.step++
        if (this.step > this.maxStep) {
            this.nextStage()
            return
        }
        Object.values(this.nodes.image.heads).map(h => {
            if (h.getAttribute('value') === this.data[2][this.language][this.step].name) {
                h.classList.toggle('d-none', false)
            } else {
                h.classList.toggle('d-none', true)
            }
        })
        this.nodes.text_tw.innerText = this.data[2][1][this.step].chinese
        this.nodes.text_hakka.innerText = this.data[2][this.language][this.step].text
        this.soundPlay()
        if (this.step < 9) {
            this.nodes.image.bk_1.classList.toggle('d-none', false)
            this.nodes.image.bk_2.classList.toggle('d-none', true)
        } else {
            this.nodes.image.bk_1.classList.toggle('d-none', true)
            this.nodes.image.bk_2.classList.toggle('d-none', false)
        }
    }

    soundPlay() {
        Object.values(this.nodes.audios).map(a => a.pause())
        this.nodes.audios[this.step - 1].currentTime = 0
        this.nodes.audios[this.step - 1].play()
    }

    /**
     * 文字開關
     */
    textOpen() {
        let maxWidth = (this.maxWidth || this.nodes.template.offsetWidth) * 0.93 * 0.7 - 140 + "px"
        let maxHeight = this.nodes.collsape_h1.offsetHeight + this.nodes.text_tw.offsetWidth + "px"
        this.nodes.text_tw.style.width = maxWidth
        this.nodes.text_hakka.style.width = maxWidth
        this.nodes.collsape_p1.style.maxWidth = maxWidth
        this.nodes.collsape_p1.style.maxHeight = maxHeight
        this.nodes.btn_textOpen.style.display = 'none'
        this.nodes.btn_textClose.style.display = 'block'
    }
    textClose() {
        this.nodes.collsape_p1.style.maxWidth = 0
        this.nodes.collsape_p1.style.maxHeight = '80px'
        this.nodes.btn_textOpen.style.display = 'block'
        this.nodes.btn_textClose.style.display = 'none'
    }
    chineseOpen() {
        const maxWidth = (this.maxWidth || this.nodes.template.offsetWidth) * 0.93 * 0.7 - 140 + "px"
        this.nodes.collsape_p2.style.maxWidth = maxWidth
        this.nodes.collsape_p2.style.width = maxWidth
    }
    chineseClose() {
        this.nodes.collsape_p2.style.maxWidth = 0
    }


}