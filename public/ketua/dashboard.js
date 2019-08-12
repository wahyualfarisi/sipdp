(function() {
    "use strict"

    const dashboardURL = (function() {
        const urlString = {
            getNewProsesDisposisi: `${BASE_URL}api/int/Disposisi/show_disposisi_proses`,
            getPengaduan: `${BASE_URL}api/int/Pengaduan`,
            getKeputusan: `${BASE_URL}api/int/Keputusan`,
            tindakLanjutDisposisi : `${BASE_URL}api/int/Disposisi/tindak_lanjut_disposisi`,
            totalPengaduan: `${BASE_URL}api/int/Dashboard/count_pengaduan_status`,
            totalDisposisi: `${BASE_URL}api/int/Dashboard/count_disposisi_status`,
        }
        return {
            getURL: () => urlString
        }
    })()


    const dashboardUI = (function() {
        const domString = {
            html: {
                listproses: '.show-proses-disposisi',
                listPengaduan: '.show-pengaduan-proses',
                totalPermintaanDisposisi: '#total__permintaan__disposisi',
                totalPengaduan: '#total__pengaduan',
                totalKeputusan: '#total__keputusan'
            },
            btn: {
                tindaklanjut: '.btn__tindaklanjut',
                onTindakLanjut: '#btn_on_save',
                btn_lihat_pengaduan: '.btn_lihat_pengaduan'
            },
            modal: {
                tindakLanjut: '#modalTindakLanjut',
                detailPengaduan: '#modalDetailPengaduan'
            },
            form: {
                tindaklanjut: '#form-tindaklanjut'
            }
        }

        const renderDisposisi = data => {
            let html = '', labelItem;
            if(data.length > 0)
            {
                data.forEach((item, i) => {
                    var mod = i % 2;
                    if(mod === 0){
                        labelItem = 'danger'
                    }else{
                        labelItem = 'success'
                    }
                    html += `
                     <div class="au-task__item au-task__item--${labelItem}">
                        <div class="au-task__item-inner">
                        <h5 class="task">
                            <a href="#">No. Disposisi : ${item.nomor_disposisi}</a>
                            <p> Penugasan: ${item.bagian} </p>
                            <p> Jenis Tugas : ${item.jenis_tugas} </p>
                        </h5>
                        <span class="time">${item.tgl_disposisi}</span>
                        <p>
                             <button class="btn btn-warning btn__tindaklanjut "
                                data-id_pengaduan="${item.id_pengaduan}"
                                data-nomor_disposisi="${item.nomor_disposisi}"
                                data-catatan_pengaduan="${item.catatan}"
                                data-perusahaan_pers=${item.nama_perusahaan_pers}
                                data-judul_berita="${item.judul_berita}"
                                data-edisi_penerbitan="${item.edisi_penerbitan}"
                                data-bagian="${item.bagian}"
                                data-jenis_tugas="${item.jenis_tugas}"
                                data-catatan_disposisi="${item.catatan_disposisi}"
                                data-tgl_disposisi="${item.tgl_disposisi}"
                             > Tindak Lanjuti </button>
                        </p>
                        </div>
                    </div> 
                    `
                })
            }else{
                html += `
                    <div class="text-center">
                      <img src="${BASE_URL}assets/img/nodata.svg" width="150" />
                      <p> Tidak Ada Permintaan Disposisi Pengaduan </p>
                    </div>
                `
            }
            $(domString.html.listproses).html(html)
        }


        const renderPengaduanProses = data => {            
            let html = ''
            if(data.length > 0){
                data.forEach(item => {
                    html += `
                        <div class="au-progress">
                        <span class="au-progress__title"> <h4> ${item.id_pengaduan} </h4> </span>
                        <p> ${item.judul_berita} </p>
                        <p  style="color: black"> ${item.nama_pengadu} </p>
                        <div style="margin-top: 16px;">
                            <button class="btn btn-danger btn-block btn_lihat_pengaduan" 
                                data-id_pengaduan="${item.id_pengaduan}" 
                                data-nomor_disposisi="${item.nomor_disposisi}"
                                data-catatan_pengaduan="${item.catatan}"
                                data-perusahaan_pers=${item.nama_perusahaan_pers}
                                data-judul_berita="${item.judul_berita}"
                                data-edisi_penerbitan="${item.edisi_penerbitan}"
                                data-bagian="${item.bagian}"
                                data-jenis_tugas="${item.jenis_tugas}"
                                data-catatan_disposisi="${item.catatan_disposisi}"
                                data-tgl_disposisi="${item.tgl_disposisi}"

                            > Lihat Pengaduan </button>
                        </div>
                        <div class="au-progress__bar">
                            <div
                                class="au-progress__inner js-progressbar-simple"
                                role="progressbar"
                                data-transitiongoal="85"
                            >
                                <span class="au-progress__value js-value"></span>
                            </div>
                        </div>
                    </div>
                    `
                })
            }else{
                html += `
                    <div class="text-center">
                      <img src="${BASE_URL}assets/img/nodata.svg" width="150" />
                    </div>
                    `;
            }
            $(domString.html.listPengaduan).html(html)
        }

        const renderChartPengaduan = res => {
            try {
                //pie chart
                var ctx = document.getElementById("pengaduanChart");
                if (ctx) {
                  ctx.height = 200;
                  var myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                      datasets: [{
                        data: [res.totalTerkirm, res.totalDiTerima, res.totalProses, res.totalSelesai],
                        backgroundColor: [
                          "rgba(0, 123, 255,0.9)",
                          "rgba(254, 241, 96, 1)",
                          "rgba(214, 69, 65, 1)",
                          "rgba(46, 204, 113, 1)"
                        ],
                        hoverBackgroundColor: [
                          "rgba(0, 123, 255,0.9)",
                          "rgba(254, 241, 96, 1)",
                          "rgba(214, 69, 65, 1)",
                          "rgba(46, 204, 113, 1)"
                        ]
                
                      }],
                      labels: [
                        "Terkirim ke pada pengadu",
                        "pengaduan di terima",
                        "pengaduan di proses",
                        "pengaduan selesai"
                      ]
                    },
                    options: {
                      legend: {
                        position: 'top',
                        labels: {
                          fontFamily: 'Poppins'
                        }
                
                      },
                      responsive: true
                    }
                  });
                }
                
                
                } catch (error) {
                console.log(error);
                }
        }

        const renderChartDisposisi = res => {
            try {
    
                //pie chart
                var ctx = document.getElementById("disposisiChart");
                if (ctx) {
                  ctx.height = 200;
                  var myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                      datasets: [{
                        data: [res.totalProses, res.totalTindakLanjuti, res.totalSelesai],
                        backgroundColor: [
                          "rgba(214, 69, 65, 1)",
                          "rgba(0, 123, 255,0.7)",
                          "rgba(46, 204, 113, 1)",
                         
                        ],
                        hoverBackgroundColor: [
                          "rgba(214, 69, 65, 1)",
                          "rgba(0, 123, 255,0.7)",
                          "rgba(46, 204, 113, 1)",
                         
                        ]
                
                      }],
                      labels: [
                        "Total Proses",
                        "Total Tindak Lanjuti",
                        "Total Selesai"
                      ]
                    },
                    options: {
                      legend: {
                        position: 'top',
                        labels: {
                          fontFamily: 'Poppins'
                        }
                
                      },
                      responsive: true
                    }
                  });
                }
                
                
                } catch (error) {
                console.log(error);
                }
        }

        return {
            getDOM: () => domString,
            retrieveData: data => renderDisposisi(data),
            retrivePengaduanProses: data => renderPengaduanProses(data),
            retrieveChartPengaduan: data => renderChartPengaduan(data),
            retrieveChartDisposisi: data => renderChartDisposisi(data)
        }
    })()


    const dashboardCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){

            $(dom.html.listproses).on('click', dom.btn.tindaklanjut, function() {
                var nomor_disposisi = $(this).data('nomor_disposisi')
                var id_pengaduan    = $(this).data('id_pengaduan')
                var perusahaan_pers = $(this).data('perusahaan_pers')
                var judul_berita    = $(this).data('judul_berita')
                var catatan_pengaduan = $(this).data('catatan_pengaduan')
                var edisi_penerbitan = $(this).data('edisi_penerbitan')
                var bagian          = $(this).data('bagian')
                var jenis_tugas     = $(this).data('jenis_tugas')
                var catatan_disposisi = $(this).data('catatan_disposisi')
                var tgl_disposisi = $(this).data('tgl_disposisi')

                $('.id_pengaduan').val(id_pengaduan)
                $('.perusahaan_pers').val(perusahaan_pers)
                $('.judul_berita').val(judul_berita)
                $('.catatan_pengaduan').val(catatan_pengaduan)
                $('.edisi_penerbitan').val(edisi_penerbitan)
                

                $('.nomor_disposisi').val(nomor_disposisi)
                $('#penugasan').val(bagian)
                $('#jenis_tugas').val(jenis_tugas)
                $('#catatan_disposisi').val(catatan_disposisi)
                $('#tgl_disposisi').val(tgl_disposisi)
                
                ModalAction(dom.modal.tindakLanjut,'show')           
            })

            $(dom.form.tindaklanjut).submit(function(e) {
                e.preventDefault()
                postResource(url.tindakLanjutDisposisi, this,  dom.btn.onTindakLanjut, res => {
                    if(res.status === 200){
                        ModalAction(dom.modal.tindakLanjut,'hide')
                        load_new_disposisi()
                        load_pengaduan_proses()
                        
                    }
                }, err => console.log(err), 'TINDAK LANJUT')
            })

            $(dom.html.listPengaduan).on('click', dom.btn.btn_lihat_pengaduan, function() {
                

                var nomor_disposisi = $(this).data('nomor_disposisi')
                var id_pengaduan    = $(this).data('id_pengaduan')
                var perusahaan_pers = $(this).data('perusahaan_pers')
                var judul_berita    = $(this).data('judul_berita')
                var catatan_pengaduan = $(this).data('catatan_pengaduan')
                var edisi_penerbitan = $(this).data('edisi_penerbitan')
                var bagian          = $(this).data('bagian')
                var jenis_tugas     = $(this).data('jenis_tugas')
                var catatan_disposisi = $(this).data('catatan_disposisi')
                var tgl_disposisi = $(this).data('tgl_disposisi')

                $('.nomor_disposisi').val(nomor_disposisi)
                $('#penugasan2').val(bagian)
                $('#jenis_tugas2').val(jenis_tugas)
                $('#catatan_disposisi2').val(catatan_disposisi)
                $('#tgl_disposisi').val(tgl_disposisi)

                $('.id_pengaduan').val(id_pengaduan)
                $('.perusahaan_pers').val(perusahaan_pers)
                $('.judul_berita').val(judul_berita)
                $('.catatan_pengaduan').val(catatan_pengaduan)
                $('.edisi_penerbitan').val(edisi_penerbitan)


                ModalAction(dom.modal.detailPengaduan, 'show')
            })

        }

        const load_new_disposisi = () => getResource(url.getNewProsesDisposisi, undefined, res => {
            if(res.status === 200){
                $('.inbox-num').text(res.jumlah)
                $(dom.html.totalPermintaanDisposisi).text(res.jumlah)
                UI.retrieveData(res.data)
            }
        }, err => console.log(err) )

        const load_pengaduan_proses = () => getResource(url.getPengaduan, 'proses', res => {
            if(res.status === 200){
                $(dom.html.totalPengaduan).text(res.data.length)
                UI.retrivePengaduanProses(res.data)
            }
        }, err => console.log(err) )

        const load_total_pengaduan = () => getResource(url.totalPengaduan, undefined, res => {
            if(res.status === 200){
                UI.retrieveChartPengaduan(res.data[0]);
            }
        }, err => console.log(err))

        const load_total_disposisi = () => getResource(url.totalDisposisi, undefined, res => {
            if(res.status === 200){
                UI.retrieveChartDisposisi(res.data[0]);
            }
        }, err => console.log(err) )

        const load_total_keputusan = () => getResource(url.getKeputusan, undefined, res => {
            if(res.status === 200){
                res.data.length > 0 ? $(dom.html.totalKeputusan).text(res.data.length) : $(dom.html.totalKeputusan).text('0')
            }
        }, err => console.log(err) )



     


        return {
            init: () => {
                console.log('init ')
                eventListener()
                load_new_disposisi()
                load_pengaduan_proses()
                load_total_pengaduan()
                load_total_disposisi()
                load_total_keputusan()
                
            }
        }
    })(dashboardURL, dashboardUI)

    dashboardCTRL.init()

})()