//情境介紹
class SG_1 extends SG_Base {


    updateNode() {
        super.updateNode()
        this.nodes.btn_start = this.nodes.template.querySelector('.game_1_stage_1_button')
        this.nodes.game_1_container = this.nodes.template.querySelector('.game_1_stage_1_container')
    }

    bindEvent() {
        super.bindEvent()
        this.nodes.btn_start.onclick = () => { this.nextStage() }
    }

    getImageHTML() {
        return `<img
            id="game_2_bk_1"
            class="w-100 position-absolute left-0"
            src="./src/img/1-2/001.jpg"
        />`
    }

    getBodyHTML() {
        return `<div class="game_1_stage_1_container" >
            <div class="w-80">
                ${Object.values(this.data[1][1]).map(t => `<p class="text-start h4 m-0 fw-600">${t}</p>`).join('')}
            </div>
            <div class="w-20 h-100 d-flex justify-content-end align-items-center;">
                <button class="game_1_stage_1_button">開始</button>
            </div>
        </div>`
    }
}