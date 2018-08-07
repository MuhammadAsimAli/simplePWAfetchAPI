

//service worker registration

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  }


document.getElementById('getUser').addEventListener('click', getUser1);
function getUser1(){
    fetch('https://api.github.com/users/mtahir08/followers')
    .then(function(response){
        return response.json();
    }).then(function(data){
        let output = '<h2>User</h2>';
        data.forEach(function(user){
            output += `
            <ul>
                  <li>Name:${user.login}</li>
                  <li>Github url:${user.url}</li>
            </ul>
            `;
        });
        document.getElementById('getUser').innerHTML = output;
    }).catch(function(err){
        console.log(err);
    })
}

