import { MediaModal, TextModal } from "./modals/modalTemplate.js";
import { ImplModalTemplate } from "./modals/modalWrapper.js";
class ImplMain {
    constructor() {
        this.list = [];
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
            if (this.modal)
                return;
            const templateMaker = new ImplModalTemplate(mediaModal);
            this.modal = templateMaker.makeModalElement();
            body.append(this.modal);
        });
        videoButton.addEventListener('click', () => {
            if (this.modal)
                return;
            const templateMaker = new ImplModalTemplate(mediaModal);
            this.modal = templateMaker.makeModalElement();
            body.append(this.modal);
        });
        noteButton.addEventListener('click', () => {
            if (this.modal)
                return;
            const templateMaker = new ImplModalTemplate(textModal);
            this.modal = templateMaker.makeModalElement();
            body.append(this.modal);
        });
        taskButton.addEventListener('click', () => {
            if (this.modal)
                return;
            const templateMaker = new ImplModalTemplate(textModal);
            this.modal = templateMaker.makeModalElement();
            body.append(this.modal);
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