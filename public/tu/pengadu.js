(function() {
    "use strict"

    const pengaduURL = (function() {
        const urlString = {
            getPengadu: `${BASE_URL}api/Pengadu`,
            deletePengadu: `${BASE_URL}api/Pengadu`,
            nonActiveUser: `${BASE_URL}api/Pengadu/nonactive_account`, //post method
            inactiveUser: `${BASE_URL}api/Pengadu/inactive_account`
        }
        return {
            getURL: () => urlString
        }
    })()


    const pengaduUI = (function() {
        const domString = {
            html: {
                list: '#show__list__pengadu'
            }
        }

        const renderList = data => {
            let html = '', no = 1, statusAccount;
            if(data.length > 0){
                data.forEach(item => {
                    const { id_terdaftar, email, alamat, nama_depan, nama_belakang, tgl_terdaftar, status } = item
                    if(status === 'true'){
                        statusAccount = `<span class="badge badge-success">AKTIF</span>`
                    }else{
                        statusAccount = `<span class="badge badge-danger">NON AKTIF</span>`
                    }
                    html += `
                        <tr class="spacer"></tr>
                        <tr class="tr-shadow"> 
                            <td> ${no++} </td>
                            <td> ${id_terdaftar} </td>
                            <td>
                                <span class="block-email">${email}</span>
                            </td>
                            <td>${alamat} </td>
                            <td>${nama_depan} ${nama_belakang} </td>
                            <td>${tgl_terdaftar} </td>
                            <td>${statusAccount} </td>
                        </tr>
                    `;
                });
            }
            $(domString.html.list).html(html)
        }

        return {
            getDOM: () => domString,
            retrieveData: data => renderList(data)
        }
    })()


    const pengaduCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){


        }

        const load_pengadu = () => getResource(url.getPengadu, undefined, res => {
            res.status === 200 ? UI.retrieveData(res.data) : false
        }, error => console.log(error))

        return {
            init: () => {
                console.log('init ')
                eventListener()
                load_pengadu()
            }
        }
    })(pengaduURL, pengaduUI)

    pengaduCTRL.init()


})()