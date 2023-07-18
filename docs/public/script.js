let navbar = document.createElement('nav')
navbar.innerHTML = '<ul id="nav-ul"><li class="nav-li"><a id="about-btn" href="/">ABOUT</a></li><li class="nav-li"><a id="projects-btn" href="/projects">PROJECTS</a></li><li class="nav-li"><a id="contact-btn" href="/contact">CONTACT</a></li><li class="nav-li"><a id="etc-btn" href="/etc">ETC</a></li></ul>'
let turtle = document.createElement('div')
turtle.setAttribute('id', 'turtle')
let hr = document.createElement('hr')
let display = document.getElementById('display')
let title = document.getElementById('title')

if (window.location.pathname === '/projects') {
  title.textContent = 'Projects | alegremrvn'
  display.appendChild(navbar)

  document.getElementById('about-btn').style.backgroundColor = '#333'
  document.getElementById('projects-btn').style.backgroundColor = '#555'

  let tags = new Set()
  for (let project of projectsData) {
    for (let tag of project.tags) {
      tags.add(tag)
    }
  }

  let tagsElement = document.createElement('div')
  tagsElement.setAttribute('class', 'tags')
  for (let tag of tags) {
    let tagElement = document.createElement('button')
    tagElement.setAttribute('id', tag)
    tagElement.textContent = tag

    tagsElement.appendChild(tagElement)
  }
  display.appendChild(tagsElement)

  let projectsElement = document.createElement('div')
  projectsElement.setAttribute('id', 'projects')
  for (let project of projectsData) {
    let projectElement = document.createElement('div')
    projectElement.setAttribute('class', 'project')

    let name = document.createElement('h3')
    name.textContent = project.projectName
    projectElement.appendChild(name)

    let ul = document.createElement('ul')
    for (let tag of project.tags) {
      let li = document.createElement('li')
      li.textContent = tag
      ul.appendChild(li)
    }
    projectElement.appendChild(ul)

    projectsElement.appendChild(projectElement)
  }
  display.appendChild(projectsElement)

  let filters = []
  let buttons = document.getElementsByTagName('button')
  for (let button of buttons) {
    button.addEventListener('click', (e) => {
      if (!filters.includes(button.getAttribute('id'))) {
        button.setAttribute('style', 'background-color: yellow;')
        filters.push(button.getAttribute('id'))
      } else {
        button.setAttribute('style', 'background-color: #e9e9ed;')
        let count = 0
        for (let tag of filters) {
          if (tag === e.target.getAttribute('id')) {
            filters.splice(count, 1)
            break
          }
          count++
        }
      }

      document.getElementById('projects').remove()
      hr.remove()
      turtle.remove()
      let projects = document.createElement('div')
      projects.setAttribute('id', 'projects')

      for (let proj of projectsData) {
        let count = 0
        for (let filter of filters) {
          if (proj.tags.includes(filter)) {
            count++
          }
        }
        if (count === filters.length) {
          let project = document.createElement('div')
          project.setAttribute('class', 'project')

          let projName = document.createElement('h3')
          projName.textContent = proj.projectName
          project.appendChild(projName)

          let projTags = document.createElement('ul')
          for (let tag of proj.tags) {
            let li = document.createElement('li')
            li.textContent = tag
            projTags.appendChild(li)
          }
          project.appendChild(projTags)

          projects.appendChild(project)
        }
      }

      display.append(projects)
      display.appendChild(hr)
      display.appendChild(turtle)
    })
  }

  display.appendChild(hr)
  display.appendChild(turtle)

} else if (window.location.pathname === '/contact') {
  let main = document.createElement('main')
  let email = document.createElement('p')
  let emaillink = document.createElement('a')
  emaillink.setAttribute('href', 'mailto:alegremrvn@protonmail.com')
  emaillink.textContent = 'alegremrvn@protonmail.com'
  email.appendChild(emaillink)
  main.appendChild(email)

  title.textContent = 'Contact | alegremrvn'
  display.appendChild(navbar)
  display.appendChild(main)
  display.appendChild(hr)
  display.appendChild(turtle)

  document.getElementById('about-btn').style.backgroundColor = '#333'
  document.getElementById('contact-btn').style.backgroundColor = '#555'

} else if (window.location.pathname === '/etc') {
  title.textContent = 'Etc | alegremrvn'
  display.appendChild(navbar)
  display.appendChild(turtle)

  document.getElementById('about-btn').style.backgroundColor = '#333'
  document.getElementById('etc-btn').style.backgroundColor = '#555'

} else {
  let main = document.createElement('main')
  let error = document.createElement('p')
  error.textContent = 'Not Found'
  main.appendChild(error)

  title.textContent = '404 | alegremrvn'
  display.appendChild(navbar)
  display.appendChild(main)
  display.appendChild(hr)
  display.appendChild(turtle)

  document.getElementById('about-btn').style.backgroundColor = '#333'
}
