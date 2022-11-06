import { Section } from "./sectionMaker.js";
class ImageSection extends Section {
    constructor(deleteSection) {
        super(deleteSection);
        this.makeSectionTemplate = (title, url) => {
            // <!-- https://picsum.photos/800/400 -->
            return (`
            <div class="image-area">
                <img src=${url} alt="section image">
            </div>
            <div class="title-area">
                <div class="section__title">${title}</div>
                <button class="section__close">𝘹</button>
            </div>
        `);
        };
    }
}
export default ImageSection;
//# sourceMappingURL=imageSection.js.map