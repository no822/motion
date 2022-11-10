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
        this.isAppendWrongContainer = (childContainer) => {
            const sections = document.querySelectorAll('.section');
            return Array.from(sections)
                .map(section => section.contains(childContainer))
                .some(isChild => isChild);
        };
        this.getAfterElement = (container, elementId, targetY) => {
            const elementsExceptTarget = ([...container.querySelectorAll(`.section:not(#${elementId})`)]);
            const afterElements = elementsExceptTarget.filter(section => {
                const { height, y } = section.getBoundingClientRect();
                const offsetY = targetY - (y + (height / 2));
                return offsetY < 0;
            });
            return afterElements[0];
        };
        this.dropHandler = (e) => {
            if (e.dataTransfer != null && e.target instanceof HTMLElement) {
                const container = e.target;
                if (this.isAppendWrongContainer(container))
                    return;
                e.dataTransfer.dropEffect = "move";
                const elementId = e.dataTransfer.getData(this.mimeType);
                const movedElement = document.getElementById(elementId);
                const afterElement = this.getAfterElement(container, elementId, e.y);
                afterElement
                    ? container.insertBefore(movedElement, afterElement)
                    : container.append(movedElement);
                this.refreshList(); // 정렬뒤 인덱스 재정렬
            }
        };
    }
}
//# sourceMappingURL=drag.js.map