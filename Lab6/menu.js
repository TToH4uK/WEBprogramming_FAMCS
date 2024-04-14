const menu = document.getElementById('menu');

var MenuA = [
    {name:'Купить билет', submenu: 
        [ 
            {name: 'Заказать онлайн', submenu: 
                [ 
                    {name:'Партер', url: 'https://www.youtube.com/watch?v=lJ68RXUR1M8&t=1925s'},
                    {name:'Бельэтаж', url: 'https://www.youtube.com/watch?v=lJ68RXUR1M8&t=1925s'} 
                ] 
            }, 
            {name:'Приобрести у партнёров', submenu: 
                [ 
                    {name:'Крутые щенята', url: 'https://www.youtube.com/watch?v=lJ68RXUR1M8&t=1925s'},
                    {name:'Мощные птенчики', url: 'https://www.youtube.com/watch?v=lJ68RXUR1M8&t=1925s'},
                    {name:'Энергичные черепашки', url: 'https://www.youtube.com/watch?v=lJ68RXUR1M8&t=1925s'},
                    {name:'Стремительные совята', url: 'https://www.youtube.com/watch?v=lJ68RXUR1M8&t=1925s'} 
                ] 
            },
            {name:'Покупка по льготному тарифу', url: 'https://www.youtube.com/watch?v=lJ68RXUR1M8&t=1925s'}  
        ] 
    }, 
    {name: 'Мои билеты', url: 'https://www.youtube.com/watch?v=lJ68RXUR1M8&t=1925s'}, 
    {name:'Информация и услуги', submenu: 
        [ 
            {name:'Расписание выступлний', url: 'https://www.youtube.com/watch?v=lJ68RXUR1M8&t=1925s'}, 
            {name:'Где приобрести билет', url: 'https://www.youtube.com/watch?v=lJ68RXUR1M8&t=1925s'},
            {name:'Прочая информация', url: 'https://www.youtube.com/watch?v=lJ68RXUR1M8&t=1925s'} 
        ] 
    },
    {name:'О коллективе', submenu: 
    [ 
        {name:'История', url: 'https://www.youtube.com/watch?v=lJ68RXUR1M8&t=1925s'}, 
        {name:'Информация', url: 'https://www.youtube.com/watch?v=lJ68RXUR1M8&t=1925s'} 
    ] }
];
var firstLayer = true;

function ShowMenu(MenuItemsA, ParentElem) {
    ParentElem.style.display = 'flex';
    if(firstLayer)
    {
        ParentElem.style.flexDirection = 'row';
        ParentElem.style.justifyContent = 'center';
        
    }
    else{
        ParentElem.style.flexDirection = 'column';
    }
    for (var i = 0; i < MenuItemsA.length; i++) {
        var menuItem = MenuItemsA[i];
        var menuElement = document.createElement('div');
        menuElement.classList.add('menu-element');
        if(menuItem.url)
        {
            var link = document.createElement('a');
            link.setAttribute('href', menuItem.url);
            link.textContent = menuItem.name;
            menuElement.appendChild(link);
        }
        else{
            menuElement.textContent = menuItem.name;
        }       
        menuElement.style.fontSize = '20px';
        menuElement.style.backgroundColor = '#daebe8'; 
        menuElement.style.padding = '20px';
        menuElement.style.position = 'relative';
        if(firstLayer)
        {
            menuElement.style.border = 'solid';
            menuElement.style.marginRight = '10px';
            menuElement.style.borderRadius = '5px';
            menuElement.style.height = '25px';
            menuElement.style.paddingBottom = '20px';
        } else {
            menuElement.style.top = '5px';
            menuElement.style.borderLeft = 'solid';
            menuElement.style.borderColor = '#87bdd8';
            menuElement.style.borderWidth = '5px';
        }

        ParentElem.appendChild(menuElement);
        if (menuItem.submenu) {
            var submenuContainer = document.createElement('div');
            submenuContainer.classList.add('submenu-container');
            
            (function(currentMenuItem, currentElement, currentContainer) {
                currentElement.addEventListener('click', function(event) {
                    event.stopPropagation();
                    currentElement.appendChild(currentContainer);
                    currentContainer.style.display = 'block';
                    if(currentMenuItem.activeSubmenu) 
                    {
                        currentMenuItem.activeSubmenu = false;
                        currentContainer.style.display = 'none';
                        return;
                    }
                    currentMenuItem.activeSubmenu = true;
                    if(currentMenuItem.activated)
                    {
                        return;
                    }
                    if (currentContainer.style.display === 'block') {
                        currentContainer.style.position = 'relative';
                        currentContainer.style.top = '20px';
                    }
                    ShowMenu(currentMenuItem.submenu, currentContainer);
                    currentMenuItem.activated = true;                    
                });
                currentElement.addEventListener('mousemove', (event)=>
                {
                    event.stopPropagation();
                    currentElement.style.backgroundColor = '#cfe0e8';
                });
                currentElement.addEventListener('mouseout', (event)=>
                {
                    event.stopPropagation();
                    currentElement.style.backgroundColor = '#daebe8';
                });
            })(menuItem, menuElement, submenuContainer);
        }
        else{
            (function(currentElement){
                currentElement.addEventListener('mousemove', (event)=>
                {
                    event.stopPropagation();
                    currentElement.style.backgroundColor = '#cfe0e8';
                });
                currentElement.addEventListener('mouseout', (event)=>
                {
                    event.stopPropagation();
                    currentElement.style.backgroundColor = '#daebe8';
                });
            })(menuElement);
        }
    }
    firstLayer = false;
}

window.addEventListener("load", function()
{
    ShowMenu(MenuA, menu);
})

