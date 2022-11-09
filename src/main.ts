import { MediaModal, TextModal, ModalContentTemplateMaker } from "./modals/modalTemplate.js";
import { ModalMaker, ImplModalMaker } from "./modals/modalMaker.js";
import { SectionMaker } from "./sections/sectionMaker.js";
import ImageSection from "./sections/imageSection.js";
import VideoSection from "./sections/videoSection.js";
import NoteSection  from "./sections/noteSection.js";
import TaskSection  from "./sections/taskSection.js";
import { Drag, DragHandler } from "./dragEvent/drag.js";

// <interaction flow>
    // 1. 헤더의 버튼 클릭 ✓
    // 2. 클릭한 버튼에 따른 모달창 표출 ✓
        // 2.1 닫기 버튼 ✓
        // 2.2 값 입력 후 등록 누르면 섹션(+ 컨텐츠) 렌더링 ✓
    // 3. 각 섹션의 삭제버튼 ✓

// - good to have
    // - As a user, I want to reorder sections by dragging ✓

interface Main {
    init(): void;
}

class ImplMain implements Main {
    private list: Array<HTMLDivElement> = [];
    private isModal: boolean = false;

    private syncList = () => {
        const container = document.querySelector('.main__section-container') as HTMLDivElement;
        const list: Array<HTMLDivElement> = Array.from(container.querySelectorAll('.section'));
        this.list = list;
    }

    private setListIndex = () => {
        this.list.forEach((section, index) => {
            section.setAttribute('id', `section_${(index + 1)}`);
        })
        return this.list;
    }

    private refreshList = () => {
        // list 순서가 변경 후 인덱스 재정렬
        this.syncList();
        return this.setListIndex();
    }

    private setIsModal = (isModal: boolean): void => {
        this.isModal = isModal;
    }

    private addSectionElement = (sectionElement: HTMLDivElement): void => {
        const index: string = (this.list.length + 1).toString();
        sectionElement.setAttribute('id', `section_${index}`);
        this.list = [...this.list, sectionElement];
        const container = document.querySelector('.main__section-container') as HTMLDivElement;
        container.append(sectionElement);
    }

    private deleteSectionElement = (sectionElement: HTMLDivElement): void => {
        this.list = [...this.list.filter(section => section !== sectionElement)];
        this.setListIndex();
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

    private dropEvent = (drag: Drag): void => {
        const container = document.querySelector('main.main__section-container') as HTMLElement;
        container.addEventListener('dragover', drag.dragOverHandler);
        container.addEventListener('drop', drag.dropHandler);
    }

    private enrollEvent = (): void => {
        const imageButton: HTMLButtonElement = (document.querySelector('#image-button')) as HTMLButtonElement;
        const videoButton: HTMLButtonElement = (document.querySelector('#video-button')) as HTMLButtonElement;
        const noteButton : HTMLButtonElement = (document.querySelector('#note-button'))  as HTMLButtonElement;
        const taskButton : HTMLButtonElement = (document.querySelector('#task-button'))  as HTMLButtonElement;

        const mediaModal: ModalContentTemplateMaker = new MediaModal();
        const textModal : ModalContentTemplateMaker = new TextModal();

        const dragEvent: Drag = new DragHandler(this.refreshList);

        const imageSection: SectionMaker = new ImageSection(this.deleteSectionElement, dragEvent);
        const videoSection: SectionMaker = new VideoSection(this.deleteSectionElement, dragEvent);
        const noteSection : SectionMaker = new NoteSection(this.deleteSectionElement,  dragEvent);
        const taskSection : SectionMaker = new TaskSection(this.deleteSectionElement,  dragEvent);

        this.dropEvent(dragEvent);

        this.modalEvent(imageButton, mediaModal, imageSection);
        this.modalEvent(videoButton, mediaModal, videoSection);
        this.modalEvent(noteButton,  textModal,  noteSection);
        this.modalEvent(taskButton,  textModal,  taskSection);

    }

    init = (): void => {
        console.log('init!');
        this.enrollEvent();
    }
}

const main: Main = new ImplMain();
main.init();

