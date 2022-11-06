export class Section {
    constructor() {
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
        this.parseInfo = (modalInfo) => {
            const sectionTemplate = this.getSectionTemplate(modalInfo);
            const sectionContainer = document.createElement('div');
            sectionContainer.classList.add('section');
            sectionContainer.innerHTML = sectionTemplate;
            return sectionContainer;
        };
        this.createSection = (modalInfo) => {
            const section = this.parseInfo(modalInfo);
            return section;
        };
    }
}
//# sourceMappingURL=sectionMaker.js.map