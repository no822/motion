import { SectionInfo } from "../modals/modalMaker.js";

// 3. section 등록 이벤트
    // 3.1 각 section에 알맞은 dom element를 생성
        // 각 section class마다 htmlString
        // 모달창의 입력값들을 해당 class에 전달
        // 전달한 값을 토대로 dom element 생성
    // 3.2 생성한 element를 .main__section-container에 append

export interface SectionMaker {
    // create, edit, delete
    createSection(modalInfo: SectionInfo): HTMLDivElement;
}

export abstract class Section implements SectionMaker {
    abstract makeSectionTemplate(title: string, urlOrBody: string): string;

    private getSectionTemplate = (modalInfo: SectionInfo): string => {
        if (modalInfo.url != null) {
            const { title, url } = modalInfo;
            const sectionTemplate = this.makeSectionTemplate(title, url as string);
            return sectionTemplate;
        }else {
            const { title, body } = modalInfo;
            const sectionTemplate = this.makeSectionTemplate(title, body as string);
            return sectionTemplate
        }
    }

    protected parseInfo = (modalInfo: SectionInfo): HTMLDivElement => {
        const sectionTemplate = this.getSectionTemplate(modalInfo);
        const sectionContainer = document.createElement('div');
        sectionContainer.classList.add('section');
        sectionContainer.innerHTML = sectionTemplate;
        return sectionContainer;
    }

    createSection = (modalInfo: SectionInfo): HTMLDivElement => {
        const section = this.parseInfo(modalInfo);
        return section;
    };
}


