import request from 'superagent';
const baseURL = 'http://localhost:3000';

/**
 * Hit the companylookup endpoint with the proper query.
 * Return a promise that resolves with the response.
 */
export function postRequest(url, data) {

    var formData = new FormData();

    for (var name in data) {
        formData.append(name, data[name]);
    }

    const result = fetch(url, {
        method: 'POST',
        body: formData
    });

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
