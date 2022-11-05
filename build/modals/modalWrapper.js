export class ImplModalMaker {
    constructor(maker, toggleIsModal) {
        this.maker = maker;
        this.toggleIsModal = toggleIsModal;
        this.makeTemplate = () => {
            return (`
            <button class="modal__close">𝖷</button>
                ${this.maker.getModalTemplateContent()}
            <div class="modal__buttons">
                <button>추가</button>
            </div>
        `);
        };
        this.enrollModalEvents = (modal) => {
            // 1. 모달 닫기 이벤트
            const closeButton = modal.querySelector('.modal__close');
            if (closeButton !== null) {
                closeButton.addEventListener('click', () => {
                    modal.remove();
                    this.toggleIsModal();
                });
            }
            // 2. section 등록 이벤트
        };
        this.makeModalElement = () => {
            const modal = document.createElement('div');
            modal.classList.add('modal__container');
            modal.innerHTML = this.makeTemplate();
            this.enrollModalEvents(modal);
            return modal;
        };
    }
}
//# sourceMappingURL=modalWrapper.js.map