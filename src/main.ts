import { MediaModal, ModalContentTemplateMaker, TextModal } from "./modals/modalTemplate.js";
import { ModalMaker, ImplModalMaker } from "./modals/modalMaker.js";
import { SectionMaker } from "./sections/sectionMaker.js";
import ImageSection from "./sections/imageSection.js";
import VideoSection from "./sections/videoSection.js";
import NoteSection  from "./sections/noteSection.js";
import TaskSection  from "./sections/taskSection.js";

// <interaction flow>
    // 1. 헤더의 버튼 클릭 ✓
    // 2. 클릭한 버튼에 따른 모달창 표출 ✓
        // 2.1 닫기 버튼 ✓
        // 2.2 값 입력 후 등록 누르면 섹션(+ 컨텐츠) 렌더링 ✓
    // 3. 각 섹션의 삭제버튼 ✓

interface Main {
    setIsModal: (isModal: boolean) => void;
    addSectionElement: (element: HTMLDivElement) => void;
    deleteSectionElement: (targetElement: HTMLDivElement) => void;
    init(): void;
}


class ImplMain implements Main {
    private list: Array<HTMLDivElement> = [];
    private isModal: boolean = false;

    private renderList = (list: Array<HTMLDivElement>): void => {
        const container = document.querySelector('.main__section-container') as HTMLDivElement;
        container.replaceChildren();
        list.forEach(section => container.append(section));
    }

    setIsModal = (isModal: boolean): void => {
        this.isModal = isModal;
    }

    addSectionElement = (sectionElement: HTMLDivElement): void => {
        this.list = [...this.list, sectionElement];
        const container = document.querySelector('.main__section-container') as HTMLDivElement;
        container.append(sectionElement)
    }

    deleteSectionElement = (sectionElement: HTMLDivElement): void => {
        this.list = [...this.list.filter(section => section !== sectionElement)];
        sectionElement.remove();
    }

    private modalEvent = (
        button: HTMLButtonElement,
        contentTemplateMaker: ModalContentTemplateMaker,
        sectionMaker: SectionMaker
    ): void => {
        button.addEventListener('click', () => {
            if (this.isModal) return;
            const body = (document.querySelector('body')) as HTMLBodyElement;
            const templateMaker: ModalMaker = new ImplModalMaker(
                contentTemplateMaker,
                sectionMaker,
                this.setIsModal,
                this.addSectionElement
            );
            body.append(templateMaker.makeModalElement());
            this.setIsModal(true);
        })
    }

    private enrollEvent = (): void => {
        const imageButton: HTMLButtonElement = (document.querySelector('#image-button')) as HTMLButtonElement;
        const videoButton: HTMLButtonElement = (document.querySelector('#video-button')) as HTMLButtonElement;
        const noteButton : HTMLButtonElement = (document.querySelector('#note-button'))  as HTMLButtonElement;
        const taskButton : HTMLButtonElement = (document.querySelector('#task-button'))  as HTMLButtonElement;

        const mediaModal: ModalContentTemplateMaker = new MediaModal();
        const textModal : ModalContentTemplateMaker = new TextModal();

        const imageSection: SectionMaker = new ImageSection(this.deleteSectionElement);
        const videoSection: SectionMaker = new VideoSection(this.deleteSectionElement);
        const noteSection : SectionMaker = new NoteSection(this.deleteSectionElement);
        const taskSection : SectionMaker = new TaskSection(this.deleteSectionElement);

        this.modalEvent(imageButton, mediaModal, imageSection);
        this.modalEvent(videoButton, mediaModal, videoSection);
        this.modalEvent(noteButton,  textModal,  noteSection);
        this.modalEvent(taskButton,  textModal,  taskSection);
    }

    init = (): void => {
        console.log('init');
        this.enrollEvent();
    }
}

const main = new ImplMain();
main.init();

