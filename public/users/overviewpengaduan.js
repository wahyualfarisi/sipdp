(function() {
    "use strict"

    const detailPengaduanURL = (function() {
        const urlString = {
            getPengaduan: `${BASE_URL}api/ex/Pengaduan`,
            reqBuktiPengaduan: `${BASE_URL}api/int/Pengaduan/requestBuktiPengaduan`,
        }
        return {
            getURL: () => urlString
        }
    })()


    const detailPengaduanUI = (function() {
        const domString = {
            html: {
                listDetail: '#show__list__detail',
                listBukti: '.buktipengaduan'
            }
        }

        const renderDetail = data => {
            let html = ''
            data.forEach(item => {
                html += `
                    <tr class="spacer"> </tr>
                    <tr class="tr-shadow">
                        <td> ${item.id_pengaduan} </td>
                        <td> ${item.nomor_disposisi} </td>
                        <td> ${item.nam_perusahaan_pers} </td>
                        <td> ${item.judul_berita} </td>
                        <td> ${item.edisi_penerbitan} </td>
                        <td> ${item.catatan} </td>
                    </tr>
                `;
            })
            $(domString.html.listDetail).html(html)
        }

        const renderBukti = data => {
            let html = '';
            if(data.length > 0){            
                data.forEach(item => {
                    html += `
                    <div class="card ml-5 ">
                        <div class="card-body">
                             <img src="${BASE_URL}lampiran/${item.bukti_pengaduan}" width="350" />
                        </div>
                    </div>
                    `
                })
            }
            $(domString.html.listBukti).html(html)
        }

        return {
            getDOM: () => domString,
            retrieveDetail: data => {
                console.log(data)
                renderDetail(data)
            },
            retrieveBukti: data => renderBukti(data)
        }
    })()


    const detailPengaduanCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){


        }

        const load_overview_pengaduan = () => getResource(url.getPengaduan, undefined, res => {
            const filter_data = res.data.filter(item => item.id_pengaduan === NUMBER_SECRET)
            if(filter_data.length > 0){
                UI.retrieveDetail(filter_data)
                load_bukti_pengaduan(NUMBER_SECRET)
            }
        }, error => console.log(res))

        const load_bukti_pengaduan = (id_pengaduan) => getResource(`${url.reqBuktiPengaduan}?id=${id_pengaduan}`, undefined, res => {
            console.log(res)
            if(res.status === 200){
                UI.retrieveBukti(res.data)
            }
        }, error => console.log(error))


        return {
            init: () => {
                console.log('init ')
                load_overview_pengaduan()
                
            }
        }
    })(detailPengaduanURL, detailPengaduanUI)

    detailPengaduanCTRL.init()

})()