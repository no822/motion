import { Section } from "./sectionMaker.js";
class NoteSection extends Section {
    constructor() {
        super();
        this.createSection = (modalInfo) => {
            return document.createElement('div');
        };
        this.html = '<div></div>';
    }
}
export default NoteSection;
//# sourceMappingURL=noteSection.js.map