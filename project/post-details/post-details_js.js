// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули.
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста
// (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

// post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.
// Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно що це
// блоки (дати фон. марджини і тд)

let url = new URL(location.href)

let parameter = url.searchParams.get('id')

async function printPost() {
    let post = await fetch(`https://jsonplaceholder.typicode.com/posts/${parameter}`)
        .then(post => post.json())

    let main = document.createElement('main')

    let section1 = document.createElement('section')
    section1.classList.add('block-post')

    let section2 = document.createElement('section')
    section2.classList.add('block-comments')

    let div = document.createElement('div')
    div.classList.add('post')

    let buttonDiv = document.createElement('div')
    buttonDiv.setAttribute('class', 'container-button')

    let button = document.createElement('button')
    button.innerText = 'Get comments'

    let hide = document.createElement('button')
    hide.innerText = 'Hide comments'

    let userId = document.createElement('p')
    let id = document.createElement('p')
    let title = document.createElement('h4')
    let body = document.createElement('p')

    userId.innerText = `userId: ${post.userId}`
    id.innerText = `id: ${post.id}`
    title.innerText = `title: ${post.title}`
    body.innerText = post.body

    button.addEventListener('click', async () => {
        let comments = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
            .then(comments => comments.json())


        let commentsDiv = document.createElement('div')
        commentsDiv.classList.add('wrapper')

        let hide = document.createElement('button')
        hide.innerText = 'Hide comments'

        let h1 = document.createElement('h1')
        h1.innerText = 'Post comments'


        let flag = true;
        hide.addEventListener('click', () => {
            console.log(flag)
            section2.style.display = flag ? 'none' : 'block';
            hide.innerText = flag ? 'Get comments' : 'Hide comments'
            flag = !flag;
        })

        button.style.display = 'none'

        for (const comment of comments) {
            let commentDiv = document.createElement('div')
            commentDiv.classList.add('comment')

            let span1 = document.createElement('span')
            span1.classList.add('name-paragraphs')

            let span2 = document.createElement('span')
            span2.classList.add('email-paragraphs')

            let commentNameKey = document.createElement('p')
            commentNameKey.innerText = 'name:'

            let commentEmailKey = document.createElement('p')
            commentEmailKey.innerText = 'email:'

            let postID = document.createElement('p')
            let commentId = document.createElement('p')
            let commentName = document.createElement('p')
            let commentEmail = document.createElement('p')
            let commentBody = document.createElement('p')

            postID.innerText = `postId: ${comment.postId}`
            postID.classList.add('postId')

            commentId.innerText = `id: ${comment.id}`
            commentId.classList.add('comment-id')

            commentName.innerText = comment.name
            commentName.classList.add('name')

            commentEmail.innerText = comment.email
            commentEmail.classList.add('email')

            commentBody.innerText = `body: ${comment.body}`
            commentBody.classList.add('body')

            buttonDiv.appendChild(hide)

            span1.append(commentNameKey, commentName)
            span2.append(commentEmailKey, commentEmail)

            commentDiv.append(postID, commentId, span1, span2, commentBody)
            commentsDiv.appendChild(commentDiv)
            section2.append(h1, commentsDiv)
            main.appendChild(section2)
        }

    })
    buttonDiv.appendChild(button)
    div.append(userId, id, title, body, buttonDiv)
    section1.append(div)
    main.append(section1)
    document.body.appendChild(main)

}

printPost()