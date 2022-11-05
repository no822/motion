export class ImplModalMaker {
    constructor(contentMaker, sectionMaker, toggleIsModal) {
        this.contentMaker = contentMaker;
        this.sectionMaker = sectionMaker;
        this.toggleIsModal = toggleIsModal;
        this.makeTemplate = () => {
            return (`
            <button class="modal__close">𝖷</button>
                ${this.contentMaker.getModalTemplateContent()}
            <div class="modal__buttons">
                <button class="modal__add-button">추가</button>
            </div>
        `);
        };
        this.closeModal = (modal) => {
            modal.remove();
            this.toggleIsModal(false);
        };
        this.addSection = (modal, modalInfo) => {
            // (modalInfo: SectionInfo) => HTMLDivElement;
            const container = document.querySelector('.main__section-container');
            const sectionElement = this.sectionMaker.createSection(modalInfo);
            container.append(sectionElement);
            this.closeModal(modal);
        };
        this.enrollModalEvents = (modal) => {
            // 1. 모달 닫기 이벤트
            const closeButton = (modal.querySelector('.modal__close'));
            closeButton.addEventListener('click', () => {
                this.closeModal(modal);
            });
            // 2. section 추가 이벤트
            const addButton = (modal.querySelector('.modal__add-button'));
            addButton.addEventListener('click', () => {
                const title = modal.querySelector('#title');
                const url = modal.querySelector('#url');
                const body = modal.querySelector('#body');
                const sectionInfo = (url !== null) ?
                    { title: title.value, url: url.value } : { title: title.value, body: body.value };
                this.addSection(modal, sectionInfo);
            });
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
//# sourceMappingURL=modalMaker.js.map