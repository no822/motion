import { ModalContentTemplateMaker } from "./modalTemplate.js";
import { SectionMaker } from "../sections/sectionMaker.js";

export type SectionInfo = {
    title: string;
    url?: string;
    body?: string;
}

export interface ModalMaker {
    makeModalElement(): HTMLDivElement;
}

export class ImplModalMaker implements ModalMaker {
    constructor(
        private contentMaker: ModalContentTemplateMaker,
        private sectionMaker: SectionMaker,
        private setIsModal: (isModal: boolean) => void,
        private addSectionElement: (sectionElement: HTMLDivElement) => void
    ) {}

    private closeModal = (modal: HTMLDivElement): void => {
        modal.remove();
        this.setIsModal(false);
    }

    private sectionButtonClickHandler = (modal: HTMLDivElement, modalInfo: SectionInfo): void => {
        const sectionElement = this.sectionMaker.getSection(modalInfo);
        this.addSectionElement(sectionElement);
        this.closeModal(modal);
    }

    private enrollModalEvents = (modal: HTMLDivElement): void => {
        // 1. 모달 닫기 이벤트
        const closeButton = (modal.querySelector('.modal__close')) as HTMLButtonElement;
        closeButton.addEventListener('click', () => {
            this.closeModal(modal);
        })

        // 2. section 추가 이벤트
        const addButton = (modal.querySelector('.modal__add-button')) as HTMLButtonElement;
        addButton.addEventListener('click', () => {
            const title = modal.querySelector('#title') as HTMLInputElement;
            const url   = modal.querySelector('#url')   as HTMLInputElement;
            const body  = modal.querySelector('#body')  as HTMLInputElement;

            const sectionType = this.sectionMaker.sectionType;
            const sectionInfo: SectionInfo = (sectionType === 'IMAGE' || sectionType === 'VIDEO')
                ? { title: title.value, url: url.value } : { title: title.value, body: body.value };

            this.sectionButtonClickHandler(modal, sectionInfo);
        })
    }

    private makeTemplate = (): string => {
        return (`
            <button class="modal__close">𝖷</button>
            ${this.contentMaker.getModalContentTemplate()}
            <div class="modal__buttons">
                <button class="modal__add-button">추가</button>
            </div>
        `);
    }

    makeModalElement = (): HTMLDivElement => {
        const modal = document.createElement('div');
        modal.classList.add('modal__container');
        modal.innerHTML = this.makeTemplate();
        this.enrollModalEvents(modal);
        return modal;
    }
}
