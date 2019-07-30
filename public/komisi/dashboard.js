(function() {
    "use strict"

    const dashboardURL = (function() {
        const urlString = {
            getPengaduan: `${BASE_URL}api/int/Pengaduan`,
            getTindakLanjutDisposisi: `${BASE_URL}api/int/Disposisi/show_disposisi_tindaklanjuti`
        }
        return {
            getURL: () => urlString
        }
    })()


    const dashboardUI = (function() {
        const domString = {
           html: {
            listTindakLanjut: '.show-tindaklanjut-disposisi',
            listPengaduanSelesai: '.show-pengaduan-selesai'
           }
        }

        const renderDisposisi = data => {
            let html = '', labelItem
            if(data.length > 0)
            {
                data.forEach((item, i) => {
                    console.log(item)
                    var mod = i % 2
                    if(mod === 0){
                        labelItem = 'success'
                    }else{
                        labelItem = 'warning'
                    }
                    html +=  `
                        <div class="au-task__item au-task__item--${labelItem}">
                            <div class="au-task__item-inner">
                            <h5 class="task">
                                <a href="#">Nomor Disposisi:  ${item.nomor_disposisi} </a>
                                <p> Penugasan: ${item.bagian} </p>
                                <p> Judul Berita: ${item.judul_berita} </p>
                            </h5>
                            <span class="time"> ${item.tgl_disposisi} </span>
                            <p> 
                                <button class="btn btn-success" > Buat Surat Keputusan </button>
                            </p>
                            </div>
                        </div> 
                    `
                })
            }else{
                html += `
                    <div class="text-center">
                        <img src="${BASE_URL}assets/img/nodata.svg" width="150" />
                    </div>
                `
            }
            $(domString.html.listTindakLanjut).html(html)
        }

        const renderPengaduanSelesai = data => {
            var html = ''
            if(data.length > 0 )
            {
                data.forEach(item => {
                    html += `
                    <div class="au-task__item au-task__item--success">
                        <div class="au-task__item-inner">
                        <h5 class="task">
                            <a href="#">Create new task for Dashboard</a>
                        </h5>
                        <span class="time">03:30 PM</span>
                        </div>
                    </div> 
                    `
                })
            }else{
                html += `
                    <div class="text-center">
                        <img src="${BASE_URL}assets/img/nodata.svg" width="150" />
                    </div>
                `
            }

            $(domString.html.listPengaduanSelesai).html(html)
        }

        return {
            getDOM: () => domString,
            retrieveDisposisi: data => renderDisposisi(data),
            retirevePengaduanSelesai: data => renderPengaduanSelesai(data)
        }
    })()


    const dashboardCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){


        }

        const load_tindak_lanjut_disposisi = () => getResource(url.getTindakLanjutDisposisi, undefined, res => {
            if(res.status === 200){
                $('#jumlah_menunggu_keputusan').text(res.jumlah)
                UI.retrieveDisposisi(res.data)
            }
        }, err => console.log(err))

        const load_pengaduan_selesai = () => getResource(url.getPengaduan, 'selesai', res => {
            if(res.status === 200){
                UI.retirevePengaduanSelesai(res.data)
            }
        }, err => console.log(err) )

        return {
            init: () => {
                console.log('init ')
                eventListener()
                load_tindak_lanjut_disposisi()
                load_pengaduan_selesai()
            }
        }
    })(dashboardURL, dashboardUI)

    dashboardCTRL.init()

})()