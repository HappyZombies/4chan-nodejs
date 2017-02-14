/**
 * Helper.js are functions that can be used by any class.
 */

module.exports = {

    validateThreads: function (reqBody) {
        //TODO: Expand on this.
        if(reqBody.comment == ""){
            return false;
        }
        return true;
         //TODO: Validate the image, check for size and make sure it's an image.
    },

    htmlEntities: function (str) {
        //TODO: Expand on this.        
        if(str == null){
            return null;
        }
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

};