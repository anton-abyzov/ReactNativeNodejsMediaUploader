const baseURL = 'http://localhost:3000';
//import http from 'http';


/**
 * Hit the companylookup endpoint with the proper query.
 * Return a promise that resolves with the response.
 */

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function getCategoryList(callback) {
    var xhr = new XMLHttpRequest();
    console.log('Before xmlhttpRequest');
    xhr.onreadystatechange = (e) => {
        console.log('on ready state');
      if (xhr.readyState !== 4) {
        return;
      }
  
      if (xhr.status === 200) {
        console.log('SUCCESS', xhr.responseText);
        callback(JSON.parse(xhr.responseText));
      } else {
        console.warn('request_error');
      }
    };
    console.log('Before open');
    xhr.open('GET', 'http://localhost:3000/media');
    xhr.send();
  }

export function postRequest(url, data) {
    console.log("logging data " + data);
    console.log("logging url " + url);
    var formData = new FormData();

    for (var name in data) {
        formData.append(name, data[name]);
    }

    console.log('formData ' + formData);

    // getCategoryList(data => {
    //     console.log("The data is:", data)
    // });

    fetch('http://localhost:3000/media').then(function(response) {
        console.log(response);
        return response.json();
      })


    //http.get()
    // const res = httpGet('http://tut.by');
    // console.log(res);

    // fetch('http://tut.by').then(
    //     data => {
    //         console.log('hi');
    //         console.log(data);
    //     })
    //     .catch(err => console.log(err));

    // const result = fetch(url, {
    //     method: 'POST',
    //     body: formData
    // });


    // const result = fetch(url, {
    //     method: 'POST',
    //     body: JSON.stringify({data: formData}),
    //     headers:{            
    //         'Content-Type':'application/json'
    //        },
    //     //body: formData
    // }).then(data => {
    //     console.log(data);
    // }).catch(err => {
    //     console.log(err)
    // });


    const xhr = new XMLHttpRequest();
    xhr.open('POST', url)
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          console.log('done');
        }
        else{
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(data);


    //return result;







    // var photo = {
    //     uri: url,
    //     type: 'image/jpeg',
    //     name: 'test.jpg',
    // };

    // var form = new FormData();
    // form.append("ProfilePicture", photo);

    // fetch(
    //     'http://localhost:3000/media',
    //     {
    //         body: form,
    //         method: "PUT",
    //         headers: {
    //             'Content-Type': 'multipart/form-data'                
    //         }
    //     }
    // ).then((response) => response.json())
    //     .catch((error) => {
    //         alert("ERROR " + error)
    //     })
    //     .then((responseData) => {
    //         alert("Succes " + responseData)
    //     }).done();




    //   return new Promise((resolve, reject) => {
    //     request.get(baseURL + '/')
    //       .query({})
    //       .end((err, res) => {
    //         if (err) {
    //           reject(err);
    //         } else {
    //           resolve(res.body);
    //         }
    //       }
    //     );
    //   });
}
