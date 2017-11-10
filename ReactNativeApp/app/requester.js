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

export function postRequest(url, data) {
    console.log("logging data " + data);
    console.log("logging url " + url);
    var formData = new FormData();

    for (var name in data) {
        formData.append(name, data[name]);
    }

    console.log('formData ' + formData);

    //http.get()
    const res = httpGet('http://tut.by');
    console.log(res);

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


    
    // }).then(data => {
    //     console.log(data);
    // }).catch(err => {
    //     console.log(err)
    // });

    return result;

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
