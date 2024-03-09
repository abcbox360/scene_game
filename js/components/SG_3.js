//任務遊戲1
class SG_3 extends SG_Base {
    step = ''
    complateName = []
    no = 3

    setData(data) {
        super.setData(data)
    }

    init() {
        super.init()
    }

    updateNode() {
        super.updateNode()
        this.nodes.image.icons = this.nodes.template.querySelectorAll('[name="icon"]')

        this.nodes.characters = this.nodes.template.querySelectorAll('[name="character"]')

        this.nodes.complate_container = this.nodes.template.querySelector('.complete_container')
        this.nodes.complate_head = this.nodes.complate_container.querySelector('.complate_head')
        this.nodes.complate_text = this.nodes.complate_container.querySelector('.complate_text')
        this.nodes.complate_refresh = this.nodes.complate_container.querySelector('.complate_refresh')
        this.nodes.complate_next = this.nodes.complate_container.querySelector('.complate_next')

        this.nodes.command_container = this.nodes.template.querySelector('.command_container')
        this.nodes.name_container = this.nodes.template.querySelector('#name_container')

        this.nodes.hint = this.nodes.template.querySelector('.hint_container')

        this.nodes.btn_cmds = this.nodes.template.querySelectorAll('[name="cmd"]')
        this.nodes.btn_names = this.nodes.template.querySelectorAll('[name="name"]')

    }

    getImageHTML() {
        return `<img class="w-100 position-absolute left-0" src="./src/img/1-2/003.jpg"/>
            <img class="position-absolute" game="1-2" game-id="1-2-1" name="character" value="劉宗翰" src="./src/img/1-2/004.png"/>
            <img class="position-absolute" game="1-2" game-id="1-2-2" name="character" value="彭秀伶" src="./src/img/1-2/005.png"/>
            <img class="position-absolute" game="1-2" game-id="1-2-3" name="character" value="林玉琴" src="./src/img/1-2/006.png"/>
            <img class="position-absolute" game="1-2" game-id="1-2-4" name="character" value="范小萍" src="./src/img/1-2/007.png"/>
            <img class="position-absolute" game="1-2" game-id="1-2-5" name="icon" value="林玉琴" src="./src/img/1-2/008.png"/>
            <img class="position-absolute" game="1-2" game-id="1-2-6" name="icon" value="劉宗翰" src="./src/img/1-2/009.png"/>
            <img class="position-absolute" game="1-2" game-id="1-2-7" name="icon" value="彭秀伶" src="./src/img/1-2/010.png"/>
            <img class="position-absolute" game="1-2" game-id="1-2-8" name="icon" value="范小萍" src="./src/img/1-2/011.png"/>
            <img class="head_2" value="鍾瑞容" name="head" src="./src/img/game_head_1.png"/>
            <img class="head_2" value="劉宗翰" name="head" src="./src/img/game_head_2.png"/>
            <img class="head_2" value="彭秀伶" name="head" src="./src/img/game_head_4.png"/>
            <img class="head_2" value="林玉琴" name="head" src="./src/img/game_head_8.png"/>
            <img class="head_2" value="范小萍" name="head" src="./src/img/game_head_6.png"/>`
    }

    bindEvent() {
        super.bindEvent()
    }

    setVisible(visible) {
        super.setVisible(visible)
    }

    getBodyHTML() {
        return `${this.getCommandHTML(Object.values(this.data[this.no][1].command))}
            <div id="name_container" class="h4 fw-600 m-3 w-120px flex-column justify-content-center align-items-center position-absolute">
                ${Object.values(this.data[this.no][1].name).map(n =>
            `<button name="name" class="border-0 w-100 h-40px m-2 h4 fw-600 shadow-hako" value="${n}">${n}</button>`
        ).join('')}
            </div>
            ${this.getGameInfoHTML('怎麼來', 3)}
            ${this.getGameInfoButtonHTML()}
            ${this.getHintHTML()}
            ${this.getComplateHTML('下一階段')}
            ${this.getSentenceHTML()}
            ${this.getStartBoxHTML(this.data[this.no][1].question, 3)}`
    }

    getAudioHTML() {
        let html = ''
        Object.keys(this.data[3][this.language].sound).map(answer =>
            Object.values(this.data[3][this.language].sound[answer]).map(d => {
                Object.keys(d.src).map(key => {
                    html += `<audio answer="${answer}" no="${key}" name="${d.name}" src="./src/media/${d.src[key]}"></audio>`
                })
            })
        )
        return html
    }

