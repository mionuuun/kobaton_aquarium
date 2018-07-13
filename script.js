$(function () {
    $('#slider').bxSlider({
        ticker: true,
        minSlides: 3,
        maxSlides: 10,
        slideWidth: 300,
        slideMargin: 0,
        speed: 50000
    });

    $("#about").on("click", function (e) {
        e.preventDefault();
        $("html, body").stop().animate({
            scrollTop: 500
        }, 800);
    });
    
      function getFirstScrollable(selector){
    var $scrollable;

    $(selector).each(function(){
      var $this = $(this);
      if( $this.scrollTop() > 0 ){
        $scrollable = $this;
        return false;
      }else{
        $this.scrollTop(1);
        if( $this.scrollTop() > 0 ){
          $scrollable = $this;
          return false;
        }
        $this.scrollTop(0);
      }
    });

    return $scrollable;
  }

  // スクロールに使用する要素・イベントを設定
  var $win = $(window),
      $doc = $(document),
      $scrollElement = getFirstScrollable("html,body"),
      mousewheel = "onwheel" in document ? "wheel" : "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll";

  // aタグのクリック
  $doc.on("click", "#gallery[href^=#]", function(e){
    var $target = $(this.hash),
        top;

    // 指定した要素が存在しない場合は未処理とする
    if( $target.size() < 1 ) return false;

    // スクロール先の座標を調整する
    top = $target.offset().top;
    top = Math.min(top, $doc.height() - $win.height());

    // ウィールイベントをキャンセルしておく
    $doc.on(mousewheel, function(e){ e.preventDefault(); });

    // アニメーションの実行
    $scrollElement.stop().animate({scrollTop: top}, 1000, "easeOutQuint", function(){
      $doc.off(mousewheel);
    });

    return false;
    });
    
});
