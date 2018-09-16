//渲染页面
(function($, root) {
    var $scope = $(document.body);

    function randerInfo(info) {
        var html = '<div class="song-name">' + info.song + '</div>\
            <div class="singer-name">' + info.singer + '</div>\
            <div class="album-name">' + info.album + '</div>';
        $scope.find('.song-info').html(html);
    }

    function randerImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function() {
            root.blurImg(img, $scope);
            $scope.find('.song-img img').attr("src", src);
        }
    }

    function randerIsLike(like) {
        if (like) {
            $scope.find('.like').addClass('liking')
        } else {
            $scope.find('.like').removeClass('liking')

        }
    }

    root.rander = function(data) {
        randerInfo(data);
        randerImg(data.images);
        randerIsLike(data.isLike);
    }

})(window.Zepto, window.player || (window.player = {}));

//通过window.player暴露函数