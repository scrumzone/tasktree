const button = document.getElementById('btn');

button?.addEventListener('click', function handleClick(event){   
    document.cookie = "access_token" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    console.log('button clicked');
    console.log(event);
    console.log(event.target);
})