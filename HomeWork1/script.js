const initialItems = [
    { id: 1, name: 'Помідори', count: 2, bought: true },
    { id: 2, name: 'Печиво', count: 2, bought: false },
    { id: 3, name: 'Сир', count: 1, bought: false }
];

let items = [...initialItems];
let currentId = 4;

const itemsContainer = document.getElementById('items-container');
const newItemInput = document.getElementById('new-item-name');
const btnAddItem = document.getElementById('btn-add-item');
const leftToBuyContainer = document.getElementById('left-to-buy-container');
const boughtContainer = document.getElementById('bought-container');

function render() {
    itemsContainer.innerHTML = '';
    leftToBuyContainer.innerHTML = '';
    boughtContainer.innerHTML = '';

    items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'row';

        const nameWrapper = document.createElement('div');
        nameWrapper.style.flex = '1';

        if (!item.bought) {
            const nameSpan = document.createElement('span');
            nameSpan.className = 'item-name';
            nameSpan.innerText = item.name;
            nameSpan.setAttribute('data-tooltip', 'Натисніть, щоб редагувати');
            
            nameSpan.addEventListener('click', () => {
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'item-name-input';
                input.value = item.name;
                
                nameWrapper.innerHTML = '';
                nameWrapper.appendChild(input);
                input.focus();

                const saveName = () => {
                    const val = input.value.trim();
                    if (val) {
                        item.name = val;
                    }
                    render();
                };

                input.addEventListener('blur', saveName);
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') saveName();
                });
            });
            
            nameWrapper.appendChild(nameSpan);
        } else {
            const nameSpan = document.createElement('span');
            nameSpan.className = 'item-name is-bought';
            nameSpan.innerText = item.name;
            nameWrapper.appendChild(nameSpan);
        }

        const actions = document.createElement('div');
        actions.className = 'actions';

        if (!item.bought) {
            const btnMinus = document.createElement('button');
            btnMinus.className = 'btn-round red';
            btnMinus.innerText = '-';
            btnMinus.setAttribute('data-tooltip', 'Зменшити');
            if (item.count <= 1) btnMinus.disabled = true;
            btnMinus.addEventListener('click', () => {
                if (item.count > 1) {
                    item.count--;
                    render();
                }
            });

            const countBadge = document.createElement('span');
            countBadge.className = 'count-badge';
            countBadge.innerText = item.count;

            const btnPlus = document.createElement('button');
            btnPlus.className = 'btn-round green';
            btnPlus.innerText = '+';
            btnPlus.setAttribute('data-tooltip', 'Збільшити');
            btnPlus.addEventListener('click', () => {
                item.count++;
                render();
            });

            const btnStatus = document.createElement('button');
            btnStatus.className = 'btn-status grey';
            btnStatus.style.padding = '6px 12px';
            btnStatus.style.cursor = 'pointer';
            btnStatus.style.margin = '0 5px';
            btnStatus.innerText = 'Куплено';
            btnStatus.setAttribute('data-tooltip', 'Позначити як куплене');
            btnStatus.addEventListener('click', () => {
                item.bought = true;
                render();
            });

            const btnDelete = document.createElement('button');
            btnDelete.className = 'btn-round red icon';
            btnDelete.innerText = '✕';
            btnDelete.setAttribute('data-tooltip', 'Видалити');
            btnDelete.addEventListener('click', () => {
                items = items.filter(i => i.id !== item.id);
                render();
            });

            actions.appendChild(btnMinus);
            actions.appendChild(countBadge);
            actions.appendChild(btnPlus);
            actions.appendChild(btnStatus);
            actions.appendChild(btnDelete);
        } else {
            const countBadge = document.createElement('span');
            countBadge.className = 'count-badge';
            countBadge.innerText = item.count;

            const btnStatus = document.createElement('button');
            btnStatus.className = 'btn-status grey';
            btnStatus.style.padding = '6px 12px';
            btnStatus.style.cursor = 'pointer';
            btnStatus.style.margin = '0 5px';
            btnStatus.innerText = 'Не куплено';
            btnStatus.setAttribute('data-tooltip', 'Зробити не купленим');
            btnStatus.addEventListener('click', () => {
                item.bought = false;
                render();
            });

            actions.appendChild(countBadge);
            actions.appendChild(btnStatus);
        }

        row.appendChild(nameWrapper);
        row.appendChild(actions);
        itemsContainer.appendChild(row);

        const tag = document.createElement('span');
        tag.className = 'tag';
        
        if (!item.bought) {
            tag.innerHTML = `${item.name} <span class="tag-count">${item.count}</span>`;
            leftToBuyContainer.appendChild(tag);
        } else {
            tag.innerHTML = `<del>${item.name}</del> <span class="tag-count">${item.count}</span>`;
            boughtContainer.appendChild(tag);
        }
    });
}

function addItem() {
    const name = newItemInput.value.trim();
    if (name) {
        items.push({
            id: currentId++,
            name: name,
            count: 1,
            bought: false
        });
        newItemInput.value = '';
        newItemInput.focus();
        render();
    }
}

btnAddItem.addEventListener('click', addItem);
newItemInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addItem();
});

render();