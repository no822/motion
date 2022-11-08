export class Section {
    constructor(deleteSection) {
        this.deleteSection = deleteSection;
        this.defaultTitle = '&lt;기본 타이틀&gt;';
        this.getSectionTemplate = (modalInfo) => {
            if (this.sectionType === 'IMAGE' || this.sectionType === 'VIDEO') {
                const { title, url } = modalInfo;
                const sectionTemplate = this.makeSectionTemplate(title, url);
                return sectionTemplate;
            }
            else {
                const { title, body } = modalInfo;
                const sectionTemplate = this.makeSectionTemplate(title, body);
                return sectionTemplate;
            }
        };
        this.getElementWithDeleteEvent = (element) => {
            const deleteButton = element.querySelector('.section__close');
            deleteButton.addEventListener('click', () => {
                this.deleteSection(element);
            });
            return element;
        };
        this.createSection = (modalInfo) => {
            const sectionTemplate = this.getSectionTemplate(modalInfo);
            const sectionContainer = document.createElement('div');
            sectionContainer.classList.add('section');
            sectionContainer.classList.add(this.sectionType);
            sectionContainer.innerHTML = sectionTemplate;
            return this.getElementWithDeleteEvent(sectionContainer);
        };
        this.getSection = (modalInfo) => {
            const section = this.createSection(modalInfo);
            return section;
        };
    }
}
//# sourceMappingURL=sectionMaker.js.map