let myLibrary = [], id = 1;

//Get current library from local storage in JSON

myLibrary = JSON.parse(localStorage.getItem('lib'));


// myLibrary.push(new book('Властелин Колец','Толкин', 345, true));
// myLibrary.push(new book('Граф Монте Кристо','Агата Кристи',123, false));
// myLibrary.push(new book('Капитанская дочка','Пушкин',425, false));

// console.log(myLibrary);

// localStorage.setItem('lib',JSON.stringify(myLibrary));
// console.log(localStorage.getItem('lib'));

// book constructor
function book(title, author, pagesNum, read){
    
    if(typeof(title) != 'string' || typeof(author) != 'string' || typeof(pagesNum) != 'number' || typeof(read) != 'boolean'){
        console.log('Wrong input data');
        return false;
    } else {
       // console.log('book created');
    }
    this.title = title;
    this.author = author;
    this.pagesNum = pagesNum;
    this.read = read; 
    this.id = id;
    id++;
}


//print our lib in table
function renderLib(){
    document.querySelector('.libtable').innerHTML = `<tr>
        <th>Title</th>
        <th>Author</th>
        <th>Pages</th>
        <th>Readen</th>
        <th>Remove</th>
    </tr>`;
    for (let i in myLibrary){
       
        let tab = document.querySelector('.libtable');
        
        console.log(tab);
        let tr = document.createElement('tr');
        tab.appendChild(tr);

        let ttl = document.createElement('td');
        ttl.textContent = myLibrary[i].title;
        tr.appendChild(ttl);

        let auth = document.createElement('td');
        auth.textContent = myLibrary[i].author;
        tr.appendChild(auth);

        let pg = document.createElement('td');
        pg.textContent = myLibrary[i].pagesNum;
        tr.appendChild(pg);

        let rdn = document.createElement('td');
        let rdnbtn = document.createElement('input');
        rdnbtn.setAttribute('data-id',myLibrary[i].id);
        rdnbtn.type = 'button';
        rdnbtn.classList.add('btnyellow');
        if(myLibrary[i].read == true){
            rdnbtn.value = 'yes';
        } else {
            rdnbtn.value = 'no';
        }

        // add read status change on click
        rdnbtn.addEventListener('click',(e) => {       
            for (let j in myLibrary){
                if (myLibrary[j].id == rdnbtn.getAttribute('data-id')){
                    myLibrary[j].read = !myLibrary[j].read;
                    localStorage.setItem('lib', JSON.stringify(myLibrary));
                    if(rdnbtn.value == 'no'){
                        rdnbtn.value = 'yes';
                    } else {
                        rdnbtn.value = 'no';
                    }
                console.log(myLibrary);
                break;
                }
            }
        })

        tr.appendChild(rdn);
        rdn.appendChild(rdnbtn);

        

        let del = document.createElement('td');
        let dlbtn = document.createElement('input');
        dlbtn.type = 'button';
        dlbtn.value = 'delete';
        dlbtn.setAttribute('data-id',myLibrary[i].id);
        dlbtn.classList.add('btnred');
        tr.appendChild(del);
        del.appendChild(dlbtn);

        //delete book from lib on click event
        dlbtn.addEventListener('click', (e) => {
            for (let j in myLibrary){
                if (myLibrary[j].id == dlbtn.getAttribute('data-id')){
                myLibrary.splice(j,1); 
                localStorage.setItem('lib', JSON.stringify(myLibrary));   
                renderLib();
                break;
                }
            }
        })
        
        
    }

}

// add new books on buuton click

function addNewBook(){
    // add new element to our table
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pagesum = Number(document.querySelector('#pagesum').value);
    let checked = Boolean(document.querySelector('#readen').checked);
    
    if(title == '' || author == '' || pagesum == '' || Number.isNaN(pagesum)){
        alert('Not enouth data');
        return;
    }
    myLibrary.push(new book(title,author, pagesum, checked));
    localStorage.setItem('lib', JSON.stringify(myLibrary));
    renderLib();
    

    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pagesum').value = '';
    document.querySelector('#readen').checked = false;
}




renderLib();