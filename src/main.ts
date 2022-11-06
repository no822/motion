import { MediaModal, ModalContentTemplateMaker, TextModal } from "./modals/modalTemplate.js";
import { ModalMaker, ImplModalMaker } from "./modals/modalMaker.js";
import { SectionMaker } from "./sections/sectionMaker.js";
import ImageSection from "./sections/imageSection.js";
import VideoSection from "./sections/videoSection.js";
import NoteSection  from "./sections/noteSection.js";
import TaskSection  from "./sections/taskSection.js";

// - must have
    // - As a user, I want to add an image ✓
    // - As a user, I want to add YouTube video
    // - As a user, I want to add a note ✓
    // - As a user, I want to add Todolist ✓
    // - As a user, I want to delete sections

// < 스스로 고민해서 구현해보기 >

// <interaction flow>
    // 1. 헤더의 버튼 클릭 ✓
    // 2. 클릭한 버튼에 따른 모달창 표출 ✓
        // 2.1 닫기 버튼 ✓
        // 2.2 값 입력 후 등록 누르면 섹션(+ 컨텐츠) 렌더링 ✓
    // 3. 각 섹션의 삭제버튼

interface Main {
    toggleIsModal: (isModal: boolean) => void;
    addSectionElement: (element: HTMLDivElement) => void;
    init(): void;
}


class ImplMain implements Main {
    private list: Array<HTMLDivElement> = [];
    isModal: boolean = false;

    private renderList = (list: Array<HTMLDivElement>): void => {
        // todo 추가, 삭제, 순서변경(+ 수정) 될때 호출되어야 한다
        const container = document.querySelector('.main__section-container') as HTMLDivElement;
        list.forEach(section => {
            container.append(section);
        })
    }

    toggleIsModal = (isModal: boolean): void => {
        this.isModal = isModal;
    }

    addSectionElement = (sectionElement: HTMLDivElement): void => {
        this.list = [...this.list, sectionElement];
        this.renderList(this.list);
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
                this.toggleIsModal,
                this.addSectionElement
            );
            body.append(templateMaker.makeModalElement());
            this.isModal = true;
        })
    }

    private enrollEvent = (): void => {
        const imageButton: HTMLButtonElement = (document.querySelector('#image-button')) as HTMLButtonElement;
        const videoButton: HTMLButtonElement = (document.querySelector('#video-button')) as HTMLButtonElement;
        const noteButton : HTMLButtonElement = (document.querySelector('#note-button'))  as HTMLButtonElement;
        const taskButton : HTMLButtonElement = (document.querySelector('#task-button'))  as HTMLButtonElement;

        const mediaModal: ModalContentTemplateMaker = new MediaModal();
        const textModal : ModalContentTemplateMaker = new TextModal();

        const imageSection: SectionMaker = new ImageSection();
        const videoSection: SectionMaker = new VideoSection();
        const noteSection : SectionMaker = new NoteSection();
        const taskSection : SectionMaker = new TaskSection();

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

