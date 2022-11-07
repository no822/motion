import { Section, SectionType } from "./sectionMaker.js";

class TaskSection extends Section {
    public readonly sectionType: SectionType = 'TASK';
    private defaultBody = `&lt;${this.sectionType} 내용을 입력해 주세요.&gt;`;
    constructor(deleteSection: (targetElement: HTMLDivElement) => void) {
        super(deleteSection);
    }

    makeSectionTemplate = (title: string, body: string): string => {
        return (`
            <div class="title-area">
                <div class="section__title--container">
                    <div class="section__title">${(title.length === 0) ? this.defaultTitle : title}</div>
                    <div class="section__task-container">
                        <input type="checkbox">
                        <div class="section__content">${(body.length === 0) ? this.defaultBody : body}</div>
                    </div>
                </div>
            </div>
            <button class="section__close">𝘹</button>
        `);
    }
}

export default TaskSection;