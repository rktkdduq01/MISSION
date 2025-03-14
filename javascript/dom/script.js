// let val;
// const list = document.querySelector('ul.list-group');
// const listItem = document.querySelector('li.list-group-item:first-child');

// val = listItem;
// val = list;

// // child nodes 반환
// val = list.childNodes;  // NodeList를 반환(line break도 포함됨-text로 나타남)
// // val = list.childNodes[0];
// // val = list.childNodes[0].nodeName;
// // val = list.childNodes[3].nodeType;

// // // nodeType
// // // 1 - Element
// // // 2 - Attribute (deprecated)
// // // 3 - Text node
// // // 8 - Comment   <!-- Comment Node -->
// // // 9 - Document itself
// // // 10 - Doctype

// // // children element nodes 반환
// // val = list.children; // HTML Collection을 반환(line break 포함X)
// // val = list.children[1];
// // list.children[1].textContent = 'Hi';

// // // First child
// // val = list.firstChild;
// // val = list.firstElementChild; //text node를 포함 X

// // // Last child
// // val = list.lastChild;
// // val = list.lastElementChild;

// // // child 요소 count
// // val = list.childElementCount;

// // // parent node 반환
// // val = listItem.parentNode;
// // val = listItem.parentElement;
// // val = listItem.parentElement.parentElement;

// // // next sibling 반환
// // val = listItem.nextSibling;
// // val = listItem.nextElementSibling.nextElementSibling.previousElementSibling;

// // // previous sibling 반환
// // val = listItem.previousSibling;
// // val = listItem.previousElementSibling;
// // console.log(val);


// // // DOM Collection 
// // for (let node of list.childNodes) {
// //     console.log(node); // 컬렉션 내의 모든 노드를 보여줍니다.
// // }

// // console.log(list.childNodes.filter) // undefined (filter 메서드가 없습니다.)

// console.log(Array.from(list.childNodes).filter) // 


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    const selectBtn = document.getElementById('select-btn');
    selectBtn.addEventListener('click', function() {
        const titleById = document.getElementById('main-title');
        const paragraphsByClass = document.getElementsByClassName('info-text');
        const listItemsByTag = document.getElementsByTagName('li');
        const firstSectionByQuery = document.querySelector('#selection-section');
        const allButtonsByQueryAll = document.querySelectorAll('button');

        titleById.classList.add('highlight');
        
        for(let p of paragraphsByClass) {
            p.classList.add('selected');
        }
        
        for(let item of listItemsByTag) {
            item.style.fontWeight = 'bold';
            item.style.color = '#3498db';
        }
        
        firstSectionByQuery.style.borderLeft = '5px solid #3498db';
        
        allButtonsByQueryAll.forEach((button, index) => {
            button.textContent = `버튼 ${index + 1}`;
        });

        setTimeout(() => {
            titleById.classList.remove('highlight');
            
            for(let p of paragraphsByClass) {
                p.classList.remove('selected');
            }
            
            for(let item of listItemsByTag) {
                item.style.fontWeight = '';
                item.style.color = '';
            }
            
            firstSectionByQuery.style.borderLeft = '';
            
            selectBtn.textContent = '요소 선택하기';
            document.getElementById('text-btn').textContent = '텍스트 변경';
            document.getElementById('html-btn').textContent = 'HTML 변경';
            document.getElementById('style-btn').textContent = '스타일 변경';
            document.getElementById('class-btn').textContent = '클래스 추가/제거';
            document.getElementById('attr-btn').textContent = '속성 변경';
            document.getElementById('create-btn').textContent = '요소 생성';
            document.getElementById('append-btn').textContent = '요소 추가';
            document.getElementById('remove-btn').textContent = '요소 삭제';
        }, 3000);
    });

    document.getElementById('text-btn').addEventListener('click', function() {
        const demoElement = document.getElementById('demo-element');
        demoElement.textContent = '텍스트 내용이 변경되었습니다!';
    });

    document.getElementById('html-btn').addEventListener('click', function() {
        const demoElement = document.getElementById('demo-element');
        demoElement.innerHTML = '<strong>HTML</strong>이 <em>변경</em>되었습니다!';
    });

    document.getElementById('style-btn').addEventListener('click', function() {
        const demoElement = document.getElementById('demo-element');
        demoElement.style.backgroundColor = '#e3f2fd';
        demoElement.style.color = '#1565c0';
        demoElement.style.padding = '15px';
        demoElement.style.borderRadius = '8px';
        demoElement.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    });

    document.getElementById('class-btn').addEventListener('click', function() {
        const demoElement = document.getElementById('demo-element');
        demoElement.classList.toggle('highlight');
        demoElement.classList.toggle('large-text');
    });

    document.getElementById('attr-btn').addEventListener('click', function() {
        const demoElement = document.getElementById('demo-element');

        if(demoElement.hasAttribute('data-status')) {
            const status = demoElement.getAttribute('data-status');
            if(status === 'active') {
                demoElement.setAttribute('data-status', 'inactive');
                demoElement.textContent = '상태: 비활성화';
            } else {
                demoElement.setAttribute('data-status', 'active');
                demoElement.textContent = '상태: 활성화';
            }
        } else {
            demoElement.setAttribute('data-status', 'active');
            demoElement.textContent = '상태: 활성화';
        }
    });

    let elementsCreated = 0;

    document.getElementById('create-btn').addEventListener('click', function() {
        const newElement = document.createElement('div');
        elementsCreated++;

        newElement.className = 'new-element';
        newElement.id = `element-${elementsCreated}`;
        newElement.textContent = `새로운 요소 ${elementsCreated}`;

        window.tempElement = newElement;
        alert(`새 요소가 생성되었습니다. '요소 추가' 버튼을 눌러 DOM에 추가하세요.`);
    });

    document.getElementById('append-btn').addEventListener('click', function() {
        const container = document.getElementById('element-container');

        if(window.tempElement) {
            container.appendChild(window.tempElement);
            window.tempElement = null;
        } else {
            const newElement = document.createElement('div');
            elementsCreated++;
            newElement.className = 'new-element';
            newElement.textContent = `새로 추가된 요소 ${elementsCreated}`;
            
            const firstChild = container.firstChild;
            container.insertBefore(newElement, firstChild);
        }
    });

    document.getElementById('remove-btn').addEventListener('click', function() {
        const container = document.getElementById('element-container');
        const elements = container.querySelectorAll('.new-element');
        
        if(elements.length > 0) {
            container.removeChild(elements[elements.length - 1]);
        } else {
            alert('삭제할 요소가 없습니다.');
        }
    });

    const eventDemo = document.getElementById('event-demo');
    const eventOutput = document.getElementById('event-output');

    eventDemo.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#e3f2fd';
        eventOutput.textContent = '이벤트 출력: 마우스가 요소 위에 있습니다.';
    });
    
    eventDemo.addEventListener('mouseout', function() {
        this.style.backgroundColor = '';
        eventOutput.textContent = '이벤트 출력: 마우스가 요소를 벗어났습니다.';
    });

    eventDemo.addEventListener('click', function(event) {
        this.style.backgroundColor = '#bbdefb';
        eventOutput.textContent = `이벤트 출력: 클릭 위치 - X: ${event.clientX}, Y: ${event.clientY}`;
    });

    document.addEventListener('keydown', function(event) {
        if(event.key === 'Escape') {
            eventOutput.textContent = '이벤트 출력: ESC 키가 눌렸습니다.';
        }
    });
});