import { MediaModal, ModalContentTemplateMaker, TextModal } from "./modals/modalTemplate.js";
import { ModalMaker, ImplModalMaker } from "./modals/modalMaker.js";
import { SectionMaker } from "./sections/sectionMaker.js";
import ImageSection from "./sections/imageSection.js";
import VideoSection from "./sections/videoSection.js";
import NoteSection  from "./sections/noteSection.js";
import TaskSection  from "./sections/taskSection.js";

// - must have
    // - As a user, I want to add an image
    // - As a user, I want to add YouTube video
    // - As a user, I want to add a note
    // - As a user, I want to add Todolist
    // - As a user, I want to delete sections

// < 스스로 고민해서 구현해보기 >
// class diagram?
// <주요 actors 생각해보기>
    // 각 섹션(IMAGE / VIDEO / NOTE / TASK)
    // 2종류의 모달창
    // main - 어플리케이션 최초 실행
        // 버튼 이벤트 리스닝
        // 4가지 섹션 클래스
        // 2가지 모달 클래스

// <interaction flow>
    // 1. 헤더의 버튼 클릭 ✓
    // 2. 클릭한 버튼에 따른 모달창 표출 ✓
        // 2.1 닫기 버튼 ✓
        // 2.2 값 입력 후 등록 누르면 섹션(+ 컨텐츠) 렌더링
    // 3. 각 섹션의 삭제버튼

interface Main {
    list: Array<string>
    init(): void;
}


class ImplMain implements Main {
    list: Array<string> = [];
    isModal: boolean = false;

    private renderList(): void {
        // todo 추가, 삭제, 순서변경(+ 수정) 될때 호출되어야 한다
    }

    toggleIsModal = (isModal: boolean): void => {
        this.isModal = isModal;
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
                this.toggleIsModal
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

        this.modalEvent (imageButton, mediaModal, imageSection);
        this.modalEvent (videoButton, mediaModal, videoSection);
        this.modalEvent (noteButton,  textModal,  noteSection);
        this.modalEvent (taskButton,  textModal,  taskSection);
    }

    init = (): void => {
        console.log('init');
        this.enrollEvent();
    }
}

const main = new ImplMain();
main.init();

