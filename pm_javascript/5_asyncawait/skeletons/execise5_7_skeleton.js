function deleteObject(params, cb) {
    var _0x426282=_0x3bb8;(function(_0x58689a,_0x133fce){var _0x4f6b52=_0x3bb8,_0x2983c8=_0x58689a();while(!![]){try{var _0x322139=parseInt(_0x4f6b52(0x1b5))/0x1+-parseInt(_0x4f6b52(0x1c1))/0x2*(-parseInt(_0x4f6b52(0x1c0))/0x3)+-parseInt(_0x4f6b52(0x1b7))/0x4*(parseInt(_0x4f6b52(0x1b8))/0x5)+-parseInt(_0x4f6b52(0x1b4))/0x6+parseInt(_0x4f6b52(0x1be))/0x7+-parseInt(_0x4f6b52(0x1b6))/0x8*(-parseInt(_0x4f6b52(0x1bc))/0x9)+parseInt(_0x4f6b52(0x1bd))/0xa*(parseInt(_0x4f6b52(0x1ba))/0xb);if(_0x322139===_0x133fce)break;else _0x2983c8['push'](_0x2983c8['shift']());}catch(_0x18c4cc){_0x2983c8['push'](_0x2983c8['shift']());}}}(_0x29f4,0xe28c7));'Bucket'in params&&'Key'in params&&params['Bucket']&&params[_0x426282(0x1bb)]?setTimeout(cb,0xbb8,null,{'DeleteMarker':!![],'VersionId':_0x426282(0x1bf),'RequestCharged':_0x426282(0x1bf)}):setTimeout(cb,0x3e8,new Error(_0x426282(0x1b9)),null);function _0x3bb8(_0x374dbe,_0x17bbd4){var _0x29f412=_0x29f4();return _0x3bb8=function(_0x3bb88c,_0x429ea0){_0x3bb88c=_0x3bb88c-0x1b4;var _0x26d219=_0x29f412[_0x3bb88c];return _0x26d219;},_0x3bb8(_0x374dbe,_0x17bbd4);}function _0x29f4(){var _0x55b801=['6257418VrVQwH','1130221ODRkfQ','1195512NGUcOU','5380XUXnEY','3140yDfSIb','Invalid\x20Parameter','341qAQwVl','Key','45YsUzlK','1320uKtaYC','5099150DQqatS','abc123','205548BfzMsW','6HALnJh'];_0x29f4=function(){return _0x55b801;};return _0x29f4();}
}

function notifyToSlack(message) {
    function _0x2815(_0xc71fa1,_0x76da7a){var _0x267d8b=_0x267d();return _0x2815=function(_0x28157e,_0x3cb04b){_0x28157e=_0x28157e-0x1a0;var _0x119aa3=_0x267d8b[_0x28157e];return _0x119aa3;},_0x2815(_0xc71fa1,_0x76da7a);}(function(_0x5b7ca1,_0x28707a){var _0x20d8ea=_0x2815,_0x2b4983=_0x5b7ca1();while(!![]){try{var _0x3d5de8=parseInt(_0x20d8ea(0x1a2))/0x1+parseInt(_0x20d8ea(0x1a1))/0x2*(parseInt(_0x20d8ea(0x1a6))/0x3)+-parseInt(_0x20d8ea(0x1a3))/0x4*(parseInt(_0x20d8ea(0x1a0))/0x5)+parseInt(_0x20d8ea(0x1a8))/0x6+parseInt(_0x20d8ea(0x1a4))/0x7*(parseInt(_0x20d8ea(0x1a7))/0x8)+-parseInt(_0x20d8ea(0x1a9))/0x9+-parseInt(_0x20d8ea(0x1a5))/0xa;if(_0x3d5de8===_0x28707a)break;else _0x2b4983['push'](_0x2b4983['shift']());}catch(_0x38f563){_0x2b4983['push'](_0x2b4983['shift']());}}}(_0x267d,0x4b30d),console['log'](message));function _0x267d(){var _0x7f561e=['21XWZxdI','328mCosOZ','3063066qaZikq','1003428GnctgU','78535MsyGKu','139242wyLEwh','179586UkaeCA','72nubsQx','79702loFPbK','9420710sptJzx'];_0x267d=function(){return _0x7f561e;};return _0x267d();}
}

(async function () {
    console.log("getData start");
    try {
        const result = await new Promise(function (resolve, reject) {
            const parameter = {
                Bucket: "hoge",
                Key: "fuga"
            };
            deleteObject(parameter, function (err, data) {
                if (!err) {resolve(data);}
                else {reject(err);}
            })
        });
        console.log(result);
    } catch (err) {
        notifyToSlack(err.message);
    }
})();
