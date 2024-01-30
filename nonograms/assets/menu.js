const getMenu = (menuClass, itemsArr, itemClass) => {
    const nav = document.createElement('nav');
    nav.classList.add(`${menuClass}`);

    const ul = document.createElement('ul');
    ul.classList.add(`${menuClass}-list`);

    itemsArr.forEach(v => {
        let li = document.createElement('li');
        li.classList.add(`${itemClass}`);

        if(v === 'Restart') li.classList.add('restart');
        if (Array.isArray(v)) {
            let underUl = document.createElement('ul');
            underUl.classList.add('dropItems');

            v.forEach((u, i) => {
                if( i === 0) li.innerText = u;
                let underLi = document.createElement('li');
                underLi.innerText = u;
                underUl.append(underLi);
            })

            li.append(underUl)
        } else {
            li.innerText = v;
        }

        ul.append(li)
    });

    nav.append(ul);
    return nav
}

export default getMenu