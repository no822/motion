export class Section {
    constructor(deleteSection) {
        this.deleteSection = deleteSection;
        this.getSectionTemplate = (modalInfo) => {
            if (modalInfo.url != null) {
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
        this.getSection = (modalInfo) => {
            const sectionTemplate = this.getSectionTemplate(modalInfo);
            const sectionContainer = document.createElement('div');
            sectionContainer.classList.add('section');
            sectionContainer.innerHTML = sectionTemplate;
            return this.getElementWithDeleteEvent(sectionContainer);
        };
        this.createSection = (modalInfo) => {
            const section = this.getSection(modalInfo);
            return section;
        };
    }
}
//# sourceMappingURL=sectionMaker.js.map