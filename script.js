$(function(){
    $("#slider").slider({
        min:3,
        max:30,
        slide:function(event,ui){
            $('#circle').height(ui.value);
            $('#circle').width(ui.value);
            context.lineWidth=ui.value;
        }
    });
});

// var canvas=document.getElementById('paint');
// var context=canvas.getContext('2d');

// // draw a line
// // declare new path
// context.beginPath();
// // set line width
// context.lineWidth=40;
// // set line color;
// context.strokeStyle='#42e565';
// // line cap(round ,butt ,square)
// context.lineCap='round';
// // line joint(bevel, round ,miter)
// context.lineJoin='round';
// context.moveTo(50 ,50);
// // draw a straight line
// context.lineTo(200,200);
// // draw another line
// context.lineTo(400,100);
// // make line visible
// context.stroke();

// declare variables
    //   painting erasing or nt

    var paint=false;
    // painting or erzing
    var paint_erase='paint';
    // get canvs and contxt
    var canvas=document.getElementById('paint');
    var context=canvas.getContext('2d');
    // get canvs container
    var container=$('#container');
    // mouse poztion
    var mouse={x:0,y:0};

// onload load saved work from local storage

if(localStorage.getItem('imgCanvas')!=null){
    var img =new Image;
    img.onload=function(){
        context.drawImage(img,0,0);
    }
    img.src=localStorage.getItem('imgCanvas');

}
// set drawing paramters(lineWidth,linejoin,linecap)
     
    context.lineWidth=3;
    context.lineCap='round';
    context.lineJoin='round';
// click inside container

    container.mousedown(function(e){
        paint=true;
        context.beginPath();
        mouse.x=e.pageX-this.offsetLeft;
        mouse.y=e.pageY-this.offsetTop;
        context.moveTo(mouse.x,mouse.y);
    });
// move thhe mouse while moving mouse key

container.mousemove(function(e){
    mouse.x=e.pageX-this.offsetLeft;
    mouse.y=e.pageY-this.offsetTop;
    if(paint==true){
        if(paint_erase=='paint'){

        // get color input
        context.strokeStyle=$('#paintcolor').val();
        }else{
        // erase
        context.strokeStyle='white';
    }
    context.lineTo(mouse.x,mouse.y)
    context.stroke();
    }

});

// mouse up-> w r nt painting erasing anymore

container.mouseup(function(){
    paint=false;
});

// if we leave the mouse w r nt painting erasing anymore
container.mouseleave(function(){
    paint=false;
});


// clk on reset butn

$('#reset').click(function(){
    context.clearRect(0,0,canvas.width,canvas.height);
    paint_erase='paint';
    $('#erase').removeClass('erase-mode');
})
// clk on save butn

$('#save').click(function(){
    if(typeof(localStorage)!=null){
        localStorage.setItem('imgCanvas',canvas.toDataURL());
    }
    else{
        window.alert('your browser doesnt support local storage');
    }
})
// clk on erase butn

$('#erase').click(function(){
if(paint_erase=='paint'){
    paint_erase='erase';
}
else{
    paint_erase='paint';
}
$(this).toggleClass('erase-mode');

});
// change input color

$('#paintcolor').change(function(){
    $('#circle').css('background-color',$(this).val());
});
// chnge line width using slider
// function
