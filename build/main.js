import { MediaModal, TextModal } from "./modals/modalTemplate.js";
import { ImplModalMaker } from "./modals/modalWrapper.js";
class ImplMain {
    constructor() {
        this.list = [];
        this.isModal = false;
    }
    renderList() {
        // todo 추가, 삭제, 순서변경(+ 수정) 될때 호출되어야 한다
    }
    enrollEvent() {
        const body = (document.querySelector('body'));
        const imageButton = (document.querySelector('#image-button'));
        const videoButton = (document.querySelector('#video-button'));
        const noteButton = (document.querySelector('#note-button'));
        const taskButton = (document.querySelector('#task-button'));
        const mediaModal = new MediaModal();
        const textModal = new TextModal();
        imageButton.addEventListener('click', () => {
            if (this.isModal)
                return;
            const templateMaker = new ImplModalMaker(mediaModal, this.isModal);
            body.append(templateMaker.makeModalElement());
        });
        videoButton.addEventListener('click', () => {
            if (this.isModal)
                return;
            const templateMaker = new ImplModalMaker(mediaModal, this.isModal);
            body.append(templateMaker.makeModalElement());
        });
        noteButton.addEventListener('click', () => {
            if (this.isModal)
                return;
            const templateMaker = new ImplModalMaker(textModal, this.isModal);
            body.append(templateMaker.makeModalElement());
        });
        taskButton.addEventListener('click', () => {
            if (this.isModal)
                return;
            const templateMaker = new ImplModalMaker(textModal, this.isModal);
            body.append(templateMaker.makeModalElement());
        });
    }
    init() {
        console.log('init');
        this.enrollEvent();
    }
}
const main = new ImplMain();
main.init();
//# sourceMappingURL=main.js.map