import { Section } from "./sectionMaker.js";

class TaskSection extends Section {
    constructor(deleteSection: (targetElement: HTMLDivElement) => void) {
        super(deleteSection);
    }

    makeSectionTemplate = (title: string, body: string): string => {
        return (`
            <div class="title-area">
                <div class="section__title--container">
                    <div class="section__title">${title}</div>
                    <div class="section__task-container">
                        <input type="checkbox">
                        <div class="section__content">${body}</div>
                    </div>
                </div>
            </div>
            <button class="section__close">𝘹</button>
        `);
    }

}

export default TaskSection;