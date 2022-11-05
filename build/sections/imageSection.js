import { Section } from "./sectionMaker.js";
class ImageSection extends Section {
    constructor() {
        super();
        this.makeSectionTemplate = (title, url) => {
            return (`
            <!-- https://picsum.photos/800/400 -->
            <div class="image-area">
                <img src=${url} alt="section image">
            </div>
            <div class="title-area">
                <div class="section__title">${title}</div>
                <button class="section__close">𝘹</button >
            </div>
        `);
        };
        this.createSection = (modalInfo) => {
            // modalInfo와 htmlString을 적절하게 조합해서 dom element를 생성
            // 1. title, url(image)
            console.log(modalInfo);
            const { title, url } = modalInfo;
            const sectionTemplate = this.makeSectionTemplate(title, url);
            const sectionContainer = document.createElement('div');
            sectionContainer.classList.add('section');
            sectionContainer.innerHTML = sectionTemplate;
            return sectionContainer;
        };
        this.html = (`
            <section class="section">
                <!-- https://picsum.photos/800/400 -->
                <div class="image-area">
                    <img src="https://picsum.photos/800/500" alt="section image">
                </div>
                <div class="title-area">
                    <div class="section__title">title</div>
                    <button class="section__close">𝘹</button >
                </div>
            </section>
        `);
    }
}
export default ImageSection;
//# sourceMappingURL=imageSection.js.map