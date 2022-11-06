import { Section } from "./sectionMaker.js";
class VideoSection extends Section {
    constructor() {
        super(...arguments);
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
export default VideoSection;
//# sourceMappingURL=videoSection.js.map