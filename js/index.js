(function () {
    var data = null;
    $.ajax({
        url: 'data.json',
        success: function (res) {
            console.log(res);
            if (res && res.length > 0) {
                data = res;
                bindHtml(res);
                moveCard(res);
            }
        }
    })
    function bindHtml(data) {
        var str = '';
        data.forEach((res) => {
            str += `  <li class="card">
            <i class="fa ${res}"></i>
        </li>`
        })
        $('.deck').html(str)
    }

    //乱序排列卡片
    function moveCard(data) {
        let len = data.length;
        let randomNum = null;
        let c = null;
        while (len > 0) {
            randomNum = Math.floor(Math.random() * len); //16  0-15
            len--;
            $('.deck li').eq(len).children('i').attr('class', `fa ${data[randomNum]}`);
            //data[len] data[randemNum]
            c = data[len];
            data[len] = data[randomNum];
            data[randomNum] = c;
        }
        // console.log(data);
        bindHtml(data)
    }

    var b = true;
    var moveStep = 0;
    $('.deck').on('click', 'li', function () {
        let card = $(this).attr('class');  //card
        if (card === 'card') {
            if (b) {
                b = false;
                timer();
            }

            let openLength = $('.open').length;
            let index = $(this).index();
            switch (openLength) {

                case 0:
                    $('.deck li').eq(index).addClass('open show');
                    window.index1 = index;
                    break;

                case 1:
                    $('.deck li').eq(index).addClass('open show');
                    window.index2 = index;

                    if (moveStep == 20 || moveStep == 40) {
                        $('.stars li').eq(0).remove();
                    }
                    var str1 = $('.deck li').eq(index1).children('i').attr('class');
                    var str2 = $('.deck li').eq(index2).children('i').attr('class');
                    moveStep++;
                    $('.moves').html(moveStep);
                    if (str1 == str2) {
                        $('.deck li').eq(index1).removeClass('open show').addClass('match animated bounce');
                        $('.deck li').eq(index2).removeClass('open show').addClass('match animated bounce');

                        setTimeout(() => {
                            $('.deck li').removeClass('animated bounce');
                        }, 1000);
                    } else {
                        $('.deck li').eq(index1).removeClass('open show').addClass('wrong animated wobble');
                        $('.deck li').eq(index2).removeClass('open show').addClass('wrong animated wobble');

                        setTimeout(() => {
                            $('.deck li').removeClass('wrong animated wobble');
                        }, 1000);
                    }
                    if ($('.match').length === data.length) {
                        setTimeout(() => {
                            //卡片显示，时间停止
                            clearTimeout(t);
                            successCard()
                        }, 1000);
                    }
                    break;
                default: ;

            }
        }
    })

    //时间开始显示
    var num = 1;
    var t = undefined;
    function timer() {
        t = setInterval(() => {
            $('.timer').html(num++)
        }, 1000);
    }

    //点击恢复按钮
    $('.reset').on('click', function () {
        $('.stars').html(`<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`)
        $('.moves').html(0);
        $('.timer').html(0);
        moveStep = 0;
        moveCard(data);
        clearTimeout(t)
    })


    function successCard() {
        $('.c-box').css('display', 'block');
        $('.c-box').addClass('animated bounceIn');
        let str = ``;
        let length = $('.stars li').length;
        let step = $('.moves').html();
        let time = $('.timer').html();
        while (length > 0) {
            length--;
            str += '★';
        }
        $('.c-box ul [val="1"]').html('Stars:' + str);
        $('.c-box ul [val="2"]').html('Moves:' + step);
        $('.c-box ul [val="3"]').html('Timer:' + time);
        $('.fa-close').on('click', function () {
            $('.c-box').css('display', 'none');
            $('.c-box').removeClass('animated bounceIn').addClass('animated bounceOut');
            $('.stars').html(`<li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>`)
            $('.moves').html(0);
            $('.timer').html(0);
            moveStep = 0;
            moveCard(data);
            clearTimeout(t)
        })
    }
})()