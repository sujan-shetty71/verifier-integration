const base_url = window.location.origin+window.location.pathname;

window.onload = () => {
    const qrBtnEl = document.querySelector('.btn-qr');
    const qrCodeEl = document.querySelector('#qrcode');

    qrBtnEl.addEventListener('click', (e) => {
        makeDisabled(qrBtnEl, false)

        fetch(base_url+'api/sign-in')
            .then(r => Promise.all([Promise.resolve(r.headers.get('x-id')), r.json()]))
            .then(([id, data]) => {
                console.log(data)
                makeQr(qrCodeEl, data)
                handleDisplay(qrCodeEl, true)
                handleDisplay(qrBtnEl, false);
                return id
            })
            .catch(err => console.log(err));

    });

}

function makeQr(el, data) {
    return new QRCode(el, {
        text: JSON.stringify(data),
        width: 450,
        height: 450,
        colorDark: "#000",
        colorLight: "#e9e9e9",
        correctLevel: QRCode.CorrectLevel.L
    });
}

function handleDisplay(el, needShow, display = 'block') {
    el.style.display = needShow ? display : 'none';
}

function makeDisabled(el, disabled, cls = 'disabled') {
    if (disabled) {
        el.disabled = true
        el.classList.add(cls);
    } else {
        el.classList.remove(cls);
        el.disabled = false;
    }
}



// -----------------------------------
// const base_url = window.location.origin + window.location.pathname;

// window.onload = () => {
//     const qrBtnEl = document.querySelector('.btn-qr');
//     const qrCodeEl = document.querySelector('#qrcode');

//     let qrData; // Store the QR code data globally to use it in the callback function

//     qrBtnEl.addEventListener('click', () => {
//         makeDisabled(qrBtnEl, false);

//         fetch(base_url + 'api/sign-in')
//             .then(r => Promise.all([Promise.resolve(r.headers.get('x-id')), r.json()]))
//             .then(([id, data]) => {
//                 console.log(data);
//                 makeQr(qrCodeEl, data);
//                 handleDisplay(qrCodeEl, true);
//                 handleDisplay(qrBtnEl, false);
//                 qrData = data; // Store the QR code data globally
//                 return id;
//             })
//             .then(id => {
//                 performCallback(id);
//             })
//             .catch(err => console.log(err));
//     });

//     function performCallback(id) {
//         fetch(base_url + 'api/callback', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(qrData), // Send the QR code data in the request body
//         })
//         .then(response => {
//             console.log('respose fron',response);
//             if (response.status === 200) {
//                 // You have received a 200 response, do something here
//                 console.log('Received 200 response');
//             } else {
//                 // If the response status is not 200, recursively call the function
//                 setTimeout(() => {
//                     performCallback(id);
//                     console.log('12345678');
//                 }, 1000); // Adjust the interval as needed (1 second in this example)
//             }
//         })
//         .catch(err => console.log(err));
//     }

//     function makeQr(el, data) {
//         return new QRCode(el, {
//             text: JSON.stringify(data),
//             width: 450,
//             height: 450,
//             colorDark: "#000",
//             colorLight: "#e9e9e9",
//             correctLevel: QRCode.CorrectLevel.L,
//         });
//     }

//     function handleDisplay(el, needShow, display = 'block') {
//         el.style.display = needShow ? display : 'none';
//     }

//     function makeDisabled(el, disabled, cls = 'disabled') {
//         if (disabled) {
//             el.disabled = true;
//             el.classList.add(cls);
//         } else {
//             el.classList.remove(cls);
//             el.disabled = false;
//         }
//     }
// };
