//Методы HTTP запроса -GET, POST, PUT, DELETE
//CRUD-Create-POST. Read-Get, Update-PUT/PATCH, Delete-DELETE

//статусы кода
//100-199
//200-299
//300-399
//400-499
//500-599

const root=document.querySelector('#root')
const inputs =document.querySelector('input')

const urlBook='https://659c2c9ed565feee2dac95b0.mockapi.io/books/books'
const add=document.querySelector('button')

async function getBooks(){
    const res = await fetch(urlBook)
    const data = await res.json()
    console.log(data);
    renderBooks(data)
}
getBooks()

function renderBooks(arr){
    root.innerHTML=''
    arr.forEach(obj => {
        root.innerHTML+=`
        <div class="card">
            <div class='card-container'>
            <img  src="${obj.avatar}">
            <h5>${obj.author}</h5>
            <h5>${obj.name}</h5>
            <h5>${obj.language}</h5>
            <p>${obj.description}</p>
            <h5>${obj.price}</h5>

            
            <button onclick='delItem(${obj.id})'>delete</button>
            <button onclick='editItem(${obj.id})'>edit</button>
            
            </div>
        </div>
        `
    });
}

async function delItem (id){
    const res = await fetch(urlBook+'/'+id, {
        method:'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    const data = await res.json()
    console.log(data);
    alert('Tovar очурулду')
    getBooks()
}

async function addItem(){
    const res = await fetch(urlBook,{
        method:'POST',
        body: JSON.stringify({avatar:inputs[0].value, author:inputs[1].value, name:inputs[2].value, language:inputs[3].value, description:inputs[4].value, price:inputs[5].value    }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    getBooks()
}

add.onclick=()=>{
    addItem()
}

async function editItem(id){
    const surot=prompt('avatar')
    const aty = prompt('author')
    const atalyshy = prompt('name')
    const tili = prompt('language')
    const surotomo = prompt('description')
    const baasy = prompt('price')
    const item={
        avatar:surot,
        author:aty,
        name:atalyshy,
        language:tili,
        description:surotomo,
        price:baasy
    }
    const res = await fetch(urlBook+'/'+id, {
        method: 'PUT',
        body: JSON.stringify(item),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    })
    getBooks();
}