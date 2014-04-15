$(function() {
	var bb = $('input[name="form[pun_bbcode_enabled]"]');
	var w = $('input[name="form[pun_wysiwyg_enabled]"]');
	var c='checked', d='disabled';

	function t()
	{
		if (w.attr(c)== c)
		{
			bb.attr(d, d);
		}
		else
		{
			bb.removeAttr(d);
		}
	}
	
	t();
	
	w.click(function(){
		t();
	});
});
