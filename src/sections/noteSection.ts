import { Section } from "./sectionMaker.js";

class NoteSection extends Section {
    makeSectionTemplate = (title: string, body: string): string => {
        return (`
             <div class="title-area">
                  <div class="section__title--container">
                      <div class="section__title">${title}</div>
                      <div class="section__title-content">${body}</div>
                  </div>
             </div>
             <button class="section__close">𝘹</button>
        `);
    }

}

export default NoteSection;