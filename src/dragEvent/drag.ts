export interface Drag {
    dragStartHandler: (e: DragEvent) => void;
    dragEndHandler: (e: DragEvent) => void;
    dragOverHandler: (e: DragEvent) => void;
    dropHandler: (e: DragEvent) => void;
}

export class DragHandler implements Drag {
    private readonly mimeType = "text/plain";
    constructor(private refreshList: () => Array<HTMLDivElement>) {}

    dragStartHandler = (e: DragEvent) => {
        if (e.dataTransfer != null && e.target instanceof HTMLDivElement) {
            e.dataTransfer.setData(this.mimeType, e.target.id);
            e.target.classList.add('dragging');
        }
    }

    dragEndHandler = (e: DragEvent) => {
        if (e.target instanceof HTMLDivElement) {
            e.target.classList.remove('dragging');
        }
    }

    dragOverHandler = (e: DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer != null && e.target instanceof HTMLDivElement) {
             e.dataTransfer.dropEffect = "move";
        }
    }

    private isAppendWrongContainer = (childContainer: HTMLElement): boolean => {
        const sections = document.querySelectorAll('.section');
        return Array.from(sections)
                .map(section => section.contains(childContainer))
                .some(isChild => isChild);
    }

    private getAfterElement = (container: HTMLElement, elementId: string, targetY: number): HTMLElement | null => {
        const elementsExceptTarget = ([...container.querySelectorAll(`.section:not(#${elementId})`)]) as Array<HTMLElement>;
        const afterElements = elementsExceptTarget.filter(section => {
            const { height, y } = section.getBoundingClientRect();
            const offsetY = targetY - (y + (height / 2));
            return offsetY < 0;
        });
        return afterElements[0];
    }

    dropHandler = (e: DragEvent) => {
        if (e.dataTransfer != null && e.target instanceof HTMLElement) {
            const container = e.target;
            if (this.isAppendWrongContainer(container)) return;

            e.dataTransfer.dropEffect = "move";
            const elementId = e.dataTransfer.getData(this.mimeType);
            const movedElement = document.getElementById(elementId) as HTMLElement;
            const afterElement = this.getAfterElement(container, elementId, e.y);

            afterElement
                ? container.insertBefore(movedElement, afterElement)
                : container.append(movedElement);

            this.refreshList(); // 정렬뒤 인덱스 재정렬
        }
    }
}