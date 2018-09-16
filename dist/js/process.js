//进度条
(function($, root) {
    var $scope = $(document.body);
    var allTime;
    var frameId;
    var startTime;
    var lastper = 0;

    function randerOvertime(time) {
        allTime = time;
        time = formatTime(time);
        $scope.find('.over-time').html(time);
    };

    function formatTime(time) {
        time = Math.round(time);
        var m = Math.floor(time / 60);
        var n = time % 60;
        if (m < 10) {
            m = '0' + m;
        }
        if (n < 10) {
            n = '0' + n;
        }
        return m + ':' + n
    };

    function start(per) {
        cancelAnimationFrame(frameId);
        lastper = per == undefined ? lastper : per;
        startTime = new Date().getTime();

        function frame() {
            var curTime = new Date().getTime();
            var percent = lastper + ((curTime - startTime) / (allTime * 1000));
            update(percent);
            frameId = requestAnimationFrame(frame);
        }
        frame();
    }

    function update(percent) {
        var time = percent * allTime;
        time = formatTime(time);
        $scope.find('.current-time').html(time);
        var perX = (percent - 1) * 100 + '%';
        $scope.find('.pro-top').css({
            transform: 'translate(' + perX + ')'
        })
    }

    function stop() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastper = lastper + (stopTime - startTime) / (allTime * 1000);
    }

    root.pro = {
        randerOvertime: randerOvertime,
        start: start,
        update: update,
        stop: stop,
    }
})(window.Zepto, window.player || (window.player = {}))