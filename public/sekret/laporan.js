(function() {
    "use strict"

    const LaporanURL = (function() {
        const urlString = {

        }
        return {
            getURL: () => urlString
        }
    })()


    const LaporanUI = (function() {
        const domString = {

        }

        return {
            getDOM: () => domString
        }
    })()


    const LaporanCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){


        }


        return {
            init: () => {
                console.log('init ')
            }
        }
    })(LaporanURL, LaporanUI)

    LaporanCTRL.init()


})()