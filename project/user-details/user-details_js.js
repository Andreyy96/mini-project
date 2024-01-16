// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html,
// котра має детальну інфу про поточний пост.

// Стилизація проєкта -
// user-details.html - блок з інфою про user зверху сторінки. Кнопка нижчє, на 90% ширини сторінки, по центру.
// блоки з короткою іфною про post - в ряд по 5 .
// Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно що це блоки (дати фон. марджини і тд)

let url = new URL(location.href)

let parameter = url.searchParams.get('id')

async function printDetails() {
    let user = await fetch(`https://jsonplaceholder.typicode.com/users/${parameter}`)
        .then(user => user.json())

    let main = document.createElement('main');

    let infoDiv = document.createElement('div')
    infoDiv.classList.add('block-info-user')

    let button = document.createElement('button')
    button.innerText = 'post of current user'

    let id = document.createElement('p')
    id.setAttribute('id', 'id')
    id.classList.add('user-info')
    id.innerText = `id: ${user.id}`

    let name = document.createElement('p')
    name.setAttribute('id', 'name')
    name.classList.add('user-info')
    name.innerText = `name: ${user.name}`

    let username = document.createElement('p')
    username.setAttribute('id', 'username')
    username.classList.add('user-info')
    username.innerText = `username: ${user.username}`

    let email = document.createElement('p')
    email.setAttribute('id', 'email')
    email.classList.add('user-info')
    email.innerText = `email: ${user.email}`

    let address = document.createElement('p')
    address.setAttribute('id', 'address')
    address.classList.add('firstObj', 'user-info')
    address.innerText = `address:`

    let street = document.createElement('p')
    street.setAttribute('id', 'street')
    street.classList.add('element-firstObj')
    street.innerText = `street: ${user.address.street}`

    let suite = document.createElement('p')
    suite.setAttribute('id', 'suite')
    suite.classList.add('element-firstObj')
    suite.innerText = `suite: ${user.address.suite}`

    let city = document.createElement('p')
    city.setAttribute('id', 'city')
    city.classList.add('element-firstObj')
    city.innerText = `city: ${user.address.city}`

    let zipcode = document.createElement('p')
    zipcode.setAttribute('id', 'zipcode')
    zipcode.classList.add('element-firstObj')
    zipcode.innerText = `zipcode: ${user.address.zipcode}`

    let geo = document.createElement('p')
    geo.setAttribute('id', 'geo')
    geo.classList.add('element-firstObj', 'secondObj')
    geo.innerText = `geo:`

    let lat = document.createElement('p')
    lat.setAttribute('id', 'lat')
    lat.classList.add('element-secondObj')
    lat.innerText = `lat: ${user.address.geo.lat}`

    let lng = document.createElement('p')
    lng.setAttribute('id', 'lng')
    lng.classList.add('element-secondObj')
    lng.innerText = `lng: ${user.address.geo.lng}`

    let phone = document.createElement('p')
    phone.setAttribute('id', 'phone')
    phone.classList.add('user-info')
    phone.innerText = `phone: ${user.phone}`

    let website = document.createElement('p')
    website.setAttribute('id', 'website')
    website.classList.add('user-info')
    website.innerText = `website: ${user.website}`

    let company = document.createElement('p')
    company.setAttribute('id', 'company')
    company.classList.add('firstObj', 'user-info')
    company.innerText = `company:`

    let companyName = document.createElement('p')
    companyName.setAttribute('id', 'companyName')
    companyName.classList.add('element-firstObj')
    companyName.innerText = `name: ${user.company.name}`

    let catchPhrase = document.createElement('p')
    catchPhrase.setAttribute('id', 'catchPhrase')
    catchPhrase.classList.add('element-firstObj')
    catchPhrase.innerText = `catchPhrase: ${user.company.catchPhrase}`

    let bs = document.createElement('p')
    bs.setAttribute('id', 'bs')
    bs.classList.add('element-firstObj')
    bs.innerText = `bs: ${user.company.bs}`

    button.onclick = async () => {
        let posts = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
            .then(posts => posts.json())

        let div = document.createElement('div')
        div.setAttribute('class', 'wrapper')
        for (const post of posts) {
            let postDiv = document.createElement('div')
            postDiv.setAttribute('class', 'post')

            let h4 = document.createElement('h4')
            let postButton = document.createElement('button')
            h4.innerText = post.title

            postButton.innerText = 'get post'

            postButton.onclick = () => {
                window.location.href = `../post-details/post-details.html?id=${post.id}`
            }

            button.setAttribute('disabled', '');

            postDiv.append(h4, postButton)
            div.appendChild(postDiv)
            main.appendChild(div)
        }
    }
    infoDiv.append(id, name, username, email, address, street, suite, city, zipcode, geo, lat, lng, phone, website, company, companyName, catchPhrase, bs)
    main.append(infoDiv, button)
    document.body.appendChild(main)
}

printDetails()
