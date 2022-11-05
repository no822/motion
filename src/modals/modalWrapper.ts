import { ModalContentTemplateMaker } from "./modalTemplate";
// 모달 헤더, 닫기 등 종류와 관련없이 공통적인 부분

export interface ModalMaker {
    makeModalElement(): HTMLDivElement;
}

export class ImplModalMaker implements ModalMaker {
    constructor(private maker: ModalContentTemplateMaker, private isModal: boolean) {}

    private makeTemplate(): string {
        return (`
            <button class="modal__close">𝖷</button>
                ${this.maker.getModalTemplateContent()}
            <div class="modal__buttons">
                <button>추가</button>
            </div>
        `);
    }

    private enrollModalEvents(modal: HTMLDivElement) {
        // 1. 모달 닫기 이벤트
        const closeButton = modal.querySelector('.modal__close');
        if (closeButton !== null) {
            closeButton.addEventListener('click', () => {
                this.isModal = false;
                modal.remove();
            })
        }

        // 2. section 등록 이벤트
    }

    makeModalElement(): HTMLDivElement {
        const modal = document.createElement('div');
        modal.classList.add('modal__container');
        modal.innerHTML = this.makeTemplate();
        this.enrollModalEvents(modal);
        return modal;
    }
}
