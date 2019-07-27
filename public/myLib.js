var getResource = (url, query, resSuccess, resError) => {
    $.ajax({
        url, 
        type: 'GET',
        data: {query: query},
        beforeSend: function(xhr){
            xhr.setRequestHeader('X-API-KEY', SESSION.token);
        },
        success: function(res){
            resSuccess(res)
        },
        error: function(error){
            resError(error)
        }    
    })
}

var postResource = (url, form, dom, resSuccess, resError, domComplete) => {
    $.ajax({
        url,
        type: 'POST',
        data: $(form).serialize(),
        beforeSend: function(xhr){
            xhr.setRequestHeader('X-API-KEY', SESSION.token);
            $(dom).attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i>')
        },
        success: function(res){
            resSuccess(res)
        },
        error: function(error){
            resError(error)
        },
        complete: function(){
            $(dom).attr('disabled', false).text(domComplete);
        }

    })
}

var deleteResource = (url,form, dom, resSuccess, resError, domComplete ) => {
    $.ajax({
        url,
        type: 'DELETE',
        data: $(form).serialize(),
        beforeSend: function(xhr){
            xhr.setRequestHeader('X-API-KEY', SESSION.token);
            $(dom).attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i>')
        },
        success: function(res){
            resSuccess(res)
        },
        error: function(error){
            resError(error)
        },
        complete: function(){
            $(dom).attr('disabled', false).text(domComplete);
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