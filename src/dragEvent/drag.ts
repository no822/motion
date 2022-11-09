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

    private getAfterElement = (container: HTMLElement, elementId: string, targetY: number): HTMLElement | null => {
        const listExceptTarget = ([...container.querySelectorAll(`.section:not(#${elementId})`)]) as Array<HTMLElement>;
        const afterElement = listExceptTarget
                .filter(section => {
                    const { height, y } = section.getBoundingClientRect();
                    const offsetY = targetY - (y + (height / 2));
                    return offsetY < 0;
                })[0];
        return afterElement;
    }

    dropHandler = (e: DragEvent) => {
        if (e.dataTransfer != null) {
            const container = e.target;
            const elementId = e.dataTransfer.getData(this.mimeType);
            e.dataTransfer.dropEffect = "move";

            if (container instanceof HTMLElement) {
                const movedElement = document.getElementById(elementId) as HTMLElement;
                const afterElement = this.getAfterElement(container, elementId, e.y);
                afterElement
                    ? container.insertBefore(movedElement, afterElement)
                    : container.append(movedElement);
                this.refreshList(); // 정렬뒤 인덱스 재정렬
            }
        }
    }
}