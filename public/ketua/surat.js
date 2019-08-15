(function() {
    "use strict"

    const suratURL = (function() {
        const urlString = {
            getKeputusan: `${BASE_URL}api/int/Keputusan`
        }
        return {
            getURL: () => urlString
        }
    })()


    const suratUI = (function() {
        const domString = {

        }

        var convertDateIndo = {
            hari: ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'],
            bulan: ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
        }

        function tanggalIndo(day, date, month, year){
            return convertDateIndo.hari[day] +', ' + date + ' '+ convertDateIndo.bulan[month] +' '+year;
        }

        const renderSurat = data => {
            console.log(data)
    

            data.forEach(item => {
                var year = new Date(item.tgl_keputusan).getFullYear();
                var day  = new Date(item.tgl_keputusan).getDay();
                var month = new Date(item.tgl_keputusan).getMonth();
                var date = new Date(item.tgl_keputusan).getDate();

                $('.tanggal_keputusan').html(`<b> Jakarta </b>  ${tanggalIndo(day, date, month, year)} `)
                $('.isipenjelasan').html(item.isi_agenda)
                $('.lampiran').text(item.lampiran)
                $('.perihal').text(item.perihal)
                $('.nomor').text(item.no_surat_keputusan)
                $('.nama_pengadu').text(item.nama_lengkap)
            })

        }

        return {
            getDOM: () => domString,
            retriveSurat: data => renderSurat(data)
        }
    })()


    const suratCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){
            $('#btn-print-surat').on('click', function() {
                var mode = 'iframe';
                var close = mode == "popup";
                var options = {
                    mode: mode,
                    popClose: close
                }
                $('#area__surat').printArea(options)


            })

        }

        const loadSurat = () => getResource(url.getKeputusan, undefined, res => {
            if(res.status === 200){
                const filterData = res.data.filter(item => item.no_surat_keputusan === ID)
                console.log(filterData)
                UI.retriveSurat(filterData)
            } 
           
        }, err => console.log(err))


        return {
            init: () => {
                window.scrollTo(500,250)
                loadSurat()
                eventListener()
                console.log(ID)
            }
        }
    })(suratURL, suratUI)

    suratCTRL.init()


})()