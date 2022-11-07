import { MediaModal, TextModal } from "./modals/modalTemplate.js";
import { ImplModalMaker } from "./modals/modalMaker.js";
import ImageSection from "./sections/imageSection.js";
import VideoSection from "./sections/videoSection.js";
import NoteSection from "./sections/noteSection.js";
import TaskSection from "./sections/taskSection.js";
class ImplMain {
    constructor() {
        this.list = [];
        this.isModal = false;
        this.renderList = (list) => {
            // todo 추가, 삭제, 순서변경(+ 수정) 될때 호출되어야 한다
            const container = document.querySelector('.main__section-container');
            container.replaceChildren();
            list.forEach(section => container.append(section));
        };
        this.setIsModal = (isModal) => {
            this.isModal = isModal;
        };
        this.addSectionElement = (sectionElement) => {
            this.list = [...this.list, sectionElement];
            this.renderList(this.list);
        };
        this.deleteSectionElement = (sectionElement) => {
            this.list = [...this.list.filter(section => section !== sectionElement)];
            this.renderList(this.list);
        };
        this.modalEvent = (button, contentTemplateMaker, sectionMaker) => {
            button.addEventListener('click', () => {
                if (this.isModal)
                    return;
                const body = (document.querySelector('body'));
                const templateMaker = new ImplModalMaker(contentTemplateMaker, sectionMaker, this.setIsModal, this.addSectionElement);
                body.append(templateMaker.makeModalElement());
                this.setIsModal(true);
            });
        };
        this.enrollEvent = () => {
            const imageButton = (document.querySelector('#image-button'));
            const videoButton = (document.querySelector('#video-button'));
            const noteButton = (document.querySelector('#note-button'));
            const taskButton = (document.querySelector('#task-button'));
            const mediaModal = new MediaModal();
            const textModal = new TextModal();
            const imageSection = new ImageSection(this.deleteSectionElement);
            const videoSection = new VideoSection(this.deleteSectionElement);
            const noteSection = new NoteSection(this.deleteSectionElement);
            const taskSection = new TaskSection(this.deleteSectionElement);
            this.modalEvent(imageButton, mediaModal, imageSection);
            this.modalEvent(videoButton, mediaModal, videoSection);
            this.modalEvent(noteButton, textModal, noteSection);
            this.modalEvent(taskButton, textModal, taskSection);
        };
        this.init = () => {
            console.log('init');
            this.enrollEvent();
        };
    }
}
const main = new ImplMain();
main.init();
//# sourceMappingURL=main.js.map