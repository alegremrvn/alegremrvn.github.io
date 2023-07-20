let body = document.body
let projectDisplay = document.createElement('div')
projectDisplay.setAttribute('id', 'project-display')
let navbar = document.createElement('nav')
let fn = (nav) => {
  let projectButton = document.createElement('a')
  projectButton.setAttribute('href', '#')
  projectButton.setAttribute('tabindex', 2)
  projectButton.setAttribute('id', 'about-btn')
  projectButton.textContent = 'PROJECTS'
  nav.appendChild(projectButton)

  let aboutButton = document.createElement('a')
  aboutButton.setAttribute('href', '/')
  aboutButton.setAttribute('tabindex', 1)
  aboutButton.setAttribute('id', 'projects-btn')
  aboutButton.textContent = 'ABOUT'
  nav.appendChild(aboutButton)

  let icon = document.createElement('i')
  icon.setAttribute('class', 'fa fa-caret-down')

  let dropDown = document.createElement('a')
  dropDown.setAttribute('href', 'javascript:void(0)')
  dropDown.setAttribute('class', 'icon')
  dropDown.setAttribute('onclick', 'myFunction()')
  dropDown.appendChild(icon)
}
fn(navbar)
let turtle = document.createElement('div')
turtle.setAttribute('id', 'turtle')
let hr = document.createElement('hr')
let title = document.getElementById('title')

if (window.location.pathname === '/projects') {
  title.textContent = 'Projects | alegremrvn'
  body.appendChild(navbar)
  body.appendChild(projectDisplay)

  document.getElementById('about-btn').style.backgroundColor = '#333'
  document.getElementById('projects-btn').style.backgroundColor = '#555'

  let tagsCount = {}
  let tags = new Set()
  for (let project of projectsData) {
    for (let tag of project.tags) {
      if (tagsCount[tag]) {
        tagsCount[tag]++
      } else {
        tagsCount[tag] = 1
      }

      tags.add(tag)
    }
  }

  let tagsCountSorted = []
  for (let tag in tagsCount) {
    let pair = []
    pair.push(tag)
    pair.push(tagsCount[tag])
    tagsCountSorted.push(pair)
  }
  tagsCountSorted.sort((a, b) => b[1] - a[1])

  // build initial project list
  let tagsElement = document.createElement('div')
  tagsElement.setAttribute('class', 'tags')
  for (let tag of tagsCountSorted) {
    let tagElement = document.createElement('button')
    tagElement.setAttribute('id', tag[0])
    tagElement.textContent = tag[0] + ' ' + tag[1]

    tagsElement.appendChild(tagElement)
  }
  projectDisplay.appendChild(tagsElement)

  let projectsElement = document.createElement('div')
  projectsElement.setAttribute('id', 'projects')
  for (let project of projectsData) {
    let projectElement = document.createElement('div')
    projectElement.setAttribute('class', 'project')

    let name = document.createElement('h3')
    name.textContent = project.projectName
    projectElement.appendChild(name)

    let description = document.createElement('p')
    description.textContent = project.description
    projectElement.appendChild(description)

    let repo = document.createElement('a')
    let githubIcon = document.createElement('i')
    githubIcon.setAttribute('class', 'fa fa-brand fa-github')
    repo.appendChild(githubIcon)
    repo.setAttribute('href', project.repo)
    repo.setAttribute('class', 'project-link')
    projectElement.appendChild(repo)

    let url = document.createElement('a')
    let urlIcon = document.createElement('i')
    urlIcon.setAttribute('class', 'fa-solid fa-link')
    url.appendChild(urlIcon)
    url.setAttribute('href', project.url)
    url.setAttribute('class', 'project-link')
    projectElement.appendChild(url)

    let ul = document.createElement('ul')
    for (let tag of project.tags) {
      let li = document.createElement('li')
      let a = document.createElement('a')
      a.textContent = tag
      a.setAttribute('href', techLinks[tag])
      li.appendChild(a)
      ul.appendChild(li)
    }
    projectElement.appendChild(ul)

    projectsElement.appendChild(projectElement)
  }
  projectDisplay.appendChild(projectsElement)

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

      // projects tear down
      document.getElementById('projects').remove()
      hr.remove()
      turtle.remove()

      // projects rebuild according to latest filters
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

          let description = document.createElement('p')
          description.textContent = proj.description
          project.appendChild(description)

          let repo = document.createElement('a')
          let githubIcon = document.createElement('i')
          githubIcon.setAttribute('class', 'fa fa-brand fa-github')
          repo.appendChild(githubIcon)
          repo.setAttribute('href', proj.repo)
          repo.setAttribute('class', 'project-link')
          project.appendChild(repo)

          let url = document.createElement('a')
          let urlIcon = document.createElement('i')
          urlIcon.setAttribute('class', 'fa-solid fa-link')
          url.appendChild(urlIcon)
          url.setAttribute('href', proj.url)
          url.setAttribute('class', 'project-link')
          project.appendChild(url)

          let projTags = document.createElement('ul')
          for (let tag of proj.tags) {
            let li = document.createElement('li')
            let a = document.createElement('a')
            a.textContent = tag
            a.setAttribute('href', techLinks[tag])
            li.appendChild(a)
            projTags.appendChild(li)
          }
          project.appendChild(projTags)

          projects.appendChild(project)
        }
      }

      projectDisplay.appendChild(projects)
      projectDisplay.appendChild(hr)
      projectDisplay.appendChild(turtle)
    })
  }

  projectDisplay.appendChild(hr)
  projectDisplay.appendChild(turtle)

} else {
  let main = document.createElement('main')
  let error = document.createElement('p')
  error.textContent = 'Not Found'
  main.appendChild(error)

  title.textContent = '404 | alegremrvn'
  body.appendChild(navbar)
  body.appendChild(projectDisplay)
  projectDisplay.appendChild(main)
  projectDisplay.appendChild(hr)
  projectDisplay.appendChild(turtle)

  document.getElementById('about-btn').style.backgroundColor = '#333'
}
