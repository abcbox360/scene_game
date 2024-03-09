//任務遊戲3
class SG_5 extends SG_Base {
    step = ''
    activeCharacter = ''
    selectValue
    complateRoad = []
    complateNumber = []
    complateName = []
    no = 5

    setData(data) {
        super.setData(data)
    }

    init() {
        super.init()
    }

    updateNode() {
        super.updateNode()
        this.nodes.image.road_names = this.nodes.template.querySelectorAll('[name="road_name"]')
        this.nodes.image.number_names = this.nodes.template.querySelectorAll('[name="number_name"]')

        this.nodes.characters = this.nodes.template.querySelectorAll('[name="character"]')

        this.nodes.complate_container = this.nodes.template.querySelector('.complete_container')
        this.nodes.complate_head = this.nodes.complate_container.querySelector('.complate_head')
        this.nodes.complate_text = this.nodes.complate_container.querySelector('.complate_text')
        this.nodes.complate_refresh = this.nodes.complate_container.querySelector('.complate_refresh')
        this.nodes.complate_next = this.nodes.complate_container.querySelector('.complate_next')

        this.nodes.command_container = this.nodes.template.querySelector('.command_container')

        this.nodes.hint = this.nodes.template.querySelector('.hint_container')

        this.nodes.select_container = this.nodes.template.querySelector('.select_menu')
        this.nodes.road_btn_container = this.nodes.select_container.querySelector('[container="road"]')
        this.nodes.number_btn_container = this.nodes.select_container.querySelector('[container="number"]')

        this.nodes.btn_cmds = this.nodes.template.querySelectorAll('[name="cmd"]')
        this.nodes.btn_container = this.nodes.template.querySelector('[game-id="1-2-18"]')
        this.nodes.btns = this.nodes.btn_container.querySelectorAll('[name]')
    }

    getImageHTML() {
        return `<img class="w-100 position-absolute left-0" src="./src/img/1-2/012.jpg"/>
        <img class="position-absolute" game="1-2" game-id="1-2-9" name="character" value="劉宗翰" src="./src/img/1-2/013.png"/>
        <img class="position-absolute" game="1-2" game-id="1-2-10" name="character" value="彭秀伶" src="./src/img/1-2/014.png"/>
        <img class="position-absolute" game="1-2" game-id="1-2-11" name="character" value="林玉琴" src="./src/img/1-2/015.png"/>
        <img class="position-absolute" game="1-2" game-id="1-2-12" name="character" value="范小萍" src="./src/img/1-2/016.png"/>
        <img name="name" game="1-2" game-id="1-2-14" value="劉宗翰" src="./src/img/1-2/017.png"/>
        <img name="name" game="1-2" game-id="1-2-15" value="彭秀伶" src="./src/img/1-2/018.png"/>
        <img name="name" game="1-2" game-id="1-2-16" value="林玉琴" src="./src/img/1-2/019.png"/>
        <img name="name" game="1-2" game-id="1-2-17" value="范小萍" src="./src/img/1-2/020.png"/>
        <img name="road_name" value="中山路" game-id="1-2-19" src="./src/img/1-2/021.png" />
        <img name="road_name" value="大同路" game-id="1-2-20" src="./src/img/1-2/022.png" />
        <img name="road_name" value="中華路" game-id="1-2-21" src="./src/img/1-2/023.png" />
        <img name="number_name" value="劉宗翰" game-id="1-2-22" src="./src/img/1-2/027.png" />
        <img name="number_name" value="彭秀伶" game-id="1-2-23" src="./src/img/1-2/030.png" />
        <img name="number_name" value="林玉琴" game-id="1-2-24" src="./src/img/1-2/024.png" />
        <img name="number_name" value="范小萍" game-id="1-2-25" src="./src/img/1-2/029.png" />
        <img class="head_2" value="鍾瑞容" name="head" src="./src/img/game_head_1.png"/>
        <img class="head_2" value="劉宗翰" name="head" src="./src/img/game_head_2.png"/>
        <img class="head_2" value="彭秀伶" name="head" src="./src/img/game_head_4.png"/>
        <img class="head_2" value="林玉琴" name="head" src="./src/img/game_head_8.png"/>
        <img class="head_2" value="范小萍" name="head" src="./src/img/game_head_6.png"/>
        <div game-id="1-2-18" class="w-100 h-100 top-0 position-absolute">
            ${Object.keys(this.data[this.no][1].road).map(key =>
            `<div name="road" game-id="1-2-18-1-${key}" show="true" class="cursor-pointer table-border" value="${key}"></div>`
        ).join('')}
            ${Object.keys(this.data[this.no][1].number).map(key => this.data[this.no][1].number[key] !== "" ?
            `<div name="number" game-id="1-2-18-2-${key}" show="true" class="cursor-pointer table-border" value="${this.data[this.no][1].number[key]}"></div>` :
            ''
        ).join('')}
        </div>`
    }

