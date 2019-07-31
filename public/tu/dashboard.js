(function() {
    "use strict"

    const dashboardURL = (function() {
        const urlString = {
            totalPengaduan: `${BASE_URL}api/int/Dashboard/count_pengaduan_status`,
            totalDisposisi: `${BASE_URL}api/int/Dashboard/count_disposisi_status`
        }
        return {
            getURL: () => urlString
        }
    })()


    const dashboardUI = (function() {
        const domString = {

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
            }
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


        return {
            init: () => {
                console.log('init ')
                load_total_pengaduan()
                load_total_disposisi()
            }
        }
    })(dashboardURL, dashboardUI)

    dashboardCTRL.init()

})()