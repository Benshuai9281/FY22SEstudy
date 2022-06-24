document.addEventListener("DOMContentLoaded",function () {
    let insertHtml=`
    <!-- loading -->
    <div id="loading" class="is-hide">
        <div class="cv-spinner">
            <span class="spinner"></span>
        </div>
    </div>
    <!-- loading -->
    `
    let insertCSS=`
    <style>
        #loading{
            position: fixed;
            top: 0;
            left: 0;
            z-index: 999;
            width: 100%;
            height:100%;
            background: rgba(0,0,0,0.6);
        }
        #loading .cv-spinner {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        #loading .spinner {
            width: 80px;
            height: 80px;
            border: 4px #ddd solid;
            border-top: 4px #999 solid;
            border-radius: 50%;
            animation: sp-anime 0.8s infinite linear;
        }
        @keyframes sp-anime {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(359deg); }
        }
        #loading.is-hide{
            display:none;
        }
    </style>
    `


    document.getElementsByTagName('head')[0]
        .insertAdjacentHTML('beforeend', insertCSS);
    document.getElementsByTagName('body')[0]
        .insertAdjacentHTML('afterbegin', insertHtml);
});
 
function showLoading(){
    document.getElementById('loading').classList.remove('is-hide')
}

function hideLoading(){
    document.getElementById('loading').classList.add('is-hide')
}
