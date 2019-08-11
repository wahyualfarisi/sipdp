(function() {
    "use strict"

    const detailKeputusanURL = (function() {
        const urlString = {
            getKeputusan: `${BASE_URL}api/int/Keputusan`,
            reqBukti: `${BASE_URL}api/int/Pengaduan/requestBuktiPengaduan?id=`
        }
        return {
            getURL: () => urlString
        }
    })()


    const detailKeputusanUI = (function() {
        const domString = {
            html: {
                no_keputusan: '.no_keputusan', 
                tgl_keputusan: '.tgl_keputusan',
                lampiran: '.lampiran',
                perihal: '.perihal',
                no_pengaduan: '.no_pengaduan',
                nama_perusahaan_pers: '.nama_perusahaan_pers',
                judul_berita: '.judul_berita',
                edisi_penerbitan: '.edisi_penerbitan',
                catatan: '.catatan',
                nama_pengadu: '.nama_pengadu',
                email_pengadu: '.email_pengadu',
                listBukti: '.buktipengaduan',
                mainDetail: '.main_detail'
            }
        }

        const renderDetail = obj => {
           obj.forEach(item => {
               const { 
                   no_surat_keputusan, lampiran, perihal, tgl_keputusan, 
                   nama_perusahaan_pers, catatan, nama_lengkap, email, id_pengaduan, judul_berita,
                   edisi_penerbitan
               } = item;

               const { html } = domString;

               $(html.no_keputusan).text(no_surat_keputusan)
               $(html.tgl_keputusan).text(tgl_keputusan)
               $(html.lampiran).text(lampiran)
               $(html.perihal).text(perihal)
               $(html.no_pengaduan).text(id_pengaduan)
               $(html.nama_perusahaan_pers).text(nama_perusahaan_pers)
               $(html.judul_berita).text(judul_berita)
               $(html.edisi_penerbitan).text(edisi_penerbitan)
               $(html.catatan).text(catatan)
               $(html.nama_pengadu).text(nama_lengkap)
               $(html.email_pengadu).text(email)
               
           })
        }

        const renderBukti = obj => {
            let html = ''
            html += `
                <div class="card ml-5 ">
                    <div class="card-body">
                        <img src="${BASE_URL}lampiran/${obj.bukti_pengaduan}" width="350" />
                    </div>
                </div>
            `
            $(domString.html.listBukti).html(html)
        }

        return {
            getDOM: () => domString,
            retrieveDetail: data => renderDetail(data),
            retrieveBukti: data => renderBukti(data)
        } 
    })()


    const detailKeputusanCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){


        }

        const load_detail_keputusan = () => getResource(url.getKeputusan, undefined,  res => {
            if(res.status !== 200) return false;

            const filterResource = res.data.filter(item => item.no_surat_keputusan === ID);

            if(filterResource.length === 1){
                let id_pengaduan;
                UI.retrieveDetail(filterResource);
                filterResource.forEach(item => {
                     id_pengaduan = item.id_pengaduan;
                })

                load_bukti_pengaduan(id_pengaduan)
            }else{
                $(dom.html.mainDetail).css('display','none')
            }
 
        }, err => console.log(err) )

        const load_bukti_pengaduan = (id_pengaduan) => getResource(`${url.reqBukti}${id_pengaduan}`, undefined, res => {
            
            if(res.status !== 200) return false;

            res.data.forEach(item => UI.retrieveBukti(item) )

        }, err => console.log(err))

        return {
            init: () => {
                window.scrollTo(500, 0)
                eventListener()
                load_detail_keputusan()
            }
        }
    })(detailKeputusanURL, detailKeputusanUI)

    detailKeputusanCTRL.init()

})()