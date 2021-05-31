import '../scss/style.scss';
import "core-js/stable";
import "regenerator-runtime/runtime";
import {
  AddRepo
} from "./AddRepo";
import {
  debounce
} from "./debounce";


const div = document.querySelector('.app');
const input = document.createElement('input');
input.type = 'text';
input.classList.add('app-input')
div.append(input);
const wrap = document.createElement('ul');
wrap.classList.add('list')
div.append(wrap);
let arr = {};
let height = 0;

async function search() {

  if (input.value && input.value[0] != ' ') {



    arr = {}
    wrap.innerHTML = '';
    height = 0;
    try {
      return await fetch(`https://api.github.com/search/repositories?q=${input.value}&per_page=5`)
        .then(res => {

          if (res.status == 200)

          {
            res.json().then(res => {
              res.items.forEach(el => {

                const li = document.createElement('li');
                li.classList.add('list-item')
                li.textContent = el.full_name;

                wrap.appendChild(li)
                arr[el.full_name] = {
                  'stars': el.watchers,
                  'Owner': el.owner.login

                }
                height += Number(li.offsetHeight);



              })
              input.style.marginBottom = height + 50 + 'px';
            })

          } else
            throw new Error('Ошибка запроса')

        })
    } catch (e) {
      alert(e.message)
    }
  } else {
    wrap.innerHTML = '';
    height = 0;
  }


}




input.addEventListener('keyup', debounce(search, 500));

wrap.addEventListener('click', (e) => {
  if (wrap.innerHTML != '')

  {
    const li = e.target.innerHTML;
    new AddRepo(li, arr[li].Owner, arr[li].stars)

  }
  wrap.innerHTML = '';
  input.value = '';
  height = 0;
  input.style.marginBottom = height + 50 + 'px'
})
