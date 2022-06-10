'use strict';

{
  const photo = document.getElementById('pic');
  photo.addEventListener('click', () =>{
    photo.classList.add('changed');
    document.getElementById('target').textContent = 'Thank you for click!';
  })

}


