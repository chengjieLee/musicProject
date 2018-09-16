var $ = window.Zepto;
var root = window.player;
// var len = 0;
var index = 0;
var $scope = $(document.body);
var sonList;
var _index = 0;
var newPer;

var audio = new root.audioControl();

function bindTouch() {
    var $scope = $(document.body);
    var offset = $('.pro-bottom').offset();
    var left = offset.left;
    var width = offset.width;

    $scope.on("touchstart", ".slider-pointer", function() {})
        .on("touchmove", ".slider-pointer", function(e) {
            var x = e.changedTouches[0].clientX;
            var per = (x - left) / width;
            if (per > 0 && per < 1) {
                root.pro.update(per);
            }
        }).on("touchend", ".slider-pointer", function(e) {
            var x = e.changedTouches[0].clientX;
            var per = (x - left) / width;
            if (per > 0 && per <= 1) {
                var curTime = per * sonList[_index].duration;
                audio.playTo(curTime);
                $scope.find('.play').removeClass('pause');
                audio.status = "play";
                root.pro.start(per);
                return newPer = per;
            }
        })
}

function bindEvent() {
    $scope.on("click", ".like", function() {
        if (sonList[_index].isLike) {
            sonList[_index].isLike = false;
        } else {
            sonList[_index].isLike = true;
        }
        root.rander(sonList[_index]);

    })
    $scope.on("click", ".next", function() {
        newPer = 0;

        if (audio.status == "play") {
            root.pro.start(0);
        } else {
            root.pro.update(0);

        }
        var index = controlManger.next();

        $scope.find('.play').removeClass('pause');
        getIndex(index);
        $scope.trigger("playChange", index);
    })
    $scope.on("click", ".prev", function() {
        newPer = 0;
        if (audio.status == "play") {
            root.pro.start(0);
        } else {
            root.pro.update(0);
        }
        var index = controlManger.prev();

        $scope.find('.play').removeClass('pause');
        getIndex(index);
        $scope.trigger("playChange", index);
    })
    $scope.on("click", ".play", function() {
        if (audio.status == "play") {
            audio.pause();
            root.pro.stop();
            changePlay(audio.status);
        } else {
            audio.play();
            root.pro.start(newPer);
            changePlay(audio.status);
        }
    })
    $scope.on("playChange", function(ind) {
        audio.getAudio(sonList[ind._args].audios);
        if (audio.status == "play") {
            audio.play();
            // root.pro.start();
        } else {
            audio.pause();
        }
        root.rander(sonList[ind._args]);
        root.pro.randerOvertime(sonList[ind._args].duration)
    })
}

function getIndex(index) {
    return _index = index;
}

function changePlay(status) {
    if (status == "play") {
        $scope.find('.play').removeClass('pause');
    } else {
        $scope.find('.play').addClass('pause');

    }
}

getData("../data/data.json");

function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function(data) {
            root.rander(data[0]);
            sonList = data;
            // len = data.length;
            controlManger = new root.controlManger(data.length);
            bindEvent();
            bindTouch();
            $scope.trigger("playChange", 0);
        },
        error: function() {
            console.log('error')
        }
    })
}