export class DragHandler {
    constructor(refreshList) {
        this.refreshList = refreshList;
        this.mimeType = "text/plain";
        this.dragStartHandler = (e) => {
            if (e.dataTransfer != null && e.target instanceof HTMLDivElement) {
                e.dataTransfer.setData(this.mimeType, e.target.id);
                e.target.classList.add('dragging');
            }
        };
        this.dragEndHandler = (e) => {
            if (e.target instanceof HTMLDivElement) {
                e.target.classList.remove('dragging');
            }
        };
        this.dragOverHandler = (e) => {
            e.preventDefault();
            if (e.dataTransfer != null && e.target instanceof HTMLDivElement) {
                e.dataTransfer.dropEffect = "move";
            }
        };
        this.getAfterElement = (container, elementId, targetY) => {
            const listExceptTarget = ([...container.querySelectorAll(`.section:not(#${elementId})`)]);
            const afterElement = listExceptTarget
                .filter(section => {
                const { height, y } = section.getBoundingClientRect();
                const offsetY = targetY - (y + (height / 2));
                return offsetY < 0;
            })[0];
            return afterElement;
        };
        this.dropHandler = (e) => {
            if (e.dataTransfer != null) {
                const container = e.target;
                const elementId = e.dataTransfer.getData(this.mimeType);
                e.dataTransfer.dropEffect = "move";
                if (container instanceof HTMLElement) {
                    const movedElement = document.getElementById(elementId);
                    const afterElement = this.getAfterElement(container, elementId, e.y);
                    afterElement
                        ? container.insertBefore(movedElement, afterElement)
                        : container.append(movedElement);
                    this.refreshList(); // 정렬뒤 인덱스 재정렬
                }
            }
        };
    }
}
//# sourceMappingURL=drag.js.map