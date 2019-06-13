window.onload=function () {
    let tab=document.querySelectorAll('.tab > li');
    let content=document.querySelector('.box>ul');
    let list = [
        {id:1,lContent:'端午节放三天',lTime:'2019/6/11',status:false},
        {id:2,lContent:'看cxk打篮球',lTime:'2019/6/4',status:false},
        {id:3,lContent:'睡午觉',lTime:'2019/6/4',status:true},
        {id:4,lContent:'吃中午饭',lTime:'2019/6/4',status:true},
        {id:5,lContent:'吃晚饭',lTime:'2019/6/11',status:true}
    ];
    let str = localStorage.getItem('list');
    if (!str){
        localStorage.setItem('list' , JSON.stringify(list));
    }
    list = JSON.parse(str);
    console.log(list);
    let type='all';
    ////////////////////渲染函数/////////////////
    function render(arr){
        let html="";
        arr.forEach(function (ele) {
            if (ele.status){
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
        content.innerHTML=html;
        localStorage.setItem('list' , JSON.stringify(list));
    }
    render(list);
    content.onclick=function(e){
        if (e.target.nodeName=="INPUT"){
            let index=list.findIndex(ele => ele.id == e.target.parentNode.id);
            if (list[index].status){
                list[index].status=false;
            }
            else {
                list[index].status=true;
            }
        }
        if (e.target.nodeName=="SPAN"){
            let index=list.findIndex(ele => ele.id == e.target.parentNode.id);
            list.splice(index,1);
        }
        render(filter(list,type));
        console.log(list);
    };


    // input.forEach(function (ele) {
    //    ele.onclick=function () {
    //        let parent=ele.parentNode;
    //        if (list[parent.id-1].status){
    //            list[parent.id-1].status=false
    //        }
    //        else {
    //            list[parent.id-1].status=true
    //        }
    //        console.log(list);
    //    }
    // });


    ////////////////////点击事件/////////////////
    tab.forEach(function(ele){
        ele.onclick=function () {
            type=ele.id;
            for (let i=0;i<tab.length;i++){
                tab[i].classList.remove("hot");
            }
            ele.classList.add("hot");
            let arr=filter(list,type);
            render(arr);
        }
    });
    function filter(list,type){
        let arr=[];
        switch (type) {
            case 'all':arr=list;
                break;
            case 'done':arr=list.filter(eles=>eles.status);
                break;
            case 'doing':arr=list.filter(eles=>!eles.status);
                break;
        }
        return arr;
    }
    /////////////////////////雨女无瓜/////////////////////////////
    let add=document.querySelector(".add .submit");
    add.onclick=function () {
        let id;
        if (list.length==0){
            id=1;
        }
        else{
            id=list[list.length-1].id+1;
        }
        let lContent=document.querySelector(".lContent>input").value;
        let lTime=new Date().toLocaleDateString();
        if (lContent){
            let ar={id,lContent,lTime,status:false};
            list.push(ar);
            console.log(list);
            document.querySelector(".lContent>input").value="";
            render(filter(list,type));
        }
        else {
            alert("请填写完再添加!!")
        }

    };
};