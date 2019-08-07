(function() {
    "use strict"

    const disposisiURL = (function() {
        const urlString = {
            getDisposisi: `${BASE_URL}api/int/Disposisi`
        }
        return {
            getURL: () => urlString
        }
    })()


    const disposisiUI = (function() {
        const domString = {
            html : {
                listDisposisi : '#show__list__disposisi'
            },
            field: {
                searchDisposisi: '#search_disposisi'
            }
        }

        const renderDisposisi = data => {
            console.log(data)
            let html = '', no = 1
            if(data.length > 0){
                data.forEach(item => {
                    html += `
                        <tr class="spacer"></tr>
                        <tr class="tr-shadow">
                            <td>${no++}</td>   
                            <td>${item.nomor_disposisi} </td>
                            <td>${item.tgl_disposisi} </td>
                            <td>${item.bagian} </td>
                            <td>${item.jenis_tugas} </td>
                            <td>${item.id_pengaduan} </td>
                            <td>${item.nama_perusahaan_pers} </td>
                            <td>${item.nama_pengadu} </td>
                            <td>${item.status_disposisi} </td>
                        </tr>
                    `;
                })
            }
            $(domString.html.listDisposisi).html(html)
        }

        return {
            getDOM: () => domString,
            retrieveDisposisi: data => renderDisposisi(data)
        }
    })()


    const disposisiCTRL = (function(URL, UI) {

        const dom = UI.getDOM()
        const url = URL.getURL()
        const eventListener = function(){
            $(dom.field.searchDisposisi).on('keyup', function() {
                getResource(url.getDisposisi, $(this).val(), res => {
                    res.status === 200 ? UI.retrieveDisposisi(res.data) : false
                }, error => console.log(error) )
            })

        }

        const load_disposisi = () => getResource(url.getDisposisi, undefined , res => {
            res.status === 200 ? UI.retrieveDisposisi(res.data) : false;
        }, error => console.log(error))


        return {
            init: () => {
                console.log('initss ')
                window.scrollTo(500, 0)
                load_disposisi()
                eventListener()
            }
        }
    })(disposisiURL, disposisiUI)

    disposisiCTRL.init()

})()