PUNBB.env.sceditor = true;

PUNBB.common.addLoadEvent(function () {
	'use strict';

	var $textarea = $("textarea[name=req_message]");
	var width     = 100*($textarea.width()/$textarea.offsetParent().width());

	$.sceditorBBCodePlugin.bbcode
		.set("list", {
			html: function(element, attrs, content) {
				var type = (attrs.defaultattr === '1' ? 'ol' : 'ul');

				return '<' + type + '>' + content + '</' + type + '>';
			},
			breakAfter: false
		})
		.set("ul", { format: "[list]{0}[/list]" })
		.set("ol", { format: "[list=1]{0}[/list]" })
		.set("li", { format: "[*]{0}", excludeClosing: true })
		.set("*", { excludeClosing: true, isInline: false })
		.remove("hr").remove("table").remove("th").remove("td").remove("tr");

	$.sceditor.command
		.set("bulletlist", { txtExec: ["[list]\n[*]", "\n[/list]"] })
		.set("orderedlist", { txtExec: ["[list=1]\n[*]", "\n[/list]"] });

	$textarea.sceditor({
		plugins:		'bbcode',
		style:			sceditor_opts.root_url + '/style/' + sceditor_opts.style + '/jquery.sceditor.default.min.css?v=51',
		toolbar:		sceditor_opts.toolbar,
		emoticons:		sceditor_opts.emoticons,
		height:			200,
		width:			width + "%",
		locale:			sceditor_opts.locale,
		resizeMaxWidth:		0, // Do not allow width to be resized, only height
		emoticonsCompat:	true,
		rtl:			null // Auto detect RTL based on HTML dir
	});

	$textarea.sceditor("instance").keyPress(function (e) {
		if((e.keyCode == 13 || e.keyCode == 10) && e.ctrlKey)
			$textarea.parents("form").submit();
	});

	if(PUNBB.common.input_support_attr("required"))
		PUNBB.common.attachValidateForm();

	// replace the old form validate javascript so that when submit is pressed the
	// editor can handle the event and populate the value of the textarea before
	// the validation function starts. Otherwise the validate will complain the
	// value is empty
	$textarea.parents("form").find(":submit").each(function() {
		var clickFunc = this.onclick;
		this.onclick  = function() {};
		$textarea.parents("form").submit(function() { return clickFunc(); });
	});
});
