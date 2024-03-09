//任務遊戲2
class SG_4 extends SG_Base {
    step = ''
    activeCharacter = ''
    complateName = []
    no = 4

    setData(data) {
        super.setData(data)
    }

    init() {
        super.init()
    }

    updateNode() {
        super.updateNode()
        this.nodes.image.names = this.nodes.template.querySelectorAll('[name="name"]')

        this.nodes.characters = this.nodes.template.querySelectorAll('[name="character"]')

        this.nodes.complate_container = this.nodes.template.querySelector('.complete_container')
        this.nodes.complate_head = this.nodes.complate_container.querySelector('.complate_head')
        this.nodes.complate_text = this.nodes.complate_container.querySelector('.complate_text')
        this.nodes.complate_refresh = this.nodes.complate_container.querySelector('.complate_refresh')
        this.nodes.complate_next = this.nodes.complate_container.querySelector('.complate_next')

        this.nodes.command_container = this.nodes.template.querySelector('.command_container')

        this.nodes.hint = this.nodes.template.querySelector('.hint_container')

        this.nodes.btn_cmds = this.nodes.template.querySelectorAll('[name="cmd"]')
        this.nodes.area_container = this.nodes.template.querySelector('[game-id="1-2-13"]')
        this.nodes.btn_areas = this.nodes.area_container.querySelectorAll('[name="area"]')
    }

    getImageHTML() {
        return `<img class="w-100 position-absolute left-0" src="./src/img/1-2/012.jpg"/>
        <img class="position-absolute" game="1-2" game-id="1-2-9" name="character" value="劉宗翰" src="./src/img/1-2/013.png"/>
        <img class="position-absolute" game="1-2" game-id="1-2-10" name="character" value="彭秀伶" src="./src/img/1-2/014.png"/>
        <img class="position-absolute" game="1-2" game-id="1-2-11" name="character" value="林玉琴" src="./src/img/1-2/015.png"/>
        <img class="position-absolute" game="1-2" game-id="1-2-12" name="character" value="范小萍" src="./src/img/1-2/016.png"/>
        <div game-id="1-2-13" class="w-100 h-100 top-0 position-absolute">
            ${Object.keys(this.data[this.no][1].area).map(key =>
            `<div name="area" game-id="1-2-13-${key}" class="cursor-pointer table-border" value="${key}"></div>`
        ).join('')}
        </div>
        <img name="name" game="1-2" game-id="1-2-14" value="劉宗翰" src="./src/img/1-2/017.png"/>
        <img name="name" game="1-2" game-id="1-2-15" value="彭秀伶" src="./src/img/1-2/018.png"/>
        <img name="name" game="1-2" game-id="1-2-16" value="林玉琴" src="./src/img/1-2/019.png"/>
        <img name="name" game="1-2" game-id="1-2-17" value="范小萍" src="./src/img/1-2/020.png"/>
        <img class="head_2" value="鍾瑞容" name="head" src="./src/img/game_head_1.png"/>
        <img class="head_2" value="劉宗翰" name="head" src="./src/img/game_head_2.png"/>
        <img class="head_2" value="彭秀伶" name="head" src="./src/img/game_head_4.png"/>
        <img class="head_2" value="林玉琴" name="head" src="./src/img/game_head_8.png"/>
        <img class="head_2" value="范小萍" name="head" src="./src/img/game_head_6.png"/>`
    }

    bindEvent() {
        super.bindEvent()
        Object.values(this.nodes.btn_areas).map(btn => {
            btn.onclick = (e) => this.handleSelectArea(e)
            btn.onmouseenter = () => {
                if (!btn.classList.contains('table-selected')) {
                    this.sePlay(3)
                }
            }
        })
    }

    setVisible(visible) {
        super.setVisible(visible)
    }

    getBodyHTML() {
        return `${this.getCommandHTML(Object.values(this.data[4][1].command))}
            ${this.getGameInfoHTML('住在哪', 3)}
            ${this.getGameInfoButtonHTML()}
            ${this.getHintHTML()}
            ${this.getComplateHTML('下一階段')}
            ${this.getSentenceHTML()}
            ${this.getStartBoxHTML(this.data[4][1].question, 3)}`
    }

