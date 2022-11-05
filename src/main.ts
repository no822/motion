import {MediaModal, ModalContentTemplateMaker, TextModal} from "./modals/modalTemplate.js";
import { ModalMaker, ImplModalMaker } from "./modals/modalWrapper.js";

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
    // 1. 헤더의 버튼 클릭
    // 2. 클릭한 버튼에 따른 모달창 표출
        // 2.1 닫기 버튼
        // 2.2 값 입력 후 등록 누르면 섹션(+ 컨텐츠) 렌더링
    // 3. 각 섹션의 삭제버튼

type Modal = HTMLDivElement | undefined | null;

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

    private enrollEvent(): void {
        const body = (document.querySelector('body')) as HTMLBodyElement;
        const imageButton: HTMLButtonElement = (document.querySelector('#image-button')) as HTMLButtonElement;
        const videoButton: HTMLButtonElement = (document.querySelector('#video-button')) as HTMLButtonElement;
        const noteButton : HTMLButtonElement = (document.querySelector('#note-button')) as HTMLButtonElement;
        const taskButton : HTMLButtonElement = (document.querySelector('#task-button')) as HTMLButtonElement;

        const mediaModal: ModalContentTemplateMaker = new MediaModal();
        const textModal : ModalContentTemplateMaker = new TextModal();

        imageButton.addEventListener('click', () => {
            if (this.isModal) return;
            const templateMaker: ImplModalMaker = new ImplModalMaker(mediaModal, this.isModal);
            body.append(templateMaker.makeModalElement());
        })

        videoButton.addEventListener('click', () => {
            if (this.isModal) return;
            const templateMaker: ImplModalMaker = new ImplModalMaker(mediaModal, this.isModal);
            body.append(templateMaker.makeModalElement());
        })

        noteButton.addEventListener('click', () => {
            if (this.isModal) return;
            const templateMaker: ImplModalMaker = new ImplModalMaker(textModal, this.isModal);
            body.append(templateMaker.makeModalElement());
        })

        taskButton.addEventListener('click', () => {
            if (this.isModal) return;
            const templateMaker: ImplModalMaker = new ImplModalMaker(textModal, this.isModal);
            body.append(templateMaker.makeModalElement());
        })
    }

    init(): void {
        console.log('init');
        this.enrollEvent();
    }
}

const main = new ImplMain();
main.init();

