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

function renderPosts(responce) {
    const fragment = document.createDocumentFragment(); // создаем фрамент для вывода в него данных из запроса
        responce.forEach(post => {
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
            fragment.appendChild(card); //дальше все в фрагмент
        });
        container.appendChild(fragment);
}

btn.addEventListener('click', e => { // рендерим пост при нажатии
    getPosts(renderPosts); 
});