    // 重新整理
    refresh() {
        this.step = ''
        this.selectedCmd = ''
        this.isYes = false
        this.complateName = []
        this.nodes.complate_container.classList.toggle('d-none', true)
        this.nodes.start_container.classList.toggle('d-none', false)
        this.nodes.hint.classList.toggle('d-none', true)
        this.nodes.command_container.classList.toggle('d-none', true)
        this.nodes.btn_info_open.classList.toggle('d-none', true)
        Object.values(this.nodes.btn_names).map(btn => btn.classList.toggle('d-none', true))
        this.createHintText()
    }

    handleGameStart() {
        super.handleGameStart()
        this.nodes.btn_info_open.classList.toggle('d-none', false)
        this.nodes.start_container.classList.toggle('d-none', true)
        this.nodes.hint.classList.toggle('d-none', false)
        this.nodes.command_container.classList.toggle('d-none', false)
        Object.values(this.nodes.btn_names).map(btn => btn.classList.toggle('d-none', false))
        this.createHintText()
    }

    // 點選左上角指令
    handleSelectCmd(e) {
        this.sePlay(1)
        if (this.selectedCmd === e.target.getAttribute('value')) {
            e.target.classList.toggle('cmd-selected', false)
            this.selectedCmd = ''
        } else {
            if (e.target.getAttribute('value') === '打給') {
                this.selectedCharacter = ''
            }
            this.selectedName = ''
            this.selectedCmd = ''
            this.createHintText()
            Object.values(this.nodes.btn_cmds).map(btn => {
                if (btn.getAttribute('value') === e.target.getAttribute('value')) {
                    btn.classList.toggle('cmd-selected', true)
                } else {
                    btn.classList.toggle('cmd-selected', false)
                }
                this.selectedCmd = e.target.getAttribute('value')
            })
        }
        super.handleSelectCmd()
        this.createHintText()
    }

    // 點選角色
    handleSelectCharacter(e) {
        this.sePlay(4)
        const value = e.target.getAttribute('value')
        this.selectedCharacter = value
        this.characterEvent('off')
        e.target.classList.toggle('game-1-2-ch-2', true)
        this.createHintText()
    }

    // 點選右上角名牌
    handleSelectName(e) {
        this.selectedName = e.target.getAttribute('value')
        const tool = Object.values(this.data[this.no][1].connect).find(c => c.name === this.selectedCharacter).tool
        if (this.selectedName === tool) {
            this.complateName.push(this.selectedCharacter)
            this.isYes = false
            this.sePlay(9)
        } else {
            this.sePlay(7)
        }
        this.selectedName = ''
        this.selectedCmd = ''
        this.createHintText()
        this.sePlay(4)
    }

    soundPlay() {
        Object.values(this.nodes.audios).map(a => a.pause())
        this.nodes.audios[this.step - 1].current = 0
        this.nodes.audios[this.step - 1].play()
    }

    characterEvent(statu, animate) {
        if (statu === 'on') {
            Object.values(this.nodes.characters).map(character => {
                if (character.getAttribute('value') !== null) {
                    if (!this.complateName.find(name => name === character.getAttribute('value'))) {
                        character.onclick = (e) => this.handleSelectCharacter(e)
                        character.onmouseenter = () => this.sePlay(2)
                        character.style.cursor = 'pointer'
                        character.classList.toggle(animate, true)
                    }
                }
            })
        } else {
            Object.values(this.nodes.characters).map(character => {
                character.onmouseenter = ''
                character.onclick = ''
                character.style.cursor = 'auto'
                character.classList.toggle('game-1-2-ch-1', false)
            })
        }
    }

    createHintText() {
        let html = ''
        const text = this.data[3][1].hints
        if (this.selectedCmd === '') {
            html += `<p class="m-0 h5 fw-600">${text[1].hint}</p>`
            this.step = this.selectedCmd
        } else {
            if (this.selectedCharacter === '' && this.selectedName === '') {
                html += `<p class="m-0 h5 fw-600">${this.selectedCmd}</p>`
                html += `<p class="m-0 h5 fw-600">+</p>`
                html += `<p class="m-0 h5 fw-600">${Object.values(text).find(d => d.command === this.selectedCmd).hint}</p>`
                this.step = this.selectedCmd
            } else if (this.selectedCmd === '打給' && this.selectedCharacter !== '') {
                html += `<p class="m-0 h5 fw-600">${this.selectedCmd}</p>`
                html += `<p class="m-0 h5 fw-600">+</p>`
                html += `<p class="m-0 h5 fw-600">${this.selectedCharacter}</p>`
                html += `<p class="m-0 h5 fw-600">+</p>`
                html += `<p class="m-0 h5 fw-600">${Object.values(text).find(d => d.command === 'character').hint}</p>`
                this.step = 'character'
            } else if (this.selectedCmd === '前往') {
                html += `<p class="m-0 h5 fw-600">${this.selectedCmd}</p>`
                html += `<p class="m-0 h5 fw-600">+</p>`
                html += `<p class="m-0 h5 fw-600">${this.selectedCharacter}</p>`
                html += `<p class="m-0 h5 fw-600">+</p>`
                html += `<p class="m-0 h5 fw-600">${Object.values(text).find(d => d.command === 'character_a').hint}</p>`
                this.step = 'character_a'
            }
        }
        this.nodes.hint.innerHTML = html
        this.changeStep()
    }

