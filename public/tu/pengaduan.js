(function() {
    "use strict"

    const pengaduanURL = (function() {
        const urlString = {
            getPengaduan: `${BASE_URL}api/int/Pengaduan`
        }
        return {
            getURL: () => urlString
        }
    })()


    const pengaduanUI = (function() {
        const domString = {
            html: {
                listPengaduan: '#show__list__pengaduan'
            },
            field: {
                searchPengaduan: '#search_pengaduan'
            }
        }

        const renderPengaduan = data => {
            console.log(data)
            let html = '', no = 1;
            if(data.length > 0){
                data.forEach(item => {
                    html += `
                        <tr class="spacer"></tr>
                        <tr class="tr-shadow">    
                            <td> ${no++} </td>
                            <td> <span class="badge badge-success">${item.id_pengaduan}</span>  </td>
                            <td> ${item.nama_pengadu} </td>
                            <td> ${item.nama_perusahaan_pers} </td>
                            <td> ${item.judul_berita} </td>
                            <td> ${item.edisi_penerbitan} </td>
                            <td> ${item.status_pengaduan} </td>
                            <td> 
                            <button class="item btn__hapus" 
                                data-toggle="tooltip" data-placement="top" title="Delete">
                                <i class="zmdi zmdi-info"></i>
                            </button>
                            </td>
                        </tr>
                    `;
                })
            }
            $(domString.html.listPengaduan).html(html)
        }

        return {
            getDOM: () => domString,
            retrievePengaduan: data => renderPengaduan(data)
        }
    })()


    const pengaduanCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){

            $(dom.field.searchPengaduan).on('keyup', function() {
                getResource(url.getPengaduan, $(this).val(), res => {
                    if(res.status === 200) UI.retrievePengaduan(res.data)
                })
            })

        }

        const load_pengaduan = () => getResource(url.getPengaduan, undefined, res => {
            if(res.status === 200) {
                UI.retrievePengaduan(res.data)
            }
        }, error => console.log(error) )


        return {
            init: () => {
                console.log('initss ')
                eventListener()
                load_pengaduan()
            }
        }
    })(pengaduanURL, pengaduanUI)

    pengaduanCTRL.init()


})()