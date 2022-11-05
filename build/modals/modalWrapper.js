export class ImplModalMaker {
    constructor(maker, isModal) {
        this.maker = maker;
        this.isModal = isModal;
    }
    makeTemplate() {
        return (`
            <div class="modal__close">ｘ</div>
                ${this.maker.getModalTemplateContent()}
            <div class="modal__buttons">
                <button>추가</button>
            </div>
        `);
    }
    enrollModalEvents(modal) {
        // 1. 모달 닫기 이벤트
        const closeButton = modal.querySelector('.modal__close');
        if (closeButton !== null) {
            closeButton.addEventListener('click', () => {
                this.isModal = false;
                modal.remove();
            });
        }
        // 2. section 등록 이벤트
    }
    makeModalElement() {
        const modal = document.createElement('div');
        modal.classList.add('modal__container');
        modal.innerHTML = this.makeTemplate();
        this.enrollModalEvents(modal);
        return modal;
    }
}
//# sourceMappingURL=modalWrapper.js.map