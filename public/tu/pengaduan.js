(function() {
    "use strict"

    const pengaduanURL = (function() {
        const urlString = {
            getPengaduan: `${BASE_URL}api/int/Pengaduan`,
            delete: `${BASE_URL}api/int/Pengaduan`
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
                            <button class="btn btn-danger btn__hapus" data-id="${item.id_pengaduan}" >
                                Hapus
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

            $(dom.html.listPengaduan).on('click', '.btn__hapus', function() {
                let id = $(this).data('id');
                $('.id_pengaduan').val(id)
                ModalAction('#modalDelete', 'show')
            })

            $('#form-delete').submit(function(e) {
                e.preventDefault();
                var id = $('.id_pengaduan').val()
                deleteResource(`${url.delete}?id=${id}`, this, '#btn_delete', res => {
                    if(res.status === true){
                        load_pengaduan()
                        ModalAction('#modalDelete','hide')
                    }
                }, err => console.log(err)  )
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
                window.scrollTo(500, 0)
                eventListener()
                load_pengaduan()
            }
        }
    })(pengaduanURL, pengaduanUI)

    pengaduanCTRL.init()


})()