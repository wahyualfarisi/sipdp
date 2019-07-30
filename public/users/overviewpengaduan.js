(function() {
    "use strict"

    const detailPengaduanURL = (function() {
        const urlString = {
            getPengaduan: `${BASE_URL}api/ex/Pengaduan`,
            reqBuktiPengaduan: `${BASE_URL}api/int/Pengaduan/requestBuktiPengaduan`,
            tandaiPengaduan: `${BASE_URL}api/ex/Pengaduan/readPengaduan`
        }
        return {
            getURL: () => urlString
        }
    })()


    const detailPengaduanUI = (function() {
        const domString = {
            html: {
                listDetail: '#show__list__detail',
                listBukti: '.buktipengaduan',
                tandaiBtn: '.button-tandai'
            },
            btn: {
                onTandai: '.btn__on__tandai'
            }
        }

        const renderDetail = data => {
            console.log(data)
            let html = ''
            data.forEach(item => {
                const { 
                    id_pengaduan, 
                    nomor_disposisi,
                    nama_perusahaan_pers, 
                    judul_berita, 
                    edisi_penerbitan,
                    catatan
                } = item;

                item.dilihat === 'sudah' ? $(domString.html.tandaiBtn).css('display', 'none') : ''

                html += `
                    <tr class="spacer"> </tr>
                    <tr class="tr-shadow">
                        <td> ${id_pengaduan} </td>
                        <td> ${nomor_disposisi} </td>
                        <td> ${nama_perusahaan_pers} </td>
                        <td> ${judul_berita} </td>
                        <td> ${edisi_penerbitan} </td>
                        <td> ${catatan} </td>
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
                renderDetail(data)
            },
            retrieveBukti: data => renderBukti(data)
        }
    })()


    const detailPengaduanCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){

            $('#form-tandai').submit(function(e) {
                e.preventDefault()
                postResource(url.tandaiPengaduan, this, dom.btn.onTandai, res => {
                    if(res.status === 200){
                        $(dom.html.tandaiBtn).css('display','none')
                    }
                }, err => console.log(err), 'TANDAI')
            })
            

        }

        const load_overview_pengaduan = () => getResource(url.getPengaduan, undefined, res => {
            const filter_data = res.data.filter(item => item.id_pengaduan === NUMBER_SECRET)
            if(filter_data.length > 0){
                UI.retrieveDetail(filter_data)
                load_bukti_pengaduan(NUMBER_SECRET)
            }
        }, error => console.log(res))

        const load_bukti_pengaduan = (id_pengaduan) => getResource(`${url.reqBuktiPengaduan}?id=${id_pengaduan}`, undefined, res => {
            if(res.status === 200){
                UI.retrieveBukti(res.data)
            }
        }, error => console.log(error))


        return {
            init: () => {
                load_overview_pengaduan()
                eventListener()
                
            }
        }
    })(detailPengaduanURL, detailPengaduanUI)

    detailPengaduanCTRL.init()

})()