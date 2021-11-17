var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      
function onYouTubeIframeAPIReady() {
    new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: '7RAKzW2RdWk', //최초 재생할 유튜브의 영상 ID 이다. 
    playerVars:{
        autoplay:true, // 자동재생유무
        loop:true, //반복재생유무
        playlist:'7RAKzW2RdWk' //반복 재생할 유튜브 영항 ID
    },
    events:{
        onReady:function(event){
            event.target.mute() //음소거
        }
    }
  });
}