    getAudioHTML() {
        let html = ''
        Object.keys(this.data[4][this.language].sound).map(answer =>
            Object.values(this.data[4][this.language].sound[answer]).map(d => {
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
        this.nodes.hint.classList.toggle('d-none', true)
        this.nodes.btn_info_open.classList.toggle('d-none', true)
        this.nodes.start_container.classList.toggle('d-none', false)
        this.nodes.command_container.classList.toggle('d-none', true)
        this.nodes.complate_container.classList.toggle('d-none', true)
        Object.values(this.nodes.image.names).map(name => name.classList.toggle('d-none', true))
        Object.values(this.nodes.btn_areas).map(area => area.classList.toggle('d-none', false))
        this.createHintText()
    }

    handleGameStart() {
        super.handleGameStart()
        this.nodes.btn_info_open.classList.toggle('d-none', false)
        this.nodes.start_container.classList.toggle('d-none', true)
        this.nodes.hint.classList.toggle('d-none', false)
        this.nodes.command_container.classList.toggle('d-none', false)
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
            })
            this.selectedCmd = e.target.getAttribute('value')
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

    // 點選位置
    handleSelectArea(e) {
        this.sePlay(4)
        if (this.data[this.no][1].area[e.target.getAttribute('value')] === this.selectedCharacter) {
            e.target.classList.toggle('d-none', true)
            this.complateName.push(this.selectedCharacter)
            this.isYes = false
            this.sePlay(9)
        } else {
            this.sePlay(7)
        }
        this.selectedCmd = ''
        this.createHintText()
    }

    soundPlay() {
        Object.values(this.nodes.audios).map(a => a.pause())
        this.nodes.audios[this.step - 1].current = 0
        this.nodes.audios[this.step - 1].play()
    }

    characterEvent(statu, animate) {
        if (statu === 'on') {
            Object.values(this.nodes.characters).map(character => {
                if (!this.complateName.find(name => name === character.getAttribute('value'))) {
                    character.classList.toggle(animate, true)
                    character.onclick = (e) => this.handleSelectCharacter(e)
                    character.onmouseenter = () => this.sePlay(2)
                    character.style.cursor = 'pointer'
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
        const text = this.data[4][1].hints
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
            } else if (this.selectedCmd === '住在') {
                html += `<p class="m-0 h5 fw-600">${this.selectedCmd}</p>`
                html += `<p class="m-0 h5 fw-600">+</p>`
                html += `<p class="m-0 h5 fw-600">${this.selectedCharacter}</p>`
                html += `<p class="m-0 h5 fw-600">+</p>`
                html += `<p class="m-0 h5 fw-600">${Object.values(text).find(d => d.command === 'area').hint}</p>`
                this.step = 'area'
            }
        }
        this.nodes.hint.innerHTML = html
        this.changeStep()
    }

    changeStep() {
        if (this.isYes && this.step === '') {
            Object.values(this.nodes.btn_cmds).map(cmd => {
                cmd.classList.toggle('cmd-selected', false)
                if (cmd.getAttribute('value') === '住在') {
                    cmd.classList.toggle('shining_animation', true)
                    cmd.onclick = (e) => this.handleSelectCmd(e)
                }
            })
            this.nodes.area_container.classList.toggle('d-none', true)
        } else if (this.step === '') {
            this.selectedCharacter = ''
            this.selectedName = ''
            this.nodes.sentence_btn_hidden.classList.toggle('close_shining', false)
            this.nodes.sentence_container.classList.toggle('d-none', true)
            Object.values(this.nodes.btn_cmds).map(cmd => cmd.onclick = (e) => this.handleSelectCmd(e))
            this.nodes.area_container.classList.toggle('d-none', true)
            Object.values(this.nodes.btn_cmds).map(btn => {
                btn.classList.toggle('cmd-selected', false)
                btn.classList.toggle('shining_animation', true)
            })
            Object.values(this.nodes.image.names).map(name => {
                if (this.complateName.find(c => c === name.getAttribute('value'))) {
                    name.classList.toggle('d-none', false)
                } else {
                    name.classList.toggle('d-none', true)
                }
            })
            Object.values(this.nodes.characters).map(character => {
                character.classList.toggle(`game-1-2-ch-2`, false)
            })
            this.characterEvent('off')
            if (this.complateName.length === 4) {
                this.complate()
            }
        } else if (this.step === '打給' || this.step === '住在') {
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
        } else if (this.step === 'area') {
            this.nodes.area_container.classList.toggle('d-none', false)
        }
    }

    complate() {
        this.nodes.complate_head.insertBefore(Object.values(this.nodes.image.heads).find(img =>
            img.getAttribute('value') === this.data[4][1].end.name
        ), this.nodes.complate_head.firstChild)
        this.nodes.complate_text.innerText = this.data[4][1].end.text
        this.nodes.hint.classList.toggle('d-none', true)
        this.nodes.btn_info_open.classList.toggle('d-none', true)
        this.nodes.command_container.classList.toggle('d-none', true)
        this.nodes.complate_container.classList.toggle('d-none', false)
        this.sePlay(10)
    }


}