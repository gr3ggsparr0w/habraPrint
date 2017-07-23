// ==UserScript==
// @name        habraPrint
// @namespace   habraprint
// @include     https://habrahabr.ru/post/*
// @version     0.7
// @grant       none
// @author      filosoff.net
// ==/UserScript==

var printBlock = "<div class='printBlock buttons' style='padding: 5px 0;border-top: 1px dashed #eee;border-bottom: 1px dashed #eee;margin-top:5px;'><label><input type='checkbox' name='spoilers'> Раскрыть спойлеры </label> | Вырезать: <label><input type='checkbox' name='br'> пустые строки </label> <label><input type='checkbox' name='img'> изображения </label> <label><input type='checkbox' name='comments'> комментарии </label> <label><input type='checkbox' name='poll'> опрос </label> <button type='button' class='button' style='float:right;'>Подготовить к печати</button><div style='clear:both;'></div></div>";

$('.post__header').append(printBlock); // или TamperMonkey или }{@6P сменил себе дезигн

$('.printBlock button').click( function() {
    var p = $(this).parent();
    var br = p.find('input[name=br]').is(':checked');
    var img = p.find('input[name=img]').is(':checked');
    var comments = p.find('input[name=comments]').is(':checked');
    var spoilers = p.find('input[name=spoilers]').is(':checked');
    var poll = p.find('input[name=poll]').is(':checked');
    prepare2print(br, img, comments, spoilers, poll);
});

function prepare2print(removeBR, removeImg, removeComments, expandSpoilers, removePoll) {

    // Убираем лишние блоки
    $('#header').remove();
    $('.hubs').remove();
    $('.sidebar_right').remove();
    $('.rotated_posts').remove();
    $('.company_header').remove();
    $('table.menu').remove();
    $('.published').remove();
    $('#footer').remove();
    $('.footer_logos').remove();
    $('.infopanel_wrapper').remove();
    $('.tags').remove();
    $('#comments .title').remove();
    $('#comments .info').remove();
    $('iframe').remove();


    // Меняем стили
    $('*').css({
        'font-size' : '11px',
        'font-family' : 'Arial',
        'color' : '#333',
    });

    $('pre code, .post .spoiler_text').css({
        'background-color' : 'transparent',
    });

    $('.post_title').css({
        'font-size' : '20px',
    });

    $('h1, h2, h3, h4').css({
        'font-size' : '14px',
        'font-weight' : 'bold',
        'color' : '#888',
    });

    $('h5').css({
        'font-size' : '13px',
        'font-weight' : 'bold',
        'color' : '#888',
    });

    $('img').css({
        'display' : 'block',
    });
    $('img').attr('align', '');

    $('.comments_list').css({
        'width' : '100%',
    });

    $('.comments_list .message').css({
        'padding-top' : '0',
        'padding-bottom' : '3px',
        'border-bottom' : '1px dashed #eee',
        'font-size' : '10px',
    });

    $('.comments_list .message *').css({
        'font-size' : '10px',
    });

    $('.comments_list .reply_comments').css({
        'margin-top' : '5px',
    });

    // Действия
    if ( removeImg ) {
        $('.post a img').parent().remove();
        $('.post img').remove();
    }

    if ( removeComments ) {
        $('#comments').remove();
    }

    if ( expandSpoilers ) {
        $('.spoiler_text').show();

    }

    if ( removeBR ) {
        $('a[name=habracut]').remove();
        $('h4, h5').next('br').remove();
        $('.post br').next('br').remove();
        $('.post ul').next('br').remove();
        $('.post pre').next('br').remove();
        $('.post .spoiler').next('br').remove();
        $('.comments_list .message br').nexr('br').remove();
    }
    
    if( removePoll ){
        $('.poll').remove();
    }
    //один хрен только реклама
    $('.default-block').remove();
    $('.footer-block').remove();
    $('.footer-grid').remove();
    $('.main-navbar').remove();
    $('.container').remove();

}
