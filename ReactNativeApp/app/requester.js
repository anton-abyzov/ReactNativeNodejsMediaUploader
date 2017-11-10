const baseURL = 'http://localhost:3000';

/**
 * Hit the companylookup endpoint with the proper query.
 * Return a promise that resolves with the response.
 */
export function postRequest(url, data) {
    console.log("logging data " + data);
    console.log("logging url " + url);
    var formData = new FormData();

    for (var name in data) {
        formData.append(name, data[name]);
    }

    console.log('formData ' + formData);

    fetch('http://tut.by').then(data => console.log(data)).catch(err => console.log(err));

    const result = fetch(url, {
        method: 'POST',
        body: formData
    });
    // }).then(data => {
    //     console.log(data);
    // }).catch(err => {
    //     console.log(err)
    // });

    return result;







    var photo = {
        uri: url,
        type: 'image/jpeg',
        name: 'test.jpg',
    };

    var form = new FormData();
    form.append("ProfilePicture", photo);

    fetch(
        'http://localhost:3000/media',
        {
            body: form,
            method: "PUT",
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + user.token
            }
        }
    ).then((response) => response.json())
        .catch((error) => {
            alert("ERROR " + error)
        })
        .then((responseData) => {
            alert("Succes " + responseData)
        }).done();




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
