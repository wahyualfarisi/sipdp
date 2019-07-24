(function() {
    "use strict"

    const createPengaduanURL = (function() {
        const urlString = {

        }
        return {
            getURL: () => urlString
        }
    })()


    const createPengaduanInterface = (function() {
        const domString = {
            btn: {
                add_lampiran: '.btn__add__lampiran'
            },
            html: {
                itemLampiran: '#item_lampiran'
            }
        }

        const renderField = () => {
            let html = '';
            html += `
                <tr>
                    <td><input type="file" name="lampiran" id="lampiran[]" class="form-control item-lampiran"> </td>
                </tr>
            `;
            $(domString.html.itemLampiran).append(html)
        }

        return {
            getDOM: () => domString,
            retrieveField: () => renderField()
        }
    })()


    const createPengaduanController = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()

        const eventListener = function(){

            $(dom.btn.add_lampiran).on('click', function() {
                UI.retrieveField()
            })

        }


        return {
            init: () => {
                console.log('init ')
                eventListener()
            }
        }
    })(createPengaduanURL, createPengaduanInterface)


    createPengaduanController.init()

})()