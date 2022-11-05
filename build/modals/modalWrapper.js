export class ImplModalTemplate {
    constructor(maker) {
        this.maker = maker;
    }
    makeTemplate() {
        return (`
            <div class="modal__close">ｘ</div>
                ${this.maker.getModalContent()}
            <div class="modal__buttons">
                <button>추가</button>
            </div>
        `);
    }
    makeModalElement() {
        const modal = document.createElement('div');
        modal.classList.add('modal__container');
        modal.innerHTML = this.makeTemplate();
        return modal;
    }
}
//# sourceMappingURL=modalWrapper.js.map