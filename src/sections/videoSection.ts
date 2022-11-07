import { Section, SectionType } from "./sectionMaker.js";

class VideoSection extends Section {
    public readonly sectionType: SectionType = 'VIDEO';
    private readonly defaultVideoId = 'u31qwQUeGuM';
    constructor(deleteSection: (targetElement: HTMLDivElement) => void) {
        super(deleteSection);
    }

    private getVideoId = (url: string): string => {
        const regExr = /(?:https?:\/\/)?(?:www.)?youtu.be\/([a-zA-Z0-9-_]{11})/;
        const match = url.match(regExr);
        if (match == null) throw new Error('Invalid Video Id Format!');
        return match[1];
    }

    private getTemplate = (title: string, videoId: string): string => {
        return (`
            <div class="video-area">
                <iframe 
                    src="https://www.youtube.com/embed/${videoId}" 
                    title="MOTION Image Section" 
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
            <div class="title-area">
                <div class="section__title">${(title.length === 0) ? this.defaultTitle : title}</div>
                <button class="section__close">𝘹</button>
            </div>
        `);
    }

    makeSectionTemplate = (title: string, url: string): string => {
        try {
            const videoId = this.getVideoId(url);
            return this.getTemplate(title, videoId);
        } catch(e) {
            return this.getTemplate(title, this.defaultVideoId);
        }
    }
}

export default VideoSection;