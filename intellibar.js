
var BASE_URL = 'https://dl.dropboxusercontent.com/u/8538600/burt/bookmarklets/TV4-IntelliBar'

$('body').append('<link href="'+BASE_URL+'/style.css" media="screen" rel="stylesheet" />"');

window.intellibar = (function () {
  var $bar = $('<div />');
  $bar.css({
    height:300,
    width:'100%',
    'background-color':'white', 
    'border-top':'2px solid black',
    position:'fixed',
    bottom: 0,
    'z-index':999
  });
  $bar.html('<div id="intellibar">'+
              '<div id="barmenu-wrapper">'+
                '<img src="'+BASE_URL+'/tv4logo_red.png" id="logo" />'+
                '<ul id="barmenu">'+
                  '<li id="reach_visits" data-type="iframe">Räckvidd och besök</li>'+
                  '<li id="demography" data-type="doubleIframe">Demografi</li>'+
                  '<li id="social_media" data-type="doubleIframe">Sociala Medier</li>'+
                  '<li id="day_time" data-type="iframe">Dag &amp; tid</li>'+
                  '</ul>'+
                '</div>'+
              '<div id="intellibar-content">'+
            '</div>');

  var setBar = function(id, type) {

    var contentSrc = {
      reach_visits: 'https://docs.google.com/a/burtcorp.com/spreadsheets/d/1r46AeAImleMM7jKS2t8SGtZXwhMRBrB5VpgoBr8gNVc/pubchart?oid=1843346657&format=interactive',
      demography : {
                    first: 'https://docs.google.com/a/burtcorp.com/spreadsheets/d/1r46AeAImleMM7jKS2t8SGtZXwhMRBrB5VpgoBr8gNVc/pubchart?oid=1631858610&format=interactive',
                    second: 'https://docs.google.com/a/burtcorp.com/spreadsheets/d/1r46AeAImleMM7jKS2t8SGtZXwhMRBrB5VpgoBr8gNVc/pubchart?oid=1231345853&format=interactive'
                    // second: 'https://docs.google.com/a/burtcorp.com/spreadsheets/d/11ZPH4egIoyLsxhpgktz-LpXsjA2-1ihTvNT7i0zk1WE/pubchart?oid=636087322&format=interactive'
                  },
      social_media : {
                    first: 'https://docs.google.com/a/burtcorp.com/spreadsheets/d/1tisxpbbyciDxifWw1QAtki0-uSMfKRvlXhw6uoUTahc/pubchart?oid=1177234689&format=interactive',
                    second: 'https://docs.google.com/spreadsheets/d/1tisxpbbyciDxifWw1QAtki0-uSMfKRvlXhw6uoUTahc/pubchart?oid=1346713540&format=interactive'
                  },
      day_time: 'http://safe-bastion-9677.herokuapp.com/'
    }

    var iframeTpl = '<iframe src="'+contentSrc[id]+'" style="display:none" class="content bar-iframe" /></iframe>';
    var doubleIframeTpl = '<div class="content double-iframe-wrapper" style="display:none"><iframe src="'+contentSrc[id].first+'" class="content bar-double-iframe first" /></iframe><iframe src="'+contentSrc[id].second+'" class="content bar-double-iframe second" /></iframe></div>';
    var imgTpl = '<img src="'+contentSrc[id]+'" style="display:none" class="content bar-img" />';
    var content;


    if(type === 'image') {
      content = imgTpl;
    }
    if(type === 'iframe') {
      content = iframeTpl;
    }
    if(type === 'doubleIframe') {
      content = doubleIframeTpl;
    }
    
    $('#barmenu li').removeClass('selected');
    $('#'+id).addClass('selected');
    $('#intellibar-content .content').fadeOut(250);
    $('#intellibar-content').html( content ).find('.content').fadeIn(250);

  };

  $bar.find('#barmenu li').bind('click', function(e) {
    var bar = e.target.id;
    var type = $(e.target).data('type');
    console.log('click', bar)
    setBar(bar, type);
  });

  $('body').css({'padding-bottom':225}).append($bar).scroll
  setBar('reach_visits', 'iframe');
  console.log('### TV4 IntelliBar loaded! ###')

})();