(function() {
  "use strict";

  const buatSuratURL = (function() {
    const urlString = {
      buatKeputusan: `${BASE_URL}api/int/Keputusan`
    };
    return {
      getURL: () => urlString
    };
  })();

  const buatSuratUI = (function() {
    const domString = {
      form: {
        keputusan: "#form-keputusan"
      },
      btn: {
        addKeputusan: ".btn__add__keputusan",
        onSave: "#btn_on_save"
      }
    };

    return {
      getDOM: () => domString
    };
  })();

  const buatSuratCTRL = (function(URL, UI) {
    const dom = UI.getDOM();
    const url = URL.getURL();

    const eventListener = function() {
      $(dom.form.keputusan).validate({
        rules: {
          nomor_disposisi: {
            required: true
          },
          id_pengaduan: {
            required: true
          },
          lampiran: {
            required: true
          },
          perihal: {
            required: true
          },
          isi_agenda: {
            required: true
          }
        },
        messages: {
          nomor_disposisi: "Nomor Disposisi Tidak Boleh Kosong",
          id_pengaduan: "ID Pengaduan Tidak Boleh Kosong",
          lampiran: "Lampiran Tidak Boleh Kosong",
          perihal: "Perihal Harus Di isi",
          isi_agenda: "Isi Agenda Harus Di Isi"
        },
        errorPlacement: function(error, element) {
          error.css("color", "red");
          error.insertAfter(element);
        },
        submitHandler: function(form) {
          for (instance in CKEDITOR.instances) {
            CKEDITOR.instances[instance].updateElement();
          }

          postResource(
            url.buatKeputusan,
            form,
            dom.btn.onSave,
            res => {
              console.log(res);
              if(res.status === 200){
                  location.hash = '#/dashboard'
              }
            },
            err => console.log(err),
            "BUAT KEPUTUSAN"
          );
          
        
        }
      });
    };

    return {
      init: () => {
        console.log("init ");
        eventListener();
      }
    };
  })(buatSuratURL, buatSuratUI);

  buatSuratCTRL.init();
})();
