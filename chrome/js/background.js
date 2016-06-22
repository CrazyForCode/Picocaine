/*===================================
=            Menu config            =
===================================*/

chrome.contextMenus.create({
	id: "settings",
	title: "Settings",
	contexts: ["all"]
});

chrome.contextMenus.onClicked.addListener(function(item) {
	switch (item.menuItemId) {
		case "settings":
			openSettingsPage();break;
	}
});
function openSettingsPage() {
	chrome.tabs.create({ url: "settings.html" });
}

/*=====  End of Menu config  ======*/

