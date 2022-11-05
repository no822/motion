import { SectionInfo } from "../modals/modalMaker.js";

// 3. section 등록 이벤트
    // 3.1 각 section에 알맞은 dom element를 생성
        // 각 section class마다 htmlString
        // 모달창의 입력값들을 해당 class에 전달
        // 전달한 값을 토대로 dom element 생성
    // 3.2 생성한 element를 .main__section-container에 append

export interface SectionMaker {
    // create, edit, delete
    readonly html: string;
    createSection(modalInfo: SectionInfo): HTMLDivElement;
}

export abstract class Section implements SectionMaker {
    abstract html: string;
    abstract createSection(modalInfo: SectionInfo): HTMLDivElement;
}


