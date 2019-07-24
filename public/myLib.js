var getResource = (url, query, callback) => {
    $.ajax({
        url, 
        method: 'post',
        data: {query: query},
        dataType: 'json',
        success: function(data){
            callback(data);
        }
    })
}


var postResource = (url, form, waiting, resolve, reject ) => {
    $.ajax({
        url,
        method: 'post',
        data: new FormData(form),
        processData: false,
        contentType: false,
        async: false,
        cache: false,
        success: function(data){
            resolve(data)
        },
        error: function(error){
            reject(error)
        }
    })
}

var formatRupiah = function(angka, prefix){
    var numberString = angka.replace(/[^,\d]/g, '').toString()
    var split        = numberString.split(',')
    var sisa         = split[0].length % 3 
    var rupiah       = split[0].substr(0, sisa)
    var ribuan       = split[0].substr(sisa).match(/\d{3}/gi)

    if(ribuan) {
        var seperator = sisa ? '.' : ''
        rupiah += seperator + ribuan.join('.')

    }
    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah
    return prefix == undefined ? rupiah : (rupiah ? 'Rp.' + rupiah : '' )
}

var ModalAction = (modalName, method ) => {
    $(modalName).modal(method)
}