import { Section } from "./sectionMaker.js";
class TaskSection extends Section {
    constructor() {
        super();
        this.createSection = (modalInfo) => {
            return document.createElement('div');
        };
        this.html = '<div></div>';
    }
}
export default TaskSection;
//# sourceMappingURL=taskSection.js.map