    getSelectMenuHTML() {
        return `<div class="select_menu w-100 h-100 position-absolute left-0 d-flex justify-content-center align-items-center top-0">
            <div class="d-flex w-80 game-bg-1 rounded p-3 justify-content-center align-items-center" container="road">
            </div>
            <div class="d-flex w-80 game-bg-1 rounded p-3 justify-content-center align-items-center" container="number">
            </div>
        </div>`
    }

    getSelectMenuBtnHTML(data) {
        return `<div name="btn" class="bt-hover-1 cursor-pointer shadow-hako w-120px h-50px border-0 rounded h4 m-2px fw-600 bg-white di-flex justify-content-center align-items-center" value="${data}">
            ${data}
        </div>`
    }

    bindEvent() {
        super.bindEvent()
        Object.values(this.nodes.btns).map(btn => {
            btn.onclick = (e) => this.handleSelectItem(e)
            btn.onmouseenter = () => this.sePlay(3)
        })
        const bt_1 = [
            { "btn": "road_btn_container", "event": "handleClickMenu", "se": 0 },
            { "btn": "number_btn_container", "event": "handleClickMenu", "se": 0 }
        ]
        bt_1.map(b => {
            this.nodes[b.btn].onclick = (e) => this[b.event](e)
            this.nodes[b.btn].onmouseover = (e) => {
                const name = e.target.getAttribute('name')
                if (name === 'btn') {
                    this.sePlay(0)
                }
            }
        })

    }

    setVisible(visible) {
        super.setVisible(visible)
    }

    getBodyHTML() {
        return `${this.getCommandHTML(Object.values(this.data[5][1].command))}
            ${this.getGameInfoHTML('填地圖', 3)}
            ${this.getGameInfoButtonHTML()}
            ${this.getHintHTML()}
            ${this.getComplateHTML('重新開始')}
            ${this.getSentenceHTML()}
            ${this.getStartBoxHTML(this.data[this.no][1].question, 3)}
            ${this.getSelectMenuHTML()}`
    }

