// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html,
//     котра має детальну інфорацію про об'єкт на який клікнули

// Стилизація проєкта -
// index.html - всі блоки з user - по 2 в рядок. кнопки/аосилвння розташувати під інформацією про user.
// Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно що це блоки (дати фон. марджини і тд)

async function printUsers(){
    let users = await fetch('https://jsonplaceholder.typicode.com/users')
        .then(value => value.json());
    let main = document.createElement('main')
    let wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')

    let h1 = document.createElement('h1')
    h1.innerText = 'Users List'
    wrapper.appendChild(h1)

    for (const user of users) {
        let div = document.createElement('div')
        div.setAttribute('id', `user-${user.id}`)
        div.setAttribute('class', 'user')

        let h3 = document.createElement('h3')
        h3.innerText = `ID${user.id}: ${user.name}`

        let button = document.createElement('button')
        button.innerText = 'Get user'

        button.onclick = () => {
            window.location.href = `../user-details/user-details.html?id=${user.id}`
        }

        div.append(h3, button)
        wrapper.appendChild(div)
    }
    main.appendChild(wrapper)
    document.body.appendChild(main)
}

printUsers()