    changeStep() {
        if (this.isYes && this.step === '') {
            Object.values(this.nodes.btn_cmds).map(cmd => {
                cmd.classList.toggle('cmd-selected', false)
                if (cmd.getAttribute('value') === '前往') {
                    cmd.classList.toggle('shining_animation', true)
                    cmd.onclick = (e) => this.handleSelectCmd(e)
                }
            })
            Object.values(this.nodes.btn_names).map(btn => {
                btn.classList.toggle('shining_animation_3', false)
                btn.classList.toggle('name-selected', false)
                btn.classList.toggle('name-hover', false)
                btn.onclick = ''
                btn.onmouseenter = ''
                btn.style.cursor = 'auto'
            })
        } else if (this.step === '') {
            this.selectedName = ''
            this.selectedCharacter = ''
            this.nodes.sentence_btn_hidden.classList.toggle('close_shining', false)
            this.nodes.sentence_container.classList.toggle('d-none', true)
            Object.values(this.nodes.btn_cmds).map(cmd => cmd.onclick = (e) => this.handleSelectCmd(e))
            Object.values(this.nodes.image.icons).map(icon => {
                if (this.complateName.find(c => c === icon.getAttribute('value'))) {
                    icon.classList.toggle('d-none', false)
                } else {
                    icon.classList.toggle('d-none', true)
                }
            })
            Object.values(this.nodes.btn_cmds).map(btn => {
                btn.classList.toggle('cmd-selected', false)
                btn.classList.toggle('shining_animation', true)
            })
            Object.values(this.nodes.btn_names).map(btn => {
                btn.classList.toggle('shining_animation_3', false)
                btn.classList.toggle('name-selected', false)
                btn.classList.toggle('name-hover', false)
                btn.onclick = ''
                btn.onmouseenter = ''
                btn.style.cursor = 'auto'
            })
            Object.values(this.nodes.characters).map(character => {
                character.classList.toggle(`game-1-2-ch-2`, false)
            })
            this.characterEvent('off')
            if (this.complateName.length === 4) {
                this.complate()
            }
        } else if (this.step === '打給' || this.step === '前往') {
            if (this.step === '打給') {
                Object.values(this.nodes.characters).map(character => {
                    character.classList.toggle(`game-1-2-ch-2`, false)
                })
            }
            Object.values(this.nodes.btn_cmds).map(btn => btn.classList.toggle('shining_animation', false))
            this.characterEvent('on', 'game-1-2-ch-1')
        } else if (this.step === 'character') {
            this.OpenSentence()
            Object.values(this.nodes.btn_cmds).map(cmd => cmd.onclick = '')
        } else if (this.step === 'character_a') {
            Object.values(this.nodes.btn_names).map(btn => {
                btn.classList.toggle('shining_animation_3', true)
                btn.classList.toggle('name-hover', true)
                btn.onclick = (e) => this.handleSelectName(e)
                btn.onmouseenter = () => { this.sePlay(3) }
                btn.style.cursor = 'pointer'
            })
        }
    }

    complate() {
        this.nodes.complate_head.insertBefore(Object.values(this.nodes.image.heads).find(img =>
            img.getAttribute('value') === this.data[3][1].end.name
        ), this.nodes.complate_head.firstChild)
        this.nodes.complate_text.innerText = this.data[3][1].end.text
        this.nodes.hint.classList.toggle('d-none', true)
        this.nodes.btn_info_open.classList.toggle('d-none', true)
        this.nodes.command_container.classList.toggle('d-none', true)
        this.nodes.complate_container.classList.toggle('d-none', false)
        Object.values(this.nodes.btn_names).map(btn => btn.classList.toggle('d-none', true))
        this.sePlay(10)
    }


}