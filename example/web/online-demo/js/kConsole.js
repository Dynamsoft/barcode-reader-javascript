/*
 * master branch: https://github.com/Keillion/www.keillion.site Unlicense
 */
/*global $*/
/*eslint-disable indent*/
$('body').append($([
'<style type="text/css">#kConsoleShowHideBtn i {font-weight:bolder;padding:0 4px;}</style>',
'<div>',
    '<div id="kConsoleLogDiv" style="display:none;position:fixed;top:0;right:0;width:100%;height:80%;padding:16px 0;overflow-y:scroll;font-size:16px;line-height:24px;work-break:break-all;word-wrap:break-word;background-color:rgba(0,0,0,0.5);color:white;box-sizing:border-box;z-index:32767;"></div>',
    '<div style="display:none;width:100%;height:20%;font-size:16px;line-height:24px;position:fixed;bottom:0;work-break:break-all;word-wrap:break-word;background-color:rgba(0,0,0,0.5);box-sizing:border-box;z-index:32767;">',
        '<textarea id="kConsoleTextArea" type="text" style="display:inline-block;width:90%;height:100%;box-sizing:border-box;"></textarea>',
        '<button id="kConsoleBtnRun" style="display:inline-block;width:10%;height:100%;vertical-align:top;box-sizing:border-box;">run</button>',
    '</div>',
    '<div style="font-size:16px;line-height:24px;position:fixed;top:0;right:0;box-sizing:border-box;z-index:32767;">',
        '<button id="kConsoleClear" style="display:none;">clear</button>',
        ' <button id="kConsoleShowHideBtn">console</button>',
    '</div>',
'</div>'].join('')));
/*eslint-enable indent*/
self.kConsoleMaxLine = 500;
self.kConsoleLog = function(anything, color){
    var str = undefined;
    if(undefined === anything){
        str = 'undefined';
    }else{
        try{
            str = JSON.stringify(anything, (function(){  
                var cache = [];
                var keyCache = [];
                return function(key, value) {
                    if (typeof value === 'object' && value !== null) {
                        var index = cache.indexOf(value);
                        if (index !== -1) {
                            return '[Circular ' + keyCache[index] + ']';
                        }
                        cache.push(value);
                        keyCache.push(key || 'root');
                    }
                    return value;
                };
            })());
        }catch(ex){/**/}
        if(undefined === str || '{}' === str){
            str = anything.toString();
        }
    }
    if(self.onKConsoleLog){
        setTimeout(function(){
            self.onKConsoleLog(str);
        }, 0);
    }
    var kConsoleLogDiv = document.getElementById("kConsoleLogDiv");
    var line = document.createElement("p");
    if(color){
        line.style.color=color;
    }
    line.innerHTML = str;
    kConsoleLogDiv.appendChild(line);
    if($(kConsoleLogDiv).children().length > self.kConsoleMaxLine){
        $(kConsoleLogDiv).children().first().remove();
    }
    kConsoleLogDiv.scrollTop = kConsoleLogDiv.scrollHeight;
};
self.onKConsoleLog = self.onKConsoleLog || null;

self.kConsoleError = function(anything){
    self.kConsoleLog(anything, 'red');
};

/*(function(){
    try{
        var orilog = console.log;
        console.log = function(){
            orilog.apply(console, arguments);
            kConsoleLog(arguments[0]);
        };
    }catch(ex){}
})();*/
window.addEventListener('error', function (ev) {
    var info = [
        ev.message, "<br>",
        ev.filename, "<br>",
        "line: ", ev.lineno, "<br>",
        "obj: " , ev.error, "<br>"
    ].join('');
    self.kConsoleError(info);
}, false);

document.getElementById('kConsoleBtnRun').onclick = function(){
    var result;
    var cmd = document.getElementById('kConsoleTextArea').value;
    if("" == cmd.trim()){
        return;
    }
    result = eval(document.getElementById('kConsoleTextArea').value);
    self.kConsoleLog(result);
};

document.getElementById('kConsoleClear').onclick = function(){
    document.getElementById('kConsoleLogDiv').innerHTML = "";
};

document.getElementById('kConsoleShowHideBtn').onclick = function(){
    if($('#kConsoleLogDiv').is(':visible')){
        $(this).siblings().hide();
        $(this).parent().siblings().hide();
        this.innerHTML = "console";
    }else{
        $(this).siblings().show();
        $(this).parent().siblings().show();
        this.innerHTML = "<i>&times;</i>";
    }
};
