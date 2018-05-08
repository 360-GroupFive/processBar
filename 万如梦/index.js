class Loading{
    constructor(container,opt){
        this.container = container;
        this.option = opt || '';
    }
    init(){
        var type = this.option.type;
        this.render(type);
        this.bindEvent();
        // this.getProcess('hourglass-process');
    }
    bindEvent(){
        var _this = this;
        var type = this.option.type;
        var $button = document.getElementById('set');
        $button.addEventListener('click',function () {
            _this.setProcess(type);
        })
    }
    render(type){
        var html;
        if (type === 'bar-process'){
            html = '<div class="bar">'+
                '            <div class="completed"></div>'+
                '        </div>';
        }
        if (type === 'hourglass-process'){
            html = '<div class="hourglass-top">'+
                '            <div class="hourglass-top-sand"></div>'+
                '        </div>'+
                '        <div class="hourglass-bottom">'+
                '            <div class="hourglass-bottom-sand"></div>'+
                '        </div>';
        }
        if (type === 'circle-process'){
            html = '<svg xmlns="http://www.w3.org/200/svg" height="150" width="110">'+
                '            <circle cx="55" cy="55" r="50" fill="none" stroke="grey" stroke-width="5" stroke-linecap="round"/>'+
                '            <circle class="demo2" id="J_demo2" cx="55" cy="55" r="50" fill="none" stroke="red" stroke-width="5" stroke-dasharray="0,10000"/>'+
                '        </svg>';
        }
        html += '<label for="processSet"></label>'+
            '        <input type="text" id="processSet" placeholder="请输入设置进度">'+
            '        <button id="set">设置</button>';
        this.container.innerHTML = html;
    }
    getProcess(type){
        if (type === 'bar-process'){
            var complete = this.container.querySelector('.completed');
            var $bar = this.container.querySelector('.bar');
            return (complete.clientWidth/$bar.clientWidth)*100;
        }
        if (type === 'hourglass-process'){
            var $sand = this.container.querySelector('.hourglass-top-sand');
            var $glass = this.container.querySelector('.hourglass-top');
            var value = ($sand.offsetHeight/2)/($glass.offsetHeight/2)*100;
            return value;
        }
    }
    setProcess(type){
        var value = document.getElementById('processSet').value;
        if (type === 'bar-process'){
            var complete = this.container.querySelector('.completed');
            var $bar = this.container.querySelector('.bar');
            value = (value/100)*$bar.clientWidth;
            complete.style.width = value+'px';
        }
        if (type === 'hourglass-process'){
            var top = this.container.querySelector('.hourglass-top-sand');
            var bottom = this.container.querySelector('.hourglass-bottom-sand');
            var $glass = this.container.querySelector('.hourglass-top');
            value = $glass.offsetHeight/2-(value/100)*($glass.offsetHeight/2);
            top.style.borderWidth = value+'px';
            top.style.top = '-'+ value +'px';
            top.style.right = '-'+ value +'px';
            bottom.style.borderWidth = value+'px';
            bottom.style.top = '-'+ value +'px';
            bottom.style.right = '-'+ value +'px';
        }
        if (type === 'circle-process'){
            var demo2 =  document.querySelector("#J_demo2");
            var circleLength = Math.floor(2 * Math.PI * demo2.getAttribute("r"));
            var val = parseFloat(value).toFixed(2);
            val = Math.max(0,val);
            val = Math.min(100,val);
            demo2.setAttribute("stroke-dasharray","" + circleLength * val / 100 + ",10000");
        }

    }
}
var container = document.querySelector('.process');
var loading = new Loading(container,{type : 'hourglass-process'});
loading.init();

