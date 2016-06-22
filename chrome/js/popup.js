var data = ["http://windisco.qiniudn.com/temp3.jpg", "http://windisco.qiniudn.com/temp2.jpg", "http://windisco.qiniudn.com/temp1.jpg", "https://moeoverflow.com/moe.gif"];

var link = '';

var imageBox = $('.ui.image.box');
imageBox.append(
'<div class="ui dimmer">\
	<div class="content">\
    	<div class="center">\
           	<div class="ui inverted icon">\
                <i class="copy large icon"></i>\
            </div>\
        </div>\
    </div>\
 </div>'
);
$('.ui.image.box').mouseenter(function() {
	$(this).dimmer('show');
})
$('.ui.image.box').mouseleave(function() {
	$(this).dimmer('hide');
})
$('.ui.image.box').click(function() {
	link = $('img', $(this)).attr('src');
	document.execCommand('copy');
	$(this).dimmer('hide');
})

document.addEventListener('copy', function(e) {
	var copying = ''
	switch (linkType) {
		case 'direct':
			copying = link;break;
		case 'markdown':
			copying = '![](' + link + ')';break;
		case 'html':
			copying = '<a href="' + link + '"></a>';break;
	}
  e.clipboardData.setData('text/plain', copying);
  e.preventDefault();
});

var linkType = ''

chrome.storage.sync.get(["linktype"], function(config) {
	linkType = config.linktype;
	$('#check-' + config.linktype).checkbox('set checked');
});
$('.ui.checkbox').checkbox({
	onChange: function() {
		var type = $('.ui.radio.checkbox.checked input').val();
		linkType = type
		chrome.storage.sync.set({
			linktype: type
		});
	}
});