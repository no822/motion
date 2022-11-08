import { SectionInfo } from "../modals/modalMaker.js";

export type SectionType = 'IMAGE' | 'VIDEO' | 'NOTE' | 'TASK';

export interface SectionMaker {
    // create, edit, delete(private)
    readonly sectionType: SectionType;
    getSection(modalInfo: SectionInfo): HTMLDivElement;
}

export abstract class Section implements SectionMaker {
    readonly abstract sectionType: SectionType;
    readonly defaultTitle = '&lt;기본 타이틀&gt;';
    protected constructor(private deleteSection: (targetElement: HTMLDivElement) => void) {}

    abstract makeSectionTemplate(title: string, urlOrBody: string): string;

    private getSectionTemplate = (modalInfo: SectionInfo): string => {
        if (this.sectionType === 'IMAGE' || this.sectionType === 'VIDEO') {
            const { title, url } = modalInfo;
            const sectionTemplate = this.makeSectionTemplate(title, url as string);
            return sectionTemplate;

        }else {
            const { title, body } = modalInfo;
            const sectionTemplate = this.makeSectionTemplate(title, body as string);
            return sectionTemplate
        }
    }

    private getElementWithDeleteEvent = (element: HTMLDivElement): HTMLDivElement => {
        const deleteButton = element.querySelector('.section__close') as HTMLButtonElement;
        deleteButton.addEventListener('click', () => {
            this.deleteSection(element);
        });
        return element;
    }

    private createSection = (modalInfo: SectionInfo): HTMLDivElement => {
        const sectionTemplate = this.getSectionTemplate(modalInfo);
        const sectionContainer = document.createElement('div');
        sectionContainer.classList.add('section');
        sectionContainer.classList.add(this.sectionType);
        sectionContainer.innerHTML = sectionTemplate;
        return this.getElementWithDeleteEvent(sectionContainer);
    }

    getSection = (modalInfo: SectionInfo): HTMLDivElement => {
        const section = this.createSection(modalInfo);
        return section;
    };
}


