/**
 * Created by penny on 2017/6/2.
 */

var prepage = 10;
var page = 1;
var pages=0;
var comments=[];
//提交评论
$('#messageBtn').on('click',function () {
   $.ajax({
        type:'POST',
        url:'/api/comment/post',
        data:{
            contentid:$('#contentId').val(),
            content:$('#messageContent').val()
        },
       success:function (responseData) {
           //console.log(responseData);
           $('#messageContent').val('');
           comments=responseData.data.reverse();
           renderComment();
       }

   });
    window.reload();
});
//每次页面重载的时候获取一下该文章的所有评论
$.ajax({
    url:'/api/comment',
    data:{
        contentid:$('#contentId').val()
    },
    success:function (responseData) {
        //console.log(responseData);
        // $('#messageContent').val('');
        comments=responseData.data.reverse();
        renderComment();
    }
});

$('.pager').delegate('a','click',function () {
   // alert("1");
    if($(this).parent().hasClass('previous')){
        page--;
    }else {
        page++;
    }
    renderComment();
});

function renderComment() {
    $('#messageCount').html(comments.length);

    var html='';
    var $lis = $('.pager li');
    var pages = Math.max(Math.ceil(comments.length/prepage),1);

    var start=Math.max(0,(page-1)*prepage);
    var end=Math.min(start+prepage,comments.length);

    $lis.eq(1).html(page +'/'+pages);

    if(page<=1){
        page=1;
        $lis.eq(0).html('<span>没有上一页</span>');
    }else {
        $lis.eq(0).html('<a href="javascript:;">上一页</a>');
    }
    if(page>=pages){
        page=pages;
        $lis.eq(2).html('<span>没有下一页</span>');
    }else {
        $lis.eq(2).html('<a href="javascript:;">下一页</a>');
    }
    if(comments.length == 0){

        $('.messageList').html('<div class="messageList"> <div class="messageBox center"><p>还没有留言</p></div> </div>');
    }else {
        for(var i=start;i<end;i++){
            html +='<div class="messageBox">'+
                '<p class="name"><span class="fl">'+comments[i].username+'</span><span class="fr">'+formaDate(comments[i].postTime)+'</span></p><p class="clear">'+comments[i].content+'</p>'+
                '</div>';
        }
        /*console.log($('.messageList'),html);*/
        $('.messageList').html(html);
    }


}

function formaDate(d) {
    var date1 = new  Date(d);
    return date1.getFullYear()+'-'+(date1.getMonth()+1)+'-'+date1.getDate()+' '+date1.getHours()+':'+
            date1.getMinutes()+':'+date1.getSeconds();
}