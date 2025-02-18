var tabOrder = 0;
var tabs = document.querySelectorAll('.w-tab-link');
var tabContents = document.querySelectorAll('.w-tab-pane');

// Loop through each tab
tabs.forEach(tab => {
    var parent = tab.parentNode;
    let index = Array.prototype.indexOf.call(parent.children, tab);
    
    if (index == 0) {
        tabOrder = index;
    } else {
        tabOrder = index * 2;
    }
    
    tab.style.order = tabOrder;
});

// Loop through each tab content
tabContents.forEach(tabContent => {
    var parent = tabContent.parentNode;
    let index = Array.prototype.indexOf.call(parent.children, tabContent);
    
    if (index == 0) {
        tabOrder = index + 1;
    } else {
        tabOrder = (index * 2) + 1;
    }
    
    tabContent.style.order = tabOrder;
});