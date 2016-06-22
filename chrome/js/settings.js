$('.menu .item').tab();

$('#save').click(writeQiniuKeys);

readQiniuKeys(function(keys) {
	console.log(keys);
	$('#access_key').val(keys.access_key);
	$('#secret_key').val(keys.secret_key);
});

function readQiniuKeys(callback) {
	chrome.storage.sync.get(["access_key", "secret_key"], callback);
}

function writeQiniuKeys() {
	chrome.storage.sync.set({
		access_key: $('#access_key').val(),
		secret_key: $('#secret_key').val()
	}, function() {
		console.log("ok");
	});
}