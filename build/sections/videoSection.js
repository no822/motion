import { Section } from "./sectionMaker.js";
class VideoSection extends Section {
    constructor() {
        super();
        this.createSection = (modalInfo) => {
            return document.createElement('div');
        };
        this.html = '<div></div>';
    }
}
export default VideoSection;
//# sourceMappingURL=videoSection.js.map