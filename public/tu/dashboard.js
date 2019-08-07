(function() {
    "use strict"

    const dashboardURL = (function() {
        const urlString = {
            totalPengaduan: `${BASE_URL}api/int/Dashboard/count_pengaduan_status`,
            totalDisposisi: `${BASE_URL}api/int/Dashboard/count_disposisi_status`,
            getPengadu: `${BASE_URL}api/Pengadu`,
            getPengaduan: `${BASE_URL}api/int/Pengaduan`
        }
        return {
            getURL: () => urlString
        }
    })()


    const dashboardUI = (function() {
        const domString = {
          html: {
            listPengadu: '#list__pengadu',
            totalPengadu: '#total__pengadu',
            totalPengaduan: '#total__pengaduan',
            listPengaduan: '#list__pengaduan'
          }
        }

        const renderPengadu = data => {
          
          $(domString.html.totalPengadu).text(data.length)

          let html = '', labelStatus = '', no = 1
          if(data.length > 0){
            data.forEach(item => {
              const { nama_depan, nama_belakang, email, status } = item
              if(status === 'true'){
                labelStatus = 'Aktif';
              }else{
                labelStatus = 'Tidak Aktif'
              }

              html += `
                <tr>
                  <td> ${no++} </td>
                  <td>
                    <div class="table-data__info">
                      <h6> ${nama_depan} ${nama_belakang}  </h6>
                      <span>
                        <a href="#"> ${email} </a>
                      </span>
                    </div>
                  </td>
                  <td>
                    <span class="role admin"> ${labelStatus} </span>
                  </td>
                  <td>
                    
                  </td>
                  <td>
                    <span class="more">
                      <i class="zmdi zmdi-more"></i>
                    </span>
                  </td>
              </tr>
              `
            })
          }
          $(domString.html.listPengadu).html(html)
        }

        const renderPengaduan = data => {
          $(domString.html.totalPengaduan).text(data.length)
          let html = '', no = 1
          if(data.length > 0){
            data.forEach(item => {
              console.log(item)
                html += `
                  <tr>
                    <td> ${no++} </td>
                    <td> ${item.id_pengaduan} </td>
                    <td> ${item.judul_berita} </td>
                    <td> ${item.nama_perusahaan_pers} </td>
                  </tr>
                `;
            })
          }

          $(domString.html.listPengaduan).html(html)
        }

        return {
            getDOM: () => domString,
            renderChartPengaduan: (res) => {
                
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
                    
            },
            renderChartDisposisi: res => {
                
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
            },
            retrievePengadu: data => renderPengadu(data),
            retrievePengaduan: data => renderPengaduan(data)
        }
        
    })()


    const dashboardCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){


        }

        const load_total_pengaduan = () => getResource(url.totalPengaduan, undefined, res => {
            if(res.status === 200){
                UI.renderChartPengaduan(res.data[0]);
            }
        }, err => console.log(err))

        const load_total_disposisi = () => getResource(url.totalDisposisi, undefined, res => {
            if(res.status === 200){
                UI.renderChartDisposisi(res.data[0]);
            }
        }, err => console.log(err) )

        const load_list_pengadu = () => getResource(url.getPengadu, undefined, res => {
          if(res.status === 200) return UI.retrievePengadu(res.data)
        }, err => console.log(err) )

        const load_pengaduan = () => getResource(url.getPengaduan, undefined, res => {
          if(res.status === 200) return UI.retrievePengaduan(res.data)
        }, err => console.log(err) ) 


        return {
            init: () => { 
              window.scrollTo(500, 0)
               load_total_disposisi()
               load_total_pengaduan()
               load_list_pengadu()
               load_pengaduan()
                
            }
        }
    })(dashboardURL, dashboardUI)

    dashboardCTRL.init()

})()