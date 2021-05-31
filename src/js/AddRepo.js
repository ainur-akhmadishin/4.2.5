export class AddRepo {
  constructor(name, owner, stars) {
    this.d = document.querySelector('.app')
    this.name = name;
    this.owner = owner;
    this.stars = stars;
    this.rep = this.createRepo();
    this.d.append(this.rep);
  }

  createRepo() {
    const repo = document.createElement('div');
    const repoInfo = document.createElement('div');
    const repoButton = document.createElement('div');
    repo.classList.add('repo');
    repoInfo.classList.add('repo-info');
    repoButton.addEventListener('click', () => {
      this.d.removeChild(repo);
    })
    repoButton.classList.add('repo-button');
    repoInfo.append(this.createText('Name: ', this.name))
    repoInfo.append(this.createText('Owner: ', this.owner))
    repoInfo.append(this.createText('Stars: ', this.stars))
    repo.append(repoInfo);
    repo.append(repoButton);
    return repo;
  }

  createText(text, str) {
    const p = document.createElement('p');
    const span = document.createElement('span');
    span.textContent = str;
    p.textContent = text;
    p.append(span)
    return p
  }



}
