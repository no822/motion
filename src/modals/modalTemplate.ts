export interface ModalContentTemplateMaker {
    getModalContentTemplate(): string;
}

export class MediaModal implements ModalContentTemplateMaker {
    // (title, url)
    getModalContentTemplate= (): string => {
       return (`
            <div class="modal__input">
                <label for="title" class="modal__input-label">title</label>
                <input type="text" id="title" />
            </div>
            <div class="modal__input">
                <label for="url" class="modal__input-label">url</label>
                <input type="text" id="url" />
            </div>
       `);
    }
}

export class TextModal implements ModalContentTemplateMaker {
    // (title, body)
    getModalContentTemplate= (): string => {
        return (`
            <div class="modal__input">
                <label for="title" class="modal__input-label">title</label>
                <input type="text" id="title"/>
            </div>
            <div class="modal__input">
                <label for="body" class="modal__input-label">body</label>
                <textarea rows="2" cols="30" id="body"></textarea>
            </div>
        `);
    }
}