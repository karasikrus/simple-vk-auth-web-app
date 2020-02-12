let URL = '/friends';
console.log('aaaaaa');
fetch(URL)
    .then(function (response) {
        response.json().then(
            function (data) {
                let friends = "";
                data.forEach(friend =>
                {
                    friends+="<div class='friend'><img class='profilePhoto' src="+friend.photo_100+ "alt ='Аватарка'/><p>"
                        +friend.first_name+" "+ friend.last_name+"</p></div>"
                });
                document.getElementById('friends').innerHTML = friends;
            }
        );// do something with response
    });
