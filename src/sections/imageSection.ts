import { Section, SectionType } from "./sectionMaker.js";

class ImageSection extends Section {
    public readonly sectionType: SectionType = 'IMAGE';
    private readonly defaultImageUrl = 'https://via.placeholder.com/500x300.png?text=Please+Input+Valid+Image+Url';
    constructor(deleteSection: (targetElement: HTMLDivElement) => void) {
        super(deleteSection);
    }

    private validateUrl = (url: string): string => {
        const regExr = /(?:https?:\/\/)?(?:www.)?[a-zA-Z0-9.]+(\/[a-zA-Z0-9_-]+(.jpg|.png|.jpeg)?)/;
        if (!url.match(regExr)) throw new Error('Invalid Url Format!');
        return url[0];
    }

    private getTemplate = (title: string, url: string): string => {
        return (`
            <div class="image-area">
                <img src=${url} alt="section image">
            </div>
            <div class="title-area">
                <div class="section__title">${(title.length === 0) ? this.defaultTitle : title}</div>
                <button class="section__close">𝘹</button>
            </div>
        `);
    }

    makeSectionTemplate = (title: string, url: string): string => {
        try {
            this.validateUrl(url);
            return this.getTemplate(title, url);
        } catch(e) {
            return this.getTemplate(title, this.defaultImageUrl);
        }
    }
}

export default ImageSection;