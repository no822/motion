demo : https://no822.github.io/

### <Motion 프로젝트 계획>

  - 프로젝트 기능들 
    1. 기본 화면구성 ✓
       - header / main / footer ✓
       - 요소 추가 버튼 ✓
    2. 4가지 요소 추가 기능
        - video ✓
        - image ✓
        - todo ✓
        - note ✓
    3. 4가지 요소 삭제 기능 ✓
    4. 드래그 기능 ✓
    5. 4가지 요소 수정 기능 

---

   - 구현계획
     - must have
       - As a user, I want to add an image ✓
       - As a user, I want to add youtube video ✓
       - As a user, I want to add a note ✓
       - As a user, I want to add todo list ✓
       - As a user, I want to delete sections ✓
     - good to have
       - As a user, I want to reorder sections by dragging ✓
     - nice to have
       - As a user, I want to update sections
          
---

   - 어려웠던 부분 / 완성하지 못한 기능
     - 어려웠던 부분
       - HTML Drag and Drop API 관련
         - dragover 이벤트에 event.preventDefault()를 주었더니 드롭된 위치가 아니라 기존 위치정보를 반환하는 문제 때문에 고생했다.
         - 드래깅으로 섹션 리스트의 순서변경하는 기능 자체를 구현하는 데 애를 먹었다. Element.insertAdjacentElement()가 있다는 것을 구현 후에야 알게 되었다. 나는 Node.insertBefore()를 사용해서 구현하였다.
         - type narrowing: HTMLDivEement와 HTMLElement 일때 드래그의 동작이 미묘하게 달라졌다. **이부분은 지금도 왜 그런지 모르겠다.** *(찾아볼것..)* 
       - 기타
         - generic: 제네릭을 사용해서 개선을 할 수 있을 것 같은데 익숙하지 못해 거의 사용하지 못했다.
         - type SectionType은 두가지로 나누었으면 더 좋았을 것 같다. 
     - 완성하지 못한 기능
       - 섹션 내용 수정 기능
---

   - 더 공부할 것들
     - generic
     - Dom Element Types
     - typescript 문서
     - typescript 오픈소스 프로젝트 읽어보기
     - 타입 레벨로 생각하는 연습
