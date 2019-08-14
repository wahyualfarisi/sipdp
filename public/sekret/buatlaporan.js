(function() {
    "use strict"

    const buatLaporanURL = (function() {
        const urlString = {
            getKeputusan: `${BASE_URL}api/int/Keputusan/getKeputusanStatus`,
            postLaporan: `${BASE_URL}api/ex/Laporan`
        }
        return {
            getURL: () => urlString
        }
    })()


    const buatLaporanUI = (function() {
        const domString = {
            html: {
                listKeputusan: '#show__list__keputusan'
            }
        }

        const renderKeputusan = data => {
            let html = ''
            html += `
            <div class="table-responsive table-responsive-data2">
           
                <table class="table table-data2">
                <thead>
                    <tr>
                    <th>
                        <input type="checkbox" id="btn-pilih-semua" /> Pilih semua
                    </th>
                    <th>No. Surat Keputusan</th>
                    <th>Tanggal keputusan</th>
                    <th>No. Pengaduan</th>
                    <th>Nama Perusahaan Pers</th>
                    <th>Nama Pengadu</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
            `;
            data.forEach(item => {
              html += `
                <tr class="spacer"></tr>
                <tr class="tr-shadow">
                    <td><input type="checkbox" class="no_surat" name="no_surat_keputusan[]" value=${item.no_surat_keputusan} /> </td>
                    <td> ${item.no_surat_keputusan} </td>
                    <td> ${item.tgl_keputusan} </td>
                    <td> ${item.id_pengaduan} </td>
                    <td> ${item.nama_perusahaan_pers} </td>
                    <td> ${item.nama_depan} ${item.nama_belakang} </td>
                </tr>
              `;
            })

            html += `
                </tbody>
                </table>
                <div class="text-center">
                    <button type="button" class="btn btn-success btn__add__surat" > Buat Laporan </button>
                </div>
                
            `;
            $('#view-add-laporan').html(html)
        }

        return {
            getDOM: () => domString,
            retrieveKeputusan: data => renderKeputusan(data)
        }
    })()


    const buatLaporanCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){

          
            $('#view-add-laporan').on('click', '.btn__add__surat', function() {
                var no_surat = []
                $.each($("input[name='no_surat_keputusan[]']:checked "), function() {
                    no_surat.push($(this).val())
                } )
                console.log(no_surat);
                if(no_surat.length > 0){
                    let html = '';
                    
                    html += `
                        <div class="form-group">
                         <label> Tanggal Pembuatan </label>
                         <input type="date" name="tgl_pembuatan" class="form-control" required />
                        </div>
                    `
                    no_surat.forEach(item => {
                        html += `
                                <input type="hidden" class="form-control" name="no_surat_keputusan[]" value="${item}" />
                             
                        `;
                    })
                    html += '<button type="submit" class="btn btn-info btn-block btn-simpan-laporan"> SIMPAN LAPORAN </button>';
                    $('#form-add-laporan').html(html)
                    ModalAction('#ModalBuatLaporan', 'show')
                }else{
                    alert('silahkan pilih no surat')
                }
            })

            $('#view-add-laporan').on('click', '#btn-pilih-semua', function() {
                $('input:checkbox').not(this).prop('checked', this.checked);
            })

            $('#form-add-laporan').submit(function(e) {
                e.preventDefault();
                
                postResource(url.postLaporan, this, '.btn-simpan-laporan', res => {
                    console.log(res)
                }, err => console.log(err), 'DONE')

            })

        }

        const load_keputusan = () => getResource(url.getKeputusan, undefined, res => {
            if(res.length > 0){
                UI.retrieveKeputusan(res);
            }else{
                $('#view-add-laporan').html('<center> <b> tidak ada keputusan baru </b> </center>')
            }
        }, err => console.log(err) )

        return {
            init: () => {
                console.log('init ')
                eventListener()
                load_keputusan()
            }
        }
    })(buatLaporanURL, buatLaporanUI)

    buatLaporanCTRL.init()

})()