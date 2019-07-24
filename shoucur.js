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

        }

        return {
            getDOM: () => domString
        }
    })()


    const createPengaduanController = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){


        }


        return {
            init: () => {
                console.log('init ')
            }
        }
    })(createPengaduanURL, createPengaduanInterface)


})()