    getAudioHTML() {
        let html = ''
        Object.keys(this.data[this.no][this.language].sound).map(answer =>
            Object.values(this.data[this.no][this.language].sound[answer]).map(d => {
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
        this.complateRoad = []
        this.complateNumber = []
        this.nodes.start_container.classList.toggle('d-none', false)
        this.nodes.hint.classList.toggle('d-none', true)
        this.nodes.btn_info_open.classList.toggle('d-none', true)
        this.nodes.command_container.classList.toggle('d-none', true)
        this.nodes.complate_container.classList.toggle('d-none', true)
        this.nodes.select_container.classList.toggle('d-none', true)
        this.nodes.btn_container.classList.toggle('d-none', true)
        Object.values(this.nodes.btns).map(btn => btn.setAttribute('show', true))
        Object.values(this.nodes.image.road_names).map(n => n.classList.toggle('d-none', true))
        Object.values(this.nodes.image.number_names).map(n => n.classList.toggle('d-none', true))
        Object.values(this.nodes.characters).map(ch => ch.classList.toggle('d-none', false))
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

    // 點選路or房子
    handleSelectItem(e) {
        this.selectedName = e.target.getAttribute('name')
        this.selectValue = e.target.getAttribute('value')
        e.target.classList.toggle('table-selected', true)
        this.createHintText()
        this.sePlay(4)
    }

    // 開啟路名及號碼選單
    openSelectMenu(type) {
        let html = ''
        this.nodes.select_container.classList.toggle('d-none', false)
        Object.values(this.nodes.select_container.querySelectorAll('[container]')).map(container => {
            if (container.getAttribute('container') === type) {
                const arr = this.randomArray(Object.values(this.data[this.no][1][type]).length, Object.values(this.data[this.no][1][type]).length, 0)
                for (const i of arr) {
                    if (type === 'road') {
                        html += this.getSelectMenuBtnHTML(Object.values(this.data[this.no][1][type])[i])
                    } else {
                        html += this.getSelectMenuBtnHTML(Object.keys(this.data[this.no][1][type])[i])
                    }
                }
                container.innerHTML = html
                container.classList.toggle('d-none', false)
                container.classList.toggle('d-flex', true)
            } else {
                container.classList.toggle('d-none', true)
                container.classList.toggle('d-flex', false)
            }
        })
    }

    // 點選路名及號碼
    handleClickMenu(e) {
        this.sePlay(4)
        const data = this.data[this.no][1]
        const s = e.target.getAttribute('value')
        const btnName = e.target.getAttribute('name')
        if (btnName === 'btn') {
            if (this.step === 'road') {
                if (data.road[this.selectValue] === s) {
                    Object.values(this.nodes.image.road_names).find(n => n.getAttribute('value') === s).classList.toggle('d-none', false)
                    Object.values(this.nodes.btns).map(btn => {
                        if (btn.getAttribute('value') === this.selectValue) {
                            btn.setAttribute('show', false)
                            this.complateRoad.push(this.selectValue)
                        }
                    })
                    this.sePlay(9)
                } else {
                    this.sePlay(7)
                }
            } else {
                if (data.number[s] === this.selectValue) {
                    Object.values(this.nodes.image.number_names).find(n => n.getAttribute('value') === this.selectValue).classList.toggle('d-none', false)
                    Object.values(this.nodes.btns).map(btn => {
                        if (btn.getAttribute('value') === this.selectValue) {
                            btn.setAttribute('show', false)
                            this.complateNumber.push(this.selectValue)
                        }
                    })
                    this.sePlay(9)
                } else {
                    this.sePlay(7)
                }
            }
            const newComplate = Object.values(data.connect).filter(d => {
                const a = this.complateRoad.length > 0 ? this.complateRoad.find(x => x === d.road) : ''
                const b = this.complateNumber.length > 0 ? this.complateNumber.find(x => x === d.number) : ''
                if (a && b) {
                    return true
                }
            })
            if (newComplate && newComplate.length > this.complateName.length) {
                this.complateName = newComplate.map(n => n.name)
                this.isYes = false
                this.selectedCmd = ''
            }else {
                this.nodes.select_container.classList.toggle('d-none', true)
                Object.values(this.nodes.btns).map(btn => btn.classList.toggle('table-selected', false))
            }
            this.selectedName = ''
            this.createHintText()
        }
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
        const text = this.data[this.no][1].hints
        if (this.selectedCmd === '') {
            html += `<p class="m-0 h5 fw-600">${text[1].hint}</p>`
            this.step = this.selectedCmd
        } else {
            if ((this.selectedCmd === '住在' && this.selectedName === '') || (this.selectedCmd === '打給' && this.selectedCharacter === '')) {
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
            } else if (this.selectedCmd === '住在' && this.selectedName === 'road') {
                html += `<p class="m-0 h5 fw-600">${this.selectedCmd}</p>`
                html += `<p class="m-0 h5 fw-600">+</p>`
                html += `<p class="m-0 h5 fw-600">第${this.selectValue}條路</p>`
                html += `<p class="m-0 h5 fw-600">+</p>`
                html += `<p class="m-0 h5 fw-600">${Object.values(text).find(d => d.command === 'road').hint}</p>`
                this.step = 'road'
            } else if (this.selectedCmd === '住在' && this.selectedName === 'number') {
                html += `<p class="m-0 h5 fw-600">${this.selectedCmd}</p>`
                html += `<p class="m-0 h5 fw-600">+</p>`
                html += `<p class="m-0 h5 fw-600">${this.selectValue}的家</p>`
                html += `<p class="m-0 h5 fw-600">+</p>`
                html += `<p class="m-0 h5 fw-600">${Object.values(text).find(d => d.command === 'number').hint}</p>`
                this.step = 'number'
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
            this.nodes.btn_container.classList.toggle('d-none', true)
            this.nodes.select_container.classList.toggle('d-none', true)
        } else if (this.step === '') {
            this.selectedName = ''
            this.selectedCharacter = ''
            this.nodes.sentence_btn_hidden.classList.toggle('close_shining', false)
            this.nodes.sentence_container.classList.toggle('d-none', true)
            this.nodes.btn_container.classList.toggle('d-none', true)
            this.nodes.select_container.classList.toggle('d-none', true)
            Object.values(this.nodes.btns).map(btn => btn.classList.toggle('table-selected', false))
            Object.values(this.nodes.btn_cmds).map(cmd => cmd.onclick = (e) => this.handleSelectCmd(e))
            Object.values(this.nodes.btn_cmds).map(btn => {
                btn.classList.toggle('cmd-selected', false)
                btn.classList.toggle('shining_animation', true)
            })
            Object.values(this.nodes.characters).map(character => {
                character.classList.toggle(`game-1-2-ch-2`, false)
            })
            this.characterEvent('off')
            if (this.complateName.length === 4) {
                this.complate()
            }
        } else if (this.step === '打給') {
            Object.values(this.nodes.characters).map(character => {
                character.classList.toggle(`game-1-2-ch-2`, false)
            })
            Object.values(this.nodes.btn_cmds).map(btn => btn.classList.toggle('shining_animation', false))
            this.characterEvent('on', 'game-1-2-ch-1')
        } else if (this.step === '住在') {
            Object.values(this.nodes.btn_cmds).map(btn => btn.classList.toggle('shining_animation', false))
            this.nodes.btn_container.classList.toggle('d-none', false)
            Object.values(this.nodes.btns).map(btn => {
                if (btn.getAttribute('show') === 'true') {
                    if (this.selectedCharacter) {
                        const name = btn.getAttribute('name')
                        const vol = btn.getAttribute('value')
                        const d = Object.values(this.data[this.no][1].connect).find(d => d.name === this.selectedCharacter)
                        if (d[name] === vol) {
                            btn.classList.toggle('d-none', false)
                        } else {
                            btn.classList.toggle('d-none', true)
                        }
                    } else {
                        btn.classList.toggle('d-none', false)
                    }
                } else {
                    btn.classList.toggle('d-none', true)
                }
            })
        } else if (this.step === 'character') {
            this.OpenSentence()
            Object.values(this.nodes.btn_cmds).map(cmd => cmd.onclick = '')
        } else if (this.step === 'road' || this.step === 'number') {
            this.openSelectMenu(this.step)
        }
    }

    complate() {
        this.nodes.complate_head.insertBefore(Object.values(this.nodes.image.heads).find(img =>
            img.getAttribute('value') === this.data[5][1].end.name
        ), this.nodes.complate_head.firstChild)
        this.nodes.complate_text.innerText = this.data[5][1].end.text
        this.nodes.hint.classList.toggle('d-none', true)
        this.nodes.btn_info_open.classList.toggle('d-none', true)
        this.nodes.command_container.classList.toggle('d-none', true)
        this.nodes.complate_container.classList.toggle('d-none', false)
        this.sePlay(10)
    }


}