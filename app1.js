const btn = document.querySelector('.btn-get-posts');
const btnAddPost = document.querySelector('.btn-add-post');
const container = document.querySelector('.container');

function getPosts (cb){ 
    const xhr = new XMLHttpRequest(); // создали экземпляр и получили методы
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts'); // делаем запрос на сервер по марштуру posts
    xhr.addEventListener('load', () => { // если событие load(успешно)
        const responce = JSON.parse(xhr.responseText); // преобразовываем ответ в формат JSON
        cb(responce);
    });


    xhr.addEventListener('error', () => {
        console.log('error'); //сообщить если общение с сервером прошло не успешно
    });

    xhr.send();
}

function createPost (body, cb) { // функция создания поста. на вход тело, которое хотим отправить и колбэк который хотим вызвать, когда придет ответ от сервера
    const xhr = new XMLHttpRequest(); // создали экземпляр и получили методы
    xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts'); // делаем запрос на сервер по марштуру posts c методоv post
    xhr.addEventListener('load', () => { // если событие load(успешно)
        const responce = JSON.parse(xhr.responseText); // преобразовываем ответ в формат JSON
        cb(responce);
    });

    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

    xhr.addEventListener('error', () => {
        console.log('error'); //сообщить если общение с сервером прошло не успешно
    });

    xhr.send(JSON.stringify(body)); // отправляем тело, которое в будущем отправится в новый созданный пост предварительно превратив в JSON
}


function cardTemplate (post) {  // создаем dom объект, наполняем его на осовании поста и возвращает его
    const card = document.createElement('div');
    card.classList.add('card');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = post.title; // добавляем title из запроса 
    const article = document.createElement('p');
    article.textContent = post.body; // аналогично с title
    article.classList.add('card-text');
    cardBody.appendChild(title);
    cardBody.appendChild(article);
    card.appendChild(cardBody); // добавялем к карточке все тело
    return card;
}


function renderPosts(responce) {
    const fragment = document.createDocumentFragment(); // создаем фрамент для вывода в него данных из запроса
        responce.forEach(post => {
            const card = cardTemplate(post);
            fragment.appendChild(card); //дальше все в фрагмент
        });
    container.appendChild(fragment);
}

btn.addEventListener('click', e => { // рендерим пост при нажатии
    getPosts(renderPosts); 
});

btnAddPost.addEventListener('click', e => { // при клике на кнопку
    const newPost = { //
        title: 'privet',
        body: 'drug',
        userId: 1,
    };// создаем новый объект поста
    createPost(newPost, responce => { // ф-ия создания поста, у которой на вход созданный новый объект поста и колбэк (responce), который должен выполниться когда получим ответ от сервера
        const card = cardTemplate(responce);
        container.insertAdjacentElement('afterbegin', card);
    });
});