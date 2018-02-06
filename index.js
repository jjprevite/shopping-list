'use strict';

const STORE = [
    {name: 'apples', checked: false},
    {name: 'kale', checked: false},
    {name: 'orange juice', checked: false},
    {name: 'yogurt', checked: false}
];

function generateItemElement(item, itemIndex, template) {
    console.log('Creating shopping list items...');
    return `
    <li class="js-item-index-element" 
    data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
    console.log('Generating shopping list element...');
    const items = shoppingList.map((item, index) => generateItemElement(item, index));
    return items.join('');
}

function renderShoppingList() {
    console.log('Rendering shopping list for user...');
    const shoppingListItemsString = generateShoppingItemsString(STORE);
    $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
    console.log(`Adding "${itemName}" to shopping list`);
    STORE.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
    $('#js-shopping-list-form').submit(function (event) {
        event.preventDefault();
        console.log('Handling new item submit...');
        const newItemName = $('.js-shopping-list-entry').val();
        console.log(`New item name: ${newItemName}`);
        $('.js-shopping-list-entry').val('');
        addItemToShoppingList(newItemName);
        renderShoppingList();
    });
}

function toggleCheckedForListItem(itemIndex) {
    console.log(`Toggling checked property for item at index ${itemIndex}`);
    STORE[itemIndex].checked = !STORE[itemIndex].checked;
}

function deleteItemFromList(itemIndex) {
    console.log(`Deleting item at ${itemIndex}`);
    STORE.splice(itemIndex, 1);
}

function getItemIndexFromElement(item) {
    const itemIndexString = $(item).closest('.js-item-index-element').attr('data-item-index');
    return parseInt(itemIndexString , 10);
}

function handleItemCheckClicked() {
    $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
        console.log('Handling item check clicked...');
        const itemIndex = getItemIndexFromElement(event.currentTarget);
        toggleCheckedForListItem(itemIndex);
        renderShoppingList();
    });
}

function handleItemDeleteClicked() {
    $('.js-shopping-list').on('click', `.js-item-delete`, event => {
        console.log('Handling item delete clicked...');
        const itemIndex = getItemIndexFromElement(event.currentTarget);
        deleteItemFromList(itemIndex);
        renderShoppingList();
    });
}

function handleShoppingList() {
    renderShoppingList();
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleItemDeleteClicked();
}

$(handleShoppingList());
