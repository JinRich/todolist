$(function () {
    let con = $(".content");
    let tab = $(".tab > li");
    let list = [
        {id:1,lContent:'端午节放三天',lTime:'2019/6/11',status:false},
        {id:2,lContent:'看cxk打篮球',lTime:'2019/6/4',status:false},
        {id:3,lContent:'睡午觉',lTime:'2019/6/4',status:false},
        {id:4,lContent:'吃中午饭',lTime:'2019/6/4',status:true},
        {id:5,lContent:'吃晚饭',lTime:'2019/6/11',status:true}
    ];
    let str = localStorage.getItem('list');
    if (!str){
        localStorage.setItem('list' , JSON.stringify(list));
    }
    list = JSON.parse(str);
    tab.on('click',function () {
        let type=$(this).attr("type");
        $(this).addClass("hot").siblings("li").removeClass("hot");
        let arr=filter(type);
        render(arr);
    });
    tab.triggerHandler("click");
    function filter(type){
        let arr=[];
        switch (type) {
            case "all":arr=list;
                break;
            case "done":arr=list.filter(ele=>ele.status);
                break;
            case "doing":arr=list.filter(ele=>!ele.status);
                break;
        }
        return arr;
        console.log(arr);
    }
    function render(list) {
        let html='';
        list.forEach(ele=>{
            if (ele.status) {
                html+=`
                 <li id="${ele.id}">
                    <input type="checkbox" checked="checked">
                    <p>${ele.lContent}</p>
                    <span>x</span>
                    <time>${ele.lTime}</time>
                </li>`
            }
            else{
                html+=`
                 <li id="${ele.id}">
                    <input type="checkbox">
                    <p>${ele.lContent}</p>
                    <span>x</span>
                    <time>${ele.lTime}</time>
                </li>`
            }
        });
        con.html(html);
    }












})