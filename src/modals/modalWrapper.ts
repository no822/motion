import { ModalMaker } from "./modalTemplate";
// 모달 헤더, 닫기 등 종류와 관련없이 공통적인 부분

export interface ModalTemplate {
    makeModalElement(): HTMLDivElement;
}

export class ImplModalTemplate {
    constructor(private maker: ModalMaker) {}

    private makeTemplate(): string {
        return (`
            <div class="modal__close">ｘ</div>
                ${this.maker.getModalContent()}
            <div class="modal__buttons">
                <button>추가</button>
            </div>
        `);
    }


    makeModalElement(): HTMLDivElement {
        const modal = document.createElement('div');
        modal.classList.add('modal__container');
        modal.innerHTML = this.makeTemplate();
        return modal;
    }
}
