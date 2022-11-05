import { SectionMaker, Section } from "./sectionMaker.js";
import {SectionInfo} from "../modals/modalMaker.js";

class VideoSection extends Section {
    readonly html: string;

    constructor() {
        super();
        this.html = '<div></div>';
    }

    createSection = (modalInfo: SectionInfo): HTMLDivElement => {
        return document.createElement('div')
    }
}

export default VideoSection;