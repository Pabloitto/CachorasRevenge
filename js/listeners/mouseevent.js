$.mel=function(o){
    
    function init(){
        bindEvents();
    }
    
    function bindEvents(){
        o.element.addEventListener('mousemove',mm,false);
        o.element.addEventListener('mousedown',mc,false);
        document.addEventListener('contextmenu',oc,false);
    }
    
    function mm(e){
		o.onMouseMove(gx(e),gy(e));
	}
    
    function mc(e){
		o.onClick(gx(e),gy(e),e.button);
	}
	
	function oc(event){
        event.preventDefault();
    }

	function gx(e){
		return e.clientX - o.element.offsetLeft;
	}

	function gy(e){
		return e.clientY - o.element.offsetTop;
	}

    init();
};